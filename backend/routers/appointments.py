from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from datetime import date, time, datetime
from typing import Optional, List
from .auth import get_current_user
from supabase import create_client, Client
import os

router = APIRouter()

# Supabase client
supabase: Client = create_client(
    os.getenv("SUPABASE_URL"),
    os.getenv("SUPABASE_SERVICE_KEY")
)

class AppointmentCreate(BaseModel):
    patient_id: str
    doctor_id: str
    appointment_date: date
    appointment_time: time
    chief_complaint: Optional[str] = None
    consultation_fee: Optional[float] = None

class AppointmentUpdate(BaseModel):
    status: Optional[str] = None
    diagnosis: Optional[str] = None
    treatment_plan: Optional[str] = None
    prescriptions: Optional[dict] = None
    notes: Optional[str] = None

@router.get("/")
async def get_appointments(
    date_filter: Optional[date] = None,
    doctor_id: Optional[str] = None,
    patient_id: Optional[str] = None,
    status: Optional[str] = None,
    current_user: dict = Depends(get_current_user)
):
    """Get appointments with optional filters"""
    
    clinic_id = current_user.get("clinic_id") or current_user.get("hospital_id")
    
    query = supabase.table("appointments")\
        .select("*, patients(*), doctors(*)")\
        .eq("clinic_id", clinic_id)
    
    if date_filter:
        query = query.eq("appointment_date", date_filter.isoformat())
    
    if doctor_id:
        query = query.eq("doctor_id", doctor_id)
    
    if patient_id:
        query = query.eq("patient_id", patient_id)
    
    if status:
        query = query.eq("status", status)
    
    # Role-based filtering
    if current_user["role"] == "doctor":
        # Doctors can only see their own appointments
        doctor_result = supabase.table("doctors")\
            .select("id")\
            .eq("user_id", current_user["id"])\
            .execute()
        
        if doctor_result.data:
            query = query.eq("doctor_id", doctor_result.data[0]["id"])
    
    elif current_user["role"] == "patient":
        # Patients can only see their own appointments
        patient_result = supabase.table("patients")\
            .select("id")\
            .eq("user_id", current_user["id"])\
            .execute()
        
        if patient_result.data:
            query = query.eq("patient_id", patient_result.data[0]["id"])
    
    result = query.order("appointment_date", desc=False)\
        .order("appointment_time", desc=False)\
        .execute()
    
    return {"appointments": result.data}

@router.post("/")
async def create_appointment(
    appointment: AppointmentCreate,
    current_user: dict = Depends(get_current_user)
):
    """Create a new appointment"""
    
    clinic_id = current_user.get("clinic_id") or current_user.get("hospital_id")
    
    # Check if slot is available
    existing_appointment = supabase.table("appointments")\
        .select("id")\
        .eq("doctor_id", appointment.doctor_id)\
        .eq("appointment_date", appointment.appointment_date.isoformat())\
        .eq("appointment_time", appointment.appointment_time.isoformat())\
        .eq("status", "scheduled")\
        .execute()
    
    if existing_appointment.data:
        raise HTTPException(status_code=400, detail="Time slot not available")
    
    # Generate token number
    appointments_today = supabase.table("appointments")\
        .select("token_number")\
        .eq("doctor_id", appointment.doctor_id)\
        .eq("appointment_date", appointment.appointment_date.isoformat())\
        .execute()
    
    token_number = len(appointments_today.data) + 1 if appointments_today.data else 1
    
    # Create appointment
    appointment_data = {
        **appointment.dict(),
        "clinic_id": clinic_id,
        "token_number": token_number,
        "status": "scheduled"
    }
    
    # Convert date and time to strings for Supabase
    appointment_data["appointment_date"] = appointment.appointment_date.isoformat()
    appointment_data["appointment_time"] = appointment.appointment_time.isoformat()
    
    result = supabase.table("appointments").insert(appointment_data).execute()
    
    if not result.data:
        raise HTTPException(status_code=400, detail="Failed to create appointment")
    
    # TODO: Send WhatsApp confirmation
    # await send_whatsapp_confirmation(appointment.patient_id, result.data[0])
    
    return {"appointment": result.data[0], "message": "Appointment created successfully"}

@router.patch("/{appointment_id}")
async def update_appointment(
    appointment_id: str,
    appointment_update: AppointmentUpdate,
    current_user: dict = Depends(get_current_user)
):
    """Update appointment details"""
    
    # Check if appointment exists and user has permission
    appointment_result = supabase.table("appointments")\
        .select("*")\
        .eq("id", appointment_id)\
        .execute()
    
    if not appointment_result.data:
        raise HTTPException(status_code=404, detail="Appointment not found")
    
    appointment = appointment_result.data[0]
    
    # Permission check
    if current_user["role"] == "doctor":
        doctor_result = supabase.table("doctors")\
            .select("id")\
            .eq("user_id", current_user["id"])\
            .execute()
        
        if not doctor_result.data or doctor_result.data[0]["id"] != appointment["doctor_id"]:
            raise HTTPException(status_code=403, detail="Not authorized to update this appointment")
    
    elif current_user["role"] == "patient":
        patient_result = supabase.table("patients")\
            .select("id")\
            .eq("user_id", current_user["id"])\
            .execute()
        
        if not patient_result.data or patient_result.data[0]["id"] != appointment["patient_id"]:
            raise HTTPException(status_code=403, detail="Not authorized to update this appointment")
    
    # Update appointment
    update_data = {k: v for k, v in appointment_update.dict().items() if v is not None}
    
    result = supabase.table("appointments")\
        .update(update_data)\
        .eq("id", appointment_id)\
        .execute()
    
    return {"appointment": result.data[0], "message": "Appointment updated successfully"}

@router.delete("/{appointment_id}")
async def cancel_appointment(
    appointment_id: str,
    current_user: dict = Depends(get_current_user)
):
    """Cancel an appointment"""
    
    result = supabase.table("appointments")\
        .update({"status": "cancelled"})\
        .eq("id", appointment_id)\
        .execute()
    
    if not result.data:
        raise HTTPException(status_code=404, detail="Appointment not found")
    
    return {"message": "Appointment cancelled successfully"}

@router.get("/queue/{doctor_id}")
async def get_doctor_queue(
    doctor_id: str,
    date_filter: Optional[date] = None,
    current_user: dict = Depends(get_current_user)
):
    """Get doctor's appointment queue for the day"""
    
    if not date_filter:
        date_filter = datetime.now().date()
    
    appointments = supabase.table("appointments")\
        .select("*, patients(*)")\
        .eq("doctor_id", doctor_id)\
        .eq("appointment_date", date_filter.isoformat())\
        .in_("status", ["scheduled", "confirmed", "in_progress"])\
        .order("appointment_time")\
        .execute()
    
    return {"queue": appointments.data, "date": date_filter}
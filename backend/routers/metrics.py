from fastapi import APIRouter, Depends
from pydantic import BaseModel
from typing import Dict, Any
from datetime import datetime, timedelta
from .auth import get_current_user
from supabase import create_client, Client
import os

router = APIRouter()

# Supabase client
supabase: Client = create_client(
    os.getenv("SUPABASE_URL"),
    os.getenv("SUPABASE_SERVICE_KEY")
)

class MetricsResponse(BaseModel):
    total_appointments: int
    active_users: int
    revenue_today: float
    patients_today: int
    pending_lab_tests: int
    low_stock_items: int

@router.get("/overview", response_model=MetricsResponse)
async def get_overview_metrics(current_user: dict = Depends(get_current_user)):
    """Get overview metrics for dashboard"""
    
    clinic_id = current_user.get("clinic_id") or current_user.get("hospital_id")
    today = datetime.now().date()
    
    try:
        # Total appointments
        appointments_result = supabase.table("appointments")\
            .select("id", count="exact")\
            .eq("clinic_id", clinic_id)\
            .execute()
        total_appointments = appointments_result.count or 0
        
        # Active users
        users_result = supabase.table("users")\
            .select("id", count="exact")\
            .eq("clinic_id", clinic_id)\
            .eq("is_active", True)\
            .execute()
        active_users = users_result.count or 0
        
        # Revenue today
        revenue_result = supabase.table("accounts_tx")\
            .select("amount")\
            .eq("clinic_id", clinic_id)\
            .eq("transaction_date", today)\
            .eq("transaction_type", "income")\
            .execute()
        revenue_today = sum(float(tx["amount"]) for tx in revenue_result.data) if revenue_result.data else 0.0
        
        # Patients today
        patients_today_result = supabase.table("appointments")\
            .select("id", count="exact")\
            .eq("clinic_id", clinic_id)\
            .eq("appointment_date", today)\
            .execute()
        patients_today = patients_today_result.count or 0
        
        # Pending lab tests
        lab_tests_result = supabase.table("lab_tests")\
            .select("id", count="exact")\
            .eq("clinic_id", clinic_id)\
            .in_("status", ["ordered", "collected", "processing"])\
            .execute()
        pending_lab_tests = lab_tests_result.count or 0
        
        # Low stock items
        low_stock_result = supabase.table("pharmacy_items")\
            .select("id", count="exact")\
            .eq("clinic_id", clinic_id)\
            .filter("quantity_available", "lte", "reorder_level")\
            .execute()
        low_stock_items = low_stock_result.count or 0
        
        return MetricsResponse(
            total_appointments=total_appointments,
            active_users=active_users,
            revenue_today=revenue_today,
            patients_today=patients_today,
            pending_lab_tests=pending_lab_tests,
            low_stock_items=low_stock_items
        )
        
    except Exception as e:
        return MetricsResponse(
            total_appointments=0,
            active_users=0,
            revenue_today=0.0,
            patients_today=0,
            pending_lab_tests=0,
            low_stock_items=0
        )

@router.get("/dashboard/{role}")
async def get_role_specific_metrics(role: str, current_user: dict = Depends(get_current_user)):
    """Get role-specific dashboard metrics"""
    
    clinic_id = current_user.get("clinic_id") or current_user.get("hospital_id")
    today = datetime.now().date()
    
    if role == "doctor":
        # Doctor-specific metrics
        doctor_result = supabase.table("doctors")\
            .select("id")\
            .eq("user_id", current_user["id"])\
            .execute()
        
        if doctor_result.data:
            doctor_id = doctor_result.data[0]["id"]
            
            # Today's appointments
            appointments_today = supabase.table("appointments")\
                .select("*")\
                .eq("doctor_id", doctor_id)\
                .eq("appointment_date", today)\
                .order("appointment_time")\
                .execute()
            
            return {
                "appointments_today": appointments_today.data,
                "total_patients": len(appointments_today.data) if appointments_today.data else 0,
                "next_appointment": appointments_today.data[0] if appointments_today.data else None
            }
    
    elif role == "receptionist":
        # Reception-specific metrics
        appointments_today = supabase.table("appointments")\
            .select("*, patients(*), doctors(*)")\
            .eq("clinic_id", clinic_id)\
            .eq("appointment_date", today)\
            .order("appointment_time")\
            .execute()
        
        return {
            "appointments_today": appointments_today.data,
            "waiting_patients": [apt for apt in appointments_today.data if apt["status"] == "confirmed"],
            "total_today": len(appointments_today.data) if appointments_today.data else 0
        }
    
    elif role == "pharmacist":
        # Pharmacy-specific metrics
        low_stock = supabase.table("pharmacy_items")\
            .select("*")\
            .eq("clinic_id", clinic_id)\
            .filter("quantity_available", "lte", "reorder_level")\
            .execute()
        
        expiring_soon = supabase.table("pharmacy_items")\
            .select("*")\
            .eq("clinic_id", clinic_id)\
            .filter("expiry_date", "lte", (today + timedelta(days=60)).isoformat())\
            .execute()
        
        return {
            "low_stock_items": low_stock.data,
            "expiring_items": expiring_soon.data,
            "alerts_count": len(low_stock.data) + len(expiring_soon.data)
        }
    
    return {"message": "Role-specific metrics not implemented yet"}
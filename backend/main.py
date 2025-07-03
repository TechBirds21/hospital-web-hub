#!/usr/bin/env python3
"""
Main FastAPI application entry point
"""

from dotenv import load_dotenv
from dotenv import load_dotenv
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Import routers
from routers import auth, metrics, clinics, appointments, pharmacy, accounts, patients, doctors, staff, lab, modules

# Load environment variables
load_dotenv()
load_dotenv()

app = FastAPI(title="HealthCare Management API", version="1.0.0")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/auth", tags=["Authentication"])
app.include_router(metrics.router, prefix="/metrics", tags=["Metrics"])
app.include_router(modules.router, prefix="/modules", tags=["Modules"])
app.include_router(clinics.router, prefix="/clinics", tags=["Clinics"])
app.include_router(appointments.router, prefix="/appointments", tags=["Appointments"])
app.include_router(pharmacy.router, prefix="/pharmacy", tags=["Pharmacy"])
app.include_router(accounts.router, prefix="/accounts", tags=["Accounts"])
app.include_router(patients.router, prefix="/patients", tags=["Patients"])
app.include_router(doctors.router, prefix="/doctors", tags=["Doctors"])
app.include_router(staff.router, prefix="/staff", tags=["Staff"])
app.include_router(lab.router, prefix="/lab", tags=["Laboratory"])

@app.get("/")
async def root():
    return {"message": "HealthCare Management API is running"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
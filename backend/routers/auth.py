from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel, EmailStr
from typing import Optional
import jwt
from datetime import datetime, timedelta
from passlib.context import CryptContext
from supabase import create_client, Client
import os

router = APIRouter()
security = HTTPBearer()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Supabase client
supabase: Client = create_client(
    os.getenv("SUPABASE_URL"),
    os.getenv("SUPABASE_SERVICE_KEY")
)

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class RegisterRequest(BaseModel):
    email: EmailStr
    password: str
    role: str
    clinic_id: Optional[str] = None
    phone: Optional[str] = None

class TokenResponse(BaseModel):
    access_token: str
    token_type: str
    user: dict

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        payload = jwt.decode(
            credentials.credentials,
            os.getenv("JWT_SECRET_KEY"),
            algorithms=[os.getenv("JWT_ALGORITHM", "HS256")]
        )
        user_id: str = payload.get("sub")
        if user_id is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Could not validate credentials"
            )
        
        # Get user from database
        result = supabase.table("users").select("*").eq("auth_user_id", user_id).execute()
        if not result.data:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="User not found"
            )
        
        return result.data[0]
    except jwt.PyJWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials"
        )

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=int(os.getenv("JWT_EXPIRE_MINUTES", 60)))
    
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(
        to_encode,
        os.getenv("JWT_SECRET_KEY"),
        algorithm=os.getenv("JWT_ALGORITHM", "HS256")
    )
    return encoded_jwt

@router.post("/login", response_model=TokenResponse)
async def login(request: LoginRequest):
    try:
        # Authenticate with Supabase
        auth_response = supabase.auth.sign_in_with_password({
            "email": request.email,
            "password": request.password
        })
        
        if not auth_response.user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid credentials"
            )
        
        # Get user profile
        user_result = supabase.table("users").select("*").eq("auth_user_id", auth_response.user.id).execute()
        
        if not user_result.data:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User profile not found"
            )
        
        user_profile = user_result.data[0]
        
        # Create JWT token
        access_token = create_access_token(data={"sub": auth_response.user.id})
        
        return TokenResponse(
            access_token=access_token,
            token_type="bearer",
            user=user_profile
        )
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication failed"
        )

@router.post("/register", response_model=TokenResponse)
async def register(request: RegisterRequest):
    try:
        # Create user in Supabase Auth
        auth_response = supabase.auth.sign_up({
            "email": request.email,
            "password": request.password
        })
        
        if not auth_response.user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Failed to create user"
            )
        
        # Create user profile
        user_profile = {
            "auth_user_id": auth_response.user.id,
            "email": request.email,
            "role": request.role,
            "clinic_id": request.clinic_id,
            "phone": request.phone
        }
        
        profile_result = supabase.table("users").insert(user_profile).execute()
        
        if not profile_result.data:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Failed to create user profile"
            )
        
        # Create JWT token
        access_token = create_access_token(data={"sub": auth_response.user.id})
        
        return TokenResponse(
            access_token=access_token,
            token_type="bearer",
            user=profile_result.data[0]
        )
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Registration failed: {str(e)}"
        )

@router.get("/me")
async def get_current_user_profile(current_user: dict = Depends(get_current_user)):
    return current_user

@router.post("/logout")
async def logout():
    # In a real implementation, you might want to blacklist the token
    return {"message": "Successfully logged out"}
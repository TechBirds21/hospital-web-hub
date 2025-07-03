# 🚨 URGENT: Fix "Invalid Login Credentials" Error

## Problem: Getting "Invalid login credentials" when trying to log in?

**Root Cause**: Email confirmation is enabled in Supabase settings.

## 🔧 SOLUTION (Required Steps)

### Step 1: Disable Email Confirmation (CRITICAL!)
1. Go to **Supabase Dashboard**: https://supabase.com/dashboard
2. Select your project: `tprfvkfvarhskprpdlwy`
3. Navigate to **Authentication** → **Settings**
4. Find **"User Signups"** section
5. Set **"Enable email confirmations"** to **OFF**
6. **SAVE** the settings

⚠️ **Without this step, ALL login attempts will fail!**

### Step 2: Create Demo Users
Go to **Authentication** → **Users** → **Add User**

Create these 4 demo users:

1. **👨‍💼 Admin User**
   - Email: `admin@demo.com`
   - Password: `demo123`
   - Email Confirmed: ✅ **Check this box**

2. **👨‍⚕️ Doctor User**
   - Email: `doctor@demo.com`
   - Password: `demo123`
   - Email Confirmed: ✅ **Check this box**

3. **👩‍💼 Reception User**
   - Email: `reception@demo.com`
   - Password: `demo123`
   - Email Confirmed: ✅ **Check this box**

4. **👤 Patient User**
   - Email: `patient@demo.com`
   - Password: `demo123`
   - Email Confirmed: ✅ **Check this box**

### Step 3: Test Login
Now test at: http://localhost:5173/login

Try logging in with:
- **Email**: `admin@demo.com`
- **Password**: `demo123`

## ✅ Success Indicators
After successful login, you should be redirected to role-specific dashboards:
- **Admin** → Hospital management dashboard
- **Doctor** → Doctor dashboard with patient queue
- **Reception** → Reception desk with appointments
- **Patient** → Patient portal

## 🚨 Still Getting "Invalid Credentials"?
Double-check these settings in Supabase Dashboard:

1. **Authentication** → **Settings** → **"Enable email confirmations"** = **OFF**
2. **Authentication** → **Users** → Verify users exist and are **confirmed**
3. Check that password is exactly `demo123` (case-sensitive)

## 🎯 What Happens After Login
The application automatically:
- ✅ Creates user profiles on first login
- ✅ Assigns roles based on email patterns
- ✅ Links users to appropriate clinics
- ✅ Loads demo data (clinics, doctors, patients, appointments)

Everything is ready once the email confirmation is disabled!
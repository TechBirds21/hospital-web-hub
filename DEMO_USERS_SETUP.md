# 🚨 Fix "Invalid Login Credentials" Error

## CRITICAL: Disable Email Confirmation First!

If you're getting "Invalid login credentials" error, this is because email confirmation is enabled in Supabase.

### Step 1: Disable Email Confirmation (REQUIRED!)
1. Go to https://supabase.com/dashboard
2. Navigate to your project: `tprfvkfvarhskprpdlwy`
3. Go to **Authentication** → **Settings**
4. Under "User Signups" section
5. Set **"Enable email confirmations"** to **OFF**
6. **Save the settings**

⚠️ **This step MUST be completed before creating or testing demo users!**

### Step 2: Create Demo Users
Go to **Authentication** → **Users** → **Add User**

#### Demo User 1 - Admin
- **Email**: `admin@demo.com`
- **Password**: `demo123`
- **Email Confirmed**: ✅ Check this box

#### Demo User 2 - Doctor
- **Email**: `doctor@demo.com`
- **Password**: `demo123`
- **Email Confirmed**: ✅ Check this box

#### Demo User 3 - Receptionist
- **Email**: `reception@demo.com`
- **Password**: `demo123`
- **Email Confirmed**: ✅ Check this box

#### Demo User 4 - Patient
- **Email**: `patient@demo.com`
- **Password**: `demo123`
- **Email Confirmed**: ✅ Check this box

### Step 3: Test Login
Now you can test login with:
- Email: `admin@demo.com`
- Password: `demo123`

## Automatic Role Assignment
The system automatically assigns roles based on email patterns:
- `*admin*` → admin role → Hospital clinic
- `*doctor*` → doctor role → Hospital clinic
- `*reception*` → receptionist role → Hospital clinic  
- `*patient*` → patient role → Hospital clinic

## Still Getting Errors?
1. ✅ Verify email confirmation is disabled in Supabase settings
2. ✅ Check that users exist in Supabase Auth dashboard
3. ✅ Ensure users are marked as "Email Confirmed"
4. ✅ Verify password is exactly `demo123`
5. ✅ Check Supabase URL and keys in environment variables

## Quick Test
Try this exact login:
- URL: http://localhost:5173/login
- Email: `admin@demo.com`
- Password: `demo123`

If this fails, the email confirmation setting is still enabled!
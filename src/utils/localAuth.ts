// Demo users data for local development
export const demoUsers: Record<string, any> = {
  'admin@demo.com': {
    email: 'admin@demo.com',
    password: 'demo123',
    role: 'admin',
    clinic_id: '550e8400-e29b-41d4-a716-446655440001',
    id: 'demo-admin-id',
    auth_user_id: 'demo-admin-auth-id',
    is_active: true
  },
  'doctor@demo.com': {
    email: 'doctor@demo.com',
    password: 'demo123',
    role: 'doctor',
    clinic_id: '550e8400-e29b-41d4-a716-446655440001',
    id: 'demo-doctor-id',
    auth_user_id: 'demo-doctor-auth-id',
    is_active: true
  },
  'reception@demo.com': {
    email: 'reception@demo.com',
    password: 'demo123',
    role: 'receptionist',
    clinic_id: '550e8400-e29b-41d4-a716-446655440001',
    id: 'demo-reception-id',
    auth_user_id: 'demo-reception-auth-id',
    is_active: true
  },
  'patient@demo.com': {
    email: 'patient@demo.com',
    password: 'demo123',
    role: 'patient',
    clinic_id: '550e8400-e29b-41d4-a716-446655440001',
    id: 'demo-patient-id',
    auth_user_id: 'demo-patient-auth-id',
    is_active: true
  }
};

// Simple browser-compatible token creation and validation
const createToken = (payload: any): string => {
  const tokenData = {
    ...payload,
    exp: Date.now() + (7 * 24 * 60 * 60 * 1000) // 7 days from now
  };
  return btoa(JSON.stringify(tokenData));
};

const verifyToken = (token: string): any => {
  try {
    const tokenData = JSON.parse(atob(token));
    
    // Check if token is expired
    if (tokenData.exp && Date.now() > tokenData.exp) {
      throw new Error('Token expired');
    }
    
    return tokenData;
  } catch (error) {
    throw new Error('Invalid token');
  }
};

export const localSignIn = (email: string, password: string): { user: any; error: any } => {
  const user = (demoUsers as Record<string, any>)[email.toLowerCase()];
  
  if (!user || user.password !== password) {
    return { 
      user: null, 
      error: { message: 'Invalid login credentials' } 
    };
  }

  // Create token
  const token = createToken({
    sub: user.auth_user_id,
    email: user.email,
    role: user.role
  });

  // Store token in local storage
  localStorage.setItem('authToken', token);
  localStorage.setItem('userEmail', user.email);

  // Return user without sensitive info
  const { password: _, ...userWithoutPassword } = user;
  return { user: userWithoutPassword, error: null };
};

export const localSignOut = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('userEmail');
};

export const getLocalUser = (): any => {
  const token = localStorage.getItem('authToken');
  const email = localStorage.getItem('userEmail');
  
  if (!token || !email || !(demoUsers as Record<string, any>)[email]) {
    return null;
  }
  
  try {
    // Verify token is valid
    verifyToken(token);
    
    // Return user without password
    const { password: _, ...userWithoutPassword } = (demoUsers as Record<string, any>)[email];
    return userWithoutPassword;
  } catch (error) {
    // Token is invalid or expired
    localStorage.removeItem('authToken');
    localStorage.removeItem('userEmail');
    return null;
  }
};

export const isLocalAuthEnabled = (): boolean => {
  // Local auth is enabled in development mode
  return true;
}
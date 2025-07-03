import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { getLocalUser, localSignIn, localSignOut, isLocalAuthEnabled } from '../utils/localAuth';
import { supabase } from '../lib/supabase';

interface UserProfile {
  id?: number;
  auth_user_id: string;
  email: string;
  role: string;
  is_active: boolean;
  [key: string]: any;
}

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error?: any }>;
  signUp: (email: string, password: string, userData: Partial<UserProfile>) => Promise<{ error?: any }>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribe: (() => void) | null = null;

    const initializeAuth = async () => {
      if (isLocalAuthEnabled()) {
        const localUser = getLocalUser();
        if (localUser) {
          setUser({ id: localUser.auth_user_id } as User);
          setUserProfile(localUser);
        }
        setLoading(false);
        return;
      }

      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      if (session?.user) {
        await fetchUserProfile(session.user.id);
      } else {
        setLoading(false);
      }

      const { data: listener } = supabase.auth.onAuthStateChange(async (_event, session) => {
        setUser(session?.user ?? null);
        if (session?.user) {
          await fetchUserProfile(session.user.id);
        } else {
          setUserProfile(null);
        }
        setLoading(false);
      });

      unsubscribe = () => listener.subscription.unsubscribe();
    };

    initializeAuth();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('auth_user_id', userId)
        .single();

      if (error) {
        console.error('Error fetching user profile:', error);
        setUserProfile(null);
      } else {
        setUserProfile(data);
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      setUserProfile(null);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);

    if (isLocalAuthEnabled()) {
      const { user: localUser, error } = localSignIn(email, password);
      if (localUser) {
        setUser({ id: localUser.auth_user_id } as User);
        setUserProfile(localUser);
        setLoading(false);
        return {};
      }
      setLoading(false);
      return { error };
    }

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (!error && data.user) {
      const { data: _, error: profileError } = await supabase
        .from('users')
        .select('*')
        .eq('auth_user_id', data.user.id)
        .single();

      if (profileError && profileError.code === 'PGRST116') {
        // Profile not found — create
        await supabase.from('users').insert({
          auth_user_id: data.user.id,
          email: data.user.email,
          role: 'patient',
          is_active: true
        });
      }

      await fetchUserProfile(data.user.id);
    }

    setLoading(false);
    return { error };
  };

  const signUp = async (email: string, password: string, userData: Partial<UserProfile>) => {
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (!error && data.user) {
      const { error: profileError } = await supabase
        .from('users')
        .insert({
          auth_user_id: data.user.id,
          email,
          ...userData
        });

      if (profileError) {
        console.error('Error creating user profile:', profileError);
      }

      await fetchUserProfile(data.user.id);
    }

    setLoading(false);
    return { error };
  };

  const signOut = async () => {
    if (isLocalAuthEnabled()) {
      localSignOut();
    } else {
      await supabase.auth.signOut();
    }
    setUser(null);
    setUserProfile(null);
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user) return;

    const { error } = await supabase
      .from('users')
      .update(updates)
      .eq('auth_user_id', user.id);

    if (!error && userProfile) {
      setUserProfile({ ...userProfile, ...updates });
    }
  };

  const value: AuthContextType = {
    user,
    userProfile,
    loading,
    signIn,
    signUp,
    signOut,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

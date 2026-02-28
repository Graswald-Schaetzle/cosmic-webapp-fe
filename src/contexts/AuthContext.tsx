import { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { useDispatch } from 'react-redux';
import { supabase } from '../lib/supabase';
import { authorizeUser } from '../app/api';
import { useGetAllLocationsQuery } from '../api/locationApi/locationApi';
import {
  setLocations,
  setLocationsLoading,
  setLocationsError,
  clearLocations,
} from '../store/locationsSlice';
import { setCurrentUser, clearCurrentUser } from '../store/userSlice';

interface CurrentUser {
  user_id: number;
  created_at: string;
  username: string;
  email: string;
  supabase_id: string;
  first_name: string;
  last_name: string;
  role: string;
  access_token: string;
  refresh_token: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  currentUser: CurrentUser | null;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isLoading: true,
  error: null,
  currentUser: null,
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const dispatch = useDispatch();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentUser, setCurrentUserState] = useState<CurrentUser | null>(null);

  // Fetch locations after authentication
  const {
    data: locationsData,
    isLoading: locationsLoading,
    error: locationsError,
  } = useGetAllLocationsQuery(undefined, {
    skip: !isAuthenticated,
  });

  const handleAuthUser = async (supabaseUser: User) => {
    try {
      setIsLoading(true);
      setError(null);

      const userData = await authorizeUser(supabaseUser);

      const token = localStorage.getItem('access_token');
      if (!token) {
        throw new Error('No access token found after authentication');
      }

      setCurrentUserState(userData);
      dispatch(setCurrentUser(userData));
      setIsAuthenticated(true);
    } catch (err) {
      console.error('Authentication failed:', err);
      setError(err instanceof Error ? err.message : 'Authentication failed');
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem('access_token');
    setIsAuthenticated(false);
    setIsLoading(false);
    setError(null);
    setCurrentUserState(null);
    dispatch(clearCurrentUser());
    dispatch(clearLocations());
  };

  useEffect(() => {
    // Load current session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        handleAuthUser(session.user);
      } else {
        setIsLoading(false);
      }
    });

    // Listen for auth state changes (login, logout, token refresh)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        handleAuthUser(session.user);
      } else {
        handleSignOut();
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Update locations state when data is fetched
  useEffect(() => {
    if (locationsLoading) {
      dispatch(setLocationsLoading(true));
    } else if (locationsError) {
      dispatch(setLocationsError('Failed to load locations'));
    } else if (locationsData) {
      dispatch(setLocations(locationsData));
    }
  }, [locationsData, locationsLoading, locationsError, dispatch]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading: isLoading || (isAuthenticated && locationsLoading),
        error,
        currentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

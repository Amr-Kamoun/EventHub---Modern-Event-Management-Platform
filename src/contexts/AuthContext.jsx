import { createContext, useContext, useState, useEffect } from 'react';
import { supabase, getUserProfile } from '../lib/supabase';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  // 👇 Sync auth across tabs to avoid freezing
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key?.includes('auth-token')) {
        console.log("[AuthContext] Auth token changed in another tab. Reloading...");
        window.location.reload();
      }
    }
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // 👇 Initial auth + profile fetch
  useEffect(() => {
    const getSessionAndProfile = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      console.log("[AuthContext] Session:", session);

      if (error || !session?.user) {
        console.warn('[AuthContext] No session found or error fetching session:', error);
        setUser(null);
        setProfile(null);
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      const currentUser = session.user;
      console.log("[AuthContext] Current user:", currentUser);
      setUser(currentUser);

      try {
        const userProfile = await getUserProfile(currentUser.id);
        console.log("[AuthContext] Profile:", userProfile);

        if (!userProfile) {
          toast.error("Profile not found. You've been logged out.");
          await supabase.auth.signOut();
          setUser(null);
          setProfile(null);
          setIsAdmin(false);
          return;
        }

        setProfile(userProfile);
        setIsAdmin(userProfile?.role === 'admin');
      } catch (err) {
        console.error('[AuthContext] Error fetching profile:', err);
        toast.error("An error occurred. You've been logged out.");
        await supabase.auth.signOut();
        setUser(null);
        setProfile(null);
        setIsAdmin(false);
      }

      setLoading(false);
    };

    getSessionAndProfile();

    // 👇 Sync session changes (login/logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (session?.user) {
          const currentUser = session.user;
          setUser(currentUser);
          try {
            const userProfile = await getUserProfile(currentUser.id);
            console.log("[AuthContext] onAuthChange profile:", userProfile);

            if (!userProfile) {
              toast.error("Profile not found. You've been logged out.");
              await supabase.auth.signOut();
              setUser(null);
              setProfile(null);
              setIsAdmin(false);
              return;
            }

            setProfile(userProfile);
            setIsAdmin(userProfile?.role === 'admin');
          } catch (err) {
            console.error('[AuthContext] Error fetching profile (auth change):', err);
            toast.error("An error occurred. You've been logged out.");
            await supabase.auth.signOut();
            setUser(null);
            setProfile(null);
            setIsAdmin(false);
          }
        } else {
          setUser(null);
          setProfile(null);
          setIsAdmin(false);
        }
      }
    );

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const value = {
    user,
    profile,
    isAdmin,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

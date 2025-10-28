import { createContext, useContext, useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile
} from 'firebase/auth';
import { auth } from '../firebase';
import { apiService } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      
      // If user is logged in, authenticate with server
      if (currentUser) {
        try {
          const idToken = await currentUser.getIdToken();
          await apiService.loginWithToken(idToken);
        } catch (error) {
          console.error('Error authenticating with server:', error);
        }
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Helper function to authenticate with server after Firebase auth
  const authenticateWithServer = async (userCredential) => {
    try {
      const idToken = await userCredential.user.getIdToken();
      await apiService.loginWithToken(idToken);
    } catch (error) {
      console.error('Error authenticating with server:', error);
    }
  };

  // Register with email and password
  const register = async (email, password, displayName) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // Update user profile with display name
    if (displayName && userCredential.user) {
      await updateProfile(userCredential.user, { displayName });
    }
    
    // Authenticate with server
    await authenticateWithServer(userCredential);
    
    return userCredential;
  };

  // Login with email and password
  const login = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    
    // Authenticate with server
    await authenticateWithServer(userCredential);
    
    return userCredential;
  };

  // Login with Google
  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    
    // Authenticate with server
    await authenticateWithServer(userCredential);
    
    return userCredential;
  };

  // Logout
  const logout = async () => {
    await signOut(auth);
  };

  const value = {
    user,
    register,
    login,
    loginWithGoogle,
    logout,
    loading,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};


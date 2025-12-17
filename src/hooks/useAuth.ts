import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  setAuth,
  logout,
  setLoading,
  setError,
} from '@/store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { auth } from '@/config/firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  FacebookAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { LoginCredentials, SignUpCredentials } from '@/types/auth';
import toast from 'react-hot-toast';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading, error } = useAppSelector(
    state => state.auth
  );

  const login = async (credentials: LoginCredentials) => {
    if (!auth) {
      toast.error(
        'Firebase is not configured. Please set up Firebase in .env file.'
      );
      return;
    }
    try {
      dispatch(setLoading(true));
      const userCredential = await signInWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      );

      const token = await userCredential.user.getIdToken();
      const userData = {
        id: userCredential.user.uid,
        email: userCredential.user.email!,
        displayName: userCredential.user.displayName || undefined,
        photoURL: userCredential.user.photoURL || undefined,
        role: 'user' as const,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      dispatch(setAuth({ user: userData, token }));
      localStorage.setItem('token', token);
      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (error: unknown) {
      const errorMessage =
        (error as { code?: string; message?: string })?.code ===
        'auth/invalid-credential'
          ? 'Invalid email or password'
          : (error as { message?: string })?.message || 'Login failed';
      dispatch(setError(errorMessage));
      toast.error(errorMessage);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const signUp = async (credentials: SignUpCredentials) => {
    if (!auth) {
      toast.error(
        'Firebase is not configured. Please set up Firebase in .env file.'
      );
      return;
    }
    try {
      dispatch(setLoading(true));
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      );

      const token = await userCredential.user.getIdToken();
      const userData = {
        id: userCredential.user.uid,
        email: userCredential.user.email!,
        displayName:
          credentials.displayName ||
          userCredential.user.displayName ||
          undefined,
        photoURL: userCredential.user.photoURL || undefined,
        role: 'user' as const,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      dispatch(setAuth({ user: userData, token }));
      localStorage.setItem('token', token);
      toast.success('Account created successfully!');
      navigate('/dashboard');
    } catch (error: unknown) {
      const errorMessage =
        (error as { code?: string; message?: string })?.code ===
        'auth/email-already-in-use'
          ? 'Email already in use'
          : (error as { message?: string })?.message || 'Sign up failed';
      dispatch(setError(errorMessage));
      toast.error(errorMessage);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const logoutUser = async () => {
    if (!auth) {
      dispatch(logout());
      localStorage.removeItem('token');
      toast.success('Logged out successfully');
      navigate('/');
      return;
    }
    try {
      dispatch(setLoading(true));
      await signOut(auth);
      dispatch(logout());
      localStorage.removeItem('token');
      toast.success('Logged out successfully');
      navigate('/');
    } catch (error: unknown) {
      dispatch(
        setError((error as { message?: string })?.message || 'Logout failed')
      );
      toast.error('Logout failed');
    } finally {
      dispatch(setLoading(false));
    }
  };

  const signInWithGoogle = async () => {
    if (!auth) {
      toast.error(
        'Firebase is not configured. Please set up Firebase in .env file.'
      );
      return;
    }
    try {
      dispatch(setLoading(true));
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);

      const token = await userCredential.user.getIdToken();
      const userData = {
        id: userCredential.user.uid,
        email: userCredential.user.email!,
        displayName: userCredential.user.displayName || undefined,
        photoURL: userCredential.user.photoURL || undefined,
        role: 'user' as const,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      dispatch(setAuth({ user: userData, token }));
      localStorage.setItem('token', token);
      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (error: unknown) {
      dispatch(
        setError(
          (error as { message?: string })?.message || 'Google sign in failed'
        )
      );
      toast.error('Google sign in failed');
    } finally {
      dispatch(setLoading(false));
    }
  };

  const signInWithFacebook = async () => {
    if (!auth) {
      toast.error(
        'Firebase is not configured. Please set up Firebase in .env file.'
      );
      return;
    }
    try {
      dispatch(setLoading(true));
      const provider = new FacebookAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);

      const token = await userCredential.user.getIdToken();
      const userData = {
        id: userCredential.user.uid,
        email: userCredential.user.email!,
        displayName: userCredential.user.displayName || undefined,
        photoURL: userCredential.user.photoURL || undefined,
        role: 'user' as const,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      dispatch(setAuth({ user: userData, token }));
      localStorage.setItem('token', token);
      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (error: unknown) {
      dispatch(
        setError(
          (error as { message?: string })?.message || 'Facebook sign in failed'
        )
      );
      toast.error('Facebook sign in failed');
    } finally {
      dispatch(setLoading(false));
    }
  };

  const signInWithGitHub = async () => {
    if (!auth) {
      toast.error(
        'Firebase is not configured. Please set up Firebase in .env file.'
      );
      return;
    }
    try {
      dispatch(setLoading(true));
      const provider = new GithubAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);

      const token = await userCredential.user.getIdToken();
      const userData = {
        id: userCredential.user.uid,
        email: userCredential.user.email!,
        displayName: userCredential.user.displayName || undefined,
        photoURL: userCredential.user.photoURL || undefined,
        role: 'user' as const,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      dispatch(setAuth({ user: userData, token }));
      localStorage.setItem('token', token);
      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (error: unknown) {
      dispatch(
        setError(
          (error as { message?: string })?.message || 'GitHub sign in failed'
        )
      );
      toast.error('GitHub sign in failed');
    } finally {
      dispatch(setLoading(false));
    }
  };

  const forgotPassword = async (email: string) => {
    if (!auth) {
      toast.error(
        'Firebase is not configured. Please set up Firebase in .env file.'
      );
      return;
    }
    try {
      dispatch(setLoading(true));
      await sendPasswordResetEmail(auth, email);
      toast.success('Password reset email sent!');
    } catch (error: unknown) {
      const errorMessage =
        (error as { code?: string; message?: string })?.code ===
        'auth/user-not-found'
          ? 'User not found'
          : (error as { message?: string })?.message ||
            'Failed to send reset email';
      dispatch(setError(errorMessage));
      toast.error(errorMessage);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    signUp,
    logout: logoutUser,
    signInWithGoogle,
    signInWithFacebook,
    signInWithGitHub,
    forgotPassword,
  };
};

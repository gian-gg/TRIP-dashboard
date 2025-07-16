import { POST, GET } from '@/lib/api';
import type { GETResponse, UserType } from '@/type';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const signIn = async (req: { email: string; password: string }) => {
  const response = await POST('/auth/index.php', req);
  const res = response as GETResponse;

  if (res.status !== 'success') {
    throw new Error('Sign in failed: ' + (res.message || 'Unknown error'));
  }

  localStorage.setItem('token', (res.data as { token: string }).token);

  return res.data as UserType;
};

const signOut = () => {
  localStorage.removeItem('token');
};

const getUser = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    return null;
  }

  const response = await GET('/auth/index.php?token=' + token);

  const res = response as GETResponse;

  if (res.status !== 'success') {
    throw new Error('Get user failed: ' + (res.message || 'Unknown error'));
  }

  return res.data as UserType;
};

const useAuthorized = () => {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser();
        if (!userData) {
          navigate('/');
          return;
        }

        if (userData.role === 'conductor') {
          navigate('/conductor');
        } else if (userData.role === 'operator') {
          navigate('/operator');
        }

        setUser(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
        navigate('/');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [navigate]);

  return { user, loading };
};

export { signIn, signOut, getUser, useAuthorized };

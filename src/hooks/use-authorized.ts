import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import type { UserType } from '@/type';
import { getUser } from '@/lib/auth';

const useAuthorized = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = (await getUser()) as UserType | null;
        if (!userData) {
          navigate('/');
          return;
        }

        if (userData.role && !pathname.startsWith(`/${userData.role}`)) {
          navigate(`/${userData.role}`);
          return;
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
  }, [navigate, pathname]);

  return { user, loading };
};

export default useAuthorized;

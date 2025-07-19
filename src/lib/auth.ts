import APICall from '@/lib/api';
import type { UserType } from '@/type';

const signIn = async (req: { email: string; password: string }) => {
  let role: UserType['role'] | null = null;
  await APICall<{ token: string; role: string }>({
    type: 'POST',
    url: '/auth/index.php',
    body: req,
    consoleLabel: 'Sign In Response',
    success: (data) => {
      localStorage.setItem('token', data.token);
      role = data.role as UserType['role'] | null;
    },
    error: (error) => {
      throw new Error(error.message || 'Unknown error');
    },
  });

  return role;
};

const signOut = () => {
  localStorage.removeItem('token');
};

const getUser = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    return null;
  }
  let user: UserType | null = null;
  await APICall<UserType>({
    type: 'GET',
    url: '/auth/index.php?token=' + token,
    consoleLabel: 'Get User Response',
    success: (data) => {
      user = data as UserType | null;
    },
    error: (error) => {
      throw new Error(error.message || 'Unknown error');
    },
  });

  return user;
};

export { signIn, signOut, getUser };

import { POST, GET } from '@/lib/api';
import type { GETResponse, UserType } from '@/type';

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

export { signIn, signOut, getUser };

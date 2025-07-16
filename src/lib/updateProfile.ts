import { PUT } from './api';
import type { GETResponse } from '@/type';

const updateProfile = async (requestBody: {
  user_id: string;
  name: string | null;
  email: string | null;
  current_password: string | null;
  new_password: string | null;
}) => {
  console.log(
    'Updating profile with request body:',
    JSON.stringify(requestBody, null, 2)
  );

  try {
    const response = await PUT('/users/index.php', requestBody);

    const res = response as GETResponse;
    console.log('Update profile response:', JSON.stringify(res, null, 2));

    if (res.status !== 'success') {
      throw new Error(res.message || 'Unknown error');
    }
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export default updateProfile;

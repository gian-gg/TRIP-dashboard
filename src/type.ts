interface GETResponse {
  status: string;
  message: string;
  data: object;
}

interface UserType {
  user_id: string;
  name: string;
  email: string;
  company_id: string;
  created_at: string;
  role: 'operator' | 'conductor';
}

interface CredentialsType {
  email: string;
  password: string;
}

export type { GETResponse, UserType, CredentialsType };

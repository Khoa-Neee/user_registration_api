import { apiFetch } from './client';

export interface RegisterRequest {
  email: string;
  password: string;
}

export interface RegisterResponse {
  message: string;
  data: {
    id: string;
    email: string;
    createdAt: string;
  };
}

export function registerUser(payload: RegisterRequest) {
  return apiFetch<RegisterResponse>('/user/register', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

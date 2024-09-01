import { Commission } from '../types/commission';
import { Member } from '../types/member';
import api from './axiosConfig';
import { LoginCredentials, LoginResponse } from '../types/member';

export const fetchMembers = async (): Promise<Member[]> => {
  const response = await api.get<Member[]>('/members');
  return response.data;
};

export const fetchCurrentMember = async (): Promise<Member> => {
  const response = await api.get<Member>('/members/profile');
  return response.data;
};

export const updateMember = async (
  member: Partial<Member>,
): Promise<Member> => {
  const response = await api.patch<Member>('/members/profile', member);
  return response.data;
};

export const deleteMember = async (email: string): Promise<void> => {
  await api.delete(`/members/${email}`);
};

export const login = async (
  credentials: LoginCredentials,
): Promise<LoginResponse> => {
  const response = await api.post('/members/login', credentials);

  const token = response.headers['authorization'];
  const refreshToken = response.headers['refresh-token'];

  if (!token || !refreshToken) {
    throw new Error('Token or refresh token not found in response headers');
  }

  return {
    token: token.replace('Bearer ', ''),
    refreshToken: refreshToken.replace('Bearer ', ''),
  };
};

export const signup = async (
  member: Omit<Member, 'id'> & { password: string },
): Promise<Member> => {
  try {
    console.log('Sending signup request with data:', member); // 요청 데이터 로깅
    const response = await api.post<Member>('/members/signup', member);
    console.log('Signup response:', response.data); // 응답 데이터 로깅
    return response.data;
  } catch (error) {
    console.error('Signup error:', error); // 에러 로깅
    throw error;
  }
};

export const fetchCommission = async (id: number): Promise<Commission> => {
  const response = await api.get<Commission>(`/commission/${id}`);
  return response.data;
};

export const updateCommission = async (
  id: number,
  commission: Partial<Commission>,
): Promise<Commission> => {
  const response = await api.patch<Commission>(
    `/commissions/${id}`,
    commission,
  );
  return response.data;
};

export const verifyEmail = async (
  email: string,
  code: string,
): Promise<string> => {
  const response = await api.post('/members/verify-email', { email, code });
  return response.data;
};

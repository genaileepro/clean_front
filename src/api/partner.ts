import partnerApiInstance from './partnerAxiosConfig';
import {
  Partner,
  PartnerLoginCredentials,
  PartnerLoginResponse,
} from '../types/partner';

export const fetchPartners = async (): Promise<Partner[]> => {
  const response = await partnerApiInstance.get<Partner[]>('/partner');
  return response.data;
};

export const fetchCurrentPartner = async (): Promise<Partner> => {
  const response = await partnerApiInstance.get<Partner>('/partner/profile');
  return response.data;
};

export const updatePartner = async (
  partner: Partial<Partner>,
): Promise<Partner> => {
  const token = localStorage.getItem('token'); // 토큰이 필요하다면 헤더에 추가
  try {
    const response = await partnerApiInstance.patch<Partner>(
      `/partner/profile`,
      partner,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Authorization 헤더에 토큰을 추가
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error updating partner profile:', error);
    throw error;
  }
};

export const deletePartner = async (email: string): Promise<void> => {
  await partnerApiInstance.delete(`/partner/${email}`);
};

export const partnerLogin = async (
  credentials: PartnerLoginCredentials,
): Promise<PartnerLoginResponse> => {
  const response = await partnerApiInstance.post('/partner/login', credentials);

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

export const partnerSignup = async (
  partner: Omit<Partner, 'id'> & { password: string },
): Promise<Partner> => {
  const response = await partnerApiInstance.post<Partner>(
    '/partner/signup',
    partner,
  );
  return response.data;
};

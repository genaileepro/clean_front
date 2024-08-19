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
  const response = await partnerApiInstance.put<Partner>(
    `/partner/profile`,
    partner,
  );
  return response.data;
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

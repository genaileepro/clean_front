import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as partner from '../api/partner';
import {
  Partner,
  PartnerLoginCredentials,
  PartnerLoginResponse,
} from '../types/partner';
import { partnerLogin } from '../api/partner'; // 실제 API 요청 함수

export const usePartners = () => {
  return useQuery<Partner[], Error>({
    queryKey: ['partners'],
    queryFn: partner.fetchPartners,
  });
};

export const useCurrentPartner = () => {
  return useQuery<Partner, Error>({
    queryKey: ['currentPartner'],
    queryFn: partner.fetchCurrentPartner,
  });
};

export const useUpdatePartner = () => {
  const queryClient = useQueryClient();
  return useMutation<Partner, Error, Partial<Partner>>({
    mutationFn: (updatePartner: Partial<Partner>) =>
      partner.updatePartner(updatePartner),
    onSuccess: (data) => {
      queryClient.setQueryData(['currentPartner'], data);
      queryClient.invalidateQueries({ queryKey: ['currentPartner'] });
    },
  });
};

export const useDeletePartner = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: partner.deletePartner,
    onSuccess: (_, email) => {
      queryClient.invalidateQueries({ queryKey: ['partner'] });
      queryClient.removeQueries({ queryKey: ['partner', email] });
    },
  });
};

export const usePartnerLogin = () => {
  return useMutation<PartnerLoginResponse, Error, PartnerLoginCredentials>({
    mutationFn: async (formData) => {
      const response = await partnerLogin(formData); // Login API 호출
      return response; // 여기에서 바로 response를 반환합니다.
    },
  });
};

export const usePartnerSignup = () => {
  return useMutation<
    Partner,
    Error,
    Omit<Partner, 'id'> & { password: string }
  >({
    mutationFn: partner.partnerSignup,
  });
};

export const useRequestPartnerEmailVerification = () => {
  return useMutation<void, Error, { email: string }>({
    mutationFn: (data) => partner.requestPartnerEmailVerification(data.email),
  });
};

export const useVerifyPartnerEmail = () => {
  return useMutation<string, Error, { email: string; code: string }>({
    mutationFn: ({ email, code }) => partner.verifyPartnerEmail(email, code),
  });
};

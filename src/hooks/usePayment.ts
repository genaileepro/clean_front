import { useMutation, useQuery } from '@tanstack/react-query';
import * as api from '../api/payment';
import { PaymentRequest, PaymentResponse } from '../types/portone';

export const useGetPaymentData = (estimateId: number) => {
  return useQuery<PaymentRequest, Error>({
    queryKey: ['paymentData', estimateId],
    queryFn: () => api.getPaymentData(estimateId),
  });
};

export const useCompletePayment = () => {
  return useMutation<PaymentResponse, Error, string>({
    mutationFn: (impUid: string) => api.completePayment(impUid),
  });
};

export const useCancelPayment = () => {
  return useMutation<
    PaymentResponse,
    Error,
    { merchantUid: string; reason: string }
  >({
    mutationFn: ({ merchantUid, reason }) =>
      api.cancelPayment(merchantUid, reason),
  });
};

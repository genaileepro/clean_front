import { useMutation, useQuery } from '@tanstack/react-query';
import * as api from '../api/payment';
import {
  CompletePaymentRequest,
  CompletePaymentResponse,
  PaymentRequest,
  PaymentResponse,
} from '../types/portone';

export const useGetPaymentData = (estimateId: number, commissionId: number) => {
  return useQuery<PaymentRequest, Error>({
    queryKey: ['paymentData', estimateId, commissionId],
    queryFn: () => api.getPaymentData(estimateId, commissionId),
  });
};

export const useCompletePayment = () => {
  return useMutation<
    CompletePaymentResponse,
    Error,
    { impUid: string; paymentData: CompletePaymentRequest }
  >({
    mutationFn: ({ impUid, paymentData }) =>
      api.completePayment(impUid, paymentData),
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

import api from './axiosConfig';
import { PaymentRequest, PaymentResponse } from '../types/portone';

export const getPaymentData = async (
  estimateId: number,
): Promise<PaymentRequest> => {
  const response = await api.get<PaymentRequest>(
    `/payments/data/${estimateId}`,
  );
  return response.data;
};

export const completePayment = async (
  impUid: string,
): Promise<PaymentResponse> => {
  const response = await api.get<PaymentResponse>(`/payments/${impUid}`);
  return response.data;
};

export const cancelPayment = async (
  merchantUid: string,
  reason: string,
): Promise<PaymentResponse> => {
  const response = await api.post<PaymentResponse>(
    `/payment/cancel/${merchantUid}`,
    { reason },
  );
  return response.data;
};

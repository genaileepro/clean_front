import api from './axiosConfig';
import {
  CompletePaymentRequest,
  CompletePaymentResponse,
  PaymentRequest,
  PaymentResponse,
} from '../types/portone';

export const getPaymentData = async (
  estimateId: number,
  commissionId: number,
): Promise<PaymentRequest> => {
  const response = await api.get<PaymentRequest>(
    `/payments/data?estimateId=${estimateId}&commissionId=${commissionId}`,
  );
  return response.data;
};

export const completePayment = async (
  impUid: string,
  paymentData: CompletePaymentRequest,
): Promise<CompletePaymentResponse> => {
  const response = await api.post<CompletePaymentResponse>(
    `/payments/complete/${impUid}`,
    paymentData,
  );
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

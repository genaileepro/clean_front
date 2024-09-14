import { PaymentRequest, PayMethod, RequestPayParams } from '../types/portone';
import { v4 as uuidv4 } from 'uuid';

export const adaptEstimateToPayment = (
  paymentData: PaymentRequest,
  selectedPayMethod: string,
): RequestPayParams => {
  return {
    pg: 'smartro.iamport01m',
    pay_method: selectedPayMethod as PayMethod,
    merchant_uid: `ORDER_${uuidv4().replace(/-/g, '')}`,
    amount: paymentData.amount,
    buyer_name: paymentData.buyer_name,
    buyer_tel: paymentData.buyer_tel,
    buyer_email: paymentData.buyer_email,
  };
};

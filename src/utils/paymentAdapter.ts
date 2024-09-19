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
    name: `${paymentData.clean_type}`,
    amount: paymentData.estimate_amount,
    buyer_name: paymentData.member_nick,
    buyer_tel: paymentData.member_phone_number,
    buyer_email: paymentData.member_email,
  };
};

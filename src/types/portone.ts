export type PayMethod =
  | 'card'
  | 'trans'
  | 'vbank'
  | 'phone'
  | 'kakaopay'
  | 'naverpay'
  | 'samsungpay'
  | 'ssgpay';

export interface EstimateDetail {
  id: number;
  commissionId: number;
  partnerId: number;
  price: number;
  fixedDate: string;
  statement: string;
  status: string;
  size: number;
  desiredDate: string;
  significant: string;
  commissionStatus: string;
  phoneNumber: string;
  managerName: string;
  companyName: string;
}

export interface EstimateAndCommissionResponseDto {
  estimate_id: number;
  commission_id: number;
  estimate_amount: number;
  member_nick: string;
  member_phone_number: string;
  member_email: string;
}

// 서버와 통신하는 인터페이스 (스네이크 케이스)
export interface PaymentRequest {
  pg: string;
  payMethod: PayMethod;
  merchantUid: string;
  name: string;
  amount: number;
  buyerName: string;
  buyerTel: string;
  buyerEmail: string;
}

// 포트원 관련 인터페이스 (스네이크 케이스)
export interface PortonePaymentRequest {
  pg: string;
  pay_method: PayMethod;
  merchant_uid: string;
  name: string;
  amount: number;
  buyer_name: string;
  buyer_tel: string;
  buyer_email: string;
}

export interface PaymentResponse {
  code: number;
  message: string;
  response: {
    imp_uid: string;
    merchant_uid: string;
    pay_method: string;
    channel: string;
    pg_provider: string;
    emb_pg_provider: string;
    pg_tid: string;
    pg_id: string;
    escrow: boolean;
    apply_num: string;
    bank_code: string;
    bank_name: string;
    card_code: string;
    card_name: string;
    card_quota: number;
    card_number: string;
    card_type: string;
    vbank_code: string;
    vbank_name: string;
    vbank_num: string;
    vbank_holder: string;
    vbank_date: number;
    vbank_issued_at: number;
    name: string;
    amount: number;
    cancel_amount: number;
    currency: string;
    buyer_name: string;
    buyer_email: string;
    buyer_tel: string;
    buyer_addr: string;
    buyer_postcode: string;
    custom_data: string;
    user_agent: string;
    status: string;
    started_at: number;
    paid_at: number;
    failed_at: number;
    cancelled_at: number;
    fail_reason: string;
    cancel_reason: string;
    receipt_url: string;
    cancel_history: Array<{
      pg_tid: string;
      amount: number;
      cancelled_at: number;
      reason: string;
      receipt_url: string;
    }>;
    cancel_receipt_urls: string[];
    cash_receipt_issued: boolean;
    customer_uid: string;
    customer_uid_usage: string;
  };
}

export interface RequestPayParams {
  pg: string;
  pay_method: PayMethod;
  merchant_uid: string;
  name?: string;
  amount: number;
  buyer_name?: string;
  buyer_tel?: string;
  buyer_email?: string;
  buyer_addr?: string;
  buyer_postcode?: string;
  digital?: boolean;
  vbank_due?: string;
  m_redirect_url?: string;
  app_scheme?: string;
  biz_num?: string;
  tax_free?: number;
  custom_data?: any;
}

export interface RequestPayResponse {
  success: boolean;
  error_code?: string;
  error_msg?: string;
  imp_uid?: string | null;
  merchant_uid: string;
  pay_method?: PayMethod;
  paid_amount?: number;
  status?: string;
  name?: string;
  pg_provider?: string;
  emb_pg_provider?: string;
  pg_tid?: string;
  buyer_name?: string;
  buyer_email?: string;
  buyer_tel?: string;
  buyer_addr?: string;
  buyer_postcode?: string;
  custom_data?: any;
  paid_at?: number;
  receipt_url?: string;
}

export type RequestPayResponseCallback = (response: RequestPayResponse) => void;

export interface Iamport {
  init: (accountID: string) => void;
  request_pay: (
    params: RequestPayParams,
    callback?: RequestPayResponseCallback,
  ) => void;
}

declare global {
  interface Window {
    IMP?: Iamport;
  }
}

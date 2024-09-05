export type PayMethod =
  | 'card'
  | 'trans'
  | 'vbank'
  | 'phone'
  | 'kakaopay'
  | 'naverpay'
  | 'samsungpay'
  | 'ssgpay';

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

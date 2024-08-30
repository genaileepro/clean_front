export interface BusinessValidationRequest {
  service_key: string;
  businesses: {
    b_no: string;
    start_dt: string;
    p_nm: string;
    b_nm: string;
    b_sector: string;
    b_type: string;
  }[];
}

export interface NewBusinessStatusResponse {
  status_code: string;
  request_cnt: number;
  valid_cnt: number;
  b_no: string;
  data: {
    b_no: string;
    valid: string;
    valid_msg: string;
    request_param: {
      b_no: string;
      start_dt: string;
      p_nm: string;
      p_nm2: string;
      b_nm: string;
      corp_no: string;
      b_sector: string;
      b_type: string;
      b_adr: string;
    };
  }[];
}

export interface BusinessStatusResponse {
  status_code: string;
  data: {
    b_no: string;
    b_stt: string;
    b_stt_cd: string;
    tax_type: string;
    tax_type_cd: string;
    end_dt: string | null;
    utcc_yn: string;
    invoice_apply_dt: string | null;
  }[];
}

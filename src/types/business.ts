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

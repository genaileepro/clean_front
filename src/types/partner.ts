export interface Partner {
  email: string;
  password: string;
  phoneNumber: string;
  managerName: string;
  companyName: string;
  businessType: string;
  partnerType: string;
  // token 필드는 회원가입 시 필요하지 않으므로 제거
}

export interface PartnerLoginCredentials {
  email: string;
  password: string;
}

export interface PartnerLoginResponse {
  token: string;
  refreshToken: string;
}

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
export interface PartnerLoginResponse {
  id: number; // 로그인된 파트너의 ID
  token: string; // JWT 토큰
  refreshToken: string; // 리프레시 토큰
}

export interface PartnerLoginCredentials {
  email: string;
  password: string;
}

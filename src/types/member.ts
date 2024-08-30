export interface Member {
  email: string;
  nick: string;
  phoneNumber: string;
  password: string;
  isKakaoUser: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  refreshToken: string;
}

export interface Estimate {
  id: number;
  commissionId: Commission;
  partnerId: number;
  price: number;
  statement: string;
  fixedDate: string; // ISO 형식의 날짜 문자열
  approved?: boolean; // 선택적 속성
}

export interface Commission {
  id: number;
  memberNick: string; // 회원 닉네임
  image?: string; // 이미지, 선택적 속성
  size: number; // 크기
  houseType: 'APT' | 'HOUSE' | 'OFFICE'; // 집 종류
  cleanType: 'NORMAL' | 'SPECIAL'; // 청소 종류
  address: string; // 주소
  desiredDate: string; // 희망 날짜, ISO 형식의 날짜 문자열
  significant?: string; // 추가적인 중요 정보, 선택적 속성
}

export interface Member {
  id: number;
  email: string;
  password: string;
  nick: string;
  phoneNumber: string;
  address: Address[];
  selectedAccount: Account;
  businessInfo?: BusinessInfo[];
}

export interface Address {
  id: number;
  members: string;
  address: string;
}

export interface Account {
  id: number;
  email: string;
  accountNumber: string;
  bank: string;
}

export interface BusinessInfo {
  id: number;
  businessNumber: number;
  openingDate: string; // ISO 형식의 날짜 문자열
  corporationName: string;
  corporationNumber: number;
  location: string;
  partner: Partner;
  members: string;
}

export interface Partner {
  id: number;
  email: string;
  password: string;
  phoneNumber: string;
  managerName: string;
  companyName: string;
  businessType: string;
  partnerType: 'INDIVIDUAL' | 'CORPORATION' | 'PUBLIC_INSTITUTION'; // 가능한 값들
}

export interface Estimate {
  id: number;
  commissionId: number;
  partnerId: number;
  tmpPrice: number;
  statement: string;
  fixedDate: string; // ISO 형식의 날짜 문자열
  nick: string;
  address: string;
  image: string; // 이미지 필드 추가
  houseType: 'APT' | 'HOUSE' | 'OFFICE';
  cleanType: 'NORMAL' | 'SPECIAL';
  desiredDate: string; // ISO 형식의 날짜 문자열
  price?: number;
  status?: 'CHECK' | 'SEND' | 'FINISH' | 'CONTACT'; // status 필드에 'CONTACT' 추가
  commissionStatus?: 'CHECK' | 'SEND' | 'FINISH' | 'CONTACT'; // commissionStatus 필드에 'CONTACT' 추가
}

export interface Commission {
  id: number;
  memberNick: string;
  image?: string; // 이미지 필드 추가
  size: number;
  houseType: 'APT' | 'HOUSE' | 'OFFICE';
  cleanType: 'NORMAL' | 'SPECIAL';
  status: 'CHECK' | 'SEND' | 'FINISH' | 'CONTACT'; // status 필드 추가
  address: string;
  desiredDate: string; // ISO 형식의 날짜 문자열
  significant?: string;
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
  partnerType: 'INDIVIDUAL' | 'CORPORATION' | 'PUBLIC_INSTITUTION';
}

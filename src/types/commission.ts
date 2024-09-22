export const Status = {
  CHECK: 'CHECK',
  SEND: 'SEND',
  CONTACT: 'CONTACT',
  FINISH: 'FINISH',
} as const;

export type Status = (typeof Status)[keyof typeof Status];

export const StatusKorean = {
  [Status.CHECK]: '대기',
  [Status.SEND]: '발송 됨',
  [Status.CONTACT]: '매칭 중',
  [Status.FINISH]: '완료',
};

export const HouseType = {
  APT: 'APT',
  ONEROOM: 'ONEROOM',
  HOUSE: 'HOUSE',
  TOILET: 'TOILET',
} as const;

export type HouseType = (typeof HouseType)[keyof typeof HouseType];

export const HouseTypeKorean = {
  [HouseType.APT]: '아파트',
  [HouseType.ONEROOM]: '원룸',
  [HouseType.HOUSE]: '주택',
  [HouseType.TOILET]: '화장실',
};

export const CleanType = {
  NORMAL: 'NORMAL',
  SPECIAL: 'SPECIAL',
} as const;

export type CleanType = (typeof CleanType)[keyof typeof CleanType];

export const CleanTypeKorean = {
  [CleanType.NORMAL]: '일반 청소',
  [CleanType.SPECIAL]: '특수 청소',
};

export interface Commission {
  commissionId: number;
  memberNick: string;
  addressId: number;
  image?: string;
  size: number;
  houseType: HouseType;
  cleanType: CleanType;
  desiredDate: string;
  significant?: string;
}

export interface CommissionFormData {
  size: number | null;
  houseType: HouseType | '';
  cleanType: CleanType | '';
  addressId: number | null;
  image: string;
  desiredDate: string;
  significant: string;
}

export interface AddressData {
  id: number;
  addressCode: string;
  address: string;
  addressDetail: string;
}

export interface Estimate {
  id: number;
  price: number;
  fixedDate: string;
  statement: string;
  approved: boolean;
  status: Status;
  partnerId: number;
  partnerName: string;
}

export interface CommissionConfirmedResponse {
  content: {
    commissionId: number; // 프론트엔드에서 사용하는 필드
    addressId: number;
    size: number;
    houseType: HouseType;
    cleanType: CleanType;
    desiredDate: string;
    significant?: string;
    image?: string;
    status: Status;
    estimates?: Estimate[];
  }[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}

export interface CommissionSendDetail extends Commission {
  estimates: Estimate[];
}

export interface EstimateDetail {
  id: number;
  commissionId: number;
  partnerId: number;
  price: number;
  fixedDate: string;
  statement: string;
  status: Status;
  cleanType: CleanType;
  size: number;
  desiredDate: string;
  significant: string;
  commissionStatus: Status;
  phoneNumber: string;
  managerName: string;
  companyName: string;
}

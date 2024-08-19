export enum HouseType {
  APT = 'APT',
  ONEROOM = 'ONEROOM',
  HOUSE = 'HOUSE',
  TOILET = 'TOILET',
}

export enum CleanType {
  NORMAL = 'NORMAL',
  SPECIAL = 'SPECIAL',
}

export enum Status {
  CHECK = 'CHECK',
  SEND = 'SEND',
  CONTECT = 'CONTECT',
  FINISH = 'FINISH',
}

export interface Commission {
  commissionId: number;
  memberNick: string;
  image?: string;
  size: number;
  houseType: HouseType;
  cleanType: CleanType;
  address: string;
  desiredDate: string;
  significant?: string;
  status: Status;
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
  partnerId: number;
  partnerName: string;
}

export interface CommissionConfirmedResponse {
  content: {
    id: number;
    size: number;
    houseType: HouseType;
    cleanType: CleanType;
    desiredDate: string;
    significant: string;
    image: string;
    estimates: Estimate[];
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

export interface CommissionConfirmDetailResponse {
  commissionId: number;
  size: number;
  houseType: HouseType;
  cleanType: CleanType;
  addressId: number;
  desiredDate: string;
  significant: string;
  image: string;
  status: Status;
  estimatedStatus: Status;
  tmpPrice: number;
  statement: string;
  fixedDate: string;
  price: number;
}

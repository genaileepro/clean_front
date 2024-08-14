export enum HouseType {
  APT = 'APT',
  OneRoom = 'ONEROOM',
  House = 'HOUSE',
  Toilet = 'TOILET',
}

export enum CleanType {
  Normal = 'NORMAL',
  Special = 'SPECIAL',
}

export interface AddressData {
  id: number;
  addressCode: string;
  address: string;
  addressDetail: string;
}

export interface Commission {
  commissionId: number;
  memberNick: string;
  size: number | null;
  houseType: HouseType | '';
  cleanType: CleanType | '';
  addressId?: number;
  image?: string;
  desiredDate: string;
  significant: string;
}

export interface CommissionFormData
  extends Omit<
    Commission,
    'commissionId' | 'memberNick' | 'addressId' | 'address'
  > {
  addressId: number | null;
}

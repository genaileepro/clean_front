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

export interface Address {
  id: number;
  address: string;
}

export interface Commission {
  commissionId: number;
  memberNick: string;
  size: number | null;
  houseType: HouseType | '';
  cleanType: CleanType | '';
  addressId?: number; // Made optional
  address?: Address; // Added Address object
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
  address?: Address;
}

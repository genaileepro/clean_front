export enum HouseType {
  APT = 'APT',
  OneRoom = 'OneRoom',
  House = 'House',
  Toilet = 'Toilet',
}

export enum CleanType {
  Normal = 'Normal',
  Special = 'Special',
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

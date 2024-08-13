import api from './axiosConfig';
import { Address } from '../types/commission';

export const fetchAddresses = async (): Promise<Address[]> => {
  const response = await api.get('/address/signup');
  return response.data;
};

export const addAddress = async (address: string): Promise<Address> => {
  const response = await api.post('/address/signup', { address });
  return response.data;
};

export const deleteAddress = async (id: number): Promise<void> => {
  await api.delete(`/addresses/${id}`);
};
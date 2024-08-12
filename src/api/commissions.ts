import api from './axiosConfig';
import { Commission } from '../types/commission';

export const createCommission = async (
  commission: Omit<Commission, 'commissionId' | 'memberNick'>,
): Promise<Commission> => {
  const response = await api.post<Commission>('/commission', commission);
  return response.data;
};

export const fetchCommissions = async (): Promise<Commission[]> => {
  const response = await api.get<Commission[]>('/commission');
  return response.data;
};

export const fetchSingleCommission = async (
  id: number,
): Promise<Commission> => {
  const response = await api.get<Commission>(`/commission?commissionId=${id}`);
  return response.data;
};

export const deleteCommission = async (id: number): Promise<void> => {
  await api.delete<Commission>(`commission?commissionId=${id}`);
};

export const fetchCommission = async (id: number): Promise<Commission> => {
  const response = await api.get<Commission>(`/commission?commissionId=${id}`);
  return response.data;
};

export const updateCommission = async (
  id: number,
  commission: Partial<Commission>,
): Promise<Commission> => {
  const response = await api.put<Commission>(
    `/commission?commissionId=${id}`,
    commission,
  );
  return response.data;
};

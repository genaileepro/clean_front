import api from './axiosConfig';
import {
  Commission,
  CommissionConfirmedResponse,
  CommissionConfirmDetailResponse,
} from '../types/commission';

export const fetchCommissions = async (): Promise<Commission[]> => {
  const response = await api.get<Commission[]>('/commission');
  return response.data;
};

export const fetchCommissionConfirm = async (
  commissionId: number,
): Promise<CommissionConfirmedResponse> => {
  const response = await api.get<CommissionConfirmedResponse>(
    `/commission/confirmed?id=${commissionId}`,
  );
  return response.data;
};

export const fetchCommissionConfirmDetail = async (
  commissionId: number,
): Promise<CommissionConfirmDetailResponse> => {
  const response = await api.get<CommissionConfirmDetailResponse>(
    `/commission/confirmdetail?id=${commissionId}`,
  );
  return response.data;
};

export const createCommission = async (
  commission: Omit<Commission, 'commissionId' | 'memberNick'>,
): Promise<Commission> => {
  const response = await api.post<Commission>('/commission', commission);
  return response.data;
};

export const updateCommission = async ({
  commissionId,
  commission,
}: {
  commissionId: number;
  commission: Partial<Commission>;
}): Promise<Commission> => {
  const response = await api.patch<Commission>(
    `/commission?id=${commissionId}`,
    commission,
  );
  return response.data;
};

export const deleteCommission = async (commissionId: number): Promise<void> => {
  await api.delete(`/commission?id=${commissionId}`);
};

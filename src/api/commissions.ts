import api from './axiosConfig';
import {
  Commission,
  CommissionSendDetail,
  Estimate,
} from '../types/commission';

export const fetchCommissions = async (): Promise<Commission[]> => {
  const response = await api.get<Commission[]>('/commission');
  return response.data;
};

export const fetchCommissionConfirmed = async (
  commissionId: number,
): Promise<CommissionSendDetail> => {
  const response = await api.get<CommissionSendDetail>(
    `/commission/confirmed?commissionId=${commissionId}`,
  );
  return response.data;
};

export const fetchCommissionSendDetail = async (
  commissionId: number,
): Promise<CommissionSendDetail> => {
  const response = await api.get<CommissionSendDetail>(
    `/commission/confirmed?commissionId=${commissionId}`,
  );
  return response.data;
};

export const createCommission = async (
  commission: Omit<Commission, 'commissionId' | 'memberNick'>,
): Promise<Commission> => {
  const response = await api.post<Commission>('/commission', commission);
  return response.data;
};

export const updateCommission = async (
  commissionId: number,
  addressId?: number,
  commission?: Partial<Commission>,
): Promise<Commission> => {
  const url = addressId
    ? `/commission/confirmed?commissionId=${commissionId}&addressId=${addressId}`
    : `/commission/confirmed?commissionId=${commissionId}`;

  const response = await api.patch<Commission>(url, commission);
  return response.data;
};

export const deleteCommission = async (id: number): Promise<void> => {
  await api.delete(`/commission?commissionId=${id}`);
};

export const updateCommissionStatus = async (
  commission: Partial<Commission>,
): Promise<Commission> => {
  const response = await api.patch<Commission>(
    `/commission?commissionId=${commission.commissionId}&addressId=${commission.addressId}`,
    commission,
  );
  return response.data;
};

export const uploadCommissionImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await api.post<{ fileName: string; message: string }>(
    '/commission/upload',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );

  return response.data.fileName;
};

export const getCommissionImage = async (filename: string): Promise<string> => {
  const response = await api.get(`/commission/upload?file=${filename}`, {
    responseType: 'blob',
  });
  return URL.createObjectURL(response.data);
};

export const fetchEstimateDetail = async (
  estimateId: number,
): Promise<Estimate> => {
  const response = await api.get<Estimate>(`/estimate/detail?id=${estimateId}`);
  return response.data;
};

export const approveEstimate = async (estimateId: number): Promise<void> => {
  await api.post(`/api/estimate/approve?id=${estimateId}`);
};

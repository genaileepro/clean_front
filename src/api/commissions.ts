import api from './axiosConfig';
import partnerApiInstance from './partnerAxiosConfig';
import {
  Commission,
  CommissionSendDetail,
  EstimateDetail,
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
  commission: Omit<Commission, 'commissionId' | 'memberNick'> & {
    addressId: number;
  },
): Promise<Commission> => {
  const response = await api.post<Commission>('/commission', commission);
  return response.data;
};

export const updateCommission = async (
  commissionId: number,
  addressId: number,
  commission: Partial<Commission>,
): Promise<Commission> => {
  const url = `/commission?commissionId=${commissionId}&addressId=${addressId}`;

  try {
    const response = await api.patch<Commission>(url, commission);
    return response.data;
  } catch (error) {
    console.error('Error updating commission:', error);
    throw new Error('Failed to update commission');
  }
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
  try {
    const response = await api.get(`/commission/upload?file=${filename}`, {
      responseType: 'blob',
    });
    return URL.createObjectURL(response.data);
  } catch (error) {
    console.error('Error fetching commission image:', error);
    throw error;
  }
};

export const getPartnerCommissionImage = async (
  filename: string,
): Promise<string> => {
  const token = localStorage.getItem('token');
  try {
    const response = await partnerApiInstance.get(
      `/partner/upload?file=${filename}`,
      {
        responseType: 'blob',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return URL.createObjectURL(response.data);
  } catch (error) {
    console.error('Error fetching partner commission image:', error);
    throw error;
  }
};

export const fetchEstimateDetail = async (
  estimateId: number,
): Promise<EstimateDetail> => {
  const response = await api.get<EstimateDetail>(
    `/estimate/detail?id=${estimateId}`,
  );
  return response.data;
};

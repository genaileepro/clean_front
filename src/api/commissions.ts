import api from './axiosConfig';
import {
  Commission,
  CommissionConfirmDetailResponse,
} from '../types/commission';

export const fetchCommissions = async (): Promise<Commission[]> => {
  const response = await api.get<Commission[]>('/commission');
  return response.data;
};

export const fetchCommissionConfirm = async (
  commissionId: number,
): Promise<Commission> => {
  const response = await api.get<Commission[]>(
    `/commission/confirmed?id=${commissionId}`,
  );
  if (response.data.length === 0) {
    throw new Error('Commission not found');
  }
  return response.data[0]; // 배열의 첫 번째 요소만 반환
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

export const deleteCommission = async (id: number): Promise<void> => {
  await api.delete(`/commission?commissionId=${id}`);
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
  const response = await api.get(`/api/commission?images=${filename}`, {
    responseType: 'blob',
  });
  return URL.createObjectURL(response.data);
};

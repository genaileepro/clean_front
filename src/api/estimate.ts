import partnerApiInstance from './partnerAxiosConfig';
import { Estimate, Commission } from '../types/estimate';

// 새로운 견적 생성
export const createEstimate = async (
  estimate: Partial<Estimate>,
): Promise<Estimate> => {
  const token = localStorage.getItem('token');
  try {
    const response = await partnerApiInstance.post<Estimate>(
      '/partner/estimate',
      estimate,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error creating estimate:', error);
    throw error;
  }
};

// 확정된 견적 목록 조회
export const getConfirmList = async (): Promise<Estimate[]> => {
  const token = localStorage.getItem('token');
  try {
    const response = await partnerApiInstance.get<Estimate[]>(
      '/partner/estimate/confirmlist',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching confirm list:', error);
    throw error;
  }
};

// 견적 상태 및 commissionStatus 업데이트
export const updateEstimateStatus = async (
  id: number,
  status: 'SEND' | 'CHECK' | 'FINISH' | 'CONTACT',
  commissionStatus?: 'SEND' | 'CHECK' | 'FINISH' | 'CONTACT',
): Promise<Estimate> => {
  const token = localStorage.getItem('token');
  try {
    const response = await partnerApiInstance.patch<Estimate>(
      `/partner/estimate?id=${id}`,
      { status, commissionStatus },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error updating estimate status:', error);
    throw error;
  }
};

// 견적 삭제
export const deleteEstimate = async (
  id: number,
): Promise<{ message: string }> => {
  const token = localStorage.getItem('token');
  try {
    const response = await partnerApiInstance.delete<{ message: string }>(
      `/partner/estimate?id=${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error: any) {
    console.error('Error deleting estimate:', error.response || error);
    throw error;
  }
};

// 파트너 견적 목록 조회
export const getEstimateList = async (): Promise<Estimate[]> => {
  const token = localStorage.getItem('token');
  try {
    const response = await partnerApiInstance.get<Estimate[]>(
      '/partner/estimate/list',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching estimates list:', error);
    throw error;
  }
};

// 파트너 Commission 목록 조회
export const getCommissionList = async (): Promise<Commission[]> => {
  const token = localStorage.getItem('token');
  try {
    const response = await partnerApiInstance.get<Commission[]>(
      '/partner/commissionlist',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching commission list:', error);
    throw error;
  }
};

// 견적 업데이트
export const updateEstimate = async (
  id: number,
  updateData: Partial<Estimate>,
): Promise<Estimate> => {
  const token = localStorage.getItem('token');
  try {
    const response = await partnerApiInstance.patch<Estimate>(
      `/partner/estimate?id=${id}`,
      updateData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error updating estimate:', error);
    throw error;
  }
};

// 견적 상세 조회
export const fetchEstimateDetail = async (
  estimateId: number,
): Promise<Estimate> => {
  const token = localStorage.getItem('token');
  try {
    const response = await partnerApiInstance.get<Estimate>(
      `/partner/estimate/detail?id=${estimateId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching estimate detail:', error);
    throw error;
  }
};

// 견적 승인
export const approveEstimate = async (estimateId: number): Promise<void> => {
  const token = localStorage.getItem('token');
  try {
    await partnerApiInstance.post(
      `/partner/estimate/approve?id=${estimateId}`,
      null,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  } catch (error) {
    console.error('Error approving estimate:', error);
    throw error;
  }
};

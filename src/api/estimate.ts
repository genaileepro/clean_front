import { Estimate, Commission } from '../types/estimate'; // Commission 타입도 가져옵니다.
import partnerApiInstance from './partnerAxiosConfig';

// 새로운 견적 생성
export const createEstimate = async (
  estimate: Partial<Estimate>,
): Promise<Estimate> => {
  const response = await partnerApiInstance.post<Estimate>(
    '/partner/estimate',
    estimate,
  );
  return response.data;
};

// 기존 견적 업데이트
export const updateEstimate = async (
  id: number,
  estimate: Partial<Estimate>,
): Promise<Estimate> => {
  const response = await partnerApiInstance.put<Estimate>(
    `/partner/estimate?id=${id}`,
    estimate,
  );
  return response.data;
};

// 견적 삭제
export const deleteEstimate = async (
  id: number,
): Promise<{ message: string }> => {
  const response = await partnerApiInstance.delete<{ message: string }>(
    `/partner/estimate?id=${id}`,
  );
  return response.data;
};

// 파트너 견적 목록 조회
export const getEstimateList = async (): Promise<Estimate[]> => {
  const response = await partnerApiInstance.get<Estimate[]>(
    '/partner/estimate/list',
  );
  return response.data;
};

// 파트너 Commission 목록 조회
export const getCommissionList = async (): Promise<Commission[]> => {
  const response = await partnerApiInstance.get<Commission[]>(
    '/partner/commissionlist',
  );
  return response.data;
};

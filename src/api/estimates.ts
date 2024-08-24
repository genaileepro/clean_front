import api from './axiosConfig';
import { Estimate } from '../types/commission';

export const fetchEstimateDetail = async (
  estimateId: number,
): Promise<Estimate> => {
  const response = await api.get<Estimate[]>(`/estimate?id=${estimateId}`);
  return response.data[0];
};

export const approveEstimate = async (
  estimate: Estimate,
): Promise<Estimate> => {
  const response = await api.post<Estimate>('/estimate', estimate);
  return response.data;
};

export const fetchEstimates = async (
  commissionId: number,
): Promise<Estimate[]> => {
  const response = await api.get<Estimate[]>(
    `/estimate?commissionId=${commissionId}`,
  );
  return response.data;
};

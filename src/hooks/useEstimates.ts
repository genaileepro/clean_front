import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as api from '../api/estimates';
import { Estimate } from '../types/commission';
import { showErrorNotification } from '../utils/errorHandler';

export const useEstimateDetail = (estimateId: number) => {
  return useQuery<Estimate, Error>({
    queryKey: ['estimateDetail', estimateId],
    queryFn: () => api.fetchEstimateDetail(estimateId),
    enabled: !!estimateId,
  });
};

export const useApproveEstimate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.approveEstimate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['estimates'] });
      queryClient.invalidateQueries({ queryKey: ['commissionSendDetail'] });
    },
    onError: (error: Error) => {
      showErrorNotification(error.message);
    },
  });
};

export const useEstimates = (commissionId: number) => {
  return useQuery<Estimate[], Error>({
    queryKey: ['estimates', commissionId],
    queryFn: () => api.fetchEstimates(commissionId),
    enabled: !!commissionId,
  });
};

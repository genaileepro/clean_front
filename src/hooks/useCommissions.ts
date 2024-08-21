import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as api from '../api/commissions';
import {
  Commission,
  CommissionConfirmDetailResponse,
} from '../types/commission';
import { showErrorNotification } from '../utils/errorHandler';

export const useCommissions = () => {
  return useQuery<Commission[], Error>({
    queryKey: ['commissions'],
    queryFn: api.fetchCommissions,
  });
};

export const useCommissionConfirm = (commissionId: number) => {
  return useQuery<Commission, Error>({
    queryKey: ['commissionConfirm', commissionId],
    queryFn: () => api.fetchCommissionConfirm(commissionId),
    enabled: !!commissionId,
  });
};

export const useCommissionConfirmDetail = (commissionId: number) => {
  return useQuery<CommissionConfirmDetailResponse, Error>({
    queryKey: ['commissionConfirmDetail', commissionId],
    queryFn: () => api.fetchCommissionConfirmDetail(commissionId),
    enabled: !!commissionId,
  });
};

export const useCreateCommission = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.createCommission,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['commissions'] });
    },
    onError: (error: Error) => {
      showErrorNotification(error.message);
    },
  });
};

export const useUpdateCommission = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.updateCommission,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['commissions'] });
      queryClient.invalidateQueries({
        queryKey: ['commissionConfirm', data.commissionId],
      });
    },
    onError: (error: Error) => {
      showErrorNotification(error.message);
    },
  });
};

export const useDeleteCommission = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.deleteCommission,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['commissions'] });
    },
    onError: (error: Error) => {
      showErrorNotification(error.message);
    },
  });
};

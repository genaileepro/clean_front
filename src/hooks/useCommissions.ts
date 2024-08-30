import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as api from '../api/commissions';
import {
  Commission,
  CommissionSendDetail,
  EstimateDetail,
} from '../types/commission';
import { showErrorNotification } from '../utils/errorHandler';

export const useCommissions = () => {
  return useQuery<Commission[], Error>({
    queryKey: ['commissions'],
    queryFn: api.fetchCommissions,
  });
};

export const useCommissionConfirmed = (commissionId: number) => {
  return useQuery<CommissionSendDetail, Error>({
    queryKey: ['commissionConfirmed', commissionId],
    queryFn: () => api.fetchCommissionConfirmed(commissionId),
    enabled: !!commissionId,
  });
};

export const useCommissionSendDetail = (commissionId: number) => {
  return useQuery<CommissionSendDetail, Error>({
    queryKey: ['commissionSendDetail', commissionId],
    queryFn: () => api.fetchCommissionSendDetail(commissionId),
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
    mutationFn: ({
      commissionId,
      addressId,
      commission,
    }: {
      commissionId: number;
      addressId: number;
      commission: Partial<Commission>;
    }) => api.updateCommission(commissionId, addressId, commission),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['commissions'] });
      queryClient.invalidateQueries({
        queryKey: ['commissionConfirmed', data.commissionId],
      });
    },
    onError: (error: unknown) => {
      const errorMessage =
        error instanceof Error ? error.message : 'An unknown error occurred';
      showErrorNotification(`의뢰 수정에 실패했습니다: ${errorMessage}`);
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

export const useUpdateCommissionStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (commission: Commission) =>
      api.updateCommissionStatus(commission),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['commissions'] });
      queryClient.invalidateQueries({ queryKey: ['commissionConfirmed'] });
    },
    onError: (error: Error) => {
      showErrorNotification(error.message);
    },
  });
};

export const useUploadCommissionImage = () => {
  return useMutation({
    mutationFn: api.uploadCommissionImage,
    onError: (error: Error) => {
      showErrorNotification(error.message);
    },
  });
};

export const useCommissionImage = (filename: string) => {
  return useQuery({
    queryKey: ['commissionImage', filename],
    queryFn: () => api.getCommissionImage(filename),
    enabled: !!filename,
  });
};

export const usePartnerCommissionImage = (filename: string) => {
  return useQuery({
    queryKey: ['partnerCommissionImage', filename],
    queryFn: () => api.getPartnerCommissionImage(filename),
    enabled: !!filename,
  });
};

export const useEstimateDetail = (estimateId: number) => {
  return useQuery<EstimateDetail, Error>({
    queryKey: ['estimateDetail', estimateId],
    queryFn: () => api.fetchEstimateDetail(estimateId),
    enabled: !!estimateId,
  });
};

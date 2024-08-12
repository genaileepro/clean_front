import {
  useMutation,
  useQuery,
  useQueryClient,
  UseMutationResult,
  UseQueryResult,
} from '@tanstack/react-query';
import * as api from '../api/commissions';
import { Commission } from '../types/commission';
import { showErrorNotification } from '../utils/errorHandler';

export const useCommissions = (): UseQueryResult<Commission[], Error> => {
  return useQuery({
    queryKey: ['commissions'],
    queryFn: api.fetchCommissions,
  });
};

export const useCreateCommission = (): UseMutationResult<
  Commission,
  Error,
  Omit<Commission, 'commissionId' | 'memberNick'>,
  unknown
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.createCommission,
    onSuccess: (newCommission) => {
      queryClient.invalidateQueries({ queryKey: ['commissions'] });
      queryClient.setQueryData(
        ['commission', newCommission.commissionId],
        newCommission,
      );
    },
  });
};

export const useDeleteCommission = (): UseMutationResult<
  void,
  Error,
  number,
  unknown
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.deleteCommission,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['commissions'] });
    },
    onError: (error) => {
      console.error('Delete commission error:', error);
      showErrorNotification('Commission deletion failed. Please try again.');
    },
  });
};

export const useCommission = (
  id: number,
): UseQueryResult<Commission, Error> => {
  return useQuery({
    queryKey: ['commission', id],
    queryFn: () => api.fetchCommission(id),
  });
};

export const useUpdateCommission = (): UseMutationResult<
  Commission,
  Error,
  { id: number; commission: Partial<Commission> },
  unknown
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, commission }) => api.updateCommission(id, commission),
    onSuccess: (updatedCommission) => {
      queryClient.setQueryData(
        ['commission', updatedCommission.commissionId],
        updatedCommission,
      );
      queryClient.invalidateQueries({ queryKey: ['commissions'] });
    },
    onError: (error) => {
      console.error('Update commission error:', error);
      showErrorNotification('Commission update failed. Please try again.');
    },
  });
};

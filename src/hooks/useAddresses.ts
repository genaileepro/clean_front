import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as addressAPI from '../api/address';

export const useAddresses = () => {
  const queryClient = useQueryClient();

  const addressesQuery = useQuery({
    queryKey: ['addresses'],
    queryFn: addressAPI.fetchAddresses,
  });

  const addAddressMutation = useMutation({
    mutationFn: addressAPI.addAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
    },
  });

  const deleteAddressMutation = useMutation({
    mutationFn: addressAPI.deleteAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
    },
  });

  return {
    addresses: addressesQuery.data || [],
    isLoading: addressesQuery.isLoading,
    addAddress: addAddressMutation.mutateAsync,
    deleteAddress: deleteAddressMutation.mutate,
  };
};

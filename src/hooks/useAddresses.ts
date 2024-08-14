import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../api/axiosConfig';
import { AddressData } from '../types/commission';

export const useAddresses = () => {
  const queryClient = useQueryClient();

  const fetchAddresses = async (): Promise<AddressData[]> => {
    const response = await api.get('/address/signup');
    return response.data;
  };

  const addAddress = async (addressData: AddressData): Promise<AddressData> => {
    const response = await api.post('/address/signup', addressData);
    return response.data;
  };

  const deleteAddress = async (id: number): Promise<void> => {
    await api.delete(`/addresses/${id}`);
  };

  const addressesQuery = useQuery({
    queryKey: ['addresses'],
    queryFn: fetchAddresses,
  });

  const addAddressMutation = useMutation({
    mutationFn: addAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
    },
  });

  const deleteAddressMutation = useMutation({
    mutationFn: deleteAddress,
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

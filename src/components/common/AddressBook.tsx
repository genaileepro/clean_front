import React from 'react';
import { useAddresses } from '../../hooks/useAddresses';

interface AddressBookProps {
  onSelectAddress: (addressId: number, address: string) => void;
}

const AddressBook: React.FC<AddressBookProps> = ({ onSelectAddress }) => {
  const { addresses, isLoading, deleteAddress } = useAddresses();

  if (isLoading) return <div>주소록 로딩 중...</div>;

  return (
    <div>
      <h2>주소록</h2>
      {addresses.length === 0 ? (
        <p>저장된 주소가 없습니다.</p>
      ) : (
        addresses.map((address) => (
          <div
            key={address.id}
            className="flex justify-between items-center mb-2"
          >
            <span>{address.address + address.addressDetail}</span>
            <div>
              <button
                onClick={() => onSelectAddress(address.id, address.address)}
                className="bg-brand text-white py-1 px-2 rounded text-sm mr-2"
              >
                선택
              </button>
              <button
                onClick={() => deleteAddress(address.id)}
                className="bg-red-500 text-white py-1 px-2 rounded text-sm"
              >
                삭제
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AddressBook;

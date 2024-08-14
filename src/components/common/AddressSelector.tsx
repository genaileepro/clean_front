import React, { useState } from 'react';
import AddressSearch from './AddressSearch';
import { useAddresses } from '../../hooks/useAddresses';
import { AddressData } from '../../types/commission';
import toast from 'react-hot-toast';

interface AddressSelectorProps {
  onSelectAddress: (addressData: AddressData) => void;
}

const AddressSelector: React.FC<AddressSelectorProps> = ({
  onSelectAddress,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'saved' | 'search'>('saved');
  const { addresses, isLoading, addAddress } = useAddresses();

  const handleAddressSearch = async (data: AddressData) => {
    try {
      const newAddress = await addAddress(data);
      onSelectAddress(newAddress);
      setIsOpen(false);
    } catch (error) {
      console.error('주소 등록 실패:', error);
      toast.error('주소 등록에 실패했습니다.');
    }
  };

  const handleAddressSelect = (address: AddressData) => {
    onSelectAddress(address);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-brand text-white py-2 px-4 rounded"
      >
        주소 선택
      </button>
      {isOpen && (
        <div className="absolute z-10 mt-1 w-[400px] right-0 bg-white border border-gray-300 rounded shadow-lg">
          <div className="flex border-b">
            <button
              type="button"
              className={`flex-1 py-2 ${activeTab === 'saved' ? '' : 'bg-gray-200'}`}
              onClick={() => setActiveTab('saved')}
            >
              주소록
            </button>
            <button
              type="button"
              className={`flex-1 py-2 ${activeTab === 'search' ? '' : 'bg-gray-200'}`}
              onClick={() => setActiveTab('search')}
            >
              새 주소 등록
            </button>
          </div>
          <div className="p-2">
            {activeTab === 'saved' ? (
              <div>
                {isLoading ? (
                  <p>주소록 로딩 중...</p>
                ) : addresses.length === 0 ? (
                  <p>저장된 주소가 없습니다.</p>
                ) : (
                  addresses.map((address) => (
                    <div
                      key={address.id}
                      className="flex justify-between items-center mb-2"
                    >
                      <span>{`${address.address} ${address.addressDetail}`}</span>
                      <button
                        type="button"
                        onClick={() => handleAddressSelect(address)}
                        className="bg-brand text-white py-1 px-2 rounded text-sm"
                      >
                        선택
                      </button>
                    </div>
                  ))
                )}
              </div>
            ) : (
              <AddressSearch onComplete={handleAddressSearch} />
            )}
          </div>
          <div className="border-t p-2">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="w-full bg-red-400 text-white py-1 px-2 rounded"
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddressSelector;

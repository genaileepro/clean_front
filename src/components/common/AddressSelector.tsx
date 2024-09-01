import React, { useState } from 'react';
import AddressSearch from './AddressSearch';
import { useAddresses } from '../../hooks/useAddresses';
import { AddressData } from '../../types/commission';
import toast from 'react-hot-toast';
import { MapPin, X } from 'lucide-react';

interface AddressSelectorProps {
  onSelectAddress: (addressData: AddressData) => void;
  customButtonStyle?: string;
}

const AddressSelector: React.FC<AddressSelectorProps> = ({
  onSelectAddress,
  customButtonStyle,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'saved' | 'search'>('saved');
  const { addresses, isLoading, addAddress } = useAddresses();

  const handleAddressSearch = async (data: AddressData) => {
    try {
      const newAddress = await addAddress(data);
      onSelectAddress(newAddress);
      setIsOpen(false);
      toast.success('새 주소가 등록되었습니다.');
    } catch (error) {
      console.error('주소 등록 실패:', error);
      toast.error('주소 등록에 실패했습니다.');
    }
  };

  const handleAddressSelect = (address: AddressData) => {
    onSelectAddress(address);
    setIsOpen(false);
  };

  const defaultButtonStyle =
    'bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50';

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={customButtonStyle || defaultButtonStyle}
      >
        <MapPin className="inline-block mr-2" size={18} />
        주소 선택
      </button>
      {isOpen && (
        <div className="absolute z-10 mt-1 w-[400px] right-0 bg-white border border-gray-300 rounded-lg shadow-lg">
          <div className="flex border-b">
            <button
              type="button"
              className={`flex-1 py-3 px-4 text-sm font-medium rounded-tl-lg ${
                activeTab === 'saved'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setActiveTab('saved')}
            >
              주소록
            </button>
            <button
              type="button"
              className={`flex-1 py-3 px-4 text-sm font-medium rounded-tr-lg ${
                activeTab === 'search'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setActiveTab('search')}
            >
              새 주소 등록
            </button>
          </div>
          <div className="p-4">
            {activeTab === 'saved' ? (
              <div className="space-y-2">
                {isLoading ? (
                  <p className="text-center text-gray-500">주소록 로딩 중...</p>
                ) : addresses.length === 0 ? (
                  <p className="text-center text-gray-500">
                    저장된 주소가 없습니다.
                  </p>
                ) : (
                  addresses.map((address) => (
                    <div
                      key={address.id}
                      className="flex justify-between items-center p-2 bg-gray-50 rounded-md hover:bg-gray-100"
                    >
                      <span className="text-sm">{`${address.address} ${address.addressDetail}`}</span>
                      <button
                        type="button"
                        onClick={() => handleAddressSelect(address)}
                        className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded-md text-sm transition-colors duration-300"
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
          <div className="border-t p-3">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded-md transition-colors duration-300 flex items-center justify-center"
            >
              <X size={18} className="mr-2" />
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddressSelector;

import React, { useRef, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { AddressData } from '../../types/commission';

interface AddressSearchProps {
  onComplete: (data: AddressData) => void;
}

declare global {
  interface Window {
    daum: any;
  }
}

const AddressSearch: React.FC<AddressSearchProps> = ({ onComplete }) => {
  const scriptRef = useRef<HTMLScriptElement | null>(null);
  const [addressDetail, setAddressDeatil] = useState('');
  const [selectedAddress, setSelectedAddress] =
    useState<Partial<AddressData> | null>(null);

  useEffect(() => {
    if (!scriptRef.current) {
      const script = document.createElement('script');
      script.src =
        '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
      script.async = true;
      document.body.appendChild(script);
      scriptRef.current = script;
    }
  }, []);

  const handleClick = () => {
    new window.daum.Postcode({
      oncomplete: function (data: any) {
        const addr =
          data.userSelectedType === 'R' ? data.roadAddress : data.jibunAddress;

        setSelectedAddress({
          addressCode: data.zonecode,
          address: addr,
        });
      },
    }).open();
  };

  const handleSubmit = () => {
    if (selectedAddress && addressDetail) {
      onComplete({
        id: 0,
        addressCode: selectedAddress.addressCode!,
        address: selectedAddress.address!,
        addressDetail: addressDetail,
      });
      toast.success('주소가 등록되었습니다.');
    } else {
      toast.error('모든 주소 정보를 입력해주세요.');
    }
  };

  return (
    <div>
      <button
        type="button"
        className="w-50 bg-brand text-white py-1 px-2 rounded"
        onClick={handleClick}
      >
        주소 검색
      </button>
      {selectedAddress && (
        <>
          <input
            type="text"
            value={selectedAddress.addressCode}
            readOnly
            placeholder="우편번호"
            className="w-full p-2 mt-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            value={selectedAddress.address}
            readOnly
            placeholder="주소"
            className="w-full p-2 mt-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            value={addressDetail}
            onChange={(e) => setAddressDeatil(e.target.value)}
            placeholder="상세 주소를 입력하세요"
            className="w-full p-2 mt-2 border border-gray-300 rounded"
          />
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full bg-brand text-white py-1 px-2 rounded mt-2"
          >
            주소 등록
          </button>
        </>
      )}
    </div>
  );
};

export default AddressSearch;

import React, { useRef, useEffect } from 'react';
import toast from 'react-hot-toast';

interface AddressData {
  zonecode: string;
  address: string;
  extraAddress: string;
}

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

  useEffect(() => {
    if (!scriptRef.current) {
      const script = document.createElement('script');
      script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
      script.async = true;
      document.body.appendChild(script);
      scriptRef.current = script;
    }
  }, []);

  const handleClick = () => {
    new window.daum.Postcode({
      oncomplete: function(data: any) {
        let addr = '';
        let extraAddr = '';

        if (data.userSelectedType === 'R') {
          addr = data.roadAddress;
        } else {
          addr = data.jibunAddress;
        }

        if(data.userSelectedType === 'R'){
          if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
            extraAddr += data.bname;
          }
          if(data.buildingName !== '' && data.apartment === 'Y'){
            extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
          }
          if(extraAddr !== ''){
            extraAddr = ' (' + extraAddr + ')';
          }
        }

        onComplete({
          zonecode: data.zonecode,
          address: addr,
          extraAddress: extraAddr
        });
        toast.success('주소가 등록되었습니다.')
      }
    }).open();
  };

  return (
    <button 
    type='button'
    className='w-50 bg-brand text-white py-1 px-2 rounded'
    onClick={handleClick}>주소 검색</button>
  );
};

export default AddressSearch;
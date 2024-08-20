import React, { useState } from 'react';
import axios from 'axios';
import { BusinessStatusResponse } from '../../types/business';

const BusinessStatusCheck: React.FC = () => {
  const [businessNumber, setBusinessNumber] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [validationMessage, setValidationMessage] = useState<string | null>(
    null,
  );

  const checkBusinessStatus = async () => {
    const serviceKey = import.meta.env.VITE_PUBLIC_API_KEY; // 환경 변수에서 API 키 가져오기
    const apiUrl = `https://api.odcloud.kr/api/nts-businessman/v1/status?serviceKey=${serviceKey}`;

    const requestData = {
      b_no: [businessNumber],
    };

    try {
      const response = await axios.post<BusinessStatusResponse>(
        apiUrl,
        requestData,
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        },
      );

      const businessInfo = response.data.data[0];

      // 사업자 상태 확인
      if (
        businessInfo.tax_type === '국세청에 등록되지 않은 사업자등록번호입니다.'
      ) {
        setValidationMessage(businessInfo.tax_type); // 오류 메시지 설정
      } else {
        setValidationMessage('유효한 사업자등록번호입니다.');
      }
      setError(null);
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          '사업자 등록번호 확인 중 오류가 발생했습니다.',
      );
      setValidationMessage(null);
    }
  };

  return (
    <div>
      <h1>사업자 상태 조회</h1>
      <input
        type="text"
        placeholder="- 를 제외하고 입력"
        value={businessNumber}
        onChange={(e) => setBusinessNumber(e.target.value)}
      />
      <button onClick={checkBusinessStatus}>조회</button>

      {validationMessage && <p>{validationMessage}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default BusinessStatusCheck;

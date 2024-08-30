import React, { useState } from 'react';
import { validateBusinessNumber } from '../../api/estimate';
import { BusinessValidationRequest } from '../../types/business';

const BusinessStatusCheck: React.FC = () => {
  const [businessNumber, setBusinessNumber] = useState<string>('');
  const [startDt, setStartDt] = useState<string>('');
  const [pNm, setPNm] = useState<string>('');
  const [bNm, setBNm] = useState<string>('');
  const [bType, setBType] = useState<string>('');
  const [bSector, setBSector] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [validationMessage, setValidationMessage] = useState<string | null>(
    null,
  );

  const checkBusinessStatus = async () => {
    const requestData: BusinessValidationRequest = {
      service_key: import.meta.env.VITE_PUBLIC_API_KEY,
      businesses: [
        {
          b_no: businessNumber,
          start_dt: startDt,
          p_nm: pNm,
          b_nm: bNm,
          b_type: bType,
          b_sector: bSector,
        },
      ],
    };

    try {
      const response = await validateBusinessNumber(requestData);
      const businessInfo = response.data[0];

      // 사업자 상태 확인
      if (businessInfo.valid === 'N') {
        setValidationMessage(businessInfo.valid_msg); // 유효하지 않은 경우 메시지 설정
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
    console.log(requestData);
  };

  return (
    <div>
      <h1>사업자 상태 조회</h1>
      <input
        type="text"
        placeholder="사업자등록번호"
        value={businessNumber}
        onChange={(e) => setBusinessNumber(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="사업 시작일 (YYYYMMDD)"
        value={startDt}
        onChange={(e) => setStartDt(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="대표자명"
        value={pNm}
        onChange={(e) => setPNm(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="상호명"
        value={bNm}
        onChange={(e) => setBNm(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="업태"
        value={bSector}
        onChange={(e) => setBSector(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="업종"
        value={bType}
        onChange={(e) => setBType(e.target.value)}
      />
      <br />
      <button onClick={checkBusinessStatus} className="btn">
        조회
      </button>

      {validationMessage && <p>{validationMessage}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default BusinessStatusCheck;

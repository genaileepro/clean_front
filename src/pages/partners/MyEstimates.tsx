import React, { useState, useEffect } from 'react';
import partnerApi from '../../api/partnerAxiosConfig';
import { Commission } from '../../types/estimate';
import ErrorNotification from '../../utils/ErrorNotification';

const MyEstimates: React.FC = () => {
  const [commissions, setCommissions] = useState<Commission[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEstimates = async () => {
      try {
        const response = await partnerApi.get('/partner/estimate/list'); // 견적 목록 가져오기
        setCommissions(response.data);
      } catch (err) {
        console.error('Error fetching estimates:', err);
        setError('Failed to load estimates.');
      }
    };

    fetchEstimates();
  }, []);

  // 견적 최종 제출 처리 함수
  const handleFinalSubmit = async (commissionId: number) => {
    try {
      await partnerApi.post(`/commissions/${commissionId}/estimate/final`);
      alert('견적이 최종 제출되었습니다.');
    } catch (err) {
      console.error('Error submitting final estimate:', err);
      setError('Error submitting final estimate');
    }
  };

  return (
    <div className="container mx-auto max-w-screen-md mt-12">
      <h1 className="text-4xl font-bold text-center mb-8">내 견적 목록</h1>
      {error && <ErrorNotification message={error} />}
      {commissions.length > 0 ? (
        commissions.map((commission) => (
          <div
            key={commission.id}
            className="bg-white border rounded-lg shadow-lg p-6 w-full max-w-lg mx-auto mb-4"
          >
            <p className="text-gray-600 mb-2">
              <strong>회원 닉네임:</strong> {commission.memberNick}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>주소:</strong> {commission.address}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>집 종류:</strong> {commission.houseType}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>청소 종류:</strong> {commission.cleanType}
            </p>
            <p className="text-gray-600 mb-4">
              <strong>희망 날짜:</strong> {commission.desiredDate}
            </p>
            <div className="flex space-x-4">
              <button
                className="bg-green-500 text-white py-2 px-4 rounded-md w-full"
                onClick={() => handleFinalSubmit(commission.id)}
              >
                최종 제출
              </button>
              <button className="bg-yellow-500 text-white py-2 px-4 rounded-md w-full">
                수정
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>저장된 견적이 없습니다.</p>
      )}
    </div>
  );
};

export default MyEstimates;

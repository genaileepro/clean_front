import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import partnerApi from '../../api/partnerAxiosConfig';
import { getCommissionList } from '../../api/estimate'; // 전체 Commission 목록을 가져오는 API
import { Commission } from '../../types/estimate';
import ErrorNotification from '../../utils/ErrorNotification';

const WriteEstimate: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // URL 파라미터로부터 commissionId 가져오기
  const [commission, setCommission] = useState<Commission | null>(null); // Commission 데이터 상태 관리
  const [price, setPrice] = useState(''); // 견적 가격 상태 관리
  const [error, setError] = useState<string | null>(null); // 에러 메시지 상태 관리
  const navigate = useNavigate(); // 페이지 이동을 위한 네비게이트 훅

  // Commission 데이터를 API로부터 가져오는 함수
  useEffect(() => {
    const fetchCommission = async () => {
      try {
        const commissions = await getCommissionList(); // 전체 Commission 목록 가져오기
        const selectedCommission = commissions.find((c) => c.id === Number(id)); // 특정 ID와 일치하는 Commission 찾기

        if (selectedCommission) {
          setCommission(selectedCommission); // 가져온 데이터로 상태 업데이트
        } else {
          setError('Commission not found.'); // Commission을 찾지 못한 경우 에러 메시지 설정
        }
      } catch (err) {
        console.error('Error fetching commissions:', err);
        setError('Failed to load commissions.'); // 에러 발생 시 에러 메시지 설정
      }
    };

    fetchCommission(); // 함수 호출
  }, [id]); // id가 변경될 때마다 useEffect 실행

  // 견적 제출 처리 함수
  const handleEstimateSubmit = async () => {
    try {
      if (price === '') {
        setError('Please enter a price.'); // 가격이 입력되지 않은 경우 에러 메시지 설정
        return;
      }

      // API 호출하여 견적을 임시 저장 (여기서는 '임시 저장'이라고 가정)
      await partnerApi.post(`/commissions/${id}/estimate/temp`, {
        price: Number(price),
      });

      navigate('/myestimates'); // 임시 저장 후 견적 목록 페이지로 이동
    } catch (err) {
      console.error('Error submitting estimate:', err);
      setError('Error submitting estimate'); // 에러 발생 시 에러 메시지 설정
    }
  };

  return (
    <div className="container mx-auto max-w-screen-md mt-12">
      <h1 className="text-4xl font-bold text-center mb-8">견적 작성</h1>
      {error && <ErrorNotification message={error} />} {/* 에러 메시지 출력 */}
      {commission ? (
        <div className="bg-white border rounded-lg shadow-lg p-6 w-full max-w-lg mx-auto">
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
          <div className="mt-4">
            <p></p>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="견적 가격을 입력하세요"
              className="w-full border border-gray-300 rounded-md p-2 mb-4"
            />
            <button
              className="bg-[#0bb8f9] text-white py-2 px-4 rounded-md w-full"
              onClick={handleEstimateSubmit}
            >
              임시 저장
            </button>
          </div>
        </div>
      ) : (
        <p>Loading commission details...</p>
      )}
    </div>
  );
};

export default WriteEstimate;

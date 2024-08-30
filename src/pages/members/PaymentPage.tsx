import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEstimateDetail } from '../../hooks/useCommissions';

const PaymentPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { estimateId } = location.state as { estimateId: number };
  const { data, isLoading, error } = useEstimateDetail(estimateId);
  const [paymentMethod, setPaymentMethod] = useState<string>('');

  if (isLoading) return <div className="text-center py-8">로딩 중...</div>;
  if (error)
    return (
      <div className="text-center py-8 text-red-500">에러: {error.message}</div>
    );
  if (!data)
    return <div className="text-center py-8">데이터를 찾을 수 없습니다.</div>;

  const handlePaymentMethodChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setPaymentMethod(e.target.value);
  };

  const handlePayment = () => {
    // 여기에 결제 로직을 구현합니다.
    console.log('결제 진행:', paymentMethod);
    // 결제 완료 후 처리 (예: 확인 페이지로 이동)
    // navigate('/payment-confirmation', { state: { estimateId: data.id } });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6 text-center">결제 페이지</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">견적 정보</h2>
        <p>견적 ID: {data.id}</p>
        <p>금액: {data.price.toLocaleString()}원</p>
        <p>작업 날짜: {new Date(data.fixedDate).toLocaleString()}</p>
        <p>청소 종류: {data.cleanType}</p>
        <p>크기: {data.size} 평</p>

        <h2 className="text-xl font-semibold mt-6 mb-4">의뢰 정보</h2>
        <p>의뢰 ID: {data.commissionId}</p>
        <p>희망 날짜: {new Date(data.desiredDate).toLocaleDateString()}</p>
        <p>특이사항: {data.significant || '없음'}</p>

        <h2 className="text-xl font-semibold mt-6 mb-4">파트너 정보</h2>
        <p>회사명: {data.companyName}</p>
        <p>담당자: {data.managerName}</p>
        <p>연락처: {data.phoneNumber}</p>

        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">결제 수단 선택</h2>
          <select
            value={paymentMethod}
            onChange={handlePaymentMethodChange}
            className="w-full p-2 border rounded mb-4"
          >
            <option value="">결제 수단을 선택하세요</option>
            <option value="card">신용카드</option>
            <option value="transfer">계좌이체</option>
            <option value="virtualAccount">가상계좌</option>
          </select>

          <button
            onClick={handlePayment}
            disabled={!paymentMethod}
            className="w-full bg-brand text-white py-2 px-4 rounded-full hover:bg-brand-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {data.price.toLocaleString()}원 결제하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;

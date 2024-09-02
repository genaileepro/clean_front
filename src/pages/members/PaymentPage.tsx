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

  const handlePaymentMethodChange = (method: string) => {
    setPaymentMethod(method);
  };

  const handlePayment = () => {
    // 여기에 결제 로직을 구현합니다.
    console.log('결제 진행:', paymentMethod);
    // 결제 완료 후 처리 (예: 확인 페이지로 이동)
    // navigate('/payment-confirmation', { state: { estimateId: data.id } });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6 text-center">결제수단</h1>
      <div className="bg-gray-100 p-4 mb-4 rounded-lg">
        <p className="font-bold">우리카드 간편결제 결제 시</p>
        <p className="text-blue-600 font-bold">최대 5천원 즉시 할인</p>
      </div>
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">결제 수단 선택</h2>
        <div className="space-y-2">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="paymentMethod"
              value="CREDIT_CARD"
              checked={paymentMethod === 'CREDIT_CARD'}
              onChange={() => handlePaymentMethodChange('CREDIT_CARD')}
              className="form-radio"
            />
            <span>일반결제 (신용카드/체크카드/간편결제)</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="paymentMethod"
              value="MOBILE_PAY"
              checked={paymentMethod === 'MOBILE_PAY'}
              onChange={() => handlePaymentMethodChange('MOBILE_PAY')}
              className="form-radio"
            />
            <span>N pay (포인트 0.5% 적립)</span>
          </label>
        </div>
      </div>
      {paymentMethod === 'CREDIT_CARD' && (
        <div className="grid grid-cols-2 gap-4 mb-6">
          {[
            '토스페이',
            '삼성페이',
            '카카오페이',
            '페이코',
            '휴대폰결제',
            '무통장(가상계좌)',
            '편의점결제',
          ].map((method) => (
            <button
              key={method}
              className="border border-gray-300 rounded-lg py-2 px-4 text-center"
            >
              {method}
            </button>
          ))}
        </div>
      )}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">번개포인트</h2>
        <div className="flex justify-between items-center">
          <span>0</span>
          <button className="text-blue-600">전액사용</button>
        </div>
        <p className="text-sm text-gray-500">사용 가능한 번개 포인트 0원</p>
      </div>
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">결제금액</h2>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>상품금액</span>
            <span>{data.price.toLocaleString()}원</span>
          </div>
          <div className="flex justify-between">
            <span>배송비</span>
            <span>+4,000원</span>
          </div>
          <div className="flex justify-between">
            <span>안전결제 수수료</span>
            <span>무료</span>
          </div>
          <div className="flex justify-between">
            <span>번개포인트 사용</span>
            <span>0원</span>
          </div>
          <div className="flex justify-between font-bold text-xl">
            <span>총 결제금액</span>
            <span className="text-red-600">
              {(data.price + 4000).toLocaleString()}원
            </span>
          </div>
        </div>
      </div>
      <div className="space-y-2 mb-6">
        <label className="flex items-center space-x-2">
          <input type="checkbox" className="form-checkbox" />
          <span>아래 내용에 전체 동의해요.</span>
        </label>
        <div className="text-sm text-gray-500 space-y-1">
          <p>번개장터 서비스 이용약관 동의 (필수)</p>
          <p>개인정보 수집 및 이용 동의 (필수)</p>
          <p>개인정보 제3자 제공 동의 (필수)</p>
        </div>
      </div>
      <button
        onClick={handlePayment}
        disabled={!paymentMethod}
        className="w-full bg-brand text-white py-3 px-4 rounded-lg hover:bg-brand-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-lg font-bold"
      >
        결제하기
      </button>
    </div>
  );
};

export default PaymentPage;

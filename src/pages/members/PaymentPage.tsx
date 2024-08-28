import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentPage: React.FC = () => {
  const [paymentMethod, setPaymentMethod] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handlePaymentMethodChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setPaymentMethod(event.target.value);
  };

  const handlePayment = async () => {
    if (!paymentMethod) {
      alert('결제 수단을 선택해주세요.');
      return;
    }

    setLoading(true);
    try {
      // 결제 API 호출 로직
      // await apiCallToPaymentEndpoint({ method: paymentMethod });

      setLoading(false);
      alert('결제가 완료되었습니다.');
      navigate('/payment-success'); // 결제 성공 시 이동할 페이지
    } catch (error) {
      setLoading(false);
      alert('결제에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">결제</h1>

      {/* 상품 및 가격 정보 섹션 */}
      <div className="bg-white shadow-md rounded p-4 mb-6">
        <h2 className="text-xl font-semibold">상품 정보</h2>
        <p>상품 이름: 클리닝 서비스</p>
        <p>가격: 100,000원</p>
      </div>

      {/* 결제 수단 선택 섹션 */}
      <div className="bg-white shadow-md rounded p-4 mb-6">
        <h2 className="text-xl font-semibold mb-2">결제 수단 선택</h2>
        <select
          className="w-full p-2 border rounded"
          value={paymentMethod}
          onChange={handlePaymentMethodChange}
        >
          <option value="" disabled>
            결제 수단을 선택하세요
          </option>
          <option value="credit_card">신용카드</option>
          <option value="bank_transfer">계좌이체</option>
          <option value="kakao_pay">카카오 페이</option>
          {/* 추가 결제 수단은 여기에서 더 추가 가능합니다 */}
        </select>
      </div>

      {/* 결제하기 버튼 */}
      <div className="text-right">
        <button
          className={`bg-blue-500 text-white font-bold py-2 px-4 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={handlePayment}
          disabled={loading || !paymentMethod}
        >
          {loading ? '결제 중...' : '결제하기'}
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;

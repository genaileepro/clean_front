import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const PaymentSuccessPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const paymentInfo = location.state?.paymentInfo;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex items-center justify-center mb-6">
          <CheckCircle className="text-green-500 w-16 h-16" />
        </div>
        <h1 className="text-3xl font-bold mb-4 text-center text-green-600">
          결제 성공
        </h1>
        <p className="text-gray-600 mb-6 text-center">
          결제가 성공적으로 완료되었습니다. 감사합니다.
        </p>
        {paymentInfo && (
          <div className="mb-6 text-sm">
            <p>
              <strong>결제 금액:</strong> {paymentInfo.amount.toLocaleString()}
              원
            </p>
            <p>
              <strong>결제 방법:</strong> {paymentInfo.pay_method}
            </p>
            <p>
              <strong>주문 번호:</strong> {paymentInfo.merchant_uid}
            </p>
            <p>
              <strong>결제 시간:</strong>{' '}
              {new Date(paymentInfo.paid_at * 1000).toLocaleString()}
            </p>
          </div>
        )}
        <button
          onClick={() => navigate('/memberhome')}
          className="w-full bg-brand text-white py-3 px-4 rounded-lg hover:bg-brand-dark transition-colors text-lg font-bold"
        >
          홈으로 돌아가기
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;

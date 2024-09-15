import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { XCircle } from 'lucide-react';

const PaymentCancelPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const cancelInfo = location.state?.cancelInfo;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex items-center justify-center mb-6">
          <XCircle className="text-red-500 w-16 h-16" />
        </div>
        <h1 className="text-3xl font-bold mb-4 text-center text-red-600">
          결제 취소
        </h1>
        <p className="text-gray-600 mb-6 text-center">결제가 취소되었습니다.</p>
        {cancelInfo && (
          <div className="mb-6 text-sm">
            <p>
              <strong>취소 금액:</strong>{' '}
              {cancelInfo.cancelAmount.toLocaleString()}원
            </p>
            <p>
              <strong>주문 번호:</strong> {cancelInfo.merchantUid}
            </p>
            <p>
              <strong>취소 사유:</strong> {cancelInfo.reason}
            </p>
            <p>
              <strong>취소 시간:</strong>{' '}
              {new Date(cancelInfo.cancelledAt * 1000).toLocaleString()}
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

export default PaymentCancelPage;

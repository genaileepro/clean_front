import React from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentSuccessPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold mb-4 text-center text-green-600">
          결제 성공
        </h1>
        <p className="text-gray-600 mb-6 text-center">
          결제가 성공적으로 완료되었습니다. 감사합니다.
        </p>
        <button
          onClick={() => navigate('/memberhome')}
          className="w-full bg-brand text-white py-2 px-4 rounded-lg hover:bg-brand-dark transition-colors"
        >
          홈으로 돌아가기
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;

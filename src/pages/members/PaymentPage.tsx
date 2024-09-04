import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEstimateDetail } from '../../hooks/useCommissions';
import {
  CreditCard,
  Building,
  Wallet,
  Smartphone,
  CreditCard as SimplePayIcon
} from 'lucide-react';
import logo from '../../assets/logo.png';
import LoadingSpinner from '../../utils/LoadingSpinner';

declare global {
  interface Window {
    IMP: any;
  }
}

const PaymentPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { estimateId } = location.state as { estimateId: number };
  const { data, isLoading, error } = useEstimateDetail(estimateId);
  const [paymentMethod, setPaymentMethod] = useState<string>('');

  useEffect(() => {
    const IMP = window.IMP;
    IMP.init(import.meta.env.VITE_IMP_KEY); // 가맹점 식별코드 입력
  }, []);

  if (isLoading) return <div className="flex justify-center items-center h-screen"><LoadingSpinner /></div>;
  if (error) return <div className="text-center py-8 text-red-500">에러: {error.message}</div>;
  if (!data) return <div className="text-center py-8">데이터를 찾을 수 없습니다.</div>;

  const handlePaymentMethodChange = (method: string) => {
    setPaymentMethod(method);
  };

  const handlePayment = () => {
    if (!paymentMethod) return;

    const IMP = window.IMP;
    IMP.request_pay({
      pg: "kcp",
      pay_method: paymentMethod.toLowerCase(),
      merchant_uid: `ORD${Date.now()}`,
      name: "깔끔한방 청소 서비스",
      amount: data.price,
      buyer_email: "buyer@example.com",
      buyer_name: "구매자",
      buyer_tel: "010-1234-5678",
      buyer_addr: "서울특별시 강남구 삼성동",
      buyer_postcode: "123-456",
    }, function (rsp: any) {
      if (rsp.success) {
        console.log("결제 성공", rsp);
        // 결제 성공 시 백엔드에 결제 정보 전송
        // 백엔드에서 결제 검증 후 결과에 따라 처리
        navigate('/payment-confirmation', { state: { estimateId: data.id, paymentInfo: rsp } });
      } else {
        console.log("결제 실패", rsp);
        alert(`결제에 실패하였습니다. 에러 내용: ${rsp.error_msg}`);
      }
    });
  };

  const paymentMethods = [
    { id: 'CARD', name: '카드 결제', icon: <CreditCard size={24} /> },
    { id: 'BANK_TRANSFER', name: '계좌 이체', icon: <Building size={24} /> },
    { id: 'VIRTUAL_ACCOUNT', name: '가상 계좌', icon: <Wallet size={24} /> },
    { id: 'PHONE', name: '휴대폰 소액 결제', icon: <Smartphone size={24} /> },
    { id: 'SIMPLE_PAY', name: '간편 결제', icon: <SimplePayIcon size={24} /> },
  ];

  const simplePay = [
    '네이버 페이',
    '카카오 페이',
    'SSG 페이',
    '삼성 페이'
  ];

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 py-12">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <div className="mb-8 text-center">
          <img src={logo} alt="깔끔한방 로고" className="mx-auto w-48 h-auto" />
        </div>
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">결제하기</h1>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">결제 수단 선택</h2>
          <div className="space-y-3">
            {paymentMethods.map((method) => (
              <label key={method.id} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="radio"
                  name="paymentMethod"
                  value={method.id}
                  checked={paymentMethod === method.id}
                  onChange={() => handlePaymentMethodChange(method.id)}
                  className="form-radio text-brand"
                />
                {method.icon}
                <span>{method.name}</span>
              </label>
            ))}
          </div>
        </div>

        {paymentMethod === 'SIMPLE_PAY' && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-2">간편 결제 선택</h3>
            <div className="grid grid-cols-2 gap-4">
              {simplePay.map((method) => (
                <button
                  key={method}
                  className="border border-gray-300 rounded-lg py-2 px-4 text-center hover:bg-gray-50"
                >
                  {method}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">결제 금액</h2>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center text-lg">
              <span>청소 서비스 금액</span>
              <span className="font-bold">{data.price.toLocaleString()}원</span>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center text-xl font-bold">
              <span>총 결제금액</span>
              <span className="text-brand">{data.price.toLocaleString()}원</span>
            </div>
          </div>
        </div>

        <div className="space-y-2 mb-8">
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="form-checkbox text-brand" />
            <span className="text-sm">아래 내용에 전체 동의합니다.</span>
          </label>
          <div className="text-xs text-gray-500 space-y-1 ml-6">
            <p>서비스 이용약관 동의 (필수)</p>
            <p>개인정보 수집 및 이용 동의 (필수)</p>
            <p>개인정보 제3자 제공 동의 (필수)</p>
          </div>
        </div>

        <button
          onClick={handlePayment}
          disabled={!paymentMethod}
          className="w-full bg-brand text-white py-3 px-4 rounded-lg hover:bg-brand-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-lg font-bold"
        >
          {data.price.toLocaleString()}원 결제하기
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
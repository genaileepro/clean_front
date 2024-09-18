import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useGetPaymentData, useCompletePayment } from '../../hooks/usePayment';
import { adaptEstimateToPayment } from '../../utils/paymentAdapter';
import {
  PayMethod,
  RequestPayParams,
  RequestPayResponse,
  CompletePaymentRequest,
} from '../../types/portone';
import LoadingSpinner from '../../utils/LoadingSpinner';
import { showErrorNotification } from '../../utils/errorHandler';
import SimplePayButton from '../../components/members/SimplePayButton';
import {
  CreditCard,
  Building,
  Wallet,
  Smartphone,
  CreditCard as SimplePayIcon,
} from 'lucide-react';

type ExtendedPayMethod = PayMethod | 'SIMPLE_PAY';

const PaymentPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { estimateId, commissionId } = location.state as {
    estimateId: number;
    commissionId: number;
  };

  const [paymentMethod, setPaymentMethod] = useState<ExtendedPayMethod>('card');
  const [simplePayMethod, setSimplePayMethod] = useState<string>('');
  const [isScriptLoading, setIsScriptLoading] = useState(true);

  const {
    data: paymentData,
    isLoading: isDataLoading,
    error,
  } = useGetPaymentData(estimateId, commissionId);
  const completePaymentMutation = useCompletePayment();

  console.log('Payment Data:', paymentData);

  useEffect(() => {
    const jquery = document.createElement('script');
    jquery.src = 'https://code.jquery.com/jquery-1.12.4.min.js';
    const iamport = document.createElement('script');
    iamport.src = 'https://cdn.iamport.kr/v1/iamport.js';
    document.head.appendChild(jquery);
    document.head.appendChild(iamport);

    jquery.onload = () => {
      if ((iamport as any).readyState === 'complete') {
        setIsScriptLoading(false);
      } else {
        iamport.onload = () => setIsScriptLoading(false);
      }
    };

    return () => {
      document.head.removeChild(jquery);
      document.head.removeChild(iamport);
    };
  }, []);

  if (isScriptLoading || isDataLoading) return <LoadingSpinner />;
  if (error) return <div>Error: {error.message}</div>;
  if (!paymentData) return <div>결제 정보를 불러올 수 없습니다.</div>;

  const onClickPayment = () => {
    if (!window.IMP) {
      showErrorNotification('결제 모듈을 불러오는데 실패했습니다.');
      return;
    }

    const { IMP } = window;
    IMP.init(import.meta.env.VITE_IMP_KEY);

    const finalPayMethod =
      paymentMethod === 'SIMPLE_PAY' ? simplePayMethod : paymentMethod;
    const data: RequestPayParams = adaptEstimateToPayment(
      paymentData,
      finalPayMethod as PayMethod,
    );

    IMP.request_pay(data, callback);
    console.log(data, callback);
  };

  const callback = async (response: RequestPayResponse) => {
    const {
      success,
      error_msg,
      imp_uid,
      merchant_uid,
      pay_method,
      buyer_email,
      buyer_tel,
    } = response;

    if (success && imp_uid) {
      try {
        const paymentData: CompletePaymentRequest = {
          imp_uid,
          merchant_uid: merchant_uid || '',
          pay_method: (pay_method as PayMethod) || 'card',
          buyer_email: buyer_email || '',
          buyer_tel: buyer_tel || '',
        };

        const result = await completePaymentMutation.mutateAsync({
          impUid: imp_uid,
          paymentData,
        });

        if (result.code === 0) {
          // Assuming 0 means success, adjust as needed
          navigate('/payment-success', {
            state: { paymentInfo: result.response },
          });
        } else {
          showErrorNotification(`결제 완료 처리 실패: ${result.message}`);
        }
      } catch (error) {
        showErrorNotification('결제 완료 처리 중 오류가 발생했습니다.');
      }
    } else {
      showErrorNotification(`결제 실패: ${error_msg}`);
    }
  };

  const paymentMethods = [
    { id: 'card', name: '카드 결제', icon: <CreditCard size={24} /> },
    { id: 'trans', name: '계좌 이체', icon: <Building size={24} /> },
    { id: 'vbank', name: '가상 계좌', icon: <Wallet size={24} /> },
    { id: 'phone', name: '휴대폰 소액 결제', icon: <Smartphone size={24} /> },
    { id: 'SIMPLE_PAY', name: '간편 결제', icon: <SimplePayIcon size={24} /> },
  ];

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 py-12">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          결제하기
        </h1>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            결제 수단 선택
          </h2>
          <div className="space-y-3">
            {paymentMethods.map(method => (
              <label
                key={method.id}
                className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value={method.id}
                  checked={paymentMethod === method.id}
                  onChange={() => {
                    setPaymentMethod(method.id as ExtendedPayMethod);
                    if (method.id !== 'SIMPLE_PAY') {
                      setSimplePayMethod('');
                    }
                  }}
                  className="form-radio text-brand"
                />
                {method.icon}
                <span>{method.name}</span>
              </label>
            ))}
          </div>
        </div>

        {paymentMethod === 'SIMPLE_PAY' && (
          <SimplePayButton
            simplePayMethod={simplePayMethod}
            setSimplePayMethod={setSimplePayMethod}
          />
        )}

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            결제 금액
          </h2>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center text-lg">
              <span>청소 서비스 금액</span>
              <span className="font-bold">
                {paymentData.estimate_amount.toLocaleString()}원
              </span>
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
          onClick={onClickPayment}
          disabled={
            !paymentMethod ||
            (paymentMethod === 'SIMPLE_PAY' && !simplePayMethod)
          }
          className="w-full bg-brand text-white py-3 px-4 rounded-lg hover:bg-brand-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-lg font-bold"
        >
          {paymentData.estimate_amount.toLocaleString()}원 결제하기
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;

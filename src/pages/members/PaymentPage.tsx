import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CreditCard,
  Building,
  Wallet,
  Smartphone,
  CreditCard as SimplePayIcon,
} from 'lucide-react';
// import { getPaymentData } from '../../api/payment';
// import { validatePhoneNumber, validateEmail } from '../../utils/validationUtils';
import {
  handleApiError,
  showErrorNotification,
} from '../../utils/errorHandler';
import LoadingSpinner from '../../utils/LoadingSpinner';
import { PayMethod, RequestPayParams } from '../../types/portone';
import SimplePaySection from '../../components/members/SimplePayButton';

const PaymentPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState<string>('');
  const [simplePayMethod, setSimplePayMethod] = useState<string>('');
  const [amount, setAmount] = useState<number>(0);
  const [buyerName, setBuyerName] = useState<string>('');
  const [buyerTel, setBuyerTel] = useState<string>('');
  const [buyerEmail, setBuyerEmail] = useState<string>('');
  const [buyerAddr, setBuyerAddr] = useState<string>('');
  const [buyerPostcode, setBuyerPostcode] = useState<string>('');

  useEffect(() => {
    const fetchPaymentData = async () => {
      try {
        setLoading(true);
        const orderId = 'some-order-id'; // 이 부분은 실제 주문 ID로 대체해야 합니다
        const data = await getPaymentData(orderId);
        setAmount(data.amount);
        setBuyerName(data.buyerName);
        setBuyerTel(data.buyerTel);
        setBuyerEmail(data.buyerEmail);
        setBuyerAddr(data.buyerAddr);
        setBuyerPostcode(data.buyerPostcode);
      } catch (error) {
        showErrorNotification(handleApiError(error));
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentData();

    // IMP 초기화
    const jquery = document.createElement('script');
    jquery.src = 'https://code.jquery.com/jquery-1.12.4.min.js';
    const iamport = document.createElement('script');
    iamport.src = 'https://cdn.iamport.kr/js/iamport.payment-1.2.0.js';
    document.head.appendChild(jquery);
    document.head.appendChild(iamport);

    return () => {
      document.head.removeChild(jquery);
      document.head.removeChild(iamport);
    };
  }, []);

  const getPayMethod = (): PayMethod => {
    if (paymentMethod === 'SIMPLE_PAY') {
      return simplePayMethod as PayMethod;
    }
    return paymentMethod as PayMethod;
  };

  const onClickPayment = () => {
    if (!window.IMP) {
      showErrorNotification('결제 모듈을 불러오는데 실패했습니다.');
      return;
    }

    const { IMP } = window;
    IMP.init(import.meta.env.VITE_IMP_KEY);

    const data: RequestPayParams = {
      pg: 'smartro_v2',
      pay_method: getPayMethod(),
      merchant_uid: `mid_${new Date().getTime()}`,
      amount: amount,
      name: '깔끔한방 청소 서비스',
      buyer_name: buyerName,
      buyer_tel: buyerTel,
      buyer_email: buyerEmail,
      buyer_addr: buyerAddr,
      buyer_postcode: buyerPostcode,
    };

    IMP.request_pay(data, callback);
  };

  const callback = (response: any) => {
    const { success, error_msg } = response;

    if (success) {
      showErrorNotification('결제 성공');
      navigate('/payment-success'); // 결제 성공 페이지로 이동
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner size="large" />
      </div>
    );
  }

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
                    setPaymentMethod(method.id);
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
          <SimplePaySection
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
              <span className="font-bold">{amount.toLocaleString()}원</span>
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
          {amount.toLocaleString()}원 결제하기
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;

import React, { useState, useEffect } from 'react';
import {
  validateEmail,
  validateVerificationCode,
} from '../../utils/validationUtils';
import {
  handleApiError,
  showErrorNotification,
} from '../../utils/errorHandler';
import toast from 'react-hot-toast';

interface EmailVerificationProps {
  email: string;
  onVerificationComplete: (isVerified: boolean) => void;
  requestEmailVerification: (email: string) => Promise<void>;
  verifyEmail: (email: string, code: string) => Promise<void>;
  userType: 'member' | 'partner'; // 새로운 prop 추가
}

const EmailVerification: React.FC<EmailVerificationProps> = ({
  email,
  onVerificationComplete,
  requestEmailVerification,
  verifyEmail,
  userType, // 새로운 prop 사용
}) => {
  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [timer, setTimer] = useState(0);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState('');

  // 버튼 색상 결정 함수
  const getButtonColorClass = () => {
    return userType === 'member'
      ? 'bg-brand hover:bg-brand-dark'
      : 'bg-[#144156] hover:bg-[#1c5f7b]';
  };

  const handleSendVerification = async () => {
    const emailValidation = validateEmail(email);
    if (!emailValidation.isValid) {
      setError(emailValidation.message);
      return;
    }

    try {
      await requestEmailVerification(email);
      setIsVerificationSent(true);
      setTimer(600); // 10 minutes
      setError('');
      toast.success('인증 이메일이 발송되었습니다.');
    } catch (error) {
      const errorMessage = handleApiError(error);
      showErrorNotification(errorMessage);
      setError(errorMessage);
    }
  };

  const handleVerifyEmail = async () => {
    const codeValidation = validateVerificationCode(verificationCode);
    if (!codeValidation.isValid) {
      setError(codeValidation.message);
      return;
    }

    try {
      await verifyEmail(email, verificationCode);
      setIsVerified(true);
      onVerificationComplete(true);
      setError('');
      toast.success('이메일이 성공적으로 인증되었습니다.');
    } catch (error) {
      const errorMessage = handleApiError(error);
      showErrorNotification(errorMessage);
      setError(errorMessage);
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsVerificationSent(false);
    }
    return () => clearInterval(interval);
  }, [timer]);

  if (isVerified) {
    return (
      <div className="text-green-500 text-center">이메일이 인증되었습니다.</div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        {isVerificationSent && (
          <div className="text-sm ml-2">
            <span className="text-gray-600">남은 시간: </span>
            <span className="text-red-500 font-semibold">
              {Math.floor(timer / 60)}:{timer % 60 < 10 ? '0' : ''}
              {timer % 60}
            </span>
          </div>
        )}
        <button
          type="button"
          onClick={handleSendVerification}
          disabled={isVerificationSent || !email}
          className={`btn ${getButtonColorClass()} text-white py-2 px-4 rounded ml-auto`}
        >
          인증번호 발송
        </button>
      </div>
      {isVerificationSent && (
        <div className="flex justify-between items-center space-x-2">
          <input
            type="text"
            value={verificationCode}
            onChange={e => setVerificationCode(e.target.value)}
            placeholder="인증번호 입력"
            className="w-2/3 p-2 border border-gray-300 rounded"
          />
          <button
            type="button"
            onClick={handleVerifyEmail}
            className={`btn ${getButtonColorClass()} text-white py-2 px-6 rounded`}
          >
            확인
          </button>
        </div>
      )}
      {error && <div className="text-red-500 text-sm">{error}</div>}
    </div>
  );
};

export default EmailVerification;

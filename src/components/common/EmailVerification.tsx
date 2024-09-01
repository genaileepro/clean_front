import React, { useState, useEffect } from 'react';
import {
  validateEmail,
  validateVerificationCode,
} from '../../utils/validationUtils';
import { useVerifyEmail } from '../../hooks/useMembers';
import {
  handleApiError,
  showErrorNotification,
} from '../../utils/errorHandler';
import { motion } from 'framer-motion';
import { Send, Check } from 'lucide-react';

interface EmailVerificationProps {
  email: string;
  onVerificationComplete: (isVerified: boolean) => void;
}

const EmailVerification: React.FC<EmailVerificationProps> = ({
  email,
  onVerificationComplete,
}) => {
  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [timer, setTimer] = useState(0);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState('');

  const verifyEmailMutation = useVerifyEmail();

  const handleSendVerification = async () => {
    const emailValidation = validateEmail(email);
    if (!emailValidation.isValid) {
      setError(emailValidation.message);
      return;
    }

    // TODO: Implement email verification code sending logic
    // For now, we'll just simulate sending the code
    setIsVerificationSent(true);
    setTimer(180); // 3 minutes
    setError('');
  };

  const handleVerifyEmail = async () => {
    const codeValidation = validateVerificationCode(verificationCode);
    if (!codeValidation.isValid) {
      setError(codeValidation.message);
      return;
    }

    try {
      await verifyEmailMutation.mutateAsync({ email, code: verificationCode });
      setIsVerified(true);
      onVerificationComplete(true);
      setError('');
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
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsVerificationSent(false);
    }
    return () => clearInterval(interval);
  }, [timer]);

  if (isVerified) {
    return (
      <motion.div
        className="text-green-500 text-center py-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Check className="inline-block mr-2" size={20} />
        이메일이 인증되었습니다.
      </motion.div>
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
        <motion.button
          type="button"
          onClick={handleSendVerification}
          disabled={isVerificationSent || !email}
          className={`flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white ${
            isVerificationSent || !email
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-brand hover:bg-brand-dark'
          } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Send className="mr-2" size={16} />
          인증번호 발송
        </motion.button>
      </div>
      {isVerificationSent && (
        <div className="flex justify-between items-center space-x-2">
          <input
            type="text"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            placeholder="인증번호 입력"
            className="w-2/3 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-brand focus:border-brand"
          />
          <motion.button
            type="button"
            onClick={handleVerifyEmail}
            className="flex items-center justify-center w-1/3 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-brand hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Check className="mr-2" size={16} />
            확인
          </motion.button>
        </div>
      )}
      {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
    </div>
  );
};

export default EmailVerification;

import React, { useState, FormEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import logo from '../../assets/logo.png';
import EmailInput from '../../utils/EmailInput';
import { usePartnerLogin } from '../../hooks/usePartners';
import { validatePassword } from '../../utils/validationUtils';
import { Partner } from '../../types/partner';
import {
  handleApiError,
  showErrorNotification,
} from '../../utils/errorHandler';
import { motion } from 'framer-motion';
import { Lock, LogIn } from 'lucide-react';

interface PartnerLoginForm {
  email: Partner['email'];
  password: string;
}

interface FormErrors {
  email: string;
  password: string;
  general?: string;
}

const PartnerLogin: React.FC = () => {
  const [formData, setFormData] = useState<PartnerLoginForm>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<FormErrors>({ email: '', password: '' });
  const { login: authLogin } = useAuth();
  const navigate = useNavigate();
  const loginMutation = usePartnerLogin();

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    let validationResult = validatePassword(value);
    setErrors((prev) => ({ ...prev, [name]: validationResult.message }));
  };

  const loginSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (errors.email || errors.password) {
      setErrors((prev) => ({
        ...prev,
        general: '입력한 정보를 다시 확인해주세요.',
      }));
      return;
    }

    try {
      const { id, token, refreshToken } =
        await loginMutation.mutateAsync(formData);

      localStorage.setItem('isPartner', 'true');
      authLogin(token, refreshToken, true, id);
      navigate('/pthome');
    } catch (error) {
      const errorMessage = handleApiError(error);
      showErrorNotification(errorMessage);
      setErrors((prev) => ({
        ...prev,
        general: '로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.',
      }));
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-md"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <img className="mx-auto h-24 w-auto" src={logo} alt="깔끔한방 로고" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            파트너 로그인
          </h2>
        </div>
        {errors.general && (
          <div
            className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded"
            role="alert"
          >
            <p>{errors.general}</p>
          </div>
        )}
        <form className="mt-8 space-y-6" onSubmit={loginSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="mb-4">
              <EmailInput
                email={formData.email}
                setEmail={(email) =>
                  setFormData((prev) => ({ ...prev, email }))
                }
                emailError={errors.email}
                setEmailError={(error) =>
                  setErrors((prev) => ({ ...prev, email: error }))
                }
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                비밀번호
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className={`appearance-none rounded-md relative block w-full px-3 py-2 border ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#144156] focus:border-[#144156] focus:z-10 sm:text-sm pl-10`}
                  placeholder="비밀번호"
                  value={formData.password}
                  onChange={handlePasswordChange}
                />
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-red-600">{errors.password}</p>
              )}
            </div>
          </div>

          <div>
            <motion.button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#144156] hover:bg-[#1c5a75] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#144156]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <LogIn
                  className="h-5 w-5 text-[#0bb8f9] group-hover:text-[#0aa8e9]"
                  aria-hidden="true"
                />
              </span>
              로그인
            </motion.button>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <a
                href="/ptsignup"
                className="font-medium text-[#144156] hover:text-[#1c5a75]"
              >
                회원가입
              </a>
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default PartnerLogin;

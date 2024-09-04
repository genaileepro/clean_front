import React, { useState, FormEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import logo from '../../assets/logo.png';
import EmailInput from '../../utils/EmailInput';
import { useLogin } from '../../hooks/useMembers';
import { validatePassword } from '../../utils/validationUtils';
import { Member } from '../../types/member';
import {
  handleApiError,
  showErrorNotification,
} from '../../utils/errorHandler';
import { motion } from 'framer-motion';
import { Lock, LogIn } from 'lucide-react';

interface LoginForm {
  email: Member['email'];
  password: string;
}

interface FormErrors {
  email: string;
  password: string;
  general?: string;
}

const Login: React.FC = () => {
  const [formData, setFormData] = useState<LoginForm>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<FormErrors>({ email: '', password: '' });
  const { login: authLogin } = useAuth();
  const navigate = useNavigate();
  const loginMutation = useLogin();

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
      const { token, refreshToken } = await loginMutation.mutateAsync(formData);
      authLogin(token, refreshToken, false);
      navigate('/memberhome');
    } catch (error) {
      const errorMessage = handleApiError(error);
      showErrorNotification(errorMessage);
      setErrors((prev) => ({
        ...prev,
        general: '이메일과 비밀번호를 확인해주세요.',
      }));
    }
  };

  const REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
  const REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;
  const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const handleKakaoLogin = () => {
    window.location.href = link;
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
            회원 로그인
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
                  className={`appearance-none rounded-md relative block w-full px-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'
                    } placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-brand focus:border-brand focus:z-10 sm:text-sm pl-10`}
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
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-brand hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <LogIn
                  className="h-5 w-5 text-brand-light group-hover:text-brand-dark"
                  aria-hidden="true"
                />
              </span>
              로그인
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <a
                href="/signup"
                className="font-medium text-brand hover:text-brand-dark"
              >
                회원가입
              </a>
            </div>
          </div>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6">
              <div>
                <img
                  src="/kakao_login_medium_wide.png"
                  alt="카카오 로그인"
                  className="w-full h-12 cursor-pointer"
                  onClick={handleKakaoLogin}
                />
              </div>
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;

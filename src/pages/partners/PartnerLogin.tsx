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
      authLogin(token, refreshToken, true, id); // partnerId를 함께 전달
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

  const REST_API_KEY = '65f1cfe772375248de10b233e85b8203';
  const REDIRECT_URI = 'http://localhost:8080/api/members/kakao-login';
  const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const handleKakaoLogin = () => {
    window.location.href = link;
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-5rem)]">
      <div className="grid bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-6 hidden sm:block">
          <img
            src={logo}
            alt="깔끔한방 로고"
            className="w-full h-auto max-h-[300px] object-contain"
          />
        </div>
        <div className="p-6">
          <h2 className="text-2xl mb-4 font-[JalnanGothic]">파트너 로그인</h2>
          {errors.general && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
              role="alert"
            >
              <span className="block sm:inline">{errors.general}</span>
            </div>
          )}
          <form onSubmit={loginSubmit} className="space-y-4">
            <EmailInput
              email={formData.email}
              setEmail={(email) => setFormData((prev) => ({ ...prev, email }))}
              emailError={errors.email}
              setEmailError={(error) =>
                setErrors((prev) => ({ ...prev, email: error }))
              }
            />
            <div>
              <label className="block mb-1">비밀번호</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handlePasswordChange}
                placeholder="비밀번호를 입력해주세요"
                className={`w-full p-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded`}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>
            <div className="flex flex-col space-y-4">
              <button
                className="btn hover:bg-blue-500 text-white py-2 px-4 rounded w-full"
                type="submit"
              >
                로그인
              </button>
              <div className="text-center text-sm">
                <span>계정이 없으신가요? </span>
                <a
                  href="/signup"
                  className="text-blue-500 hover:underline"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/signup');
                  }}
                >
                  회원 가입
                </a>
              </div>
              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white px-2 text-sm text-gray-500">
                    또는
                  </span>
                </div>
              </div>
              <div>
                <img
                  src="/kakao_login_medium_wide.png"
                  alt="카카오 로그인"
                  className="w-full h-auto cursor-pointer"
                  onClick={handleKakaoLogin}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PartnerLogin;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useKakaoLogin } from '../../hooks/useMembers';
import {
  handleApiError,
  showErrorNotification,
} from '../../utils/errorHandler';

const Redirection: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login } = useAuth();
  const kakaoLoginMutation = useKakaoLogin();

  useEffect(() => {
    const kakaoLogin = async () => {
      const code = new URL(window.location.href).searchParams.get('code');
      if (!code) {
        setError('카카오 인증 코드가 없습니다.');
        setIsLoading(false);
        return;
      }

      try {
        const { token, refreshToken } =
          await kakaoLoginMutation.mutateAsync(code);

        // 토큰 저장 및 로그인 처리
        localStorage.setItem('token', token);
        localStorage.setItem('refreshToken', refreshToken);
        login(token, refreshToken, false);

        console.log('Login successful:', { token, refreshToken });

        navigate('/memberhome');
      } catch (error) {
        console.error('Login error:', error);
        const errorMessage = handleApiError(error);
        showErrorNotification(errorMessage);
        setError(`로그인 처리 중 오류가 발생했습니다: ${errorMessage}`);
      } finally {
        setIsLoading(false);
      }
    };

    kakaoLogin();
  }, [navigate, login, kakaoLoginMutation]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <p className="mb-4">로그인 처리 중입니다. 잠시만 기다려 주세요...</p>
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => navigate('/login')}
          >
            로그인 페이지로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default Redirection;

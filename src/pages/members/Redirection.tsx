import React, { useEffect, useState, useCallback } from 'react';
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
  const [isLoginAttempted, setIsLoginAttempted] = useState(false);
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const kakaoLoginMutation = useKakaoLogin();

  const performKakaoLogin = useCallback(
    async (code: string) => {
      if (isLoginAttempted) return;
      setIsLoginAttempted(true);

      try {
        const { token, refreshToken } =
          await kakaoLoginMutation.mutateAsync(code);

        localStorage.setItem('token', token);
        localStorage.setItem('refreshToken', refreshToken);
        login(token, refreshToken, false);

        console.log('Login successful:', { token, refreshToken });
      } catch (error) {
        console.error('Login error:', error);
        const errorMessage = handleApiError(error);
        showErrorNotification(errorMessage);
        setError(`로그인 처리 중 오류가 발생했습니다: ${errorMessage}`);
      } finally {
        setIsLoading(false);
      }
    },
    [kakaoLoginMutation, login, isLoginAttempted],
  );

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');
    if (code && !isAuthenticated && !isLoginAttempted) {
      performKakaoLogin(code);
    } else if (!code) {
      setError('카카오 인증 코드가 없습니다.');
      setIsLoading(false);
    }
  }, [isAuthenticated, performKakaoLogin, isLoginAttempted]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/memberhome');
    }
  }, [isAuthenticated, navigate]);

  if (isLoading) {
    return <div>로그인 중...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return null;
};

export default Redirection;

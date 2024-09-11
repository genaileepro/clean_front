import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useKakaoLogin } from '../../hooks/useMembers';
import {
  handleApiError,
  showErrorNotification,
} from '../../utils/errorHandler';

const Redirection: React.FC = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const kakaoLoginMutation = useKakaoLogin();
  const isLoginAttemptedRef = useRef(false);

  useEffect(() => {
    const performKakaoLogin = async (code: string) => {
      if (isLoginAttemptedRef.current) return;
      isLoginAttemptedRef.current = true;

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
        navigate('/login', { state: { error: errorMessage } });
      }
    };

    const code = new URL(window.location.href).searchParams.get('code');
    if (code && !isAuthenticated) {
      performKakaoLogin(code);
    } else if (!code) {
      navigate('/login', { state: { error: '카카오 인증 코드가 없습니다.' } });
    }
  }, [kakaoLoginMutation, login, isAuthenticated, navigate]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/memberhome');
    }
  }, [isAuthenticated, navigate]);

  return <div>로그인 처리 중...</div>;
};

export default Redirection;

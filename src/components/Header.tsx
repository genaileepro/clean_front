import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import icon from '../assets/icon.png'
const Header: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="bg-[#0bb8f9] text-white">
      <div className="container mx-auto flex justify-between items-center p-4 max-w-screen-xl">
        <div className="flex-shrink-0">
          <img
            src={icon}
            alt="Home"
            className="h-12 cursor-pointer"
            onClick={() => navigate('/')}
          />
        </div>
        <div className="flex space-x-4 text-2xl">
          <button className="h-btn" onClick={() => navigate('/service')}>
            서비스 알아보기
          </button>
          <button className="h-btn" onClick={() => navigate('/commissionwrite')}>
            의뢰작성하기
          </button>
          <button className="h-btn" onClick={() => navigate('/commissionlist')}>
            의뢰목록
          </button>
          <button className="h-btn" onClick={() => navigate('/userorders')}>
            견적확인하기
          </button>
        </div>

        <div className="flex items-center">
          {isAuthenticated ? (
            <>
              <button
                className="h-btn"
                onClick={() => navigate('/mypage/:email')}
              >
                마이 페이지
              </button>
              <div className="w-px h-6 bg-white mx-2"></div>
              <button className="h-btn" onClick={handleLogout}>
                Log Out
              </button>
            </>
          ) : (
            <>
              <button className="h-btn text-2xl" onClick={() => navigate('/login')}>
                Log In
              </button>
              <div className="w-px h-6 bg-white mx-2"></div>
              <button className="h-btn text-2xl" onClick={() => navigate('/signup')}>
                회원가입
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;

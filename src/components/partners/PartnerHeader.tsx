import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import icon from '../../assets/icon.png';

const PartnerHeader: React.FC = () => {
  const { isAuthenticated, logout, partner } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="bg-[#144156] text-white">
      <div className="container mx-auto flex justify-between items-center p-4 max-w-screen-xl">
        <div className="flex-shrink-0">
          <img
            src={icon}
            alt="Home"
            className="h-12 cursor-pointer"
            onClick={() => navigate('/pthome')}
          />
        </div>
        {isAuthenticated && (
          <div className="flex space-x-4 text-2xl">
            <button
              className="bg-[#144156]"
              onClick={() => navigate('/commissioncalling')}
            >
              회원 새 의뢰 보기
            </button>
            <button
              className="bg-[#144156]"
              onClick={() => navigate('/myestimates')}
            >
              견적 목록
            </button>
            <button
              className="bg-[#144156]"
              onClick={() => navigate('/commissionmatching')}
            >
              견적매칭 확인하기
            </button>
          </div>
        )}

        <div className="flex items-center">
          {isAuthenticated && partner ? (
            <>
              <button
                className="bg-[#144156]"
                onClick={() => navigate(`/pt/:email`)}
              >
                마이 페이지
              </button>
              <div className="w-px h-6 bg-white mx-2"></div>
              <button className="bg-[#144156]" onClick={handleLogout}>
                로그아웃
              </button>
            </>
          ) : (
            <>
              <button
                className="bg-[#144156] text-2xl"
                onClick={() => navigate('/ptlogin')}
              >
                로그인
              </button>
              <div className="w-px h-6 bg-white mx-2"></div>
              <button
                className="bg-[#144156] text-2xl"
                onClick={() => navigate('/ptsignup')}
              >
                회원가입
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PartnerHeader;

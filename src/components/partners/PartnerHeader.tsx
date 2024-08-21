import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import icon from '../../assets/icon.png';
import { Menu } from 'lucide-react';

const PartnerHeader: React.FC = () => {
  const { isAuthenticated, logout, partner } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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

        {/* 햄버거 메뉴 아이콘 (모바일) */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white">
            <Menu size={24} />
          </button>
        </div>

        {/* 데스크톱 메뉴 */}
        {isAuthenticated && (
          <div className="hidden md:flex space-x-4 text-2xl">
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

        {/* 데스크톱 로그인/회원가입 버튼 */}
        <div className="hidden md:flex items-center">
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
                className="bg-[#144156]"
                onClick={() => navigate('/ptlogin')}
              >
                로그인
              </button>
              <div className="w-px h-6 bg-white mx-2"></div>
              <button
                className="bg-[#144156]"
                onClick={() => navigate('/ptsignup')}
              >
                회원가입
              </button>
            </>
          )}
        </div>

        {/* 모바일 메뉴 */}
        {isMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-[#144156] md:hidden">
            <div className="flex flex-col items-center py-4">
              {isAuthenticated && (
                <>
                  <button
                    className="bg-[#144156] my-2"
                    onClick={() => {
                      navigate('/commissioncalling');
                      toggleMenu();
                    }}
                  >
                    회원 새 의뢰 보기
                  </button>
                  <button
                    className="bg-[#144156] my-2"
                    onClick={() => {
                      navigate('/myestimates');
                      toggleMenu();
                    }}
                  >
                    견적 목록
                  </button>
                  <button
                    className="bg-[#144156] my-2"
                    onClick={() => {
                      navigate('/commissionmatching');
                      toggleMenu();
                    }}
                  >
                    견적매칭 확인하기
                  </button>
                </>
              )}
              {isAuthenticated && partner ? (
                <>
                  <button
                    className="bg-[#144156] my-2"
                    onClick={() => {
                      navigate(`/pt/:email`);
                      toggleMenu();
                    }}
                  >
                    마이 페이지
                  </button>
                  <button
                    className="bg-[#144156] my-2"
                    onClick={() => {
                      handleLogout();
                      toggleMenu();
                    }}
                  >
                    로그아웃
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="bg-[#144156] my-2"
                    onClick={() => {
                      navigate('/ptlogin');
                      toggleMenu();
                    }}
                  >
                    로그인
                  </button>
                  <button
                    className="bg-[#144156] my-2"
                    onClick={() => {
                      navigate('/ptsignup');
                      toggleMenu();
                    }}
                  >
                    회원가입
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PartnerHeader;

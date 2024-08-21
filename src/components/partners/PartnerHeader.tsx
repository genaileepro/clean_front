import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import icon from '../../assets/icon.png';
import { Menu, X } from 'lucide-react';

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

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

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
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
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
          {isAuthenticated ? (
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
        <div
          className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex flex-col h-full">
            <div className="flex justify-end p-4">
              <button onClick={toggleMenu} className="text-black">
                <X size={24} />
              </button>
            </div>
            {/* 최상단 문구 */}
            <div className="p-4 border-b border-gray-200">
              {isAuthenticated && partner ? (
                <p className="text-black text-xl">
                  {partner.managerName}님 환영합니다!
                </p>
              ) : (
                <a
                  href="/ptlogin"
                  className="text-black text-xl hover:underline"
                >
                  로그인하러 가기
                </a>
              )}
            </div>
            <div className="flex flex-col items-start p-4 space-y-4">
              {isAuthenticated && (
                <>
                  <div
                    className="w-full p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      navigate('/commissioncalling');
                      toggleMenu();
                    }}
                  >
                    <span className="text-black text-xl">
                      회원 새 의뢰 보기
                    </span>
                  </div>
                  <div
                    className="w-full p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      navigate('/myestimates');
                      toggleMenu();
                    }}
                  >
                    <span className="text-black text-xl">견적 목록</span>
                  </div>
                  <div
                    className="w-full p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      navigate('/commissionmatching');
                      toggleMenu();
                    }}
                  >
                    <span className="text-black text-xl">
                      견적매칭 확인하기
                    </span>
                  </div>
                </>
              )}
              {isAuthenticated ? (
                <>
                  <div
                    className="w-full p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      navigate(`/pt/:email`);
                      toggleMenu();
                    }}
                  >
                    <span className="text-black text-xl">마이 페이지</span>
                  </div>
                  <div
                    className="w-full p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      handleLogout();
                      toggleMenu();
                    }}
                  >
                    <span className="text-black text-xl">로그아웃</span>
                  </div>
                </>
              ) : (
                <>
                  <div
                    className="w-full p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      navigate('/ptlogin');
                      toggleMenu();
                    }}
                  >
                    <span className="text-black text-xl">로그인</span>
                  </div>
                  <div
                    className="w-full p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      navigate('/ptsignup');
                      toggleMenu();
                    }}
                  >
                    <span className="text-black text-xl">회원가입</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Overlay */}
        {isMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={toggleMenu}
          ></div>
        )}
      </div>
    </div>
  );
};

export default PartnerHeader;

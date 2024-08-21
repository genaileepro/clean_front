import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import icon from '../../assets/icon.png';
import { Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
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

        {/* 햄버거 메뉴 아이콘 (모바일) */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* 데스크톱 메뉴 */}
        <div className="hidden md:flex space-x-4 text-2xl">
          <button className="h-btn" onClick={() => navigate('/')}>
            홈
          </button>
          <button className="h-btn" onClick={() => navigate('/service')}>
            서비스 알아보기
          </button>
          <button className="h-btn" onClick={() => navigate('/ptrecruitment')}>
            파트너를 모집해요
          </button>
        </div>

        {/* 데스크톱 로그인/회원가입 버튼 */}
        <div className="hidden md:flex items-center">
          {isAuthenticated ? (
            <>
              <button
                className="h-btn"
                onClick={() => navigate('/member/:email')}
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
              <button
                className="h-btn text-2xl"
                onClick={() => navigate('/loginselect')}
              >
                로그인
              </button>
              <div className="w-px h-6 bg-white mx-2"></div>
              <button
                className="h-btn text-2xl"
                onClick={() => navigate('/signupselect')}
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
              {!isAuthenticated && (
                <a
                  href="/loginselect"
                  className="text-black text-xl hover:underline"
                >
                  로그인하러 가기
                </a>
              )}
            </div>
            <div className="flex flex-col items-start p-4 space-y-4">
              <div
                className="w-full p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  navigate('/');
                  toggleMenu();
                }}
              >
                <span className="text-black text-xl">홈</span>
              </div>
              <div
                className="w-full p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  navigate('/service');
                  toggleMenu();
                }}
              >
                <span className="text-black text-xl">서비스 알아보기</span>
              </div>
              <div
                className="w-full p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  navigate('/ptrecruitment');
                  toggleMenu();
                }}
              >
                <span className="text-black text-xl">파트너를 모집해요</span>
              </div>
              {isAuthenticated ? (
                <>
                  <div
                    className="w-full p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      navigate('/member/:email');
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
                    <span className="text-black text-xl">Log Out</span>
                  </div>
                </>
              ) : (
                <>
                  <div
                    className="w-full p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      navigate('/loginselect');
                      toggleMenu();
                    }}
                  >
                    <span className="text-black text-xl">로그인</span>
                  </div>
                  <div
                    className="w-full p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      navigate('/signupselect');
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

export default Header;

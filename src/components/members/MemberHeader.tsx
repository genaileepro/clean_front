import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import icon from '../../assets/icon.png';
import { Menu } from 'lucide-react';

const MemberHeader: React.FC = () => {
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

  return (
    <div className="bg-[#0bb8f9] text-white">
      <div className="container mx-auto flex justify-between items-center p-4 max-w-screen-xl">
        <div className="flex-shrink-0">
          <img
            src={icon}
            alt="Home"
            className="h-12 cursor-pointer"
            onClick={() => navigate('/memberhome')}
          />
        </div>

        {/* 햄버거 메뉴 아이콘 (모바일) */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white">
            <Menu size={24} />
          </button>
        </div>

        {/* 데스크톱 메뉴 */}
        <div className="hidden md:flex space-x-4 text-2xl">
          <button className="h-btn" onClick={() => navigate('/memberhome')}>
            홈
          </button>
          <button
            className="h-btn"
            onClick={() => navigate('/commissionwrite')}
          >
            의뢰작성하기
          </button>
          <button className="h-btn" onClick={() => navigate('/commissionlist')}>
            의뢰목록
          </button>
        </div>

        {/* 데스크톱 로그인/회원가입 버튼 */}
        <div className="hidden md:flex items-center ">
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
                className="h-btn"
                onClick={() => navigate('/loginselect')}
              >
                로그인
              </button>
              <div className="w-px h-6 bg-white mx-2"></div>
              <button
                className="h-btn"
                onClick={() => navigate('/signupselect')}
              >
                회원가입
              </button>
            </>
          )}
        </div>

        {/* 모바일 메뉴 */}
        {isMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-[#0bb8f9] md:hidden">
            <div className="flex flex-col items-center py-4">
              <button
                className="h-btn my-2"
                onClick={() => {
                  navigate('/memberhome');
                  toggleMenu();
                }}
              >
                홈
              </button>
              <button
                className="h-btn my-2"
                onClick={() => {
                  navigate('/commissionwrite');
                  toggleMenu();
                }}
              >
                의뢰작성하기
              </button>
              <button
                className="h-btn my-2"
                onClick={() => {
                  navigate('/commissionlist');
                  toggleMenu();
                }}
              >
                의뢰목록
              </button>
              {isAuthenticated ? (
                <>
                  <button
                    className="h-btn my-2"
                    onClick={() => {
                      navigate('/member/:email');
                      toggleMenu();
                    }}
                  >
                    마이 페이지
                  </button>
                  <button
                    className="h-btn my-2"
                    onClick={() => {
                      handleLogout();
                      toggleMenu();
                    }}
                  >
                    Log Out
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="h-btn my-2"
                    onClick={() => {
                      navigate('/loginselect');
                      toggleMenu();
                    }}
                  >
                    로그인
                  </button>
                  <button
                    className="h-btn my-2"
                    onClick={() => {
                      navigate('/signupselect');
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

export default MemberHeader;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import icon from '../../assets/icon.png';
import {
  Menu,
  X,
  Home,
  FileText,
  List,
  Send,
  User,
  LogOut,
} from 'lucide-react';
import { motion } from 'framer-motion';

const MemberHeader: React.FC = () => {
  const { isAuthenticated, logout, member } = useAuth();
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

  const menuItems = [
    { title: '홈', icon: <Home size={20} />, path: '/memberhome' },
    {
      title: '의뢰작성하기',
      icon: <FileText size={20} />,
      path: '/commissionwrite',
    },
    { title: '의뢰 목록', icon: <List size={20} />, path: '/commissionlist' },
    {
      title: '발송 목록',
      icon: <Send size={20} />,
      path: '/commissionsendlist',
    },
  ];

  return (
    <motion.div
      className="bg-brand text-white shadow-lg"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto flex justify-between items-center p-4 max-w-screen-xl">
        <motion.img
          src={icon}
          alt="Home"
          className="h-12 cursor-pointer"
          onClick={() => navigate('/memberhome')}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        />

        <div className="md:hidden">
          <motion.button
            onClick={toggleMenu}
            className="text-white"
            whileTap={{ scale: 0.95 }}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        <div className="hidden md:flex space-x-4 items-center">
          {menuItems.map((item, index) => (
            <motion.button
              key={index}
              className="flex items-center space-x-1 px-3 py-2 rounded-md hover:bg-brand-dark transition-colors duration-200"
              onClick={() => navigate(item.path)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {item.icon}
              <span>{item.title}</span>
            </motion.button>
          ))}
          {isAuthenticated && (
            <>
              <motion.button
                className="flex items-center space-x-1 px-3 py-2 rounded-md hover:bg-brand-dark transition-colors duration-200"
                onClick={() => navigate('/member/:email')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <User size={20} />
                <span>마이 페이지</span>
              </motion.button>
              <motion.button
                className="flex items-center space-x-1 px-3 py-2 rounded-md hover:bg-brand-dark transition-colors duration-200"
                onClick={handleLogout}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <LogOut size={20} />
                <span>로그아웃</span>
              </motion.button>
            </>
          )}
        </div>

        <motion.div
          className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          initial={false}
          animate={isMenuOpen ? 'open' : 'closed'}
          variants={{
            open: { x: 0 },
            closed: { x: '100%' },
          }}
        >
          {/* 모바일 메뉴 내용 */}
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
                {isAuthenticated && member ? (
                  <p className="text-black text-xl">
                    {member.nick}님 환영합니다!
                  </p>
                ) : (
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
                    navigate('/memberhome');
                    toggleMenu();
                  }}
                >
                  <span className="text-black text-xl">홈</span>
                </div>
                <div
                  className="w-full p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    navigate('/commissionwrite');
                    toggleMenu();
                  }}
                >
                  <span className="text-black text-xl">의뢰작성하기</span>
                </div>
                <div
                  className="w-full p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    navigate('/commissionlist');
                    toggleMenu();
                  }}
                >
                  <span className="text-black text-xl">의뢰목록</span>
                </div>
                <div
                  className="w-full p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    navigate('/commissionsendlist');
                    toggleMenu();
                  }}
                >
                  <span className="text-black text-xl">발송 목록</span>
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
        </motion.div>

        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={toggleMenu}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </div>
    </motion.div>
  );
};

export default MemberHeader;

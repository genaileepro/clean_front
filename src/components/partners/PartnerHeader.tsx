import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import icon from '../../assets/icon.png';
import {
  Menu,
  X,
  FileText,
  List,
  CheckSquare,
  User,
  LogOut,
  LogIn,
  UserPlus,
} from 'lucide-react';
import { motion } from 'framer-motion';

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

  const menuItems = isAuthenticated
    ? [
        {
          title: '회원 새 의뢰 보기',
          icon: <FileText size={20} />,
          path: '/commissioncalling',
        },
        { title: '견적 목록', icon: <List size={20} />, path: '/myestimates' },
        {
          title: '견적매칭 확인하기',
          icon: <CheckSquare size={20} />,
          path: '/commissionmatching',
        },
      ]
    : [];

  return (
    <motion.div
      className="bg-[#144156] text-white shadow-lg"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto flex justify-between items-center p-4 max-w-screen-xl">
        <motion.img
          src={icon}
          alt="Home"
          className="h-12 cursor-pointer"
          onClick={() => navigate('/pthome')}
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
              className="flex items-center space-x-1 px-3 py-2 rounded-md hover:bg-[#1c5a75] transition-colors duration-200"
              onClick={() => navigate(item.path)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {item.icon}
              <span>{item.title}</span>
            </motion.button>
          ))}
          {isAuthenticated ? (
            <>
              <motion.button
                className="flex items-center space-x-1 px-3 py-2 rounded-md hover:bg-[#1c5a75] transition-colors duration-200"
                onClick={() => navigate(`/pt/:email`)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <User size={20} />
                <span>마이 페이지</span>
              </motion.button>
              <motion.button
                className="flex items-center space-x-1 px-3 py-2 rounded-md hover:bg-[#1c5a75] transition-colors duration-200"
                onClick={handleLogout}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <LogOut size={20} />
                <span>로그아웃</span>
              </motion.button>
            </>
          ) : (
            <>
              <motion.button
                className="flex items-center space-x-1 px-3 py-2 rounded-md hover:bg-[#1c5a75] transition-colors duration-200"
                onClick={() => navigate('/ptlogin')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <LogIn size={20} />
                <span>로그인</span>
              </motion.button>
              <motion.button
                className="flex items-center space-x-1 px-3 py-2 rounded-md hover:bg-[#1c5a75] transition-colors duration-200"
                onClick={() => navigate('/ptsignup')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <UserPlus size={20} />
                <span>회원가입</span>
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
          <div className="flex flex-col h-full">
            <div className="flex justify-end p-4">
              <button onClick={toggleMenu} className="text-[#144156]">
                <X size={24} />
              </button>
            </div>
            <div className="p-4 border-b border-gray-200">
              {isAuthenticated && partner ? (
                <p className="text-[#144156] text-xl">
                  {partner.managerName}님 환영합니다!
                </p>
              ) : (
                <a
                  href="/ptlogin"
                  className="text-[#144156] text-xl hover:underline"
                >
                  로그인하러 가기
                </a>
              )}
            </div>
            <div className="flex flex-col items-start p-4 space-y-4">
              {menuItems.map((item, index) => (
                <motion.div
                  key={index}
                  className="w-full p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    navigate(item.path);
                    toggleMenu();
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-[#144156] text-xl flex items-center">
                    {item.icon}
                    <span className="ml-2">{item.title}</span>
                  </span>
                </motion.div>
              ))}
              {isAuthenticated ? (
                <>
                  <motion.div
                    className="w-full p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      navigate(`/pt/:email`);
                      toggleMenu();
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="text-[#144156] text-xl flex items-center">
                      <User size={20} />
                      <span className="ml-2">마이 페이지</span>
                    </span>
                  </motion.div>
                  <motion.div
                    className="w-full p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      handleLogout();
                      toggleMenu();
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="text-[#144156] text-xl flex items-center">
                      <LogOut size={20} />
                      <span className="ml-2">로그아웃</span>
                    </span>
                  </motion.div>
                </>
              ) : (
                <>
                  <motion.div
                    className="w-full p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      navigate('/ptlogin');
                      toggleMenu();
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="text-[#144156] text-xl flex items-center">
                      <LogIn size={20} />
                      <span className="ml-2">로그인</span>
                    </span>
                  </motion.div>
                  <motion.div
                    className="w-full p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      navigate('/ptsignup');
                      toggleMenu();
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="text-[#144156] text-xl flex items-center">
                      <UserPlus size={20} />
                      <span className="ml-2">회원가입</span>
                    </span>
                  </motion.div>
                </>
              )}
            </div>
          </div>
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

export default PartnerHeader;

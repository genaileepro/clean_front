import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { motion } from 'framer-motion';
import { User, Briefcase } from 'lucide-react';

const SignUpSelector: React.FC = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 120,
        damping: 10,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <motion.div
        className="w-full max-w-md bg-white shadow-lg rounded-2xl overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="p-8">
          <motion.img
            src={logo}
            alt="깔끔한방 로고"
            className="w-full h-auto max-h-[150px] object-contain mb-8"
            variants={itemVariants}
          />
          <motion.h2
            className="text-2xl font-bold text-center mb-6 text-gray-800"
            variants={itemVariants}
          >
            회원가입 유형을 선택해 주세요
          </motion.h2>
          <div className="space-y-4">
            <motion.button
              className="w-full flex items-center justify-center bg-brand hover:bg-brand-dark text-white py-3 px-6 rounded-lg text-lg transition duration-300 ease-in-out transform hover:scale-105"
              onClick={() => navigate('/signup')}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <User className="mr-2" size={24} />
              고객 회원가입
            </motion.button>
            <motion.button
              className="w-full flex items-center justify-center bg-[#144156] hover:bg-[#1c5a75] text-white py-3 px-6 rounded-lg text-lg transition duration-300 ease-in-out transform hover:scale-105"
              onClick={() => navigate('/ptsignup')}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Briefcase className="mr-2" size={24} />
              파트너 회원가입
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUpSelector;

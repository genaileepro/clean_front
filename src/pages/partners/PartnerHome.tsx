import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { motion } from 'framer-motion';
import {
  Briefcase,
  Calendar,
  MessageSquare,
  BarChart,
  ArrowRight,
  Star,
} from 'lucide-react';

const FeatureCard: React.FC<{
  title: string;
  description: string;
  icon: React.ReactNode;
}> = ({ title, description, icon }) => (
  <motion.div
    className="bg-white p-6 rounded-lg shadow-lg"
    whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
  >
    <div className="flex items-center mb-4">
      {icon}
      <h3 className="text-xl font-bold ml-2">{title}</h3>
    </div>
    <p className="text-gray-600">{description}</p>
  </motion.div>
);

const PartnerHome: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: '새 의뢰 보기',
      description: '고객의 청소 의뢰를 확인하고, 견적을 제안하세요.',
      icon: <Briefcase className="text-[#0bb8f9]" size={24} />,
    },
    {
      title: '진행 중인 의뢰',
      description: '현재 진행 중인 청소 의뢰를 관리하세요.',
      icon: <Calendar className="text-[#0bb8f9]" size={24} />,
    },
    {
      title: '완료된 의뢰',
      description: '청소내역 관리와 고객 피드백을 확인하세요.',
      icon: <Star className="text-[#0bb8f9]" size={24} />,
    },
    {
      title: '메시지 센터',
      description: '준비중입니다.',
      icon: <MessageSquare className="text-[#0bb8f9]" size={24} />,
    },
    {
      title: '통계 및 리포트',
      description: '준비중입니다.',
      icon: <BarChart className="text-[#0bb8f9]" size={24} />,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <motion.header
        className="text-center mb-12"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <img
          src={logo}
          alt="깔끔한방 로고"
          className="mx-auto w-64 h-auto mb-8"
        />
        <h1 className="text-4xl font-bold mb-4 text-gray-800">
          파트너 페이지에 오신 전문가님을 환영합니다!
        </h1>
        <p className="text-xl text-gray-600">
          깔끔한 방과 함께 성장하는 여정을 시작하세요.
        </p>
      </motion.header>

      <motion.section
        className="mb-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
          주요 기능
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </motion.section>

      <motion.section
        className="mb-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
          새로운 청소 의뢰
        </h2>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <ul className="list-disc list-inside space-y-2">
            <li>의뢰 1: 의뢰 내용 요약, 고객 이름, 날짜</li>
            <li>의뢰 2: 의뢰 내용 요약, 고객 이름, 날짜</li>
          </ul>
          <motion.button
            onClick={() => navigate('/commissioncalling')}
            className="mt-4 bg-[#0bb8f9] text-white py-2 px-4 rounded-md hover:bg-[#0aa8e9] transition duration-300 flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            더 많은 의뢰 보기 <ArrowRight size={20} className="ml-2" />
          </motion.button>
        </div>
      </motion.section>

      <motion.section
        className="mb-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
          일정 관리
        </h2>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold mb-4">오늘의 일정:</h3>
          <ul className="list-disc list-inside mb-4">
            <li>일정 1: 고객 이름, 시간, 장소</li>
            <li>일정 2: 고객 이름, 시간, 장소</li>
          </ul>
          <h3 className="text-xl font-bold mb-4">향후 일정:</h3>
          <ul className="list-disc list-inside mb-4">
            <li>일정 1: 날짜, 고객 이름, 장소</li>
            <li>일정 2: 날짜, 고객 이름, 장소</li>
          </ul>
          <motion.button
            className="bg-[#0bb8f9] text-white py-2 px-4 rounded-md hover:bg-[#0aa8e9] transition duration-300 flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            새 일정 추가 <ArrowRight size={20} className="ml-2" />
          </motion.button>
        </div>
      </motion.section>

      <motion.section
        className="mb-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
          고객 피드백
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              name: '고객 A',
              rating: 5,
              content:
                '청소가 정말 깔끔하게 잘 되었어요. 다음에도 꼭 부탁드릴게요!',
            },
            {
              name: '고객 B',
              rating: 4,
              content:
                '전반적으로 만족스러웠습니다. 다음엔 욕실 청소에 좀 더 신경 써주시면 좋겠어요.',
            },
          ].map((feedback, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg"
              whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
            >
              <div className="flex items-center mb-2">
                {[...Array(feedback.rating)].map((_, i) => (
                  <Star key={i} className="text-yellow-400" size={20} />
                ))}
              </div>
              <p className="text-gray-600 mb-2">"{feedback.content}"</p>
              <p className="text-right text-gray-500">- {feedback.name}</p>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-6">
          <motion.button
            className="bg-[#0bb8f9] text-white py-2 px-4 rounded-md hover:bg-[#0aa8e9] transition duration-300 flex items-center mx-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            더 많은 피드백 보기 <ArrowRight size={20} className="ml-2" />
          </motion.button>
        </div>
      </motion.section>

      <motion.section
        className="mb-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
          통계 및 리포트
        </h2>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-[#0bb8f9]">₩1,200,000</p>
              <p className="text-gray-600">이번 달 수익</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-[#0bb8f9]">25건</p>
              <p className="text-gray-600">총 의뢰 수</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-[#0bb8f9]">4.8/5</p>
              <p className="text-gray-600">고객 만족도</p>
            </div>
          </div>
        </div>
      </motion.section>

      <footer className="bg-[#144156] text-white p-8 rounded-lg">
        <footer className="bg-[#144156] text-white p-8 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">깔끔한방</h3>
              <p>청소 전문가가 당신의 집을 빛나게 만듭니다.</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">빠른 링크</h3>
              <nav className="space-y-2">
                <button
                  onClick={() => navigate('/')}
                  className="block text-gray-300 hover:text-white"
                >
                  홈
                </button>
                <button
                  onClick={() => navigate('/commissionwrite')}
                  className="block text-gray-300 hover:text-white"
                >
                  의뢰작성하기
                </button>
                <button
                  onClick={() => navigate('/commissionlist')}
                  className="block text-gray-300 hover:text-white"
                >
                  의뢰작성목록
                </button>
                <button
                  onClick={() => navigate('/userorders')}
                  className="block text-gray-300 hover:text-white"
                >
                  견적확인하기
                </button>
              </nav>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-sm text-gray-400">
            <p>
              <strong>상호명:</strong> 아이크(AIC) | <strong>대표자명:</strong>{' '}
              이대성 | <strong>사업장주소:</strong> 강원 특별자치도 춘천시
              영서로 2922
            </p>
            <p>
              <strong>사업자등록번호:</strong> 822-15-01913 |{' '}
              <strong>대표전화번호:</strong> 070-7954-3805 |{' '}
              <strong>대표이메일:</strong>{' '}
              <a href="mailto:leepro@ai-c.kr" className="underline">
                leepro@ai-c.kr
              </a>
            </p>
            <p className="mt-4">
              고객 센터: 070-7954-3805 | 이메일:{' '}
              <a href="mailto:leepro@ai-c.kr" className="underline">
                leepro@ai-c.kr
              </a>
            </p>
          </div>
        </footer>
      </footer>
    </div>
  );
};

export default PartnerHome;

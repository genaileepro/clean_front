import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { motion } from 'framer-motion';
import { Calendar, Home, Briefcase, Star } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  description: string;
  detailText: string;
  icon: React.ReactNode;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  detailText,
  icon,
}) => (
  <motion.div
    className="bg-white border rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl"
    whileHover={{ y: -5 }}
  >
    <div className="flex items-center mb-4">
      {icon}
      <h3 className="text-xl text-[#0bb8f9] font-bold ml-2">{title}</h3>
    </div>
    <p className="text-gray-600 mb-4">{description}</p>
    <a href="#" className="text-[#0bb8f9] font-bold hover:underline">
      {detailText}
    </a>
  </motion.div>
);

const MemberHome: React.FC = () => {
  const navigate = useNavigate();

  const services: ServiceCardProps[] = [
    {
      title: '특수청소',
      description:
        '특수청소로 새롭게 태어나는 공간. 쌓여 있는 걱정과 함께 청소를 시작하세요.',
      detailText: '자세히 알아보기',
      icon: <Briefcase size={24} className="text-[#0bb8f9]" />,
    },
    {
      title: '일반청소',
      description: '매일 깨끗한 집! 일상 속 청결을 유지하는 일반 청소 서비스.',
      detailText: '자세히 알아보기',
      icon: <Home size={24} className="text-[#0bb8f9]" />,
    },
    {
      title: '입주청소',
      description:
        '새로운 집, 깨끗한 시작! 입주 청소로 완벽한 첫날을 준비하세요.',
      detailText: '자세히 알아보기',
      icon: <Calendar size={24} className="text-[#0bb8f9]" />,
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
          여러분도 깔끔한 방을 누릴 수 있습니다!
        </h1>
        <p className="text-xl text-gray-600">
          청소 전문가가 당신의 집을 빛나게 만듭니다.
        </p>
      </motion.header>

      <motion.section
        className="mb-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {['지금 예약하기', '서비스 알아보기', '사업자등록 알아보기'].map(
            (text, index) => (
              <motion.button
                key={index}
                onClick={() =>
                  navigate(
                    index === 0
                      ? '/commissionwrite'
                      : index === 1
                        ? '/service'
                        : '/ptrecruitment',
                  )
                }
                className="bg-[#0bb8f9] text-white py-3 px-6 rounded-md hover:bg-[#0aa8e9] transition duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {text}
              </motion.button>
            ),
          )}
        </div>
      </motion.section>

      <motion.section
        className="mb-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
          우리의 청소 서비스
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </motion.section>

      <motion.section
        className="mb-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
          왜 깔끔한 방인가요?
        </h2>
        <ul className="list-disc list-inside space-y-4 text-lg text-gray-700">
          <li>
            빠르고 간편한 청소 예약: 클릭 몇 번으로 청소 전문가와 연결됩니다.
          </li>
          <li>전문가의 손길: 청소 전문가가 당신의 집을 완벽하게 관리합니다.</li>
          <li>시간 절약: 청소는 깔끔한 방이, 당신은 소중한 일을.</li>
        </ul>
      </motion.section>

      <motion.section
        className="mb-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
          고객 후기
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: '김지현',
              review:
                '서비스가 정말 만족스러웠어요! 제 방이 새 집처럼 변했어요.',
            },
            {
              name: '박민수',
              review: '특수청소 덕분에 오랜 걱정거리가 사라졌습니다.',
            },
            {
              name: '이수민',
              review: '입주 청소 덕분에 편안하게 새 집으로 이사했어요.',
            },
          ].map((review, index) => (
            <motion.div
              key={index}
              className="bg-gray-100 p-6 rounded-lg shadow"
              whileHover={{ y: -5 }}
            >
              <Star className="text-yellow-400 mb-2" size={24} />
              <p className="text-gray-700 mb-4">"{review.review}"</p>
              <p className="text-right text-gray-600">- {review.name}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section
        className="text-center mb-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-4 text-gray-800">
          깔끔한 방과 함께 청결함을 유지하세요!
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          지금 바로 청소 서비스를 예약하고 깨끗한 생활을 시작하세요.
        </p>
        <motion.button
          onClick={() => navigate('/commissionwrite')}
          className="bg-[#0bb8f9] text-white py-3 px-8 rounded-md text-xl hover:bg-[#0aa8e9] transition duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          지금 예약하기
        </motion.button>
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

export default MemberHome;

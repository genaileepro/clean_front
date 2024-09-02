import React from 'react';
import { useNavigate } from 'react-router-dom';
import gavageRoom from '../../assets/gavageRoom.png';
import cleanExpress from '../../assets/cleanExpress.png';
import cleanLiving from '../../assets/cleanLiving.png';
import logo from '../../assets/logo.png';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, HelpCircle } from 'lucide-react';

const ServicePage: React.FC = () => {
  const navigate = useNavigate();

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <div className="container mx-auto max-w-screen-xl px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <img
          src={logo}
          alt="깔끔한방 로고"
          className="mx-auto w-48 h-auto mb-8"
        />
        <h1 className="text-4xl font-bold mb-4">우리의 청소 서비스</h1>
        <p className="text-xl text-gray-600 mb-8">
          깔끔한 방이 제공하는 다양한 청소 서비스를 알아보세요.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-brand text-white py-3 px-6 rounded-full text-lg font-semibold hover:bg-brand-dark transition duration-300"
          onClick={() => navigate('/signup')}
        >
          지금 회원가입 하기{' '}
          <ArrowRight className="inline-block ml-2" size={20} />
        </motion.button>
      </motion.div>

      <motion.section
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        className="mb-16"
      >
        <h2 className="text-3xl font-bold mb-8 text-center">
          청소 서비스 종류
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: '특수청소',
              image: gavageRoom,
              description:
                '누적된 쓰레기 및 오염물 제거, 깊이 있는 소독 및 방역',
            },
            {
              title: '일반청소',
              image: cleanLiving,
              description:
                '주방, 화장실, 거실 등 일반 공간 청소, 먼지 제거 및 진공 청소',
            },
            {
              title: '입주청소',
              image: cleanExpress,
              description:
                '빈 집 청소 및 새 집 준비, 창문, 바닥, 벽 등 전체 청소',
            },
          ].map((service, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg"
              whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
            >
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        className="mb-16"
      >
        <h2 className="text-3xl font-bold mb-8 text-center">
          서비스 이용 절차
        </h2>
        <div className="max-w-2xl mx-auto">
          {[
            '서비스 요청: 청소 요구사항을 입력하여 서비스 요청을 올립니다.',
            '견적 비교: 여러 업체의 견적을 비교하고, 원하는 서비스를 선택.',
            '예약 확정: 선택한 청소 업체와 예약을 확정합니다.',
            '청소 진행: 선택한 날짜에 청소 서비스가 진행됩니다.',
            '피드백 제공: 청소 완료 후 서비스에 대한 피드백을 남겨주세요.',
          ].map((step, index) => (
            <div key={index} className="flex items-start mb-4">
              <div className="bg-brand text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">
                {index + 1}
              </div>
              <p className="text-lg">{step}</p>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        className="mb-16"
      >
        <h2 className="text-3xl font-bold mb-8 text-center">
          왜 '깔끔한방' 인가요?
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {[
            '다양한 견적 비교: 여러 청소 업체의 견적을 한눈에 비교!',
            '맞춤형 청소 계획: 고객의 필요에 맞춘 청소를 제공합니다.',
            '시간 절약: 청소는 깔끔한방, 고객님은 소중한 일상에 집중!',
            '지친 하루의 끝을 쾌적한 방에서 마무리 하세요!',
          ].map((benefit, index) => (
            <motion.div
              key={index}
              className="flex items-start"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <CheckCircle
                className="text-brand mr-2 flex-shrink-0"
                size={24}
              />
              <p className="text-lg">{benefit}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        className="mb-16"
      >
        <h2 className="text-3xl font-bold mb-8 text-center">실제 고객 후기</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: '박민수',
              review:
                '특수청소 덕분에 오랜 걱정거리가 사라졌습니다. 감사합니다!',
            },
            {
              name: '이수민',
              review:
                '입주청소로 새 집을 완벽하게 준비할 수 있었어요. 정말 만족합니다.',
            },
            {
              name: '김지현',
              review:
                '일반청소 서비스를 이용한 후로 매일 깨끗한 집에서 살고 있습니다.',
            },
          ].map((review, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg"
              whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
            >
              <p className="text-gray-600 mb-4">"{review.review}"</p>
              <p className="font-semibold">- {review.name}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        className="mb-16"
      >
        <h2 className="text-3xl font-bold mb-8 text-center">자주 묻는 질문</h2>
        <div className="max-w-2xl mx-auto">
          {[
            {
              question: '청소 요청은 어떻게 하나요?',
              answer:
                '홈페이지나 앱을 통해 간편하게 요청할 수 있습니다. (앱은 현재 준비중입니다)',
            },
            {
              question: '견적은 어떻게 비교하나요?',
              answer: '여러 청소 업체의 견적을 한눈에 비교할 수 있습니다.',
            },
            {
              question: '청소 시간은 얼마나 걸리나요?',
              answer:
                '청소 종류와 집의 크기에 따라 다르지만, 일반적으로 4-6시간이 소요됩니다.',
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h3 className="text-xl font-semibold mb-2 flex items-center">
                <HelpCircle className="text-brand mr-2" size={24} />
                {item.question}
              </h3>
              <p className="text-gray-600">{item.answer}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        className="text-center mb-16"
      >
        <h2 className="text-3xl font-bold mb-4">
          지금 바로 견적을 받아보세요!
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          청결한 생활을 시작하는 가장 간단한 방법
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-brand text-white py-3 px-6 rounded-full text-lg font-semibold hover:bg-brand-dark transition duration-300"
          onClick={() => navigate('/login')}
        >
          지금 요청하러 가기{' '}
          <ArrowRight className="inline-block ml-2" size={20} />
        </motion.button>
      </motion.section>

      <footer className="bg-gray-800 text-white p-8 rounded-lg">
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">깔끔한방</h3>
            <p>청소 전문가가 당신의 집을 빛나게 만듭니다.</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-4">빠른 링크</h3>
            <nav className="space-y-2">
              <a href="#" className="block text-gray-300 hover:text-white">
                홈
              </a>
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
            이대성 | <strong>사업장주소:</strong> 강원 특별자치도 춘천시 영서로
            2922
          </p>
          <p>
            <strong>사업자등록번호:</strong> 822-15-01913 |{' '}
            <strong>대표전화번호:</strong> 070-7954-3805 |{' '}
            <strong>대표이메일:</strong>{' '}
            <a href="mailto:support@cleanroom.com" className="underline">
              support@cleanroom.com
            </a>
          </p>
          <p className="mt-4">
            고객 센터: 070-7954-3805 | 이메일:{' '}
            <a href="mailto:support@cleanroom.com" className="underline">
              support@cleanroom.com
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ServicePage;

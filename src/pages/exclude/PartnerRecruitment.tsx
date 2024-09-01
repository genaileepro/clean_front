import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, HelpCircle } from 'lucide-react';

const PartnerRecruitment: React.FC = () => {
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
        <h1 className="text-4xl font-bold mb-4">
          깔끔한 방과 함께 성장하세요!
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          우리와 함께 청소 서비스를 제공할 파트너를 모집합니다.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-brand text-white py-3 px-6 rounded-full text-lg font-semibold hover:bg-brand-dark transition duration-300"
          onClick={() => navigate('/ptsignup')}
        >
          지금 사업자 등록하러 가기{' '}
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
          파트너가 되는 이유
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: '더 많은 고객 확보',
              description: '고객 매칭으로 누리는 더 많은 비즈니스 기회',
            },
            {
              title: '안정적인 수익',
              description: '합리적인 청소 견적을 통해 안정적인 수익 창출',
            },
            {
              title: '유연한 업무 일정',
              description: '원하는 시간과 장소 등 자유로운 일정 조율',
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg"
              whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
            >
              <CheckCircle className="text-brand mb-4" size={32} />
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
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
          파트너 가입 절차
        </h2>
        <div className="max-w-2xl mx-auto">
          {[
            '가입 신청: 온라인 신청서를 작성하여 제출하세요.',
            '서류 제출: 필요한 서류를 업로드하세요.',
            '심사 및 승인: 제출된 서류를 검토하고 승인을 받으세요.',
            '서비스 시작: 청소 서비스를 시작하고 고객 요청을 받으세요.',
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
          파트너 성공 사례
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: '김사장',
              company: 'ABC 청소업체',
              testimonial: '깔끔한 방과 함께 매출이 50% 증가했습니다.',
            },
            {
              name: '박사장',
              company: 'XYZ 청소업체',
              testimonial:
                '정기적인 요청으로 안정적인 수익을 창출하고 있습니다.',
            },
            {
              name: '이사장',
              company: 'LMN 청소업체',
              testimonial:
                '파트너 교육 덕분에 고객 만족도가 크게 향상되었습니다.',
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg"
              whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
            >
              <p className="text-gray-600 mb-4">"{item.testimonial}"</p>
              <p className="font-semibold">{item.name}</p>
              <p className="text-sm text-gray-500">{item.company}</p>
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
              question: '파트너 가입 조건은 무엇인가요?',
              answer: '전문자격을 갖춘 업체라면 누구나 신청할 수 있습니다.',
            },
            {
              question: '수수료는 어떻게 되나요?',
              answer: '청소 서비스 완료 시 일정 비율의 수수료를 부과합니다.',
            },
            {
              question: '고객 불만 사항은 어떻게 처리하나요?',
              answer:
                '고객 지원 팀이 즉각 대응하며, 문제 해결을 위한 가이드를 제공합니다.',
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
          지금 바로 파트너로 가입하세요!
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          깔끔한 방과 함께 더 많은 고객에게 다가가세요.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-brand text-white py-3 px-6 rounded-full text-lg font-semibold hover:bg-brand-dark transition duration-300"
          onClick={() => navigate('/ptsignup')}
        >
          지금 바로 사업자 등록하기{' '}
          <ArrowRight className="inline-block ml-2" size={20} />
        </motion.button>
      </motion.section>

      <footer className="bg-gray-800 text-white p-8 rounded-lg">
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

export default PartnerRecruitment;

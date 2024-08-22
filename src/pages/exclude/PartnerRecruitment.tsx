import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';

const PartnerRecruitment: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto max-w-screen-xl mt-12">
      <div className="p-6 hidden sm:block">
        <img
          src={logo}
          alt="깔끔한방 로고"
          className="w-full h-auto max-h-[300px] object-contain"
        />
      </div>
      {/* 히어로 섹션 */}
      <section className="text-center my-12">
        <div className="font-[JalnanGothic]">
          <h1 className="text-4xl">깔끔한 방과 함께 성장하세요!</h1>
          <p className="text-lg text-gray-600 mt-4">
            우리와 함께 청소 서비스를 제공할 파트너를 모집합니다.
          </p>
        </div>
        <div className="mt-6">
          <button
            className="bg-[#0bb8f9] text-white py-2 px-4 rounded-md m-2"
            onClick={() => navigate('/ptsignup')}
          >
            지금 사업자 등록하러 가기
          </button>
        </div>
      </section>

      {/* 파트너 혜택 섹션 */}
      <section className="text-center my-12">
        <div className="bg-gray-100 p-8 rounded-3xl font-[JalnanGothic]">
          <h2 className="text-4xl">파트너가 되는 이유</h2>
          <p className="text-lg text-gray-600 mt-4">
            깔끔한 방 파트너만의 특별한 혜택
          </p>
        </div>
        <ul className="list-disc list-inside mt-4 text-left max-w-md mx-auto">
          <li className="mb-2">
            더 많은 고객 확보: 고객 매칭으로 누리는 더 많은 비즈니스 기회
          </li>
          <li className="mb-2">
            안정적인 수익: 합리적인 청소 견적을 통해 안정적인 수익 창출
          </li>
          <li className="mb-2">
            유연한 업무 일정: 원하는 시간과 장소 등 자유로운 일정 조율
          </li>
        </ul>
      </section>

      {/* 파트너 모집 절차 */}
      <section className="my-12">
        <div className="bg-gray-100 p-8 rounded-3xl font-[JalnanGothic]">
          <h2 className="text-4xl text-center">파트너 가입 절차</h2>
          <p className="text-lg text-gray-600 mt-4 text-center">
            간단한 절차로 깔끔한 방의 파트너가 되세요
          </p>
        </div>
        <ul className="list-decimal list-inside mt-4 text-left max-w-md mx-auto">
          <li className="mb-2">
            가입 신청: 온라인 신청서를 작성하여 제출하세요.
          </li>
          <li className="mb-2">서류 제출: 필요한 서류를 업로드하세요.</li>
          <li className="mb-2">
            심사 및 승인: 제출된 서류를 검토하고 승인을 받으세요.
          </li>
          <li className="mb-2">
            서비스 시작: 청소 서비스를 시작하고 고객 요청을 받으세요.
          </li>
        </ul>
      </section>

      {/* 성공 사례 섹션 */}
      <section className="my-12">
        <div className="bg-gray-100 p-8 rounded-3xl font-[JalnanGothic]">
          <h2 className="text-4xl text-center">파트너 성공 사례</h2>
          <p className="text-lg text-gray-600 mt-4 text-center">
            깔끔한 방과 함께 성공한 파트너들의 이야기
          </p>
        </div>
        <div className="space-y-4 mt-6 text-center">
          <div className="p-4 border rounded-lg shadow-md">
            <p className="text-gray-600">
              "ABC 청소업체: 깔끔한 방과 함께 매출이 50% 증가했습니다." - 김사장
            </p>
          </div>
          <div className="p-4 border rounded-lg shadow-md">
            <p className="text-gray-600">
              "XYZ 청소업체: 정기적인 요청으로 안정적인 수익을 창출하고
              있습니다." - 박사장
            </p>
          </div>
          <div className="p-4 border rounded-lg shadow-md">
            <p className="text-gray-600">
              "LMN 청소업체: 파트너 교육 덕분에 고객 만족도가 크게
              향상되었습니다." - 이사장
            </p>
          </div>
        </div>
      </section>

      {/* FAQ 섹션 */}
      <section className="my-12">
        <div className="bg-gray-100 p-8 rounded-3xl font-[JalnanGothic]">
          <h2 className="text-4xl text-center">자주 묻는 질문</h2>
          <p className="text-lg text-gray-600 mt-4 text-center">
            파트너 가입과 관련된 궁금한 점을 확인하세요.
          </p>
        </div>
        <div className="space-y-4 max-w-md mx-auto mt-8">
          <div className="p-4 border rounded-lg shadow-md">
            <h3 className="text-lg font-bold">
              파트너 가입 조건은 무엇인가요?
            </h3>
            <p className="text-gray-600 mt-2">
              전문자격을 갖춘 업체라면 누구나 신청할 수 있습니다.
            </p>
          </div>

          <div className="p-4 border rounded-lg shadow-md">
            <h3 className="text-lg font-bold">수수료는 어떻게 되나요?</h3>
            <p className="text-gray-600 mt-2">
              청소 서비스 완료 시 일정 비율의 수수료를 부과합니다.
            </p>
          </div>
          <div className="p-4 border rounded-lg shadow-md">
            <h3 className="text-lg font-bold">
              고객 불만 사항은 어떻게 처리하나요?
            </h3>
            <p className="text-gray-600 mt-2">
              고객 지원 팀이 즉각 대응하며, 문제 해결을 위한 가이드를
              제공합니다.
            </p>
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="text-center my-12">
        <div className="bg-gray-100 p-8 rounded-3xl font-[JalnanGothic]">
          <h2 className="text-4xl">지금 바로 파트너로 가입하세요!</h2>
          <p className="text-lg text-gray-600 mt-4">
            깔끔한 방과 함께 더 많은 고객에게 다가가세요.
          </p>
        </div>
        <br />
        <button
          onClick={() => navigate('/ptsignup')}
          className="bg-[#0bb8f9] text-white py-2 px-4 rounded-md m-2"
        >
          지금 바로 사업자 등록하기
        </button>
      </section>

      {/* 푸터 섹션 */}
      <footer className="bg-[#144156] text-white p-4 text-center">
        <nav className="mb-4">
          <a href="/" className="text-white mx-2">
            홈
          </a>
          <a href="/service" className="text-white mx-2">
            서비스 소개
          </a>
          <a href="/ptrecruitment" className="text-white mx-2">
            파트너 모집
          </a>
          <a href="/reviews" className="text-white mx-2">
            고객 후기
          </a>
          <a href="/contact" className="text-white mx-2">
            문의하기
          </a>
          <a href="/login" className="text-white mx-2">
            로그인/회원가입
          </a>
        </nav>
        <p className="mb-4">
          고객 센터: 123-456-7890 | 이메일:{' '}
          <a
            href="mailto:support@cleanroom.com"
            className="text-white underline"
          >
            support@cleanroom.com
          </a>
        </p>
      </footer>
    </div>
  );
};

export default PartnerRecruitment;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';

const PartnerHome: React.FC = () => {
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
      {/* 환영 메시지 섹션 */}
      <section className="my-12 text-center">
        <div className="bg-gray-100 p-8 rounded-3xl font-[JalnanGothic]">
          <h1 className="text-4xl">
            파트너 페이지에 오신 전문가님을 환영합니다!
          </h1>
          <p className="text-lg text-gray-600 mt-4">
            깔끔한 방과 함께 성장하는 여정을 시작하세요.
          </p>
        </div>
      </section>

      {/* 주요 기능 및 메뉴 */}
      <section className="mb-12">
        <div className="bg-gray-100 p-8 rounded-3xl text-center font-[JalnanGothic]">
          <h2 className="text-4xl">주요 기능</h2>
          <p className="text-lg text-gray-600 mt-4">
            파트너님의 전문성을 펼쳐주세요.
          </p>
        </div>
        <ul className="list-disc list-inside mt-6 text-left max-w-md mx-auto">
          <li className="mb-2">
            새 의뢰 보기: 고객의 청소 의뢰를 확인하고, 견적을 제안하세요.
          </li>
          <li className="mb-2">
            진행 중인 의뢰: 현재 진행 중인 청소 의뢰를 관리하세요.
          </li>
          <li className="mb-2">
            완료된 의뢰: 청소내역 관리와 고객 피드백을 확인하세요.
          </li>
          <li className="mb-2">스케줄 관리: 준비중입니다.</li>
          <li className="mb-2">메시지 센터: 준비중입니다.</li>
          <li className="mb-2">통계 및 리포트: 준비중입니다.</li>
        </ul>
      </section>

      {/* 새 의뢰 섹션 */}
      <section className="mb-12">
        <div className="bg-gray-100 p-8 rounded-3xl text-center font-[JalnanGothic]">
          <h2 className="text-4xl">새로운 청소 의뢰</h2>
          <p className="text-lg text-gray-600 mt-4">
            고객이 올린 새로운 청소 의뢰를 확인하고, 견적을 제안하세요.
          </p>
        </div>
        <ul className="list-disc list-inside mt-6 text-left max-w-md mx-auto">
          <li className="mb-2">의뢰 1: 의뢰 내용 요약, 고객 이름, 날짜</li>
          <li className="mb-2">의뢰 2: 의뢰 내용 요약, 고객 이름, 날짜</li>
        </ul>
        <div className="flex items-center justify-center">
          <button
            className="bg-[#0bb8f9] text-white py-2 px-4 rounded hover:bg-blue-600 mt-4"
            onClick={() => navigate('/commissioncalling')}
          >
            더 많은 의뢰 보기
          </button>
        </div>
      </section>

      {/* 일정 관리 섹션 */}
      <section className="mb-12">
        <div className="bg-gray-100 p-8 rounded-3xl text-center font-[JalnanGothic]">
          <h2 className="text-4xl">일정 관리</h2>
          <p className="text-lg text-gray-600 mt-4">
            오늘의 일정과 향후 일정을 확인하세요.
          </p>
        </div>
        <div className="max-w-md mx-auto mt-6">
          <h3 className="text-xl font-bold">오늘의 일정:</h3>
          <ul className="list-disc list-inside mt-2">
            <li className="mb-2">일정 1: 고객 이름, 시간, 장소</li>
            <li className="mb-2">일정 2: 고객 이름, 시간, 장소</li>
          </ul>
          <h3 className="text-xl font-bold mt-6">향후 일정:</h3>
          <ul className="list-disc list-inside mt-2">
            <li className="mb-2">일정 1: 날짜, 고객 이름, 장소</li>
            <li className="mb-2">일정 2: 날짜, 고객 이름, 장소</li>
          </ul>
          <div className="flex items-center justify-center">
            <button className="bg-[#0bb8f9] text-white py-2 px-4 rounded hover:bg-blue-600 mt-4">
              새 일정 추가
            </button>
          </div>
        </div>
      </section>

      {/* 고객 피드백 섹션 */}
      <section className="mb-12">
        <div className="bg-gray-100 p-8 rounded-3xl text-center font-[JalnanGothic]">
          <h2 className="text-4xl text-center">고객 피드백</h2>
          <p className="text-lg text-gray-600 mt-4 text-center">
            고객들이 남긴 피드백을 확인하고, 서비스를 개선하세요.
          </p>
        </div>
        <div className="space-y-4 max-w-md mx-auto mt-6">
          <div className="p-4 border rounded-lg shadow-md">
            <p className="text-gray-600">"고객 이름, 별점, 피드백 내용"</p>
          </div>
          <div className="p-4 border rounded-lg shadow-md">
            <p className="text-gray-600">"고객 이름, 별점, 피드백 내용"</p>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <button className="bg-[#0bb8f9] text-white py-2 px-4 rounded hover:bg-blue-600 mt-4">
            더 많은 피드백 보기
          </button>
        </div>
      </section>

      {/* 통계 및 리포트 섹션 */}
      <section className="mb-12">
        <div className="bg-gray-100 p-8 rounded-3xl text-center font-[JalnanGothic]">
          <h2 className="text-4xl">통계 및 리포트</h2>
          <p className="text-lg text-gray-600 mt-4">
            월별 수익, 작업 내역 등의 통계 정보를 확인하세요.
          </p>
        </div>
        <div className="max-w-md mx-auto mt-6">
          <p className="mb-2">
            이번 달 수익: <strong>₩1,200,000</strong>
          </p>
          <p className="mb-2">
            총 의뢰 수: <strong>25건</strong>
          </p>
          <p className="mb-2">
            고객 만족도: <strong>4.8/5</strong>
          </p>
        </div>
      </section>

      {/* 푸터 섹션 */}
      <footer className="bg-[#144156] text-white p-4 text-center">
        <nav className="mb-4">
          <button
            onClick={() => navigate('/pthome')}
            className="text-white py-2 px-4 rounded-md m-2"
          >
            파트너 홈
          </button>
          <button
            onClick={() => navigate('/commissioncalling')}
            className="text-white py-2 px-4 rounded-md m-2"
          >
            회원 새 의뢰 보기
          </button>
          <button
            onClick={() => navigate('/commissionestimate')}
            className="text-white py-2 px-4 rounded-md m-2"
          >
            견적 목록
          </button>
          <button
            onClick={() => navigate('/commissionmatching')}
            className="text-white py-2 px-4 rounded-md m-2"
          >
            견적매칭 확인하기
          </button>
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

export default PartnerHome;

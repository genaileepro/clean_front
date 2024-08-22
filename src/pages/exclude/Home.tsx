import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';

const Home: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="container mx-auto max-w-screen-xl text-center mt-12">
      <div className="p-6 hidden sm:block">
        <img
          src={logo}
          alt="깔끔한방 로고"
          className="w-full h-auto max-h-[300px] object-contain"
        />
      </div>
      <section className="my-12 text-center">
        <div className="bg-gray-100 p-8 rounded-3xl font-[JalnanGothic]">
          <h1 className="text-4xl">여러분도 깔끔한 방을 누릴 수 있습니다!</h1>
          <p className="text-lg text-gray-600 mt-4">
            청소 전문가가 당신의 집을 빛나게 만듭니다.
          </p>
        </div>
        <div className="mt-6">
          <button
            onClick={() => navigate('/commissionwrite')}
            className="bg-[#0bb8f9] text-white py-2 px-4 rounded-md m-2"
          >
            지금 예약하기
          </button>
          <button
            onClick={() => navigate('/service')}
            className="bg-[#0bb8f9] text-white py-2 px-4 rounded-md m-2"
          >
            서비스 알아보기
          </button>
          <button
            onClick={() => navigate('/ptrecruitment')}
            className="bg-[#0bb8f9] text-white py-2 px-4 rounded-md m-2"
          >
            사업자등록 알아보기
          </button>
        </div>
      </section>

      <section className="mb-12 text-center">
        <div className="bg-gray-100 p-8 rounded-3xl font-[JalnanGothic]">
          <h2 className="text-4xl">우리의 청소 서비스</h2>
          <p className="text-lg text-gray-600 mt-4">
            특수청소, 일반청소, 입주청소까지 모두 가능합니다.
          </p>
        </div>
        <div className="flex flex-wrap justify-center mt-6">
          <div className="bg-white border rounded-lg shadow-lg m-4 p-6 w-80">
            <h3 className="text-xl text-[#0bb8f9] font-bold mb-2 ">특수청소</h3>
            <p className="text-gray-600 mb-2">
              일명 '쓰레기 집' 누적량이 큰 청소
            </p>
            <p className="text-gray-600 mb-4">
              특수청소로 새롭게 태어나는 공간.
              <br />
              쌓여 있는 걱정까지 함께 청소하세요.{' '}
            </p>
            <a href="#" className="text-[#0bb8f9] font-bold">
              자세히 알아보기
            </a>
          </div>
          <div className="bg-white border rounded-lg shadow-lg m-4 p-6 w-80">
            <h3 className="text-xl text-[#0bb8f9] font-bold mb-2">일반청소</h3>
            <p className="text-gray-600 mb-2">가정에 필요한 청소 대리 서비스</p>
            <p className="text-gray-600 mb-4">
              매일 깨끗한 집!
              <br /> 일상 속 청결을 유지하는 일반 청소.
            </p>
            <a href="#" className="text-[#0bb8f9] font-bold">
              자세히 알아보기
            </a>
          </div>
          <div className="bg-white border rounded-lg shadow-lg m-4 p-6 w-80">
            <h3 className="text-xl text-[#0bb8f9] font-bold mb-2">입주청소</h3>
            <p className="text-gray-600 mb-2">입주 전 필요한 청소</p>
            <p className="text-gray-600 mb-4">
              새로운 집, 깨끗한 시작!
              <br /> 입주 청소로 완벽한 첫날을 준비하세요.
            </p>
            <a href="#" className="text-[#0bb8f9] font-bold">
              자세히 알아보기
            </a>
          </div>
        </div>
      </section>

      <section className="mb-12 text-center">
        <div className="bg-gray-100 p-8 rounded-3xl font-[JalnanGothic]">
          <h2 className="text-4xl">왜 깔끔한 방인가요?</h2>
          <p className="text-lg text-gray-600 mt-4 text-center">
            고객이 우리 서비스를 선택하는 이유
          </p>
        </div>
        <ul className="list-decimal list-inside mt-4 text-left max-w-md mx-auto">
          <li className="mb-2">
            빠르고 간편한 예약: 클릭 몇 번으로 청소 전문가와 연결됩니다.
          </li>
          <li className="mb-2">
            전문가의 손길: 청소 전문가가 고객님의 집을 깨끗하게 청소해요.
          </li>
          <li className="mb-2">
            시간 절약: 청소는 깔끔한방, 고객님은 소중한 일상에 집중하세요.
          </li>
        </ul>
      </section>

      <section className="mb-12">
        <div className="bg-gray-100 p-8 rounded-3xl font-[JalnanGothic]">
          <h2 className="text-4xl">고객 후기</h2>
          <p className="text-lg text-gray-600 mt-4 text-center">
            우리의 서비스를 이용한 고객들의 실제 후기
          </p>
        </div>
        <div className="space-y-4 mt-6">
          <div className="p-4 border rounded-lg shadow-md">
            <p className="text-gray-600">
              "서비스가 정말 만족스러웠어요! 제 방이 새 집처럼 변했어요." -
              김지현
            </p>
          </div>
          <div className="p-4 border rounded-lg shadow-md">
            <p className="text-gray-600">
              "특수청소 덕분에 오랜 걱정거리가 사라졌습니다." - 박민수
            </p>
          </div>
          <div className="p-4 border rounded-lg shadow-md">
            <p className="text-gray-600">
              "입주 청소 덕분에 편안하게 새 집으로 이사했어요." - 이수민
            </p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <div className="bg-gray-100 p-8 rounded-3xl font-[JalnanGothic]">
          <h2 className="text-4xl mb-4">
            깔끔한 방과 함께 청결함을 유지하세요!
          </h2>
          <p className="text-lg text-gray-600">
            지금 바로 청소 서비스를 예약하고 깨끗한 생활을 시작하세요.
          </p>
        </div>
        <button
          onClick={() => navigate('/login')}
          className="bg-[#0bb8f9] text-white py-2 px-4 rounded-md m-2 mt-6"
        >
          지금 예약하기
        </button>
      </section>

      <footer className="bg-[#144156] text-white p-4 text-center">
        <nav className="mb-4">
          <button
            onClick={() => navigate('/')}
            className="text-white py-2 px-4 rounded-md m-2"
          >
            홈
          </button>
          <button
            onClick={() => navigate('/service')}
            className="text-white py-2 px-4 rounded-md m-2"
          >
            서비스 알아보기
          </button>
          <button
            onClick={() => navigate('/ptrecruitment')}
            className="text-white py-2 px-4 rounded-md m-2"
          >
            파트너를 모집해요
          </button>
          <button
            onClick={() => navigate('/loginselect')}
            className="text-white py-2 px-4 rounded-md m-2"
          >
            로그인
          </button>
          /
          <button
            onClick={() => navigate('/signupselect')}
            className="text-white py-2 px-4 rounded-md m-2"
          >
            회원가입
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

export default Home;

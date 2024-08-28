import React from 'react';
import { useNavigate } from 'react-router-dom';
import gavageRoom from '../../assets/gavageRoom.png';
import cleanExpress from '../../assets/cleanExpress.png';
import cleanLiving from '../../assets/cleanLiving.png';
import logo from '../../assets/logo.png';

const ServicePage: React.FC = () => {
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
      {/* 서비스 소개 섹션 */}
      <section className="my-12 text-center">
        <div className="bg-gray-100 p-8 rounded-3xl font-[JalnanGothic]">
          <h1 className="text-4xl">우리의 청소 서비스</h1>
          <p className="text-lg text-gray-600 mt-4">
            깔끔한 방이 제공하는 다양한 청소 서비스를 알아보세요.
          </p>
        </div>
        <div className="mt-6">
          <button
            className="bg-[#0bb8f9] text-white py-2 px-4 rounded-md m-2"
            onClick={() => navigate('/signup')}
          >
            지금 회원가입 하기
          </button>
        </div>
      </section>

      {/* 서비스 종류 및 설명 */}
      <section className="mb-12 grid flex-wrap justify-center">
        <div className="flex bg-white border rounded-lg shadow-lg m-4 p-6 w-[750px] h-[300px] mb-8">
          <img
            src={gavageRoom}
            alt="쓰레기집 이미지"
            className="w-full h-auto max-h-[250px] object-contain"
          />
          <div className="w-full h-auto max-h-[250px]">
            <h2 className="text-4xl font-[JalnanGothic]">특수청소</h2>
            <p className="text-lg text-gray-600 mt-2">
              일명 '쓰레기 집'으로 불리는,
              <br /> 누적량이 많은 청소를 말합니다.
              <br /> 전문가가 쌓여 있는 걱정을 해결해드리고,
              <br />
              안전하고 깨끗한 환경을 만들어 드립니다.
            </p>
            <ul className="list-disc list-inside mt-4 text-left">
              <li>누적된 쓰레기 및 오염물 제거</li>
              <li>깊이 있는 소독 및 방역</li>
              <li>전문가의 철저한 관리</li>
            </ul>
          </div>
        </div>
        <div className="flex bg-white border rounded-lg shadow-lg m-4 p-6 w-[750px] h-[300px] mb-8">
          <img
            src={cleanLiving}
            alt="일반적인 청소를 표현하는 이미지"
            className="w-full h-auto max-h-[250px] object-contain"
          />
          <div className="w-full h-auto max-h-[250px]">
            <h2 className="text-4xl font-[JalnanGothic]">일반청소</h2>
            <p className="text-lg text-gray-600 mt-2">
              가정에서 일상적으로 필요한
              <br /> 청소 서비스를 제공합니다.
              <br /> 바쁜 일상 청소가 고민이신가요?
              <br />
              깨끗한 집을 유지할 수 있도록 도와드립니다.
            </p>
            <ul className="list-disc list-inside mt-4 text-left">
              <li>주방, 화장실, 거실 등 일반 공간 청소</li>
              <li>먼지 제거 및 진공 청소</li>
              <li>표면 소독 및 정리</li>
            </ul>
          </div>
        </div>
        <div className="flex bg-white border rounded-lg shadow-lg m-4 p-6 w-[750px] h-[300px] mb-8">
          <img
            src={cleanExpress}
            alt="입주청소를 표현한 이미지"
            className="w-full h-auto max-h-[250px] object-contain"
          />
          <div className="w-full h-auto max-h-[250px]">
            <h2 className="text-4xl font-[JalnanGothic]">입주청소</h2>
            <p className="text-lg text-gray-600 mt-2">
              입주청소는 이사 전, 새로운 집으로
              <br /> 들어가기 전에 필요한 청소를 말합니다.
              <br /> 완벽한 첫날을 꿈꾸는 고객님을 위해
              <br /> 깨끗한 공간을 준비해드립니다.
            </p>
            <ul className="list-disc list-inside mt-4 text-left">
              <li>빈 집 청소 및 새 집 준비</li>
              <li>창문, 바닥, 벽 등 전체 청소</li>
              <li>맞춤형 청소 계획 제공</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 서비스 이용 절차 */}
      <section className="mb-12">
        <div className="bg-gray-100 p-8 rounded-3xl font-[JalnanGothic]">
          <h2 className="text-4xl text-center">서비스 이용 절차</h2>
          <p className="text-lg text-gray-600 mt-4 text-center">
            깔끔한 방의 청소 서비스를 이용하는 간단한 절차
          </p>
        </div>
        <ul className="list-decimal list-inside mt-6 text-left max-w-md mx-auto">
          <li className="mb-2">
            서비스 요청: 청소 요구사항을 입력하여 서비스 요청을 올립니다.
          </li>
          <li className="mb-2">
            견적 비교: 여러 업체의 견적을 비교하고, 원하는 서비스를 선택.
          </li>
          <li className="mb-2">
            예약 확정: 선택한 청소 업체와 예약을 확정합니다.
          </li>
          <li className="mb-2">
            청소 진행: 선택한 날짜에 청소 서비스가 진행됩니다.
          </li>
          <li className="mb-2">
            피드백 제공: 청소 완료 후 서비스에 대한 피드백을 남겨주세요.
          </li>
        </ul>
      </section>

      {/* 고객 혜택 */}
      <section className="mb-12">
        <div className="bg-gray-100 p-8 rounded-3xl font-[JalnanGothic]">
          <h2 className="text-4xl text-center">왜 '깔끔한방' 인가요?</h2>
          <p className="text-lg text-gray-600 mt-4 text-center">
            고객이 우리 서비스를 선택하는 이유
          </p>
        </div>
        <ul className="list-disc list-inside mt-6 text-left max-w-md mx-auto">
          <li className="mb-2">
            다양한 견적 비교: 여러 청소 업체의 견적을 한눈에 비교!
          </li>
          <li className="mb-2">
            맞춤형 청소 계획: 고객의 필요에 맞춘 청소를 제공합니다.
          </li>
          <li className="mb-2">
            시간 절약: 청소는 깔끔한방, 고객님은 소중한 일상에 집중!
          </li>
          <li className="mb-2">
            지친 하루의 끝을 쾌적한 방에서 마무리 하세요!
          </li>
        </ul>
      </section>

      {/* 고객 후기 */}
      <section className="mb-12">
        <div className="bg-gray-100 p-8 rounded-3xl font-[JalnanGothic]">
          <h2 className="text-4xl text-center">실제 고객 후기</h2>
          <p className="text-lg text-gray-600 mt-4 text-center">
            우리 서비스를 이용한 고객들의 생생한 후기
          </p>
        </div>
        <div className="space-y-4 mt-6 text-center">
          <div className="p-4 border rounded-lg shadow-md">
            <p className="text-gray-600">
              "특수청소 덕분에 오랜 걱정거리가 사라졌습니다. 감사합니다!" -
              박민수
            </p>
          </div>
          <div className="p-4 border rounded-lg shadow-md">
            <p className="text-gray-600">
              "입주청소로 새 집을 완벽하게 준비할 수 있었어요. 정말 만족합니다."
              - 이수민
            </p>
          </div>
          <div className="p-4 border rounded-lg shadow-md">
            <p className="text-gray-600">
              "일반청소 서비스를 이용한 후로 매일 깨끗한 집에서 살고 있습니다."
              - 김지현
            </p>
          </div>
        </div>
      </section>

      {/* FAQ 섹션 */}
      <section className="mb-12">
        <div className="bg-gray-100 p-8 rounded-3xl font-[JalnanGothic]">
          <h2 className="text-4xl text-center">자주 묻는 질문</h2>
          <p className="text-lg text-gray-600 mt-4 text-center">
            고객님들이 자주 묻는 질문과 답변을 확인하세요.
          </p>
        </div>
        <div className="space-y-4 max-w-md mx-auto mt-8">
          <div className="p-4 border rounded-lg shadow-md">
            <h3 className="text-lg font-bold">청소 요청은 어떻게 하나요?</h3>
            <p className="text-gray-600 mt-2">
              홈페이지나 앱을 통해 간편하게 요청할 수 있습니다.
              <br />
              <div className="text-sm mt-1">* 앱은 현재 준비중입니다</div>
            </p>
          </div>
          <div className="p-4 border rounded-lg shadow-md">
            <h3 className="text-lg font-bold">견적은 어떻게 비교하나요?</h3>
            <p className="text-gray-600 mt-2">
              여러 청소 업체의 견적을 한눈에 비교할 수 있습니다.
            </p>
          </div>
          <div className="p-4 border rounded-lg shadow-md">
            <h3 className="text-lg font-bold">청소 시간은 얼마나 걸리나요?</h3>
            <p className="text-gray-600 mt-2">
              청소 종류와 집의 크기에 따라 다르지만,
              <br /> 일반적으로 4-6시간이 소요됩니다.
            </p>
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="text-center mb-12">
        <div className="bg-gray-100 p-8 rounded-3xl font-[JalnanGothic]">
          <h2 className="text-4xl ">지금 바로 견적을 받아보세요!</h2>
          <p className="text-lg text-gray-600 mt-4">
            청결한 생활을 시작하는 가장 간단한 방법
          </p>
        </div>
        <br />
        <button
          onClick={() => navigate('/login')}
          className="bg-[#0bb8f9] text-white py-2 px-4 rounded-md m-2"
        >
          지금 요청하러 가기
        </button>
      </section>

      <footer className="bg-[#226b8d] text-white p-4 text-center">
        <nav className="mb-4">
          <a href="#" className="text-white mx-2">
            홈
          </a>
          <button
            onClick={() => navigate('/commissionwrite')}
            className="text-white py-2 px-4 rounded-md m-2"
          >
            의뢰작성하기
          </button>
          <button
            onClick={() => navigate('/commissionlist')}
            className="text-white py-2 px-4 rounded-md m-2"
          >
            의뢰작성목록
          </button>
          <button
            onClick={() => navigate('/userorders')}
            className="text-white py-2 px-4 rounded-md m-2"
          >
            견적확인하기
          </button>
          <button
            onClick={() => navigate('/login')}
            className="text-white py-2 px-4 rounded-md m-2"
          >
            로그인
          </button>
          /
          <button
            onClick={() => navigate('/signup')}
            className="text-white py-2 px-4 rounded-md m-2"
          >
            회원가입
          </button>
        </nav>
        <div className="mb-4">
          <p>
            <strong>상호명:</strong> 아이크(AIC) | <strong>대표자명:</strong>{' '}
            이대성 | <strong>사업장주소:</strong> 강원 특별자치도 춘천시 영서로
            2922
          </p>
          <p>
            <strong>사업자등록번호:</strong> 822-15-01913 |{' '}
            <strong>대표전화번호:</strong> 070-7954-3805 |{' '}
            <strong>대표이메일:</strong>{' '}
            <a href="leepro@ai-c.kr" className="text-white underline">
              support@cleanroom.com
            </a>
          </p>
        </div>
        <p className="mb-4">
          고객 센터: 070-7954-3805 | 이메일:{' '}
          <a href="leepro@ai-c.kr" className="text-white underline">
            support@cleanroom.com
          </a>
        </p>
      </footer>
    </div>
  );
};

export default ServicePage;

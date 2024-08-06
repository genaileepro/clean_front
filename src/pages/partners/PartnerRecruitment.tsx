import React from 'react';
import { useNavigate } from 'react-router-dom';

const PartnerRecruitment: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto max-w-screen-xl">
      {/* 히어로 섹션 */}
      <section className="text-center my-12">
        <h1 className="text-4xl font-bold">깔끔한 방과 함께 성장하세요!</h1>
        <p className="text-lg text-gray-600 mt-4">우리와 함께 청소 서비스를 제공할 파트너를 모집합니다.</p>
        <div className="mt-6">
          <button className="bg-[#0bb8f9] text-white py-2 px-4 rounded-md m-2" onClick={() => navigate('/partnersignup')}>지금 사업자 등록하러 가기</button>
          <button className="bg-[#0bb8f9] text-white py-2 px-4 rounded-md m-2" onClick={() => navigate('/partnerhome')}>파트너 공간에서 더 자세히 알아보기</button>
        </div>
      </section>

      {/* 파트너 혜택 섹션 */}
      <section className="text-center my-12 bg-gray-100 p-8">
        <h2 className="text-3xl font-bold">파트너가 되는 이유</h2>
        <p className="text-lg text-gray-600 mt-4">깔끔한 방 파트너만의 특별한 혜택</p>
        <ul className="list-disc list-inside mt-4 text-left max-w-md mx-auto">
          <li className="mb-2">더 많은 고객 확보: 다양한 고객이 청소 서비스를 의뢰하여 더 많은 비즈니스 기회를 얻으세요.</li>
          <li className="mb-2">안정적인 수익: 정기적인 청소 요청을 통해 안정적인 수익을 창출하세요.</li>
          <li className="mb-2">유연한 업무 일정: 원하는 시간과 장소에서 자유롭게 작업 일정을 조정하세요.</li>
          <li className="mb-2">전문 교육 및 지원: 최신 청소 기술 및 고객 서비스 교육을 제공합니다.</li>
        </ul>
      </section>

      {/* 파트너 모집 절차 */}
      <section className="my-12">
        <div className="bg-gray-100 p-8">
          <h2 className="text-3xl font-bold text-center">파트너 가입 절차</h2>
          <p className="text-lg text-gray-600 mt-4 text-center">간단한 절차로 깔끔한 방의 파트너가 되세요</p>
        </div>
        <ul className="list-decimal list-inside mt-4 text-left max-w-md mx-auto">
          <li className="mb-2">가입 신청: 온라인 신청서를 작성하여 제출하세요.</li>
          <li className="mb-2">서류 제출: 필요한 서류를 업로드하세요.</li>
          <li className="mb-2">심사 및 승인: 제출된 서류를 검토하고 승인을 받으세요.</li>
          <li className="mb-2">교육 및 등록: 파트너 교육을 완료하고 정식 등록하세요.</li>
          <li className="mb-2">서비스 시작: 청소 서비스를 시작하고 고객 요청을 받으세요.</li>
        </ul>
      </section>

      {/* 성공 사례 섹션 */}
      <section className="my-12">
        <div className="bg-gray-100 p-8">
          <h2 className="text-3xl font-bold text-center">파트너 성공 사례</h2>
          <p className="text-lg text-gray-600 mt-4 text-center">깔끔한 방과 함께 성공한 파트너들의 이야기</p>
        </div>
        <div className="space-y-4 max-w-md mx-auto mt-8">
          <div className="p-4 border rounded-lg shadow-md">
            <p className="text-gray-600">"ABC 청소업체: 깔끔한 방과 함께 매출이 50% 증가했습니다." - 김사장</p>
          </div>
          <div className="p-4 border rounded-lg shadow-md">
            <p className="text-gray-600">"XYZ 청소업체: 정기적인 요청으로 안정적인 수익을 창출하고 있습니다." - 박사장</p>
          </div>
          <div className="p-4 border rounded-lg shadow-md">
            <p className="text-gray-600">"LMN 청소업체: 파트너 교육 덕분에 고객 만족도가 크게 향상되었습니다." - 이사장</p>
          </div>
        </div>
      </section>

      {/* FAQ 섹션 */}
      <section className="my-12">
        <div className="bg-gray-100 p-8">          
          <h2 className="text-3xl font-bold text-center">자주 묻는 질문</h2>
          <p className="text-lg text-gray-600 mt-4 text-center">파트너 가입과 관련된 궁금한 점을 확인하세요.</p>
        </div>
        <div className="space-y-4 max-w-md mx-auto mt-8">
          <div className="p-4 border rounded-lg shadow-md">
            <h3 className="text-lg font-bold">파트너 가입 조건은 무엇인가요?</h3>
            <p className="text-gray-600 mt-2">필요한 서류와 청소 경력을 갖춘 업체라면 누구나 신청할 수 있습니다.</p>
          </div>
          <div className="p-4 border rounded-lg shadow-md">
            <h3 className="text-lg font-bold">가입 후 교육은 어떻게 진행되나요?</h3>
            <p className="text-gray-600 mt-2">온라인 교육과 오프라인 워크숍을 통해 청소 기술과 고객 서비스 교육을 제공합니다.</p>
          </div>
          <div className="p-4 border rounded-lg shadow-md">
            <h3 className="text-lg font-bold">수수료는 어떻게 되나요?</h3>
            <p className="text-gray-600 mt-2">청소 서비스 완료 시 일정 비율의 수수료를 부과합니다.</p>
          </div>
          <div className="p-4 border rounded-lg shadow-md">
            <h3 className="text-lg font-bold">고객 불만 사항은 어떻게 처리하나요?</h3>
            <p className="text-gray-600 mt-2">고객 지원 팀이 즉각 대응하며, 문제 해결을 위한 가이드를 제공합니다.</p>
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="text-center my-12">
        <div className="bg-gray-100 p-8">
          <h2 className="text-3xl font-bold">지금 바로 파트너로 가입하세요!</h2>
          <p className="text-lg text-gray-600 mt-4">깔끔한 방과 함께 더 많은 고객에게 다가가세요.</p>
        </div>
        <br/>
        <button onClick={() => navigate('/partnersignup')} className="bg-[#0bb8f9] text-white py-2 px-4 rounded-md m-2">지금 바로 사업자 등록하기</button>
      </section>

      {/* 푸터 섹션 */}
      <footer className="bg-[#144156] text-white p-4 text-center">
        <nav className="mb-4">
          <a href="/" className="text-white mx-2">홈</a>
          <a href="/service" className="text-white mx-2">서비스 소개</a>
          <a href="/partner-recruitment" className="text-white mx-2">파트너 모집</a>
          <a href="/reviews" className="text-white mx-2">고객 후기</a>
          <a href="/contact" className="text-white mx-2">문의하기</a>
          <a href="/login" className="text-white mx-2">로그인/회원가입</a>
        </nav>
        <p className="mb-4">고객 센터: 123-456-7890 | 이메일: <a href="mailto:support@cleanroom.com" className="text-white underline">support@cleanroom.com</a></p>
        <div className="flex justify-center space-x-4">
          <a href="#"><img src="facebook-icon.png" alt="Facebook" className="w-6 h-6" /></a>
          <a href="#"><img src="instagram-icon.png" alt="Instagram" className="w-6 h-6" /></a>
          <a href="#"><img src="twitter-icon.png" alt="Twitter" className="w-6 h-6" /></a>
        </div>
      </footer>
    </div>
  );
};

export default PartnerRecruitment;

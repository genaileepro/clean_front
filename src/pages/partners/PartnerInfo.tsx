import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCurrentPartner } from '../../hooks/usePartners';
import logo from '../../assets/logo.png';

const PartnerInfo: React.FC = () => {
  const { email } = useParams<{ email: string }>();
  const navigate = useNavigate();
  const { data: partner, isLoading, error } = useCurrentPartner();

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생: {error.message}</div>;
  if (!partner) return <div>파트너 정보를 찾을 수 없습니다.</div>;

  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="p-6 hidden sm:block">
        <img
          src={logo}
          alt="깔끔한방 로고"
          className="w-full h-auto max-h-[200px] object-contain"
        />
      </div>
      <h2 className="text-2xl mb-4 font-[JalnanGothic]">파트너 정보</h2>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            이메일
          </label>
          <p className="text-gray-700">{partner.email}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            담당자명
          </label>
          <p className="text-gray-700">{partner.managerName}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            전화번호
          </label>
          <p className="text-gray-700">{partner.phoneNumber}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            업체명
          </label>
          <p className="text-gray-700">{partner.companyName}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            서비스 유형
          </label>
          <p className="text-gray-700">{partner.businessType}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            사업자 유형
          </label>
          <p className="text-gray-700">{partner.partnerType}</p>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={() => navigate(`/pt/${email}/edit`)}
          >
            정보 수정
          </button>
        </div>
      </div>
    </div>
  );
};

export default PartnerInfo;

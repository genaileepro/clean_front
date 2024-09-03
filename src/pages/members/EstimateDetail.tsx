import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useEstimateDetail } from '../../hooks/useCommissions';
import { Status } from '../../types/commission';
import {
  Calendar,
  ClipboardList,
  Briefcase,
  Phone,
  MapPin,
} from 'lucide-react';
import LoadingSpinner from '../../utils/LoadingSpinner';
import logo from '../../assets/logo.png';

const EstimateDetail: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const estimateId = Number(searchParams.get('id'));

  const { data, isLoading, error } = useEstimateDetail(estimateId);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );
  if (error)
    return (
      <div className="text-center py-8 text-red-500">
        <p className="text-2xl mb-4">오류가 발생했습니다</p>
        <p>{error.message}</p>
      </div>
    );
  if (!data)
    return (
      <div className="text-center py-8 text-2xl">견적을 찾을 수 없습니다.</div>
    );

  const handlePaymentNavigation = () => {
    navigate('/payment', { state: { estimateId: data.id } });
  };

  const InfoItem: React.FC<{
    icon: React.ReactNode;
    label: string;
    value: string | React.ReactNode;
  }> = ({ icon, label, value }) => (
    <div className="flex items-center mb-4">
      <div className="text-brand mr-3">{icon}</div>
      <div>
        <span className="text-sm text-gray-500">{label}</span>
        <div className="font-semibold">{value}</div>
      </div>
    </div>
  );

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 py-12">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <div className="mb-8 text-center">
          <img src={logo} alt="깔끔한방 로고" className="mx-auto w-48 h-auto" />
        </div>
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-3xl font-bold text-gray-800">견적 상세</h1>
          <div className="text-right">
            <p className="text-sm text-gray-500">제안 날짜</p>
            <p className="font-semibold">
              {new Date(data.fixedDate).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="bg-blue-50 p-6 rounded-lg mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-blue-700">견적 금액</h2>
            <p className="text-3xl font-bold text-blue-700">
              {data.price.toLocaleString()}원
            </p>
          </div>
          <InfoItem
            icon={<ClipboardList size={20} />}
            label="청소 종류"
            value={data.cleanType}
          />
          <p className="text-gray-700">
            <span className="font-semibold">설명:</span> {data.statement}
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            파트너 정보
          </h2>
          <div className="bg-gray-50 p-6 rounded-lg">
            <InfoItem
              icon={<Briefcase size={20} />}
              label="회사명"
              value={data.companyName}
            />
            <InfoItem
              icon={<Briefcase size={20} />}
              label="담당자"
              value={data.managerName}
            />
            <InfoItem
              icon={<Phone size={20} />}
              label="연락처"
              value={data.phoneNumber}
            />
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            의뢰 정보
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <InfoItem
              icon={<Calendar size={20} />}
              label="희망 날짜"
              value={new Date(data.desiredDate).toLocaleDateString()}
            />
            <InfoItem
              icon={<MapPin size={20} />}
              label="크기"
              value={`${data.size} 평`}
            />
          </div>
          <p className="mt-4 text-gray-700">
            <span className="font-semibold">특이사항:</span>{' '}
            {data.significant || '없음'}
          </p>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={handlePaymentNavigation}
            className={`py-3 px-6 rounded-full text-white font-semibold text-lg transition-colors ${
              data.status === Status.CONTACT
                ? 'bg-[#0bb8f9] hover:bg-blue-600'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
            disabled={data.status !== Status.CONTACT}
          >
            {data.status === Status.CONTACT ? '결제 진행하기' : '결제 불가'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EstimateDetail;
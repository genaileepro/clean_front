import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useEstimateDetail } from '../../hooks/useCommissions';
import { Status } from '../../types/commission';
import {
  Calendar,
  DollarSign,
  ClipboardList,
  Briefcase,
  Phone,
} from 'lucide-react';
import LoadingSpinner from '../../utils/LoadingSpinner';

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
    value: string;
  }> = ({ icon, label, value }) => (
    <div className="flex items-center mb-2">
      <div className="text-brand mr-2">{icon}</div>
      <span className="font-semibold mr-2">{label}:</span>
      <span>{value}</span>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        견적 상세
      </h1>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-4 text-brand">견적 정보</h2>
          <InfoItem
            icon={<ClipboardList size={20} />}
            label="견적 ID"
            value={data.id.toString()}
          />
          <InfoItem
            icon={<DollarSign size={20} />}
            label="금액"
            value={`${data.price.toLocaleString()}원`}
          />
          <InfoItem
            icon={<Calendar size={20} />}
            label="작업 날짜"
            value={new Date(data.fixedDate).toLocaleString()}
          />
          <p className="mb-2">
            <span className="font-semibold">설명:</span> {data.statement}
          </p>
          <p className="mb-2">
            <span className="font-semibold">상태:</span> {data.status}
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-4 text-brand">
            의뢰 정보
          </h2>
          <InfoItem
            icon={<ClipboardList size={20} />}
            label="의뢰 ID"
            value={data.commissionId.toString()}
          />
          <InfoItem
            icon={<Briefcase size={20} />}
            label="청소 종류"
            value={data.cleanType}
          />
          <InfoItem
            icon={<Calendar size={20} />}
            label="희망 날짜"
            value={new Date(data.desiredDate).toLocaleDateString()}
          />
          <InfoItem
            icon={<ClipboardList size={20} />}
            label="크기"
            value={`${data.size} 평`}
          />
          <p className="mb-2">
            <span className="font-semibold">특이사항:</span>{' '}
            {data.significant || '없음'}
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-4 text-brand">
            파트너 정보
          </h2>
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

          <div className="mt-8 flex justify-center">
            <button
              onClick={handlePaymentNavigation}
              className={`py-2 px-6 rounded-full text-white font-semibold transition-colors ${
                data.status === Status.CONTACT
                  ? 'bg-brand hover:bg-brand-dark'
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
              disabled={data.status !== Status.CONTACT}
            >
              {data.status === Status.CONTACT ? '결제 진행하기' : '결제 불가'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EstimateDetail;

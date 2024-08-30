import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useEstimateDetail } from '../../hooks/useCommissions';
import { Status } from '../../types/commission';

const EstimateDetail: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const estimateId = Number(searchParams.get('id'));

  const { data, isLoading, error } = useEstimateDetail(estimateId);

  if (isLoading) return <div className="text-center py-8">로딩 중...</div>;
  if (error)
    return (
      <div className="text-center py-8 text-red-500">에러: {error.message}</div>
    );
  if (!data)
    return <div className="text-center py-8">견적을 찾을 수 없습니다.</div>;

  const handlePaymentNavigation = () => {
    navigate('/payment', { state: { estimateId: data.id } });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6 text-center">견적 상세</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">견적 정보</h2>
        <p>견적 ID: {data.id}</p>
        <p>금액: {data.price.toLocaleString()}원</p>
        <p>작업 날짜: {new Date(data.fixedDate).toLocaleString()}</p>
        <p>설명: {data.statement}</p>
        <p>상태: {data.status}</p>

        <h2 className="text-xl font-semibold mt-6 mb-4">의뢰 정보</h2>
        <p>의뢰 ID: {data.commissionId}</p>
        <p>청소 종류: {data.cleanType}</p>
        <p>희망 날짜: {new Date(data.desiredDate).toLocaleDateString()}</p>
        <p>크기: {data.size} 평</p>
        <p>특이사항: {data.significant || '없음'}</p>

        <h2 className="text-xl font-semibold mt-6 mb-4">파트너 정보</h2>
        <p>회사명: {data.companyName}</p>
        <p>담당자: {data.managerName}</p>
        <p>연락처: {data.phoneNumber}</p>

        <div className="mt-6 flex justify-center">
          <button
            onClick={handlePaymentNavigation}
            className="bg-brand text-white py-2 px-6 rounded-full hover:bg-brand-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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

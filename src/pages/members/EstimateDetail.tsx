import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useCommissionConfirmDetail } from '../../hooks/useCommissions';

const EstimateDetail: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const estimateId = searchParams.get('id');
  const parsedEstimateId = estimateId ? Number(estimateId) : undefined;

  const {
    data: estimateDetail,
    isLoading,
    error,
  } = useCommissionConfirmDetail(parsedEstimateId!);

  if (isLoading) return <div className="text-center">로딩 중...</div>;
  if (error)
    return (
      <div className="text-center text-red-500">에러: {error.message}</div>
    );
  if (!estimateDetail)
    return <div className="text-center">견적을 찾을 수 없습니다.</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">견적 상세</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <p>
          <span className="font-semibold">견적 금액:</span>{' '}
          {estimateDetail.tmpPrice}원
        </p>
        <p>
          <span className="font-semibold">작업 가능일:</span>{' '}
          {new Date(estimateDetail.fixedDate).toLocaleDateString()}
        </p>
        <p>
          <span className="font-semibold">견적 설명:</span>{' '}
          {estimateDetail.statement}
        </p>
        <p>
          <span className="font-semibold">상태:</span>{' '}
          {estimateDetail.estimatedStatus}
        </p>
      </div>
      <button
        onClick={() =>
          navigate(`/commission?commissionId=${estimateDetail.commissionId}`)
        }
        className="mt-4 bg-brand text-white py-2 px-4 rounded hover:bg-brand-dark transition-colors"
      >
        의뢰로 돌아가기
      </button>
    </div>
  );
};

export default EstimateDetail;

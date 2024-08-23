import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useEstimateDetail } from '../../hooks/useCommissions';
import { approveEstimate } from '../../api/commissions';
import { showErrorNotification } from '../../utils/errorHandler';
import toast from 'react-hot-toast';

const EstimateDetail: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const estimateId = searchParams.get('id');
  const parsedEstimateId = estimateId ? Number(estimateId) : undefined;

  const {
    data: estimate,
    isLoading,
    error,
    refetch,
  } = useEstimateDetail(parsedEstimateId!);

  if (isLoading) return <div className="text-center">로딩 중...</div>;
  if (error)
    return (
      <div className="text-center text-red-500">
        에러: {(error as Error).message}
      </div>
    );
  if (!estimate)
    return <div className="text-center">견적을 찾을 수 없습니다.</div>;

  const handleApproveEstimate = async () => {
    try {
      await approveEstimate(estimate.id);
      toast.success('견적이 승인되었습니다.');
      refetch(); // 견적 정보를 다시 불러옵니다.
    } catch (error) {
      showErrorNotification('견적 승인에 실패했습니다.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">견적 상세</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <p>
          <span className="font-semibold">견적 ID:</span> {estimate.id}
        </p>
        <p>
          <span className="font-semibold">견적 금액:</span> {estimate.price}원
        </p>
        <p>
          <span className="font-semibold">작업 가능일:</span>{' '}
          {new Date(estimate.fixedDate).toLocaleDateString()}
        </p>
        <p>
          <span className="font-semibold">견적 설명:</span> {estimate.statement}
        </p>
        <p>
          <span className="font-semibold">상태:</span> {estimate.status}
        </p>
        <div className="mt-6 flex justify-center space-x-4">
          <button
            onClick={handleApproveEstimate}
            className="bg-brand text-white py-2 px-4 rounded hover:bg-brand-dark transition-colors"
            disabled={estimate.status !== 'CHECK'}
          >
            견적 승인
          </button>
          <button
            onClick={() => navigate(-1)}
            className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400 transition-colors"
          >
            뒤로 가기
          </button>
        </div>
      </div>
    </div>
  );
};

export default EstimateDetail;

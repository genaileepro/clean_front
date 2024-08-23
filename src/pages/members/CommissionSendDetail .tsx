import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useCommissionSendDetail } from '../../hooks/useCommissions';
import { HouseType, CleanType, Status, Estimate } from '../../types/commission';
import CommissionImage from '../../components/common/CommissionImage';

const CommissionSendDetail: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const commissionId = Number(searchParams.get('commissionId'));

  const {
    data: commission,
    isLoading,
    error,
  } = useCommissionSendDetail(commissionId);
  const [showEstimates, setShowEstimates] = useState(false);

  if (isLoading) return <div className="text-center">로딩 중...</div>;
  if (error)
    return (
      <div className="text-center text-red-500">
        에러가 발생했습니다: {(error as Error).message}
      </div>
    );
  if (!commission)
    return <div className="text-center">의뢰를 찾을 수 없습니다.</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">발송된 의뢰 상세</h1>
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <CommissionImage
          filename={commission.image || ''}
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
        <div className="grid grid-cols-2 gap-4">
          <p>
            <span className="font-semibold">크기:</span> {commission.size} 평
          </p>
          <p>
            <span className="font-semibold">집 종류:</span>{' '}
            {HouseType[commission.houseType]}
          </p>
          <p>
            <span className="font-semibold">청소 종류:</span>{' '}
            {CleanType[commission.cleanType]}
          </p>
          <p>
            <span className="font-semibold">희망 날짜:</span>{' '}
            {new Date(commission.desiredDate).toLocaleDateString()}
          </p>
          <p>
            <span className="font-semibold">상태:</span>{' '}
            {Status[commission.status]}
          </p>
        </div>
        <p className="mt-4">
          <span className="font-semibold">특이사항:</span>{' '}
          {commission.significant}
        </p>
      </div>

      <div className="mb-4">
        <button
          onClick={() => setShowEstimates(!showEstimates)}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          {showEstimates ? '견적 목록 접기' : '견적 목록 펼치기'}
        </button>
      </div>

      {showEstimates && (
        <div>
          <h2 className="text-2xl font-bold mb-4">견적 목록</h2>
          {commission.estimates && commission.estimates.length > 0 ? (
            <div className="space-y-4">
              {commission.estimates.map((estimate: Estimate) => (
                <div
                  key={estimate.id}
                  className="bg-white shadow-md rounded-lg p-4"
                >
                  <div className="flex justify-between items-center">
                    <p className="font-semibold">{estimate.partnerName}</p>
                    <button
                      onClick={() =>
                        navigate(`/estimatedetail?id=${estimate.id}`)
                      }
                      className="bg-brand text-white py-1 px-3 rounded-lg text-sm hover:bg-brand-dark transition-colors"
                    >
                      상세 보기
                    </button>
                  </div>
                  <p>
                    <span className="font-semibold">견적 금액:</span>{' '}
                    {estimate.price}원
                  </p>
                  <p>
                    <span className="font-semibold">작업 가능일:</span>{' '}
                    {new Date(estimate.fixedDate).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">아직 견적이 없습니다.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CommissionSendDetail;

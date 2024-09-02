import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useCommissionSendDetail } from '../../hooks/useCommissions';
import { HouseType, CleanType, Status, Estimate } from '../../types/commission';
import CommissionImage from '../../components/common/CommissionImage';
import { ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';

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

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        로딩 중...
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        에러가 발생했습니다: {(error as Error).message}
      </div>
    );
  if (!commission)
    return (
      <div className="flex justify-center items-center h-screen">
        의뢰를 찾을 수 없습니다.
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        발송된 의뢰 상세
      </h1>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
        <CommissionImage
          filename={commission.image || ''}
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-600">크기</p>
              <p className="text-lg font-semibold">{commission.size} 평</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">집 종류</p>
              <p className="text-lg font-semibold">
                {HouseType[commission.houseType]}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">청소 종류</p>
              <p className="text-lg font-semibold">
                {CleanType[commission.cleanType]}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">희망 날짜</p>
              <p className="text-lg font-semibold">
                {new Date(commission.desiredDate).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">상태</p>
              <p className="text-lg font-semibold">
                {Status[commission.status]}
              </p>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-600">특이사항</p>
            <p className="text-lg">{commission.significant || '없음'}</p>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <button
          onClick={() => setShowEstimates(!showEstimates)}
          className="w-full bg-brand text-white py-3 px-4 flex justify-between items-center hover:bg-brand-dark transition-colors"
        >
          <span className="text-lg font-semibold">견적 목록</span>
          {showEstimates ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
        </button>

        {showEstimates && (
          <div className="p-6">
            {commission.estimates && commission.estimates.length > 0 ? (
              <div className="space-y-4">
                {commission.estimates.map((estimate: Estimate) => (
                  <div
                    key={estimate.id}
                    className="bg-gray-50 rounded-lg p-4 shadow-sm"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <p className="font-semibold text-lg">
                        {estimate.partnerName}
                      </p>
                      <button
                        onClick={() =>
                          navigate(`/estimatedetail?id=${estimate.id}`)
                        }
                        className="flex items-center text-brand hover:text-brand-dark transition-colors"
                      >
                        상세 보기
                        <ExternalLink size={18} className="ml-1" />
                      </button>
                    </div>
                    <p className="text-gray-700">
                      <span className="font-medium">견적 금액:</span>{' '}
                      {estimate.price.toLocaleString()}원
                    </p>
                    <p className="text-gray-700">
                      <span className="font-medium">작업 가능일:</span>{' '}
                      {new Date(estimate.fixedDate).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 py-4">
                아직 견적이 없습니다.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommissionSendDetail;

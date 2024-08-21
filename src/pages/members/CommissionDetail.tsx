import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useCommissionConfirm } from '../../hooks/useCommissions';
import { HouseType, CleanType, Estimate } from '../../types/commission';
import noImages from '../../assets/noImages.png';

const CommissionDetail: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const commissionId = searchParams.get('commissionId');
  const parsedCommissionId = commissionId ? Number(commissionId) : undefined;

  const {
    data: commission,
    isLoading,
    error,
  } = useCommissionConfirm(parsedCommissionId!);

  console.log('Parsed Commission ID:', parsedCommissionId);
  console.log('Commission Data:', commission);

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러가 발생했습니다: {(error as Error).message}</div>;
  if (!commission) return <div>의뢰를 찾을 수 없습니다.</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">의뢰 상세</h1>
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <img
          src={commission.image || noImages}
          alt="Commission"
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
        </div>
        <p className="mt-4">
          <span className="font-semibold">특이사항:</span>{' '}
          {commission.significant}
        </p>
      </div>

      <h2 className="text-2xl font-bold mb-4">견적 목록</h2>
      {commission.estimates && commission.estimates.length > 0 ? (
        <div className="space-y-4">
          {commission.estimates.map((estimate: Estimate) => (
            <div
              key={estimate.id}
              className="bg-white shadow-md rounded-lg p-4 cursor-pointer hover:bg-gray-50"
              onClick={() => navigate(`/estimatedetail?id=${estimate.id}`)}
            >
              <p>
                <span className="font-semibold">업체명:</span>{' '}
                {estimate.partnerName}
              </p>
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
  );
};

export default CommissionDetail;

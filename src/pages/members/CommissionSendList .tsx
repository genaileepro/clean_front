import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCommissions } from '../../hooks/useCommissions';
import {
  Commission,
  HouseType,
  CleanType,
  Status,
} from '../../types/commission';
import CommissionImage from '../../components/common/CommissionImage';
import noHistory from '../../assets/noHistory.png';

const CommissionSendList: React.FC = () => {
  const navigate = useNavigate();
  const { data: commissions, isLoading, isError, error } = useCommissions();

  if (isLoading) return <div className="text-center">로딩 중...</div>;
  if (isError) return <div className="text-center">에러: {error?.message}</div>;

  const sendCommissions = commissions?.filter(
    (commission: Commission) => commission.status === Status.SEND,
  );

  return (
    <div className="bg-white min-h-screen py-4">
      <div className="container mx-auto px-4 max-w-3xl">
        {sendCommissions && sendCommissions.length > 0 ? (
          <div className="space-y-4">
            {sendCommissions.map((commission: Commission) => (
              <div
                key={commission.commissionId}
                className="bg-gray-50 rounded-lg shadow-sm overflow-hidden cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-102"
                onClick={() =>
                  navigate(
                    `/commissionsenddetail?commissionId=${commission.commissionId}&addressId=${commission.addressId}`,
                  )
                }
              >
                <div className="flex">
                  <div className="w-32 h-32 flex-shrink-0">
                    <CommissionImage
                      filename={commission.image || ''}
                      className="w-full h-64 object-cover rounded-lg mb-4"
                    />
                  </div>
                  <div className="flex-1 p-3">
                    <h2 className="text-lg font-semibold mb-1">
                      {HouseType[commission.houseType]} 청소
                    </h2>
                    <div className="grid grid-cols-2 gap-1 text-sm">
                      <p>
                        <span className="font-medium">평수:</span>{' '}
                        {commission.size} 평
                      </p>
                      <p>
                        <span className="font-medium">청소 등급:</span>{' '}
                        {CleanType[commission.cleanType]}
                      </p>
                      <p>
                        <span className="font-medium">희망일:</span>{' '}
                        {new Date(commission.desiredDate).toLocaleDateString()}
                      </p>
                      <p>
                        <span className="font-medium">상태:</span>{' '}
                        {Status[commission.status]}
                      </p>
                    </div>
                    <p className="text-sm mt-1">
                      <span className="font-medium">요청사항:</span>{' '}
                      {commission.significant || '없음'}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center h-[calc(100vh-2rem)]">
            <img
              src={noHistory}
              alt="No history"
              className="max-w-full max-h-full"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CommissionSendList;

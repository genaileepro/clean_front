import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCommissions } from '../../hooks/useCommissions';
import {
  Commission,
  Status,
  HouseTypeKorean,
  CleanTypeKorean,
} from '../../types/commission';
import CommissionImage from '../../components/common/CommissionImage';
import noHistory from '../../assets/noHistory.png';
import { Calendar, Home, Sparkles } from 'lucide-react';

const CommissionCard: React.FC<{ commission: Commission }> = ({
  commission,
}) => {
  const navigate = useNavigate();

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-all duration-300 ease-in-out transform hover:shadow-lg hover:-translate-y-1"
      onClick={() =>
        navigate(
          `/commissionsenddetail?commissionId=${commission.commissionId}&addressId=${commission.addressId}`,
        )
      }
    >
      <div className="flex">
        <div className="w-1/3 h-40">
          <CommissionImage
            filename={commission.image || ''}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-2/3 p-4">
          <h2 className="text-xl font-semibold mb-2 text-gray-800">
            {HouseTypeKorean[commission.houseType]} 청소
          </h2>
          <div className="space-y-2">
            <div className="flex items-center text-gray-600">
              <Home size={16} className="mr-2" />
              <span>평수: {commission.size} 평</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Sparkles size={16} className="mr-2" />
              <span>청소 등급: {CleanTypeKorean[commission.cleanType]}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Calendar size={16} className="mr-2" />
              <span>
                희망일: {new Date(commission.desiredDate).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CommissionSendList: React.FC = () => {
  const { data: commissions, isLoading, isError, error } = useCommissions();

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        로딩 중...
      </div>
    );
  if (isError)
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        에러: {error?.message}
      </div>
    );

  const sendCommissions = commissions?.filter(
    (commission: Commission) => commission.status === Status.SEND,
  );

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          발송된 의뢰 목록
        </h1>
        {sendCommissions && sendCommissions.length > 0 ? (
          <div className="space-y-6">
            {sendCommissions.map((commission: Commission) => (
              <CommissionCard
                key={commission.commissionId}
                commission={commission}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center h-[calc(100vh-12rem)]">
            <img
              src={noHistory}
              alt="No history"
              className="max-w-full max-h-64 mb-4"
            />
            <p className="text-xl text-gray-600">
              아직 발송된 의뢰가 없습니다.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommissionSendList;

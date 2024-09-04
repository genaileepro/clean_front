import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  useCommissionConfirmed,
  useUpdateCommissionStatus,
} from '../../hooks/useCommissions';
import {
  Status,
  Commission,
  CleanTypeKorean,
  HouseTypeKorean,
} from '../../types/commission';
import { showErrorNotification } from '../../utils/errorHandler';
import toast from 'react-hot-toast';
import CommissionImage from '../../components/common/CommissionImage';
import { ArrowLeft, Edit, Send } from 'lucide-react';

const CommissionDetail: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const commissionId = Number(searchParams.get('commissionId'));
  const updateCommissionStatusMutation = useUpdateCommissionStatus();

  const {
    data: commission,
    isLoading,
    error,
  } = useCommissionConfirmed(commissionId);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

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

  const handleSendCommission = () => setIsConfirmOpen(true);

  const confirmSendCommission = async () => {
    setIsConfirmOpen(false);
    try {
      if (!commission.commissionId || !commission.addressId) {
        throw new Error('Invalid commissionId or addressId');
      }

      const updatedCommission: Commission = {
        ...commission,
        status: Status.SEND,
      };

      await updateCommissionStatusMutation.mutateAsync(updatedCommission);

      toast.success('의뢰가 성공적으로 발송되었습니다');
      navigate('/commissionsendlist');
    } catch (error) {
      showErrorNotification('의뢰 발송에 실패했습니다');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        의뢰 상세
      </h1>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <CommissionImage
          filename={commission.image || ''}
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="col-span-2 sm:col-span-1">
              <p className="text-sm text-gray-600">크기</p>
              <p className="text-lg font-semibold">{commission.size} 평</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className="text-sm text-gray-600">집 종류</p>
              <p className="text-lg font-semibold">
              {HouseTypeKorean[commission.houseType]}
              </p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className="text-sm text-gray-600">청소 종류</p>
              <p className="text-lg font-semibold">
              {CleanTypeKorean[commission.cleanType]}
              </p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className="text-sm text-gray-600">희망 날짜</p>
              <p className="text-lg font-semibold">
                {new Date(commission.desiredDate).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-600">특이사항</p>
            <p className="text-lg">{commission.significant || '없음'}</p>
          </div>
          <div className="mt-8 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            {commission.status === Status.CHECK && (
              <button
                onClick={handleSendCommission}
                className="flex items-center justify-center bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition-colors"
              >
                <Send size={18} className="mr-2" />
                발송하기
              </button>
            )}
            <button
              onClick={() =>
                navigate(
                  `/commissionedit?commissionId=${commission.commissionId}&addressId=${commission.addressId}`,
                )
              }
              className="flex items-center justify-center bg-brand text-white px-6 py-2 rounded-full hover:bg-brand-dark transition-colors"
            >
              <Edit size={18} className="mr-2" />
              수정하기
            </button>
            <button
              onClick={() => navigate('/commissionlist')}
              className="flex items-center justify-center bg-gray-300 text-gray-700 px-6 py-2 rounded-full hover:bg-gray-400 transition-colors"
            >
              <ArrowLeft size={18} className="mr-2" />
              뒤로 가기
            </button>
          </div>
        </div>
      </div>

      {isConfirmOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-sm w-full">
            <p className="mb-4 text-lg font-semibold text-center">
              의뢰를 발송하시겠습니까?
            </p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsConfirmOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded-full text-gray-700 hover:bg-gray-400 transition-colors"
              >
                취소
              </button>
              <button
                onClick={confirmSendCommission}
                className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommissionDetail;

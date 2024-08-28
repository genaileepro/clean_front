import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  useCommissionConfirmed,
  useUpdateCommissionStatus,
} from '../../hooks/useCommissions';
import {
  HouseType,
  CleanType,
  Status,
  Commission,
} from '../../types/commission';
import { showErrorNotification } from '../../utils/errorHandler';
import toast from 'react-hot-toast';
import CommissionImage from '../../components/common/CommissionImage';

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

  if (isLoading) return <div className="text-center">로딩 중...</div>;
  if (error)
    return (
      <div className="text-center text-red-500">
        에러가 발생했습니다: {(error as Error).message}
      </div>
    );
  if (!commission)
    return <div className="text-center">의뢰를 찾을 수 없습니다.</div>;

  const handleSendCommission = () => {
    setIsConfirmOpen(true);
  };

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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">의뢰 상세</h1>
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <CommissionImage
          filename={commission.image || ''}
          className="w-full h-64 object-cover mb-4"
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
          {commission.significant || '없음'}
        </p>
        <div className="mt-6 flex justify-center space-x-4">
          {commission.status === Status.CHECK && (
            <button
              onClick={handleSendCommission}
              className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition-colors"
            >
              발송하기
            </button>
          )}
          <button
            onClick={() =>
              navigate(
                `/commissionedit?commissionId=${commission.commissionId}&addressId=${commission.addressId}`,
              )
            }
            className="bg-brand text-white px-6 py-2 rounded hover:bg-brand-dark transition-colors"
          >
            수정하기
          </button>
          <button
            onClick={() => navigate('/commissionlist')}
            className="bg-gray-300 text-gray-700 px-6 py-2 rounded hover:bg-gray-400 transition-colors"
          >
            뒤로 가기
          </button>
        </div>
      </div>

      {isConfirmOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg">
            <p className="mb-4">의뢰를 발송하시겠습니까?</p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsConfirmOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                취소
              </button>
              <button
                onClick={confirmSendCommission}
                className="px-4 py-2 bg-blue-500 text-white rounded"
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

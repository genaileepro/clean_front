import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useCommissions,
  useDeleteCommission,
  useUpdateCommissionStatus,
} from '../../hooks/useCommissions';
import { showErrorNotification } from '../../utils/errorHandler';
import noHistory from '../../assets/noHistory.png';
import CommissionImage from '../../components/common/CommissionImage';
import {
  Commission,
  HouseType,
  CleanType,
  Status,
} from '../../types/commission';
import toast from 'react-hot-toast';

const CommissionList: React.FC = () => {
  const navigate = useNavigate();
  const { data: commissions, isLoading, isError, error } = useCommissions();
  const deleteCommissionMutation = useDeleteCommission();
  const updateCommissionStatusMutation = useUpdateCommissionStatus();
  const [selectedCommission, setSelectedCommission] =
    useState<Commission | null>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleDeleteCommission = async (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('정말로 이 의뢰를 삭제하시겠습니까?')) {
      try {
        await deleteCommissionMutation.mutateAsync(id);
        toast.success('의뢰가 성공적으로 삭제되었습니다');
      } catch (error) {
        showErrorNotification('의뢰 삭제에 실패했습니다');
      }
    }
  };

  const handleSendCommission = (
    commission: Commission,
    e: React.MouseEvent,
  ) => {
    e.stopPropagation();
    setSelectedCommission(commission);
    setIsConfirmOpen(true);
  };

  const confirmSendCommission = async () => {
    if (!selectedCommission) return;

    setIsConfirmOpen(false);
    try {
      if (!selectedCommission.commissionId || !selectedCommission.addressId) {
        throw new Error('Invalid commissionId or addressId');
      }

      const updatedCommission: Commission = {
        ...selectedCommission,
        status: Status.SEND,
      };

      await updateCommissionStatusMutation.mutateAsync(updatedCommission);
      toast.success('의뢰가 성공적으로 발송되었습니다');
    } catch (error) {
      showErrorNotification('의뢰 발송에 실패했습니다');
    }
    setSelectedCommission(null);
  };

  const getStatusText = (status: Status) => {
    switch (status) {
      case Status.CHECK:
        return '확인 중';
      case Status.SEND:
        return '전송됨';
      case Status.CONTECT:
        return '연락 중';
      case Status.FINISH:
        return '완료';
      default:
        return '확인 중';
    }
  };

  if (isLoading) return <div className="text-center">로딩 중...</div>;
  if (isError) return <div className="text-center">에러: {error?.message}</div>;

  const checkCommissions = commissions?.filter(
    (commission: Commission) => commission.status === Status.CHECK,
  );

  return (
    <div className="bg-white min-h-screen py-4">
      <div className="container mx-auto px-4 max-w-3xl">
        {checkCommissions && checkCommissions.length > 0 ? (
          <div className="space-y-4">
            {checkCommissions.map((commission: Commission) => (
              <div
                key={commission.commissionId}
                className="bg-gray-50 rounded-lg shadow-sm overflow-hidden cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-102"
                onClick={() =>
                  navigate(
                    `/commissiondetail?commissionId=${commission.commissionId}`,
                  )
                }
              >
                <div className="flex">
                  <div className="w-32 h-32 flex-shrink-0">
                    <CommissionImage filename={commission.image || ''} />
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
                        {getStatusText(commission.status)}
                      </p>
                    </div>
                    <p className="text-sm mt-1">
                      <span className="font-medium">요청사항:</span>{' '}
                      {commission.significant || '없음'}
                    </p>
                    <div className="mt-2 flex justify-end space-x-2">
                      <button
                        onClick={(e) => handleSendCommission(commission, e)}
                        className="bg-blue-500 text-white px-2 py-1 text-sm rounded hover:bg-blue-600 transition-colors"
                      >
                        발송
                      </button>
                      <button
                        onClick={(e) =>
                          handleDeleteCommission(commission.commissionId, e)
                        }
                        className="bg-gray-200 text-gray-700 px-2 py-1 text-sm rounded hover:bg-gray-300 transition-colors"
                      >
                        의뢰 삭제
                      </button>
                    </div>
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

export default CommissionList;

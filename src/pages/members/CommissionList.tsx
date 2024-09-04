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
  Status,
  StatusKorean,
  HouseTypeKorean,
  CleanTypeKorean,
} from '../../types/commission';
import toast from 'react-hot-toast';
import { Home, Trash2, Send, ChevronRight } from 'lucide-react';
import LoadingSpinner from '../../utils/LoadingSpinner';

const CommissionCard: React.FC<{
  commission: Commission;
  onDelete: () => void;
  onSend: () => void;
}> = ({ commission, onDelete, onSend }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="flex">
        <div className="w-1/3 h-40">
          <CommissionImage
            filename={commission.image || ''}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-2/3 p-4 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-semibold mb-2 text-gray-800">
            {HouseTypeKorean[commission.houseType]} 청소
            </h2>
            <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
              <div className="flex items-center">
                <Home size={16} className="mr-1" />
                <span>평수: {commission.size} 평</span>
              </div>
              <div>청소 등급: {CleanTypeKorean[commission.cleanType]}</div>
              <div>
                희망일: {new Date(commission.desiredDate).toLocaleDateString()}
              </div>
              <div>상태: {StatusKorean[commission.status]}</div>
            </div>
          </div>
          <div className="flex justify-between items-center mt-4">
            <div className="flex space-x-2">
              <button
                onClick={onSend}
                className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm hover:bg-blue-600 transition-colors flex items-center"
              >
                <Send size={14} className="mr-1" />
                발송
              </button>
              <button
                onClick={onDelete}
                className="bg-gray-300 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-400 transition-colors flex items-center"
              >
                <Trash2 size={14} className="mr-1" />
                삭제
              </button>
            </div>
            <button
              onClick={() =>
                navigate(
                  `/commissiondetail?commissionId=${commission.commissionId}`,
                )
              }
              className="text-blue-500 hover:text-blue-700 transition-colors flex items-center"
            >
              상세보기
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const CommissionList: React.FC = () => {
  const { data: commissions, isLoading, isError, error } = useCommissions();
  const deleteCommissionMutation = useDeleteCommission();
  const updateCommissionStatusMutation = useUpdateCommissionStatus();
  const [selectedCommission, setSelectedCommission] =
    useState<Commission | null>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleDeleteCommission = async (id: number) => {
    if (window.confirm('정말로 이 의뢰를 삭제하시겠습니까?')) {
      try {
        await deleteCommissionMutation.mutateAsync(id);
        toast.success('의뢰가 성공적으로 삭제되었습니다');
      } catch (error) {
        showErrorNotification('의뢰 삭제에 실패했습니다');
      }
    }
  };

  const handleSendCommission = (commission: Commission) => {
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

  if (isLoading) return <LoadingSpinner size="large" />;
  if (isError)
    return (
      <div className="text-center text-red-500">에러: {error?.message}</div>
    );

  const checkCommissions = commissions?.filter(
    (commission: Commission) => commission.status === Status.CHECK
  );

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          의뢰 목록
        </h1>
        {checkCommissions && checkCommissions.length > 0 ? (
          <div className="space-y-6">
            {checkCommissions.map((commission: Commission) => (
              <CommissionCard
                key={commission.commissionId}
                commission={commission}
                onDelete={() => handleDeleteCommission(commission.commissionId)}
                onSend={() => handleSendCommission(commission)}
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
            <p className="text-xl text-gray-600">아직 의뢰가 없습니다.</p>
          </div>
        )}
      </div>

      {isConfirmOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <p className="mb-4 text-lg">의뢰를 발송하시겠습니까?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsConfirmOpen(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition-colors"
              >
                취소
              </button>
              <button
                onClick={confirmSendCommission}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
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
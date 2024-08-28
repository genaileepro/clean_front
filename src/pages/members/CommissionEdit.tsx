import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  useCommissionConfirmed,
  useUpdateCommission,
} from '../../hooks/useCommissions';
import { Commission, HouseType, CleanType } from '../../types/commission';
import { toast } from 'react-hot-toast';
import { showErrorNotification } from '../../utils/errorHandler';

const CommissionEdit: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const commissionId = Number(searchParams.get('commissionId'));

  const {
    data: commission,
    isLoading,
    error,
  } = useCommissionConfirmed(commissionId);
  const updateCommissionMutation = useUpdateCommission();

  const [editedCommission, setEditedCommission] = useState<Partial<Commission>>(
    {},
  );

  useEffect(() => {
    if (commission) {
      setEditedCommission(commission);
    }
  }, [commission]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setEditedCommission((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!editedCommission.commissionId || !editedCommission.addressId) {
        throw new Error('Invalid commissionId or addressId');
      }
      await updateCommissionMutation.mutateAsync({
        commissionId: editedCommission.commissionId,
        addressId: editedCommission.addressId,
        commission: editedCommission,
      });
      toast.success('의뢰가 성공적으로 수정되었습니다');
      navigate(`/commissiondetail?commissionId=${commissionId}`);
    } catch (error) {
      showErrorNotification('의뢰 수정에 실패했습니다');
      console.error('Failed to update commission:', error);
    }
  };

  if (isLoading) return <div className="text-center py-4">로딩 중...</div>;
  if (error)
    return (
      <div className="text-center py-4 text-red-500">
        에러가 발생했습니다: {(error as Error).message}
      </div>
    );
  if (!commission)
    return <div className="text-center py-4">의뢰를 찾을 수 없습니다.</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">의뢰 수정</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="size" className="block mb-2 font-semibold">
            크기 (평)
          </label>
          <input
            type="number"
            id="size"
            name="size"
            value={editedCommission.size || ''}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="houseType" className="block mb-2 font-semibold">
            집 종류
          </label>
          <select
            id="houseType"
            name="houseType"
            value={editedCommission.houseType || ''}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">선택해주세요</option>
            {Object.entries(HouseType).map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="cleanType" className="block mb-2 font-semibold">
            청소 종류
          </label>
          <select
            id="cleanType"
            name="cleanType"
            value={editedCommission.cleanType || ''}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">선택해주세요</option>
            {Object.entries(CleanType).map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="desiredDate" className="block mb-2 font-semibold">
            희망 날짜
          </label>
          <input
            type="date"
            id="desiredDate"
            name="desiredDate"
            value={
              editedCommission.desiredDate
                ? new Date(editedCommission.desiredDate)
                    .toISOString()
                    .split('T')[0]
                : ''
            }
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="significant" className="block mb-2 font-semibold">
            특이사항
          </label>
          <textarea
            id="significant"
            name="significant"
            value={editedCommission.significant || ''}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            rows={4}
          />
        </div>
        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={() => navigate('/commissionlist')}
            className="bg-gray-300 text-gray-700 px-6 py-2 rounded hover:bg-gray-400 transition-colors"
          >
            목록으로
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            수정 완료
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommissionEdit;

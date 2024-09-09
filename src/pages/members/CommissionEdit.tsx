import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  useCommissionConfirmed,
  useUpdateCommission,
} from '../../hooks/useCommissions';
import {
  Commission,
  HouseTypeKorean,
  CleanTypeKorean,
} from '../../types/commission';
import { toast } from 'react-hot-toast';
import { showErrorNotification } from '../../utils/errorHandler';
import { Save, ArrowLeft } from 'lucide-react';

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
      setEditedCommission({
        ...commission,
        desiredDate: commission.desiredDate
          ? new Date(commission.desiredDate).toISOString().slice(0, 16)
          : '',
      });
    }
  }, [commission]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setEditedCommission(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!editedCommission.commissionId || !editedCommission.addressId) {
        throw new Error('Invalid commissionId or addressId');
      }
      const updatedCommission = {
        ...editedCommission,
        desiredDate: new Date(
          editedCommission.desiredDate as string,
        ).toISOString(),
      };
      await updateCommissionMutation.mutateAsync({
        commissionId: editedCommission.commissionId,
        addressId: editedCommission.addressId,
        commission: updatedCommission,
      });
      toast.success('의뢰가 성공적으로 수정되었습니다');
      navigate(`/commissiondetail?commissionId=${commissionId}`);
    } catch (error) {
      showErrorNotification('의뢰 수정에 실패했습니다');
      console.error('Failed to update commission:', error);
    }
  };

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
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        의뢰 수정
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-6"
      >
        <div className="mb-4">
          <label
            htmlFor="size"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            크기 (평)
          </label>
          <input
            type="number"
            id="size"
            name="size"
            value={editedCommission.size || ''}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-brand focus:border-brand"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="houseType"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            집 종류
          </label>
          <select
            id="houseType"
            name="houseType"
            value={editedCommission.houseType || ''}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-brand focus:border-brand"
            required
          >
            <option value="">선택해주세요</option>
            {Object.entries(HouseTypeKorean).map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label
            htmlFor="cleanType"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            청소 종류
          </label>
          <select
            id="cleanType"
            name="cleanType"
            value={editedCommission.cleanType || ''}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-brand focus:border-brand"
            required
          >
            <option value="">선택해주세요</option>
            {Object.entries(CleanTypeKorean).map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label
            htmlFor="desiredDate"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            희망 날짜 및 시간
          </label>
          <input
            type="datetime-local"
            id="desiredDate"
            name="desiredDate"
            value={editedCommission.desiredDate || ''}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-brand focus:border-brand"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="significant"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            특이사항
          </label>
          <textarea
            id="significant"
            name="significant"
            value={editedCommission.significant || ''}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-brand focus:border-brand"
            rows={4}
          />
        </div>
        <div className="flex justify-between items-center mt-8">
          <button
            type="button"
            onClick={() => navigate('/commissionlist')}
            className="flex items-center justify-center bg-gray-300 text-gray-700 px-6 py-2 rounded-full hover:bg-gray-400 transition-colors"
          >
            <ArrowLeft size={18} className="mr-2" />
            목록으로
          </button>
          <button
            type="submit"
            className="flex items-center justify-center bg-brand text-white px-6 py-2 rounded-full hover:bg-brand-dark transition-colors"
          >
            <Save size={18} className="mr-2" />
            수정 완료
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommissionEdit;

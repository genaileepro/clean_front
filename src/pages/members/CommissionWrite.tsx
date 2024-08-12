import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateCommission } from '../../hooks/useCommissions';
import { HouseType, CleanType, Commission } from '../../types/commission';
import logo from '../../assets/logo.png';

const CommissionWrite: React.FC = () => {
  const navigate = useNavigate();
  const createCommissionMutation = useCreateCommission();

  const [form, setForm] = useState<
    Omit<Commission, 'commissionId' | 'memberNick'>
  >({
    size: null,
    houseType: '',
    cleanType: '',
    addressId: 0,
    image: '',
    desiredDate: '',
    significant: '',
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'addressId' || name === 'size' ? (value === '' ? null : Number(value)) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const newCommission = {
        ...form,
        desiredDate: new Date(form.desiredDate).toISOString(),
      };

      await createCommissionMutation.mutateAsync(newCommission);
      navigate('/commissionlist');
    } catch (error) {
      console.error('Failed to create commission:', error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="p-6 hidden sm:block">
          <img
            src={logo}
            alt="깔끔한방 로고"
            className="w-full h-auto max-h-[300px] object-contain"
          />
        </div>
        <h1 className="text-2xl font-bold mb-6 text-center">
          아래 요구사항을 입력해주세요
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">평수:</label>
            <input
              type="number"
              name="size"
              value={form.size === null ? '' : form.size}
              onChange={handleChange}
              placeholder='평수를 입력해주세요'
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700">주거 형태:</label>
            <select
              name="houseType"
              value={form.houseType}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">주거형태 선택</option>
              {Object.entries(HouseType).map(([key, value]) => (
                <option key={key} value={value}>
                  {key}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700">어떤 청소를 희망하시나요?:</label>
            <select
              name="cleanType"
              value={form.cleanType}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">청소 선택</option>
              {Object.entries(CleanType).map(([key, value]) => (
                <option key={key} value={value}>
                  {key}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700">주소:</label>
            <input
              type="text"
              name="addressId"
              value={form.addressId}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700">청소할 장소의 사진을 올려주세요:</label>
            <input
              type="text"
              name="image"
              value={form.image}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700">희망 날짜:</label>
            <input
              type="datetime-local"
              name="desiredDate"
              value={form.desiredDate}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700">특이사항:</label>
            <textarea
              name="significant"
              value={form.significant}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <button
            className="w-full bg-[#0bb8f9] text-white py-2 px-4 rounded hover:bg-blue-600"
            type="submit"
            disabled={createCommissionMutation.isPending}
          >
            {createCommissionMutation.isPending
              ? '처리 중...'
              : '의뢰 작성 완료하기'}
          </button>
        </form>
        {createCommissionMutation.isError && (
          <div className="mt-4 text-red-500">
            의뢰 작성에 실패했습니다. 다시 시도해주세요.
          </div>
        )}
      </div>
    </div>
  );
};

export default CommissionWrite;

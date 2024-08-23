import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useCreateCommission,
  useUploadCommissionImage,
} from '../../hooks/useCommissions';
import {
  HouseType,
  CleanType,
  CommissionFormData,
  AddressData,
  Status,
} from '../../types/commission';
import logo from '../../assets/logo.png';
import AddressSelector from '../../components/common/AddressSelector';
import {
  validateSize,
  validateHouseType,
  validateCleanType,
  validateDesiredDate,
  validateSignificant,
} from '../../utils/validationUtils';
import { showErrorNotification } from '../../utils/errorHandler';

const CommissionWrite: React.FC = () => {
  const navigate = useNavigate();
  const createCommissionMutation = useCreateCommission();
  const uploadImageMutation = useUploadCommissionImage();

  const [form, setForm] = useState<CommissionFormData>({
    size: null,
    houseType: '',
    cleanType: '',
    addressId: null,
    image: '',
    desiredDate: '',
    significant: '',
  });

  const [selectedAddress, setSelectedAddress] = useState<AddressData | null>(
    null,
  );

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAddressSelect = (addressData: AddressData) => {
    setForm((prev) => ({ ...prev, addressId: addressData.id }));
    setSelectedAddress(addressData);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'size' ? (value === '' ? null : Number(value)) : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) {
        showErrorNotification('파일 크기는 4MB를 초과할 수 없습니다.');
        return;
      }

      const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!validTypes.includes(file.type)) {
        showErrorNotification(
          'JPG, PNG, GIF 형식의 이미지만 업로드 가능합니다.',
        );
        return;
      }

      setSelectedFile(file);

      // Preview functionality (can be commented out if not needed)
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (selectedFile) {
      try {
        const fileName = await uploadImageMutation.mutateAsync(selectedFile);
        setForm((prev) => ({ ...prev, image: fileName }));
      } catch (error) {
        console.error('Failed to upload image:', error);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form fields
    const sizeValidation = validateSize(form.size?.toString() || '');
    const houseTypeValidation = validateHouseType(form.houseType);
    const cleanTypeValidation = validateCleanType(form.cleanType);
    const desiredDateValidation = validateDesiredDate(form.desiredDate);
    const significantValidation = validateSignificant(form.significant);

    if (
      !sizeValidation.isValid ||
      !houseTypeValidation.isValid ||
      !cleanTypeValidation.isValid ||
      !desiredDateValidation.isValid ||
      !significantValidation.isValid ||
      !form.image
    ) {
      showErrorNotification('모든 필드를 올바르게 입력해주세요.');
      return;
    }

    try {
      const newCommission = {
        ...form,
        size: form.size || 0,
        addressId: form.addressId || 0,
        desiredDate: new Date(form.desiredDate).toISOString(),
        houseType: form.houseType as HouseType,
        cleanType: form.cleanType as CleanType,
        address: selectedAddress?.address || '',
        status: 'CHECK' as Status,
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
              placeholder="평수를 입력해주세요"
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
            <label className="block text-gray-700">
              어떤 청소를 희망하시나요?:
            </label>
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
            <div className="flex align-middle justify-between">
              <input
                type="text"
                value={selectedAddress?.addressCode || ''}
                readOnly
                placeholder="우편번호"
                className="w-60 p-2 mt-1 border border-gray-300 rounded"
              />
              <AddressSelector onSelectAddress={handleAddressSelect} />
            </div>
            <input
              type="text"
              value={selectedAddress?.address || ''}
              readOnly
              placeholder="주소"
              className="w-full p-2 mt-1 border border-gray-300 rounded"
            />
            <input
              type="text"
              value={selectedAddress?.addressDetail || ''}
              readOnly
              placeholder="상세주소"
              className="w-full p-2 mt-1 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700">청소할 장소의 사진:</label>
            <input
              type="file"
              accept="image/jpeg,image/png,image/gif"
              onChange={handleFileChange}
              ref={fileInputRef}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <button
              type="button"
              onClick={handleUpload}
              disabled={!selectedFile || uploadImageMutation.isPending}
              className="mt-2 bg-blue-500 text-white py-2 px-4 rounded disabled:bg-gray-400"
            >
              {uploadImageMutation.isPending ? '업로드 중...' : '이미지 업로드'}
            </button>
            {uploadImageMutation.isPending && <p>이미지 업로드 중...</p>}
            {form.image && <p>업로드 완료: {form.image}</p>}

            {/* Preview (can be commented out if not needed) */}
            {preview && (
              <div className="mt-4">
                <img src={preview} alt="Preview" className="max-w-xs" />
              </div>
            )}
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

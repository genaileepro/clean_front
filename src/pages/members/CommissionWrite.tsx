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
  CleanTypeKorean,
  HouseTypeKorean,
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
import { Home, Camera, Calendar, FileText, MapPin } from 'lucide-react';

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
    <div className="flex justify-center items-center min-h-screen bg-gray-100 py-12">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <div className="mb-8 text-center">
          <img src={logo} alt="깔끔한방 로고" className="mx-auto w-48 h-auto" />
        </div>
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
          청소 의뢰 작성
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                평수
              </label>
              <div className="flex items-center">
                <Home className="text-gray-400 mr-2" size={20} />
                <input
                  type="number"
                  name="size"
                  value={form.size === null ? '' : form.size}
                  onChange={handleChange}
                  placeholder="평수를 입력해주세요"
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                주거 형태
              </label>
              <select
                name="houseType"
                value={form.houseType}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">주거형태 선택</option>
                {Object.entries(HouseTypeKorean).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              희망하는 청소 종류
            </label>
            <select
              name="cleanType"
              value={form.cleanType}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">청소 선택</option>
              {Object.entries(CleanTypeKorean).map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              주소
            </label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="relative flex-grow">
                  <MapPin
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    type="text"
                    value={selectedAddress?.addressCode || ''}
                    readOnly
                    placeholder="우편번호"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <AddressSelector
                  onSelectAddress={handleAddressSelect}
                  customButtonStyle="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                />
              </div>
              <div className="relative">
                <MapPin
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  value={selectedAddress?.address || ''}
                  readOnly
                  placeholder="주소"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="relative">
                <MapPin
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  value={selectedAddress?.addressDetail || ''}
                  readOnly
                  placeholder="상세주소"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              청소할 장소의 사진
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="file"
                accept="image/jpeg,image/png,image/gif"
                onChange={handleFileChange}
                ref={fileInputRef}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
              >
                <Camera className="mr-2" size={20} />
                이미지 선택
              </button>
              <button
                type="button"
                onClick={handleUpload}
                disabled={!selectedFile || uploadImageMutation.isPending}
                className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:bg-gray-400"
              >
                {uploadImageMutation.isPending
                  ? '업로드 중...'
                  : '이미지 업로드'}
              </button>
            </div>
            {uploadImageMutation.isPending && (
              <p className="text-sm text-gray-500 mt-1">이미지 업로드 중...</p>
            )}
            {form.image && (
              <p className="text-sm text-green-500 mt-1">
                업로드 완료: {form.image}
              </p>
            )}
            {preview && (
              <div className="mt-4">
                <img
                  src={preview}
                  alt="Preview"
                  className="max-w-xs rounded-md shadow-sm"
                />
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              희망 날짜
            </label>
            <div className="flex items-center">
              <Calendar className="text-gray-400 mr-2" size={20} />
              <input
                type="datetime-local"
                name="desiredDate"
                value={form.desiredDate}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              특이사항
            </label>
            <div className="flex items-start">
              <FileText className="text-gray-400 mr-2 mt-2" size={20} />
              <textarea
                name="significant"
                value={form.significant}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                rows={4}
              />
            </div>
          </div>
          <button
            className="w-full bg-[#0bb8f9] text-white py-3 px-4 rounded-md hover:bg-blue-600 transition-colors text-lg font-semibold"
            type="submit"
            disabled={createCommissionMutation.isPending}
          >
            {createCommissionMutation.isPending
              ? '처리 중...'
              : '의뢰 작성 완료하기'}
          </button>
        </form>
        {createCommissionMutation.isError && (
          <div className="mt-4 text-red-500 text-center">
            의뢰 작성에 실패했습니다. 다시 시도해주세요.
          </div>
        )}
      </div>
    </div>
  );
};

export default CommissionWrite;

import React, { useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import {
  useCreateCommission,
  useUploadCommissionImage,
} from '../../hooks/useCommissions';
import {
  HouseType,
  CleanType,
  CommissionFormData,
  AddressData,
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
  validateAddress,
  validateImage,
} from '../../utils/validationUtils';
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
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAddressSelect = useCallback((addressData: AddressData) => {
    setForm(prev => ({ ...prev, addressId: addressData.id }));
    setSelectedAddress(addressData);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: name === 'size' ? (value === '' ? null : Number(value)) : value,
    }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) {
        toast.error('파일 크기는 4MB를 초과할 수 없습니다.');
        return;
      }

      const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!validTypes.includes(file.type)) {
        toast.error('JPG, PNG, GIF 형식의 이미지만 업로드 가능합니다.');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      await handleUpload(file);
    }
  };

  const handleUpload = async (file: File) => {
    setIsUploading(true);
    try {
      const fileName = await uploadImageMutation.mutateAsync(file);
      setForm(prev => ({ ...prev, image: fileName }));
      toast.success('이미지가 성공적으로 업로드되었습니다.');
    } catch (error) {
      console.error('Failed to upload image:', error);
      toast.error('이미지 업로드에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsUploading(false);
    }
  };

  const validateForm = useCallback((): boolean => {
    const validations = [
      { field: 'size', validation: validateSize(form.size?.toString() || '') },
      { field: 'houseType', validation: validateHouseType(form.houseType) },
      { field: 'cleanType', validation: validateCleanType(form.cleanType) },
      { field: 'addressId', validation: validateAddress(form.addressId) },
      { field: 'image', validation: validateImage(form.image) },
      {
        field: 'desiredDate',
        validation: validateDesiredDate(form.desiredDate),
      },
      {
        field: 'significant',
        validation: validateSignificant(form.significant),
      },
      {
        field: 'addressId',
        validation: {
          isValid: !!form.addressId,
          message: '주소를 선택해주세요.',
        },
      },
    ];

    let isValid = true;

    validations.forEach(({ field, validation }) => {
      if (!validation.isValid) {
        toast.error(`${getFieldName(field)}: ${validation.message}`);
        isValid = false;
      }
    });

    return isValid;
  }, [form]);

  const getFieldName = (field: string): string => {
    const fieldNames: { [key: string]: string } = {
      size: '평수',
      houseType: '주거 형태',
      cleanType: '청소 종류',
      addressId: '주소',
      image: '이미지',
      desiredDate: '희망 날짜',
      significant: '특이사항',
    };
    return fieldNames[field] || field;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const newCommission = {
        size: form.size || 0,
        addressId: form.addressId as number,
        image: form.image,
        houseType: form.houseType as HouseType,
        cleanType: form.cleanType as CleanType,
        desiredDate: new Date(form.desiredDate).toISOString(),
        significant: form.significant,
      };

      console.log('Sending commission data:', newCommission);

      await createCommissionMutation.mutateAsync(newCommission);
      toast.success('의뢰가 성공적으로 작성되었습니다.');
      navigate('/commissionlist');
    } catch (error) {
      console.error('Failed to create commission:', error);
      toast.error('의뢰 작성에 실패했습니다. 다시 시도해주세요.');
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
                disabled={isUploading}
              >
                <Camera className="mr-2" size={20} />
                {isUploading ? '업로드 중...' : '이미지 선택'}
              </button>
            </div>
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
      </div>
    </div>
  );
};

export default CommissionWrite;

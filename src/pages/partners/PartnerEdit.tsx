import { useNavigate, useParams } from 'react-router-dom';
import { useCurrentPartner, useUpdatePartner } from '../../hooks/usePartners';
import { validatePassword, validatePhoneNumber } from '../../utils/validationUtils';
import { FormEvent, useEffect, useState } from 'react';
import logo from '../../assets/logo.png';

interface PartnerEditForm {
  email: string;
  password: string;
  phoneNumber: string;
  managerName: string;
  companyName: string;
  businessType: string;
  partnerType: 'INDIVIDUAL' | 'CORPORATION' | 'PUBLIC_INSTITUTION';
}

interface FormErrors {
  password: string;
  phoneNumber: string;
  managerName: string;
  companyName: string;
  businessType: string;
  partnerType: string;
  general?: string;
}


const PartnerEdit: React.FC = () => {
  const { email } = useParams<{ email: string }>();
  const navigate = useNavigate();
  const { data: partner, isLoading, error } = useCurrentPartner();
  const updatePartnerMutation = useUpdatePartner();

  const [formData, setFormData] = useState<PartnerEditForm>({
    email: email || '',
    password: '',
    phoneNumber: '',
    managerName: '',
    companyName: '',
    businessType: '',
    partnerType: 'INDIVIDUAL',
  });
  const [errors, setErrors] = useState<FormErrors>({
    password: '',
    phoneNumber: '',
    managerName: '',
    companyName: '',
    businessType: '',
    partnerType: '',
  });

  useEffect(() => {
    if (partner) {
      setFormData({
        email: partner.email,
        password: '',
        phoneNumber: partner.phoneNumber,
        managerName: partner.managerName,
        companyName: partner.companyName,
        businessType: partner.businessType,
        partnerType: partner.partnerType as 'INDIVIDUAL' | 'CORPORATION' | 'PUBLIC_INSTITUTION'
      });
    }
  }, [partner]);

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생: {error.message}</div>;
  if (!partner) return <div>파트너 정보를 찾을 수 없습니다.</div>;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    let validationResult;
    if (name === 'phoneNumber') {
      validationResult = validatePhoneNumber(value);
    } else if (name === 'password') {
      validationResult = validatePassword(value);
    }

    if (validationResult) {
      setErrors((prev) => ({ ...prev, [name]: validationResult.message }));
    } else {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (Object.values(errors).some((err) => err !== '') || (formData.password && errors.password)) {
      setErrors((prev) => ({
        ...prev,
        general: '입력한 정보를 다시 확인해주세요.',
      }));
      return;
    }

    try {
      const dataToUpdate = {
        ...formData,
        password: formData.password || undefined,
      };
      await updatePartnerMutation.mutateAsync(dataToUpdate);
      navigate(`/partner/${email}`);
    } catch (error) {
      console.error('Update Error:', error);
      setErrors((prev) => ({
        ...prev,
        general: '회원 정보 수정에 실패했습니다.',
      }));
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="p-6 hidden sm:block">
          <img
            src={logo}
            alt="깔끔한방 로고"
            className="w-full h-auto max-h-[200px] object-contain"
          />
        </div>
      <h2 className="text-2xl font-bold mb-4">파트너 정보 수정</h2>
      {errors.general && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
          role="alert"
        >
          <span className="block sm:inline">{errors.general}</span>
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            파트너 아이디 : {formData.email}
          </label>
        </div>
        <div className="mb-4">
          
          {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phoneNumber">
            전화번호
          </label>
          <input
            className={`shadow appearance-none border ${errors.phoneNumber ? 'border-red-500' : ''} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            id="phoneNumber"
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-xs italic">{errors.phoneNumber}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="managerName">
            담당자명
          </label>
          <input
            className={`shadow appearance-none border ${errors.managerName ? 'border-red-500' : ''} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            id="managerName"
            type="text"
            name="managerName"
            value={formData.managerName}
            onChange={handleChange}
          />
          {errors.managerName && (
            <p className="text-red-500 text-xs italic">{errors.managerName}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="companyName">
            업체명
          </label>
          <input
            className={`shadow appearance-none border ${errors.companyName ? 'border-red-500' : ''} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            id="companyName"
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
          />
          {errors.companyName && (
            <p className="text-red-500 text-xs italic">{errors.companyName}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="businessType">
            서비스 유형
          </label>
          <input
            className={`shadow appearance-none border ${errors.businessType ? 'border-red-500' : ''} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            id="businessType"
            type="text"
            name="businessType"
            value={formData.businessType}
            onChange={handleChange}
          />
          {errors.businessType && (
            <p className="text-red-500 text-xs italic">{errors.businessType}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="partnerType">
            사업자 유형
          </label>
          <select
            className={`shadow appearance-none border ${errors.partnerType ? 'border-red-500' : ''} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            id="partnerType"
            name="partnerType"
            value={formData.partnerType}
            onChange={handleChange}
          >
            <option value="INDIVIDUAL">개인</option>
            <option value="CORPORATION">법인</option>
            <option value="PUBLIC_INSTITUTION">공공 기관</option>
          </select>
          {errors.partnerType && (
            <p className="text-red-500 text-xs italic">{errors.partnerType}</p>
          )}
        </div>
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            정보를 수정하려면 기존 비밀번호로 인증해주세요.
          </label>
          <input
            className={`shadow appearance-none border ${errors.password ? 'border-red-500' : ''} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="변경하려면 입력하세요"
          />
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold mt-8 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            수정 완료
          </button>
          <button
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={() => navigate(`/partner/${email}`)}
          >
            취소
          </button>
        </div>
      </form>
    </div>
  );
};

export default PartnerEdit;

import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import EmailInput from '../../utils/EmailInput';
import { Partner } from '../../types/partner';
import { validatePassword, validatePhoneNumber, validateConfirmPassword } from '../../utils/validationUtils';
import { usePartnerSignup } from '../../hooks/usePartners';
import { handleApiError, showErrorNotification } from '../../utils/errorHandler';

interface PartnerSignUpForm extends Omit<Partner, 'id'> {
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  managerName: string;
  companyName: string;
  businessType: string;
  partnerType: 'INDIVIDUAL' | 'CORPORATION' | 'PUBLIC_INSTITUTION';
}

interface FormErrors {
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  managerName: string;
  companyName: string;
  businessType: string;
  partnerType: string;
  general?: string;
}

const validations = {
  password: validatePassword,
  confirmPassword: (value: string, formData: PartnerSignUpForm) => 
    validateConfirmPassword(formData.password, value),
  phoneNumber: validatePhoneNumber,
};

const PartnerSignUp: React.FC = () => {
  const [formData, setFormData] = useState<PartnerSignUpForm>({
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    managerName: '',
    companyName: '',
    businessType: '',
    partnerType: 'INDIVIDUAL',  // Default value
  });
  const [errors, setErrors] = useState<FormErrors>({
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    managerName: '',
    companyName: '',
    businessType: '',
    partnerType: '',
  });
  const navigate = useNavigate();
  const signupMutation = usePartnerSignup();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if(validations[name as keyof typeof validations]){
      const validationResult = validations[name as keyof typeof validations](value, formData)
      setErrors((prev) => ({ ...prev, [name]: validationResult.message }));
    }
    if (name === 'password' && formData.confirmPassword){
      const confirmResult = validateConfirmPassword(value, formData.confirmPassword)
      setErrors((prev) => ({ ...prev, confirmPassword: confirmResult.message}))
    }
  };

  const signUpSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (Object.values(errors).some((err) => err !== '')) {
      setErrors((prev) => ({
        ...prev,
        general: '입력한 정보를 다시 확인해주세요.',
      }));
      return;
    }

    try {
      const { confirmPassword, ...submitData } = formData
      await signupMutation.mutateAsync(submitData);
      navigate(`/partnerlogin`);
    } catch (error) {
      const errorMessage = handleApiError(error);
      showErrorNotification(errorMessage);
      setErrors((prev) => ({
        ...prev,
        general: '회원가입에 실패했습니다. 다시 시도해주세요.',
      }));
    }
  };

  const fieldLabels: { [key: string]: string } = {
    password: '비밀번호',
    confirmPassword: '비밀번호 확인',
    phoneNumber: '전화번호',
    managerName: '담당자명',
    companyName: '업체명',
    businessType: '서비스 유형',
    partnerType: '사업자 유형',
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-5rem)]">
      <div className="grid bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-6 hidden sm:block">
          <img
            src={logo}
            alt="깔끔한방 로고"
            className="w-full h-auto max-h-[300px] object-contain"
          />
        </div>
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">파트너 회원가입</h2>
          {errors.general && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
              role="alert"
            >
              <span className="block sm:inline">{errors.general}</span>
            </div>
          )}
          <form onSubmit={signUpSubmit} className="space-y-4">
            <EmailInput
              email={formData.email}
              setEmail={(email) => setFormData((prev) => ({ ...prev, email }))}
              emailError={errors.email}
              setEmailError={(error) =>
                setErrors((prev) => ({ ...prev, email: error }))
              }
            />
            {['password', 'confirmPassword', 'phoneNumber', 'managerName', 'companyName', 'businessType'].map((field) => (
              <div key={field}>
                <label className="block mb-1">{fieldLabels[field]}</label>
                <input
                  type={field === 'password' ? 'password' : field === 'confirmPassword' ? 'password' : 'text'}
                  name={field}
                  value={formData[field as keyof PartnerSignUpForm]}
                  onChange={handleChange}
                  placeholder={`${fieldLabels[field]}를 입력해주세요${field === 'phoneNumber' ? " ('-' 제외)" : ''}`}
                  className="w-full p-2 border border-gray-300 rounded"
                />
                {errors[field as keyof FormErrors] && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors[field as keyof FormErrors]}
                  </p>
                )}
              </div>
            ))}
            <div>
              <label className="block mb-1">{fieldLabels['partnerType']}</label>
              <select
                name="partnerType"
                value={formData.partnerType}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="INDIVIDUAL">개인 사업자</option>
                <option value="CORPORATION">법인 사업자</option>
                <option value="PUBLIC_INSTITUTION">공공 기관</option>
              </select>
            </div>
            <div className="flex justify-center space-x-4">
              <button
                className="bg-[#144156] text-white py-2 px-4 rounded"
                type="submit"
              >
                회원가입하기
              </button>
              <button
                className="bg-[#144156] text-white py-2 px-4 rounded"
                onClick={() => navigate(`/partnerlogin`)}
                type="button"
              >
                로그인하러가기
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PartnerSignUp;

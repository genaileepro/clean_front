import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../../assets/logo.png';
import EmailInput from '../../utils/EmailInput';
import EmailVerification from '../../components/common/EmailVerification';
import {
  usePartnerSignup,
  useRequestPartnerEmailVerification,
  useVerifyPartnerEmail,
} from '../../hooks/usePartners';
import { Partner } from '../../types/partner';
import { BusinessStatusResponse } from '../../types/business';
import {
  validatePassword,
  validatePhoneNumber,
  validateConfirmPassword,
} from '../../utils/validationUtils';
import {
  handleApiError,
  showErrorNotification,
} from '../../utils/errorHandler';
import { motion } from 'framer-motion';
import { User, Lock, Phone, Briefcase, Building } from 'lucide-react';

interface PartnerSignUpForm extends Omit<Partner, 'id'> {
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  managerName: string;
  companyName: string;
  businessType: string;
  businessNumber: string;
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
  businessNumber: string;
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
    businessNumber: '',
    partnerType: 'INDIVIDUAL',
  });
  const [errors, setErrors] = useState<FormErrors>({
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    managerName: '',
    companyName: '',
    businessType: '',
    businessNumber: '',
    partnerType: '',
  });
  const [businessValidationMessage, setBusinessValidationMessage] = useState<
    string | null
  >(null);
  const [isBusinessValid, setIsBusinessValid] = useState<boolean>(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  const navigate = useNavigate();
  const signupMutation = usePartnerSignup();
  const requestEmailVerificationMutation = useRequestPartnerEmailVerification();
  const verifyEmailMutation = useVerifyPartnerEmail();

  const resetErrors = () => {
    setErrors({
      email: '',
      password: '',
      confirmPassword: '',
      phoneNumber: '',
      managerName: '',
      companyName: '',
      businessType: '',
      businessNumber: '',
      partnerType: '',
    });
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (validations[name as keyof typeof validations]) {
      const validationResult = validations[name as keyof typeof validations](
        value,
        formData,
      );
      setErrors((prev) => ({ ...prev, [name]: validationResult.message }));
    }
    if (name === 'password' && formData.confirmPassword) {
      const confirmResult = validateConfirmPassword(
        value,
        formData.confirmPassword,
      );
      setErrors((prev) => ({
        ...prev,
        confirmPassword: confirmResult.message,
      }));
    }
  };

  const checkBusinessStatus = async () => {
    const serviceKey = import.meta.env.VITE_PUBLIC_API_KEY;
    const apiUrl = `https://api.odcloud.kr/api/nts-businessman/v1/status?serviceKey=${serviceKey}`;

    const requestData = {
      b_no: [formData.businessNumber],
    };

    try {
      const response = await axios.post<BusinessStatusResponse>(
        apiUrl,
        requestData,
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        },
      );

      const businessInfo = response.data.data[0];

      if (
        businessInfo.tax_type === '국세청에 등록되지 않은 사업자등록번호입니다.'
      ) {
        setBusinessValidationMessage(businessInfo.tax_type);
        setIsBusinessValid(false);
      } else {
        setBusinessValidationMessage('유효한 사업자등록번호입니다.');
        setIsBusinessValid(true);
      }
      setErrors((prev) => ({ ...prev, businessNumber: '' }));
    } catch (err: any) {
      setBusinessValidationMessage(
        '사업자 등록번호 확인 중 오류가 발생했습니다.',
      );
      setIsBusinessValid(false);
      setErrors((prev) => ({
        ...prev,
        businessNumber: '사업자 등록번호 확인에 실패했습니다.',
      }));
    }
  };

  const handleRequestEmailVerification = async (email: string) => {
    try {
      await requestEmailVerificationMutation.mutateAsync({ email });
      showErrorNotification('인증 이메일이 발송되었습니다.');
    } catch (error) {
      const errorMessage = handleApiError(error);
      showErrorNotification(errorMessage);
    }
  };

  const handleVerifyEmail = async (email: string, code: string) => {
    try {
      await verifyEmailMutation.mutateAsync({ email, code });
      setIsEmailVerified(true);
      showErrorNotification('이메일이 성공적으로 인증되었습니다.');
    } catch (error) {
      const errorMessage = handleApiError(error);
      showErrorNotification(errorMessage);
    }
  };

  const signUpSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    resetErrors();
    if (
      Object.values(errors).some((err) => err !== '') ||
      !isBusinessValid ||
      !isEmailVerified
    ) {
      setErrors((prev) => ({
        ...prev,
        general:
          '모든 필드를 올바르게 입력하고 이메일 인증 및 사업자 등록번호 확인을 완료해주세요.',
      }));
      return;
    }

    try {
      const { confirmPassword, ...submitData } = formData;
      await signupMutation.mutateAsync(submitData);
      navigate(`/ptlogin`);
    } catch (error) {
      const errorMessage = handleApiError(error);
      showErrorNotification(errorMessage);
      setErrors((prev) => ({
        ...prev,
        general: '회원가입에 실패했습니다. 다시 시도해주세요.',
      }));
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-md"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <img className="mx-auto h-24 w-auto" src={logo} alt="깔끔한방 로고" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            파트너 회원가입
          </h2>
        </div>
        {errors.general && (
          <div
            className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded"
            role="alert"
          >
            <p>{errors.general}</p>
          </div>
        )}
        <form className="mt-8 space-y-6" onSubmit={signUpSubmit}>
          <div className="space-y-6">
            <EmailInput
              email={formData.email}
              setEmail={(email) => setFormData((prev) => ({ ...prev, email }))}
              emailError={errors.email}
              setEmailError={(error) =>
                setErrors((prev) => ({ ...prev, email: error }))
              }
            />
            <EmailVerification
              email={formData.email}
              onVerificationComplete={setIsEmailVerified}
              requestEmailVerification={handleRequestEmailVerification}
              verifyEmail={handleVerifyEmail}
              userType="partner"
            />
            {[
              'password',
              'confirmPassword',
              'phoneNumber',
              'managerName',
              'companyName',
              'businessType',
              'businessNumber',
            ].map((field) => (
              <div key={field} className="mb-4">
                <label
                  htmlFor={field}
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  {field === 'password'
                    ? '비밀번호'
                    : field === 'confirmPassword'
                      ? '비밀번호 확인'
                      : field === 'phoneNumber'
                        ? '전화번호'
                        : field === 'managerName'
                          ? '담당자명'
                          : field === 'companyName'
                            ? '업체명'
                            : field === 'businessType'
                              ? '서비스 유형'
                              : '사업자 등록번호'}
                </label>
                <div className="relative">
                  {field === 'password' || field === 'confirmPassword' ? (
                    <Lock
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={20}
                    />
                  ) : field === 'phoneNumber' ? (
                    <Phone
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={20}
                    />
                  ) : field === 'managerName' ? (
                    <User
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={20}
                    />
                  ) : (
                    <Briefcase
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={20}
                    />
                  )}
                  <input
                    id={field}
                    name={field}
                    type={
                      field === 'password' || field === 'confirmPassword'
                        ? 'password'
                        : 'text'
                    }
                    required
                    className={`appearance-none rounded-md relative block w-full px-3 py-2 border ${
                      errors[field as keyof FormErrors]
                        ? 'border-red-500'
                        : 'border-gray-300'
                    } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#144156] focus:border-[#144156] focus:z-10 sm:text-sm pl-10`}
                    placeholder={`${
                      field === 'password'
                        ? '비밀번호를 입력해주세요.'
                        : field === 'confirmPassword'
                          ? '비밀번호를 다시 입력해주세요'
                          : field === 'phoneNumber'
                            ? "전화번호를 입력해주세요('-' 제외)"
                            : field === 'businessNumber'
                              ? "사업자 등록번호를 입력해주세요('-' 제외)"
                              : `${field}를 입력해주세요.`
                    }`}
                    value={formData[field as keyof PartnerSignUpForm]}
                    onChange={handleChange}
                  />
                </div>
                {errors[field as keyof FormErrors] && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors[field as keyof FormErrors]}
                  </p>
                )}
              </div>
            ))}
            <div className="mb-4">
              <label
                htmlFor="partnerType"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                사업자 유형
              </label>
              <div className="relative">
                <Building
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <select
                  id="partnerType"
                  name="partnerType"
                  value={formData.partnerType}
                  onChange={handleChange}
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#144156] focus:border-[#144156] focus:z-10 sm:text-sm pl-10"
                >
                  <option value="INDIVIDUAL">개인 사업자</option>
                  <option value="CORPORATION">법인 사업자</option>
                  <option value="PUBLIC_INSTITUTION">공공 기관</option>
                </select>
              </div>
            </div>
            <div className="mb-4">
              <button
                type="button"
                onClick={checkBusinessStatus}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#144156] hover:bg-[#1c5f7b] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#144156]"
              >
                사업자 등록번호 확인
              </button>
              {businessValidationMessage && (
                <p
                  className={`mt-2 text-sm ${isBusinessValid ? 'text-green-600' : 'text-red-600'}`}
                >
                  {businessValidationMessage}
                </p>
              )}
            </div>
          </div>
          <div className="flex justify-center space-x-4">
            <button
              type="submit"
              className="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#144156] hover:bg-[#1c5f7b] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#144156]"
            >
              회원가입하기
            </button>
            <button
              type="button"
              onClick={() => navigate(`/ptlogin`)}
              className="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-[#144156] bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#144156]"
            >
              취소
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default PartnerSignUp;

import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import EmailInput from '../../utils/EmailInput';
import EmailVerification from '../../components/common/EmailVerification';
import { useSignup } from '../../hooks/useMembers';
import { Member } from '../../types/member';
import {
  validateNickName,
  validatePassword,
  validatePhoneNumber,
  validateConfirmPassword,
} from '../../utils/validationUtils';
import {
  handleApiError,
  showErrorNotification,
} from '../../utils/errorHandler';
import { motion } from 'framer-motion';
import { User, Lock, Phone } from 'lucide-react';

interface SignUpForm extends Omit<Member, 'id'> {
  confirmPassword: string;
}

interface FormErrors {
  email: string;
  password: string;
  confirmPassword: string;
  nick: string;
  phoneNumber: string;
  general?: string;
}

const validations = {
  password: validatePassword,
  confirmPassword: (value: string, formData: SignUpForm) =>
    validateConfirmPassword(formData.password, value),
  nick: validateNickName,
  phoneNumber: validatePhoneNumber,
};

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState<SignUpForm>({
    email: '',
    password: '',
    confirmPassword: '',
    nick: '',
    phoneNumber: '',
    isKakaoUser: false,
  });
  const [errors, setErrors] = useState<FormErrors>({
    email: '',
    password: '',
    confirmPassword: '',
    nick: '',
    phoneNumber: '',
    general: '',
  });
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  const navigate = useNavigate();
  const signupMutation = useSignup();

  const resetErrors = () => {
    setErrors({
      email: '',
      password: '',
      confirmPassword: '',
      nick: '',
      phoneNumber: '',
      general: '',
    });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
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

  const signUpSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    resetErrors();
    if (Object.values(errors).some((err) => err !== '') || !isEmailVerified) {
      setErrors((prev) => ({
        ...prev,
        general: '모든 필드를 올바르게 입력하고 이메일 인증을 완료해주세요.',
      }));
      return;
    }

    try {
      const { confirmPassword, ...submitData } = formData;
      await signupMutation.mutateAsync(submitData);
      navigate(`/login`);
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
            회원가입
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
            <div className="mb-4">
              <EmailInput
                email={formData.email}
                setEmail={(email) =>
                  setFormData((prev) => ({ ...prev, email }))
                }
                emailError={errors.email}
                setEmailError={(error) =>
                  setErrors((prev) => ({ ...prev, email: error }))
                }
              />
            </div>
            <div className="mb-4">
              <EmailVerification
                email={formData.email}
                onVerificationComplete={setIsEmailVerified}
              />
            </div>
            {['password', 'confirmPassword', 'nick', 'phoneNumber'].map(
              (field) => (
                <div key={field} className="mb-4">
                  <label
                    htmlFor={field}
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {field === 'password'
                      ? '비밀번호'
                      : field === 'confirmPassword'
                        ? '비밀번호 확인'
                        : field === 'nick'
                          ? '닉네임'
                          : '전화번호'}
                  </label>
                  <div className="relative">
                    {field === 'password' || field === 'confirmPassword' ? (
                      <Lock
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={20}
                      />
                    ) : field === 'nick' ? (
                      <User
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={20}
                      />
                    ) : (
                      <Phone
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={20}
                      />
                    )}
                    <input
                      id={field}
                      name={field}
                      type={field.includes('password') ? 'password' : 'text'}
                      required
                      className={`appearance-none rounded-md relative block w-full px-3 py-2 border ${
                        errors[field as keyof FormErrors]
                          ? 'border-red-500'
                          : 'border-gray-300'
                      } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-brand focus:border-brand focus:z-10 sm:text-sm pl-10`}
                      placeholder={
                        field === 'password'
                          ? '비밀번호를 입력해주세요.'
                          : field === 'confirmPassword'
                            ? '비밀번호를 다시 입력해주세요'
                            : field === 'nick'
                              ? '닉네임을 입력해주세요.'
                              : "전화번호를 입력해주세요('-' 제외)"
                      }
                      value={formData[field as keyof SignUpForm]}
                      onChange={handleChange}
                    />
                  </div>
                  {errors[field as keyof FormErrors] && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors[field as keyof FormErrors]}
                    </p>
                  )}
                </div>
              ),
            )}
          </div>

          <div className="flex justify-center space-x-4">
            <button
              type="submit"
              className="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-brand hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand"
            >
              회원가입하기
            </button>
            <button
              type="button"
              onClick={() => navigate(`/login`)}
              className="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-brand bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand"
            >
              취소
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default SignUp;

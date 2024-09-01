import React, { FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCurrentMember, useUpdateMember } from '../../hooks/useMembers';
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
import logo from '../../assets/logo.png';
import LoadingSpinner from '../../utils/LoadingSpinner';
import { User, Phone, Lock } from 'lucide-react';

interface FormErrors {
  password?: string;
  confirmPassword?: string;
  nick: string;
  phoneNumber: string;
  general?: string;
}

const MemberEdit: React.FC = () => {
  const { email } = useParams<{ email: string }>();
  const navigate = useNavigate();
  const { data: member, isLoading, error } = useCurrentMember();
  const updateMemberMutation = useUpdateMember();

  const [formData, setFormData] = useState({
    email: email || '',
    password: '',
    confirmPassword: '',
    nick: '',
    phoneNumber: '',
  });
  const [errors, setErrors] = useState<FormErrors>({
    nick: '',
    phoneNumber: '',
  });

  useEffect(() => {
    if (member) {
      setFormData({
        email: member.email,
        nick: member.nick,
        phoneNumber: member.phoneNumber,
        password: '',
        confirmPassword: '',
      });
    }
  }, [member]);

  if (isLoading) return <LoadingSpinner size="large" />;
  if (error)
    return (
      <div className="text-center text-red-500">에러 발생: {error.message}</div>
    );
  if (!member)
    return <div className="text-center">회원 정보를 찾을 수 없습니다.</div>;

  const isKakaoUser = member.isKakaoUser;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    let validationResult;
    if (name === 'nick') {
      validationResult = validateNickName(value);
    } else if (name === 'phoneNumber') {
      validationResult = validatePhoneNumber(value);
    } else if (name === 'password' && !isKakaoUser) {
      validationResult = value
        ? validatePassword(value)
        : { isValid: true, message: '' };
      if (formData.confirmPassword) {
        const confirmResult = validateConfirmPassword(
          value,
          formData.confirmPassword,
        );
        setErrors((prev) => ({
          ...prev,
          confirmPassword: confirmResult.message,
        }));
      }
    } else if (name === 'confirmPassword' && !isKakaoUser) {
      validationResult = value
        ? validateConfirmPassword(formData.password, value)
        : { isValid: true, message: '' };
    }

    if (validationResult) {
      setErrors((prev) => ({ ...prev, [name]: validationResult.message }));
    } else {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (
      errors.nick ||
      errors.phoneNumber ||
      (!isKakaoUser && (errors.password || errors.confirmPassword))
    ) {
      setErrors((prev) => ({
        ...prev,
        general: '입력한 정보를 다시 확인해주세요.',
      }));
      return;
    }

    if (
      !isKakaoUser &&
      formData.password &&
      formData.password !== formData.confirmPassword
    ) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: '비밀번호가 일치하지 않습니다.',
        general: '비밀번호가 일치하지 않습니다.',
      }));
      return;
    }

    try {
      const dataToUpdate = {
        nick: formData.nick,
        phoneNumber: formData.phoneNumber,
        ...(!isKakaoUser &&
          formData.password && { password: formData.password }),
      };
      await updateMemberMutation.mutateAsync(dataToUpdate);
      navigate(`/member/${email}`);
    } catch (error) {
      const errorMessage = handleApiError(error);
      showErrorNotification(errorMessage);
      setErrors((prev) => ({
        ...prev,
        general: '회원 정보 수정에 실패했습니다.',
      }));
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 px-4">
      <div className="mb-8 text-center">
        <img src={logo} alt="깔끔한방 로고" className="mx-auto w-48 h-auto" />
      </div>
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        회원 정보 수정
      </h2>
      {errors.general && (
        <div
          className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6"
          role="alert"
        >
          <p>{errors.general}</p>
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            회원 아이디
          </label>
          <p className="text-gray-700">{member.email}</p>
        </div>
        {!isKakaoUser && (
          <>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                새 비밀번호
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  className={`pl-10 shadow appearance-none border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                  id="password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="변경하려면 입력하세요"
                />
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs italic">{errors.password}</p>
              )}
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="confirmPassword"
              >
                비밀번호 확인
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  className={`pl-10 shadow appearance-none border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="비밀번호를 다시 입력하세요"
                />
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs italic">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
          </>
        )}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="nick"
          >
            닉네임
          </label>
          <div className="relative">
            <User
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              className={`pl-10 shadow appearance-none border ${errors.nick ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
              id="nick"
              type="text"
              name="nick"
              value={formData.nick}
              onChange={handleChange}
            />
          </div>
          {errors.nick && (
            <p className="text-red-500 text-xs italic">{errors.nick}</p>
          )}
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="phoneNumber"
          >
            전화번호
          </label>
          <div className="relative">
            <Phone
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              className={`pl-10 shadow appearance-none border ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
              id="phoneNumber"
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </div>
          {errors.phoneNumber && (
            <p className="text-red-500 text-xs italic">{errors.phoneNumber}</p>
          )}
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
            type="submit"
          >
            수정 완료
          </button>
          <button
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
            type="button"
            onClick={() => navigate(`/member/${email}`)}
          >
            취소
          </button>
        </div>
      </form>
    </div>
  );
};

export default MemberEdit;

import { ChangeEvent, useEffect, useState } from 'react';
import { validateEmail } from './validationUtils';

interface EmailInputProps {
  email: string;
  setEmail: (email: string) => void;
  emailError: string;
  setEmailError: (error: string) => void;
}

const EmailInput: React.FC<EmailInputProps> = ({
  email,
  setEmail,
  emailError,
  setEmailError,
}) => {
  const [localPart, setLocalPart] = useState('');
  const [domain, setDomain] = useState('');
  const [customDomain, setCustomDomain] = useState('');

  const commonDomains = [
    'gmail.com',
    'naver.com',
    'daum.net',
    'hanmail.net',
    'nate.com',
  ];

  useEffect(() => {
    const parts = email.split('@');
    if (parts.length === 2) {
      setLocalPart(parts[0]);
      if (commonDomains.includes(parts[1])) {
        setDomain(parts[1]);
      }
    }
  }, [email]);

  const handleLocalPartChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLocalPart(e.target.value);
    updateEmail(e.target.value, domain === 'custom' ? customDomain : domain);
  };

  const handleDomainChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedDomain = e.target.value;
    setDomain(selectedDomain);
    if (selectedDomain === 'custom') {
      updateEmail(localPart, customDomain);
    } else {
      setCustomDomain('');
      updateEmail(localPart, selectedDomain);
    }
  };

  const handleCustomDomainChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCustomDomain(e.target.value);
    updateEmail(localPart, e.target.value);
  };

  const updateEmail = (local: string, dmn: string) => {
    const newEmail = local && dmn ? `${local}@${dmn}` : '';
    setEmail(newEmail);
    const validationResult = validateEmail(newEmail);
    setEmailError(validationResult.message);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        이메일
      </label>
      <div className="flex">
        <input
          type="text"
          value={localPart}
          onChange={handleLocalPartChange}
          placeholder="이메일 아이디"
          className={`w-1/2 p-2 border ${
            emailError ? 'border-red-500' : 'border-gray-300'
          } rounded-l-md focus:outline-none focus:ring-brand focus:border-brand`}
        />
        <span className="p-2 bg-gray-100 border-t border-b border-gray-300">
          @
        </span>
        <select
          value={domain}
          onChange={handleDomainChange}
          className={`w-1/2 p-2 border ${
            emailError ? 'border-red-500' : 'border-gray-300'
          } rounded-r-md focus:outline-none focus:ring-brand focus:border-brand`}
        >
          <option value="">선택해주세요</option>
          {commonDomains.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
          <option value="custom">직접 입력</option>
        </select>
      </div>
      {domain === 'custom' && (
        <input
          type="text"
          value={customDomain}
          onChange={handleCustomDomainChange}
          placeholder="도메인을 입력해주세요"
          className={`w-full mt-2 p-2 border ${
            emailError ? 'border-red-500' : 'border-gray-300'
          } rounded-md focus:outline-none focus:ring-brand focus:border-brand`}
        />
      )}
      {emailError && <p className="mt-2 text-sm text-red-600">{emailError}</p>}
    </div>
  );
};

export default EmailInput;

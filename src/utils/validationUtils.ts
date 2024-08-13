export interface ValidationResult {
  isValid: boolean;
  message: string;
}

type ValidationFunction = (value: string) => ValidationResult;

export const createValidator = (
  validateFn: (value: string) => boolean,
  errorMessage: string,
): ValidationFunction => {
  return (value: string): ValidationResult => {
    if (value === '') {
      return { isValid: true, message: '' };
    }
    const isValid = validateFn(value);
    return {
      isValid,
      message: isValid ? '' : errorMessage,
    };
  };
};

export const createSelectValidator = (
  validateFn: (value: string) => boolean,
  errorMessage: string,
): ValidationFunction => {
  return (value: string): ValidationResult => {
    if (value === '' || value === 'default') {
      return { isValid: false, message: '옵션을 선택해주세요.' };
    }
    const isValid = validateFn(value);
    return {
      isValid,
      message: isValid ? '' : errorMessage,
    };
  };
};

// 로그인 유효성 검사
export const validateEmail = createValidator(
  (email) => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email),
  '유효한 이메일 주소를 입력해주세요.',
);

export const validatePassword = createValidator(
  (password) =>
    /^(?=.*[a-z])(?=.*\d)(?=.*[~!@$%^&*_])[a-zA-Z\d~!@$%^&*_]{8,}$/.test(
      password,
    ),
  '최소 8자 이상, 대소문자, 숫자, 특수 문자를 포함해야 합니다.',
);

export const validateConfirmPassword = (
  password: string,
  confirmPassword: string,
) => {
  if (confirmPassword === '') {
    return { isValid: true, message: '' };
  }
  if (password === '' && confirmPassword !== '') {
    return { isValid: false, message: '비밀번호를 먼저 입력해주세요' };
  }
  if (password !== confirmPassword) {
    return { isValid: false, message: '비밀번호가 일치하지 않습니다.' };
  }
  const isValid = /^(?=.*[a-z])(?=.*[~!@$%^&*_])[a-zA-Z\d~!@#$%^&*_]{8,}$/.test(
    confirmPassword,
  );
  return {
    isValid,
    message: isValid
      ? ''
      : '최소 8자 이상, 대소문자, 숫자, 특수 문자를 포함해야합니다',
  };
};

export const validateNickName = createValidator(
  (nick) => /^[a-zA-Z0-9가-힣_-]{1,15}$/.test(nick),
  '닉네임은 숫자, 대문자, 소문자, 한글, 밑줄(_), 대시(-)만 포함할 수 있으며, 길이는 1자에서 15자 사이여야 합니다.',
);

export const validatePhoneNumber = createValidator(
  (phoneNumber) => /^01\d{9}$/.test(phoneNumber),
  '전화번호는 01012345678 형식이어야 합니다.',
);

// 의뢰 유효성검사
export const validateSize = createValidator(
  (size) => !isNaN(Number(size)) && Number(size) > 0,
  '크기는 양수여야 합니다.',
);

export const validateHouseType = createSelectValidator(
  (houseType) => houseType.length > 0,
  '집 유형을 입력해주세요.',
);

export const validateCleanType = createSelectValidator(
  (cleanType) => cleanType.length > 0,
  '청소 유형을 입력해주세요.',
);

export const validateDesiredDate = createValidator(
  (date) => !isNaN(Date.parse(date)),
  '유효한 날짜를 입력해주세요.',
);

export const validateSignificant = createValidator(
  (significant) => significant.length > 0 && significant.length <= 500,
  '특이사항은 500자 이내로 입력해주세요.',
);

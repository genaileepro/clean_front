// errorHandler.ts

import toast from "react-hot-toast";

type ErrorCode =
  | 1000 | 1001 | 1002 | 1004 | 1005
  | 2001 | 2002 | 2003 | 2004 | 2005
  | 3001 | 3002 | 3003
  | 4001 | 4002 | 4003 | 4004 | 4005 | 4006 | 4007 | 4008 | 4009 | 4010
  | 5001 | 5002 | 5003 | 5004 | 5005
  | 6001 | 6002;

const errorMessages: Record<ErrorCode, string> = {
  1000 : '필수 정보를 입력해주세요.',
  1001: '잘못된 이미지입니다.',
  1002: '비밀번호가 옳지 않습니다.',
  1004: 'Authorization 헤더가 없거나 형식이 올바르지 않습니다.',
  1005: '잘못된 비밀번호입니다.',
  2001: '인증되지 않은 사용자입니다.',
  2002: '로그인이 필요합니다.',
  2003: 'Access Token이 만료되었습니다.',
  2004: 'Refresh Token이 만료되었습니다.',
  2005: '유효하지 않은 토큰입니다.',
  3001: '판매자가 아닙니다.',
  3002: '구매자가 아닙니다.',
  3003: '청소의뢰가 존재하지 않거나 권한이 없습니다.',
  4001: '사용자를 찾을 수 없습니다.',
  4002: '후기를 찾을 수 없습니다.',
  4003: '청소의뢰를 찾을 수 없습니다.',
  4004: '주소를 찾을 수 없습니다.',
  4005: '견적 내역을 찾을 수 없습니다.',
  4006: '견적 내역이 존재하지 않습니다.',
  4007: '청소 업체를 찾을 수 없습니다.',
  4008: '사업자 등록을 찾을 수 없습니다.',
  4009: '계좌번호를 찾을 수 없습니다.',
  4010: '존재하지 않는 아이디입니다.',
  5001: '이미 가입된 사용자입니다.',
  5002: '중복된 이메일입니다.',
  5003: '중복된 닉네임입니다.',
  5004: '중복된 전화번호입니다.',
  5005: '중복된 회사명입니다.',
  6001: '파일 실행에 실패했습니다.',
  6002: '파일 컴파일에 실패했습니다.',
};

export const handleApiError = (error: any): string => {
  if (error.response && error.response.data && error.response.data.code) {
    const errorCode = error.response.data.code as ErrorCode;
    return errorMessages[errorCode] || '알 수 없는 오류가 발생했습니다.';
  }
  return '서버와의 통신 중 오류가 발생했습니다.';
};

export const showErrorNotification = (message: string) => {
  toast.error(message)
  console.error(message);
};

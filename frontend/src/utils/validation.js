export const validateEmail = (email) => {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!email) return '이메일을 입력해주세요.';
  if (!regex.test(email)) return '올바른 이메일 형식이 아닙니다.';
  return '';
};

export const validatePassword = (password) => {
  if (!password) return '비밀번호를 입력해주세요.';
  if (password.length < 8) return '비밀번호는 8자 이상이어야 합니다.';
  if (!/[A-Z]/.test(password)) return '대문자를 포함해야 합니다.';
  if (!/[a-z]/.test(password)) return '소문자를 포함해야 합니다.';
  if (!/[0-9]/.test(password)) return '숫자를 포함해야 합니다.';
  if (!/[!@#$%^&*]/.test(password)) return '특수문자(!@#$%^&*)를 포함해야 합니다.';
  return '';
};

export const validateStudentId = (studentId) => {
  const regex = /^\d{7}$/;
  if (!studentId) return '학번을 입력해주세요.';
  if (!regex.test(studentId)) return '학번은 7자리 숫자여야 합니다.';
  return '';
};

export const validatePhone = (phone) => {
  const regex = /^010-\d{4}-\d{4}$/;
  if (!phone) return '연락처를 입력해주세요.';
  if (!regex.test(phone)) return '올바른 연락처 형식이 아닙니다. (예: 010-1234-5678)';
  return '';
};

export const validateName = (name) => {
  if (!name) return '이름을 입력해주세요.';
  if (name.length < 2) return '이름은 2자 이상이어야 합니다.';
  if (name.length > 10) return '이름은 10자 이하여야 합니다.';
  return '';
};

export const validateReservation = (reservationData) => {
  const errors = {};

  if (!reservationData.date) {
    errors.date = '날짜를 선택해주세요.';
  }

  if (!reservationData.startTime) {
    errors.startTime = '시작 시간을 선택해주세요.';
  }

  if (!reservationData.endTime) {
    errors.endTime = '종료 시간을 선택해주세요.';
  }

  if (!reservationData.seatId) {
    errors.seatId = '좌석을 선택해주세요.';
  }

  if (!reservationData.purpose) {
    errors.purpose = '예약 목적을 선택해주세요.';
  }

  if (reservationData.purpose === '기타' && !reservationData.customPurpose) {
    errors.customPurpose = '예약 목적을 입력해주세요.';
  }

  if (reservationData.seatType === '팀프로젝트석') {
    if (!reservationData.teamSize) {
      errors.teamSize = '팀 인원을 입력해주세요.';
    } else if (reservationData.teamSize < 2 || reservationData.teamSize > 6) {
      errors.teamSize = '팀 인원은 2-6명이어야 합니다.';
    }
  }

  return errors;
};

export const validatePasswordMatch = (password, confirmPassword) => {
  if (password !== confirmPassword) {
    return '비밀번호가 일치하지 않습니다.';
  }
  return '';
}; 
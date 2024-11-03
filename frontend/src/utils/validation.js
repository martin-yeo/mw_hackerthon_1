export const validateEmail = (email) => {
  if (!email) return '이메일을 입력해주세요.';
  
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  if (!emailRegex.test(email)) {
    return '올바른 이메일 형식이 아닙니다.';
  }
  return '';
};

export const validatePassword = (password) => {
  if (!password) return '비밀번호를 입력해주세요.';
  
  if (password.length < 8) {
    return '비밀번호는 8자 이상이어야 합니다.';
  }

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;
  if (!passwordRegex.test(password)) {
    return '비밀번호는 영문 대소문자, 숫자, 특수문자를 포함해야 합니다.';
  }
  return '';
};

export const validateStudentId = (studentId) => {
  if (!studentId) return '학번을 입력해주세요.';
  
  const studentIdRegex = /^\d{8}$/;
  if (!studentIdRegex.test(studentId)) {
    return '올바른 학번 형식이 아닙니다. (8자리 숫자)';
  }
  return '';
};

export const validatePhone = (phone) => {
  if (!phone) return '전화번호를 입력해주세요.';
  
  const phoneRegex = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
  if (!phoneRegex.test(phone)) {
    return '올바른 전화번호 형식이 아닙니다.';
  }
  return '';
};

export const validateName = (name) => {
  if (!name) return '이름을 입력해주세요.';
  
  if (name.length < 2) {
    return '이름은 2자 이상이어야 합니다.';
  }
  
  const nameRegex = /^[가-힣]{2,}$/;
  if (!nameRegex.test(name)) {
    return '올바른 이름 형식이 아닙니다. (한글만 가능)';
  }
  return '';
};

export const validatePasswordConfirm = (passwordConfirm, password) => {
  if (!passwordConfirm) return '비밀번호 확인을 입력해주세요.';
  
  if (passwordConfirm !== password) {
    return '비밀번호가 일치하지 않습니다.';
  }
  return '';
};

export const validateTerms = (agreed) => {
  if (!agreed) return '이용약관에 동의해주세요.';
  return '';
};

export const validateReservationTime = (startTime, endTime) => {
  const start = new Date(`1970-01-01T${startTime}`);
  const end = new Date(`1970-01-01T${endTime}`);
  
  const openTime = new Date(`1970-01-01T09:00`);
  const closeTime = new Date(`1970-01-01T22:00`);
  
  return (
    start >= openTime &&
    end <= closeTime &&
    start < end &&
    (end - start) <= 3600000 * 3
  );
};

export const validateReservationPurpose = (purpose, otherPurpose = '') => {
  const validPurposes = ['팀프로젝트', '개인학습', '조별학습', '회의', '기타'];
  if (!validPurposes.includes(purpose)) {
    return '올바른 예약 목적을 선택해주세요.';
  }
  if (purpose === '기타' && !otherPurpose) {
    return '기타 목적을 입력해주세요.';
  }
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

  if (!validateReservationTime(reservationData.startTime, reservationData.endTime)) {
    errors.time = '올바른 예약 시간을 선택해주세요.';
  }

  if (!validateReservationPurpose(reservationData.purpose, reservationData.customPurpose)) {
    errors.purpose = validateReservationPurpose(reservationData.purpose, reservationData.customPurpose);
  }

  return errors;
};

export const validatePasswordMatch = (password, confirmPassword) => {
  if (password !== confirmPassword) {
    return '비밀번호가 일치하지 않습니다.';
  }
  return '';
}; 
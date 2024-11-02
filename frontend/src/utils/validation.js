export const validateEmail = (email) => {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return regex.test(email);
};

export const validatePassword = (password) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(password);
};

export const validateStudentId = (studentId) => {
  const regex = /^\d{7}$/;
  return regex.test(studentId);
};

export const validatePhoneNumber = (phone) => {
  const regex = /^010-\d{4}-\d{4}$/;
  return regex.test(phone);
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
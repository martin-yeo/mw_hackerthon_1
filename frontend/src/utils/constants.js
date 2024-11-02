export const OPERATING_HOURS = {
  start: '09:00',
  end: '22:00'
};

export const SEAT_TYPES = {
  INDIVIDUAL: {
    EAST: ['동1', '동2', '동3', '동4', '동5', '동6'],
    WEST: ['서1', '서2', '서3', '서4', '서5', '서6']
  },
  WINDOW: ['창가1', '창가2', '창가3', '창가4', '창가5', '창가6'],
  IMAC: ['아이맥1', '아이맥2', '아이맥3'],
  TEAM: ['테이블1', '테이블2', '테이블3', '테이블4', '테이블5', '테이블6', '테이블7', '테이블8']
};

export const SEAT_CONFIG = {
  [SEAT_TYPES.INDIVIDUAL]: {
    count: 12,
    maxDuration: 240, // 4시간
    minDuration: 60,  // 1시간
    layout: {
      rows: 3,
      cols: 4
    }
  },
  [SEAT_TYPES.TEAM]: {
    count: 4,
    maxDuration: 240, // 4시간
    minDuration: 120, // 2시간
    minTeamSize: 2,
    maxTeamSize: 6,
    layout: {
      rows: 2,
      cols: 2
    }
  },
  [SEAT_TYPES.WINDOW]: {
    count: 6,
    maxDuration: 180, // 3시간
    minDuration: 60,  // 1시간
    layout: {
      rows: 2,
      cols: 3
    }
  },
  [SEAT_TYPES.IMAC]: {
    count: 3,
    maxDuration: 180, // 3시간
    minDuration: 60,  // 1시간
    layout: {
      rows: 1,
      cols: 3
    }
  }
};

export const RESERVATION_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  CANCELLED: 'cancelled'
};

export const RESERVATION_STATUS_KO = {
  [RESERVATION_STATUS.PENDING]: '승인 대기',
  [RESERVATION_STATUS.APPROVED]: '승인됨',
  [RESERVATION_STATUS.REJECTED]: '거절됨',
  [RESERVATION_STATUS.CANCELLED]: '취소됨'
};

export const RESERVATION_PURPOSES = [
  '팀프로젝트',
  '개인학습',
  '조별학습',
  '회의',
  '기타'
];

export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user'
};

export const ERROR_MESSAGES = {
  REQUIRED: '필수 입력 항목입니다.',
  INVALID_EMAIL: '올바른 이메일 형식이 아닙니다.',
  INVALID_PASSWORD: '비밀번호는 8자 이상의 영문 대소문자, 숫자, 특수문자를 포함해야 합니다.',
  INVALID_STUDENT_ID: '학번은 7자리 숫자여야 합니다.',
  INVALID_PHONE: '올바른 전화번호 형식이 아닙니다. (010-XXXX-XXXX)',
  DUPLICATE_STUDENT_ID: '이미 등록된 학번입니다.',
  DUPLICATE_PHONE: '이미 등록된 전화번호입니다.',
  LOGIN_FAILED: '로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.',
  SERVER_ERROR: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'
};

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/local',
    REGISTER: '/auth/local/register',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    CHANGE_PASSWORD: '/auth/change-password'
  },
  RESERVATIONS: {
    LIST: '/reservations',
    CREATE: '/reservations',
    UPDATE: (id) => `/reservations/${id}`,
    DELETE: (id) => `/reservations/${id}`,
    APPROVE: (id) => `/reservations/${id}/approve`,
    REJECT: (id) => `/reservations/${id}/reject`
  },
  SEATS: {
    LIST: '/seats',
    AVAILABILITY: (id) => `/seats/${id}/availability`
  },
  USERS: {
    ME: '/users/me',
    UPDATE: (id) => `/users/${id}`,
    DELETE: (id) => `/users/${id}`
  }
};

export const GOOGLE_CALENDAR_CONFIG = {
  API_KEY: process.env.REACT_APP_GOOGLE_API_KEY,
  CLIENT_ID: process.env.REACT_APP_GOOGLE_CLIENT_ID,
  CALENDAR_ID: 'primary'
};

export const COLORS = {
  PRIMARY: '#901C1C',
  SECONDARY: '#6C757D',
  SUCCESS: '#28A745',
  WARNING: '#FFC107',
  ERROR: '#DC3545',
  INFO: '#17A2B8',
  LIGHT: '#F8F9FA',
  DARK: '#343A40'
}; 
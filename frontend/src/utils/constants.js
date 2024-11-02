export const OPERATING_HOURS = {
  start: '09:00',
  end: '22:00'
};

export const SEAT_TYPES = {
  SINGLE: '1인연구석',
  WINDOW: '창가석',
  IMAC: '아이맥석',
  TEAM: '팀프로젝트석'
};

export const SEAT_CONFIG = {
  [SEAT_TYPES.SINGLE]: {
    count: 12,
    maxDuration: 240, // 4시간
    minDuration: 60,  // 1시간
    layout: {
      rows: 3,
      cols: 4
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
  '개인학습',
  '팀프로젝트',
  '온라인강의',
  '과제작업',
  '회의',
  '기타'
];

export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user'
};

export const ERROR_MESSAGES = {
  NETWORK_ERROR: '네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
  SERVER_ERROR: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
  UNAUTHORIZED: '로그인이 필요한 서비스입니다.',
  FORBIDDEN: '접근 권한이 없습니다.',
  NOT_FOUND: '요청하신 페이지를 찾을 수 없습니다.',
  VALIDATION_ERROR: '입력값을 확인해주세요.',
  DUPLICATE_RESERVATION: '해당 시간에 이미 예약이 있습니다.',
  SEAT_NOT_AVAILABLE: '선택하신 좌석은 이미 예약되었습니다.'
};

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    ME: '/auth/me',
    REFRESH: '/auth/refresh'
  },
  RESERVATIONS: {
    LIST: '/reservations',
    CREATE: '/reservations',
    CANCEL: (id) => `/reservations/${id}/cancel`,
    DETAIL: (id) => `/reservations/${id}`,
    CHECK: '/reservations/check'
  },
  ADMIN: {
    USERS: '/admin/users',
    STATS: '/admin/stats',
    APPROVE: (id) => `/admin/reservations/${id}/approve`,
    REJECT: (id) => `/admin/reservations/${id}/reject`
  }
}; 
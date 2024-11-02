const PREFIX = 'fablab_';

export const storage = {
  // 토큰 관련
  setToken: (token) => {
    localStorage.setItem(`${PREFIX}token`, token);
  },

  getToken: () => {
    return localStorage.getItem(`${PREFIX}token`);
  },

  setRefreshToken: (token) => {
    localStorage.setItem(`${PREFIX}refresh_token`, token);
  },

  getRefreshToken: () => {
    return localStorage.getItem(`${PREFIX}refresh_token`);
  },

  // 사용자 관련
  setUser: (user) => {
    localStorage.setItem(`${PREFIX}user`, JSON.stringify(user));
  },

  getUser: () => {
    const user = localStorage.getItem(`${PREFIX}user`);
    return user ? JSON.parse(user) : null;
  },

  // 테마 관련
  setTheme: (theme) => {
    localStorage.setItem(`${PREFIX}theme`, theme);
  },

  getTheme: () => {
    return localStorage.getItem(`${PREFIX}theme`) || 'light';
  },

  // 언어 설정
  setLanguage: (lang) => {
    localStorage.setItem(`${PREFIX}language`, lang);
  },

  getLanguage: () => {
    return localStorage.getItem(`${PREFIX}language`) || 'ko';
  },

  // 최근 검색어
  setRecentSearches: (searches) => {
    localStorage.setItem(`${PREFIX}recent_searches`, JSON.stringify(searches));
  },

  getRecentSearches: () => {
    const searches = localStorage.getItem(`${PREFIX}recent_searches`);
    return searches ? JSON.parse(searches) : [];
  },

  // 자동 로그인 설정
  setAutoLogin: (value) => {
    localStorage.setItem(`${PREFIX}auto_login`, value);
  },

  getAutoLogin: () => {
    return localStorage.getItem(`${PREFIX}auto_login`) === 'true';
  },

  // 모든 데이터 삭제
  clearAll: () => {
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith(PREFIX)) {
        localStorage.removeItem(key);
      }
    });
  },

  // 특정 키의 데이터 삭제
  remove: (key) => {
    localStorage.removeItem(`${PREFIX}${key}`);
  },

  // 로컬 스토리지 사용 가능 여부 확인
  isAvailable: () => {
    try {
      const testKey = `${PREFIX}test`;
      localStorage.setItem(testKey, 'test');
      localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }
}; 
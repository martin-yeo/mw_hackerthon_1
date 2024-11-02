module.exports = {
  async initialize() {
    const providers = {
      github: {
        clientID: process.env.OAUTH_GITHUB_CLIENT_ID,
        clientSecret: process.env.OAUTH_GITHUB_CLIENT_SECRET,
        callbackURL: '/auth/github/callback'
      },
      google: {
        clientID: process.env.OAUTH_GOOGLE_CLIENT_ID,
        clientSecret: process.env.OAUTH_GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback'
      },
      kakao: {
        clientID: process.env.OAUTH_KAKAO_CLIENT_ID,
        callbackURL: '/auth/kakao/callback'
      },
      naver: {
        clientID: process.env.OAUTH_NAVER_CLIENT_ID,
        clientSecret: process.env.OAUTH_NAVER_CLIENT_SECRET,
        callbackURL: '/auth/naver/callback'
      },
      facebook: {
        clientID: process.env.OAUTH_FACEBOOK_CLIENT_ID,
        clientSecret: process.env.OAUTH_FACEBOOK_CLIENT_SECRET,
        callbackURL: '/auth/facebook/callback'
      }
    };

    // 각 provider 설정
    Object.entries(providers).forEach(([name, config]) => {
      strapi.config.set(`auth.${name}`, config);
    });
  }
}; 
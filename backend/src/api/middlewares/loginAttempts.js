module.exports = (config, { strapi }) => {
  const attempts = new Map();

  return async (ctx, next) => {
    if (ctx.request.path === '/api/auth/local' && ctx.request.method === 'POST') {
      const { identifier } = ctx.request.body;
      const userAttempts = attempts.get(identifier) || { count: 0, timestamp: Date.now() };

      if (userAttempts.count >= 3) {
        const timePassed = Date.now() - userAttempts.timestamp;
        if (timePassed < 30000) { // 30초
          return ctx.badRequest('Too many login attempts. Please try again later.');
        }
        attempts.delete(identifier);
      }

      await next();

      if (ctx.response.status !== 200) {
        userAttempts.count += 1;
        userAttempts.timestamp = Date.now();
        attempts.set(identifier, userAttempts);
      }
    } else {
      await next();
    }
  };
}; 
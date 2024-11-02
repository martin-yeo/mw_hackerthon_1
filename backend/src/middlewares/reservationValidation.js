module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    if (ctx.request.method === 'POST' && ctx.request.url.includes('/reservations')) {
      const { startTime, endTime, seatId } = ctx.request.body;
      
      // 중복 예약 체크
      const existingReservation = await strapi.db.query('api::reservation.reservation').findOne({
        where: {
          seat: seatId,
          startTime_lte: endTime,
          endTime_gte: startTime,
          status_in: ['pending', 'approved']
        }
      });

      if (existingReservation) {
        return ctx.badRequest('해당 시간에 이미 예약이 존재합니다.');
      }
    }
    
    await next();
  };
}; 
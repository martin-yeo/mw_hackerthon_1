module.exports = {
  async checkDuplicateReservation(seatId, startTime, endTime) {
    const existingReservation = await strapi.db.query('api::reservation.reservation').findOne({
      where: {
        seat: seatId,
        $or: [
          {
            startTime: { $lte: startTime },
            endTime: { $gt: startTime }
          },
          {
            startTime: { $lt: endTime },
            endTime: { $gte: endTime }
          }
        ]
      }
    });

    return !!existingReservation;
  }
}; 
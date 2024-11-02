module.exports = {
  async sendReservationNotification(type, reservation, user) {
    const templates = {
      approved: {
        subject: '[FabLab] 예약이 승인되었습니다',
        template: 'reservation-approved'
      },
      rejected: {
        subject: '[FabLab] 예약이 거절되었습니다',
        template: 'reservation-rejected'
      },
      cancelled: {
        subject: '[FabLab] 예약이 취소되었습니다',
        template: 'reservation-cancelled'
      }
    };

    const { subject, template } = templates[type];

    await strapi.plugins['email'].services.email.send({
      to: user.email,
      subject: subject,
      template: template,
      data: {
        user: user.name,
        reservation: {
          date: reservation.date,
          startTime: reservation.startTime,
          endTime: reservation.endTime,
          seatInfo: reservation.seatInfo,
          reason: reservation.reason
        }
      }
    });
  }
}; 
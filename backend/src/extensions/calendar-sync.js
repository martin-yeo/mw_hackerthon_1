const { google } = require('googleapis');

module.exports = {
  async syncWithGoogleCalendar(reservation) {
    const auth = new google.auth.GoogleAuth({
      keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
      scopes: ['https://www.googleapis.com/auth/calendar']
    });

    const calendar = google.calendar({ version: 'v3', auth });

    const event = {
      summary: `FabLab 예약 - ${reservation.seatInfo}`,
      description: `예약자: ${reservation.userName}\n` +
                  `학번: ${reservation.studentId}\n` +
                  `목적: ${reservation.purpose}`,
      start: {
        dateTime: `${reservation.date}T${reservation.startTime}:00+09:00`
      },
      end: {
        dateTime: `${reservation.date}T${reservation.endTime}:00+09:00`
      }
    };

    try {
      await calendar.events.insert({
        calendarId: process.env.GOOGLE_CALENDAR_ID,
        resource: event
      });
    } catch (error) {
      console.error('Google Calendar sync failed:', error);
      throw error;
    }
  }
}; 
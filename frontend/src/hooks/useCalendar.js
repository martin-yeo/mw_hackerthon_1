import { useState, useEffect } from 'react';
import { GOOGLE_CALENDAR_CONFIG } from '../utils/constants';

export const useCalendar = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadGoogleCalendarApi = () => {
    return new Promise((resolve) => {
      if (window.gapi) {
        resolve();
      } else {
        const script = document.createElement('script');
        script.src = 'https://apis.google.com/js/api.js';
        script.onload = () => {
          window.gapi.load('client', () => {
            window.gapi.client.init({
              apiKey: GOOGLE_CALENDAR_CONFIG.API_KEY,
              discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest']
            }).then(resolve);
          });
        };
        document.body.appendChild(script);
      }
    });
  };

  const fetchEvents = async (startDate, endDate) => {
    setLoading(true);
    setError(null);

    try {
      await loadGoogleCalendarApi();
      
      const response = await window.gapi.client.calendar.events.list({
        calendarId: GOOGLE_CALENDAR_CONFIG.CALENDAR_ID,
        timeMin: startDate.toISOString(),
        timeMax: endDate.toISOString(),
        singleEvents: true,
        orderBy: 'startTime'
      });

      setEvents(response.result.items);
    } catch (err) {
      setError('캘린더 이벤트를 불러오는데 실패했습니다.');
      console.error('Calendar Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const addEvent = async (eventDetails) => {
    try {
      await loadGoogleCalendarApi();
      
      const event = {
        summary: eventDetails.title,
        description: eventDetails.description,
        start: {
          dateTime: eventDetails.startTime,
          timeZone: 'Asia/Seoul'
        },
        end: {
          dateTime: eventDetails.endTime,
          timeZone: 'Asia/Seoul'
        }
      };

      await window.gapi.client.calendar.events.insert({
        calendarId: GOOGLE_CALENDAR_CONFIG.CALENDAR_ID,
        resource: event
      });

      return true;
    } catch (err) {
      console.error('Add Event Error:', err);
      return false;
    }
  };

  return {
    events,
    loading,
    error,
    fetchEvents,
    addEvent
  };
}; 
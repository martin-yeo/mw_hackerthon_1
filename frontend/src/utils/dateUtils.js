import { format, addDays, isAfter, isBefore, isSameDay, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale';

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const formatTime = (time) => {
  return new Date(`1970-01-01T${time}`).toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
};

export const formatDateTime = (date, time) => {
  if (!date || !time) return '';
  return `${formatDate(date)} ${formatTime(time)}`;
};

export const isValidReservationDate = (date) => {
  const today = new Date();
  const maxDate = addDays(today, 14); // 최대 14일 후까지 예약 가능

  return (
    isAfter(date, today) && 
    isBefore(date, maxDate) && 
    !isWeekend(date)
  );
};

export const isWeekend = (date) => {
  const day = date.getDay();
  return day === 0 || day === 6;
};

export const getTimeSlots = () => {
  const slots = [];
  for (let hour = 9; hour < 22; hour++) {
    slots.push(`${hour.toString().padStart(2, '0')}:00`);
  }
  return slots;
};

export const calculateDuration = (startTime, endTime) => {
  const [startHour, startMinute] = startTime.split(':').map(Number);
  const [endHour, endMinute] = endTime.split(':').map(Number);
  
  const totalMinutes = (endHour * 60 + endMinute) - (startHour * 60 + startMinute);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours === 0) {
    return `${minutes}분`;
  } else if (minutes === 0) {
    return `${hours}시간`;
  } else {
    return `${hours}시간 ${minutes}분`;
  }
};

export const isOverlapping = (start1, end1, start2, end2) => {
  return (
    (isBefore(start1, end2) || isSameDay(start1, end2)) && 
    (isAfter(end1, start2) || isSameDay(end1, start2))
  );
};

export const isTimeSlotAvailable = (timeSlot, existingReservations) => {
  return !existingReservations.some(reservation => 
    reservation.startTime <= timeSlot && reservation.endTime > timeSlot
  );
};

export const getWeekDates = (date = new Date()) => {
  const week = [];
  const current = new Date(date);
  current.setDate(current.getDate() - current.getDay());

  for (let i = 0; i < 7; i++) {
    week.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }
  return week;
};

export const getMonthDates = (year, month) => {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const dates = [];

  // 이전 달의 날짜들
  const prevMonthDays = firstDay.getDay();
  const prevMonth = new Date(year, month - 1, 0);
  for (let i = prevMonthDays - 1; i >= 0; i--) {
    dates.push({
      date: new Date(year, month - 1, prevMonth.getDate() - i),
      isCurrentMonth: false
    });
  }

  // 현재 달의 날짜들
  for (let date = 1; date <= lastDay.getDate(); date++) {
    dates.push({
      date: new Date(year, month, date),
      isCurrentMonth: true
    });
  }

  // 다음 달의 날짜들
  const remainingDays = 42 - dates.length; // 6주 달력을 위해
  for (let i = 1; i <= remainingDays; i++) {
    dates.push({
      date: new Date(year, month + 1, i),
      isCurrentMonth: false
    });
  }

  return dates;
};

export const isSameDay = (date1, date2) => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

export const addDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export const isWithinOperatingHours = (time) => {
  const [hours] = time.split(':').map(Number);
  return hours >= 9 && hours < 22;
}; 
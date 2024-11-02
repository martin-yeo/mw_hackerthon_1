import { format, addDays, isAfter, isBefore, isSameDay, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale';

export const formatDate = (date) => {
  if (!date) return '';
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
  return format(parsedDate, 'yyyy년 MM월 dd일', { locale: ko });
};

export const formatTime = (time) => {
  if (!time) return '';
  return time.substring(0, 5); // "HH:mm" 형식으로 변환
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

export const getTimeSlots = (startTime, endTime, interval = 30) => {
  const slots = [];
  let currentTime = startTime;

  while (currentTime < endTime) {
    slots.push(currentTime);
    const [hours, minutes] = currentTime.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes + interval);
    currentTime = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
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
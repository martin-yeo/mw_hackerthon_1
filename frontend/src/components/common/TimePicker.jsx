import React from 'react';
import { OPERATING_HOURS } from '../../utils/constants';

export const TimePicker = ({ 
  startTime, 
  endTime, 
  onChange,
  minDuration = 60, // 최소 예약 시간 (분)
  maxDuration = 240, // 최대 예약 시간 (분)
  interval = 30, // 시간 선택 간격 (분)
  disabledTimes = [] 
}) => {
  const generateTimeSlots = () => {
    const slots = [];
    const [startHour] = OPERATING_HOURS.start.split(':').map(Number);
    const [endHour] = OPERATING_HOURS.end.split(':').map(Number);

    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += interval) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        if (!disabledTimes.includes(timeString)) {
          slots.push(timeString);
        }
      }
    }
    return slots;
  };

  const handleStartTimeChange = (e) => {
    const newStartTime = e.target.value;
    let newEndTime = endTime;

    // 시작 시간이 변경되면 종료 시간도 자동으로 조정
    if (newStartTime) {
      const minEndTime = addMinutes(newStartTime, minDuration);
      const maxEndTime = addMinutes(newStartTime, maxDuration);

      if (!endTime || endTime < minEndTime) {
        newEndTime = minEndTime;
      } else if (endTime > maxEndTime) {
        newEndTime = maxEndTime;
      }
    }

    onChange({ start: newStartTime, end: newEndTime });
  };

  const handleEndTimeChange = (e) => {
    const newEndTime = e.target.value;
    onChange({ start: startTime, end: newEndTime });
  };

  const addMinutes = (time, minutes) => {
    const [hours, mins] = time.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, mins + minutes);
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  };

  const timeSlots = generateTimeSlots();

  return (
    <div className="time-picker">
      <div className="time-picker-field">
        <label>시작 시간</label>
        <select 
          value={startTime} 
          onChange={handleStartTimeChange}
          className="time-select"
        >
          <option value="">선택</option>
          {timeSlots.map(time => (
            <option 
              key={`start-${time}`} 
              value={time}
              disabled={disabledTimes.includes(time)}
            >
              {time}
            </option>
          ))}
        </select>
      </div>

      <div className="time-picker-field">
        <label>종료 시간</label>
        <select 
          value={endTime} 
          onChange={handleEndTimeChange}
          className="time-select"
          disabled={!startTime}
        >
          <option value="">선택</option>
          {timeSlots
            .filter(time => time > startTime)
            .filter(time => {
              if (!startTime) return true;
              const duration = getDurationInMinutes(startTime, time);
              return duration >= minDuration && duration <= maxDuration;
            })
            .map(time => (
              <option 
                key={`end-${time}`} 
                value={time}
                disabled={disabledTimes.includes(time)}
              >
                {time}
              </option>
            ))}
        </select>
      </div>

      {startTime && endTime && (
        <div className="duration-display">
          예약 시간: {getDurationInMinutes(startTime, endTime)}분
        </div>
      )}
    </div>
  );
};

const getDurationInMinutes = (start, end) => {
  const [startHour, startMinute] = start.split(':').map(Number);
  const [endHour, endMinute] = end.split(':').map(Number);
  return (endHour - startHour) * 60 + (endMinute - startMinute);
}; 
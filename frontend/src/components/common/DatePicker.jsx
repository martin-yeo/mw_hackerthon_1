import React from 'react';
import ReactDatePicker from 'react-datepicker';
import { ko } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';

export const DatePicker = ({ 
  selected, 
  onChange, 
  minDate = new Date(),
  maxDate,
  excludeDates,
  inline = false,
  className = '',
  placeholderText = '날짜 선택'
}) => {
  const filterWeekends = (date) => {
    const day = date.getDay();
    // 주말(토,일) 제외
    return day !== 0 && day !== 6;
  };

  return (
    <div className={`custom-datepicker ${className}`}>
      <ReactDatePicker
        selected={selected}
        onChange={onChange}
        minDate={minDate}
        maxDate={maxDate}
        excludeDates={excludeDates}
        filterDate={filterWeekends}
        inline={inline}
        locale={ko}
        dateFormat="yyyy년 MM월 dd일"
        placeholderText={placeholderText}
        popperPlacement="bottom-start"
        popperModifiers={{
          preventOverflow: {
            enabled: true,
            escapeWithReference: false,
            boundariesElement: 'viewport'
          }
        }}
        customInput={
          <input
            className="datepicker-input"
          />
        }
      />
    </div>
  );
}; 
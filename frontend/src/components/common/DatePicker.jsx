import React from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/locale';

export const DatePicker = ({ 
  selected,
  onChange,
  minDate,
  maxDate,
  placeholderText,
  selectsStart,
  selectsEnd,
  startDate,
  endDate,
  ...props 
}) => {
  return (
    <div className="date-picker-wrapper">
      <ReactDatePicker
        selected={selected}
        onChange={onChange}
        minDate={minDate}
        maxDate={maxDate}
        placeholderText={placeholderText}
        selectsStart={selectsStart}
        selectsEnd={selectsEnd}
        startDate={startDate}
        endDate={endDate}
        locale={ko}
        dateFormat="yyyy년 MM월 dd일"
        {...props}
      />

      <style jsx>{`
        .date-picker-wrapper {
          position: relative;
        }

        .date-picker-wrapper :global(.react-datepicker-wrapper) {
          width: 100%;
        }

        .date-picker-wrapper :global(.react-datepicker__input-container input) {
          width: 100%;
          padding: 0.5rem;
          border: 1px solid var(--border-color);
          border-radius: 4px;
          font-size: 1rem;
          color: var(--text-primary);
        }

        .date-picker-wrapper :global(.react-datepicker__input-container input:focus) {
          outline: none;
          border-color: var(--burgundy-red);
        }

        .date-picker-wrapper :global(.react-datepicker) {
          font-family: 'Noto Sans KR', sans-serif;
          border-color: var(--border-color);
        }

        .date-picker-wrapper :global(.react-datepicker__header) {
          background-color: var(--burgundy-red);
          border-bottom: none;
        }

        .date-picker-wrapper :global(.react-datepicker__current-month),
        .date-picker-wrapper :global(.react-datepicker__day-name) {
          color: white;
        }

        .date-picker-wrapper :global(.react-datepicker__day--selected) {
          background-color: var(--burgundy-red);
        }

        .date-picker-wrapper :global(.react-datepicker__day--keyboard-selected) {
          background-color: var(--burgundy-gray);
        }
      `}</style>
    </div>
  );
}; 
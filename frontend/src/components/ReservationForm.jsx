import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { createReservation } from '../api/reservations';

export const ReservationForm = () => {
  const { register, handleSubmit } = useForm();
  
  const onSubmit = async (data) => {
    try {
      await createReservation({
        seatId: data.seatId,
        startTime: data.startTime,
        endTime: data.endTime,
        purpose: data.purpose,
        teamSize: data.teamSize
      });
    } catch (error) {
      console.error('예약 실패:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* 폼 필드들 */}
    </form>
  );
}; 
import React, { useState, useEffect } from 'react';
import { useAdmin } from '../../hooks/useAdmin';
import { ReservationSearch } from '../../components/admin/ReservationSearch';
import { ReservationTable } from '../../components/admin/ReservationTable';
import { ReservationDetail } from '../../components/reservation/ReservationDetail';
import { Pagination } from '../../components/common/Pagination';

export const Reservations = () => {
  const { getReservations, updateReservationStatus } = useAdmin();
  const [reservations, setReservations] = useState([]);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [filters, setFilters] = useState({
    keyword: '',
    date: null,
    status: 'all',
    seatType: 'all'
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadReservations();
  }, [filters, pagination.currentPage]);

  const loadReservations = async () => {
    setLoading(true);
    try {
      const response = await getReservations({
        ...filters,
        page: pagination.currentPage
      });
      setReservations(response.data);
      setPagination({
        currentPage: response.currentPage,
        totalPages: response.totalPages,
        totalItems: response.totalItems
      });
    } catch (error) {
      console.error('예약 목록 로딩 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (reservationId, status, reason) => {
    try {
      await updateReservationStatus(reservationId, status, reason);
      await loadReservations();
      setSelectedReservation(null);
    } catch (error) {
      console.error('예약 상태 업데이트 실패:', error);
    }
  };

  return (
    <div className="admin-reservations">
      <h1>예약 관리</h1>

      <ReservationSearch
        filters={filters}
        onSearch={setFilters}
      />

      {loading ? (
        <div className="loading">로딩 중...</div>
      ) : (
        <>
          <ReservationTable
            reservations={reservations}
            onReservationClick={setSelectedReservation}
            onStatusUpdate={handleStatusUpdate}
          />

          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={(page) => setPagination({...pagination, currentPage: page})}
          />
        </>
      )}

      {selectedReservation && (
        <div className="modal">
          <ReservationDetail
            reservation={selectedReservation}
            onClose={() => setSelectedReservation(null)}
            isAdmin={true}
            onStatusUpdate={handleStatusUpdate}
          />
        </div>
      )}
    </div>
  );
}; 
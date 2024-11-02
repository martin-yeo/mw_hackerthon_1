import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useReservation } from '../../hooks/useReservation';
import { Pagination } from '../../components/common/Pagination';
import { Loading } from '../../components/common/Loading';
import { Confirm } from '../../components/common/Confirm';
import { useToast } from '../../hooks/useToast';
import { formatDateTime } from '../../utils/dateUtils';
import { RESERVATION_STATUS_KO } from '../../utils/constants';

export const ReservationListPage = () => {
  const { getReservations, cancelReservation } = useReservation();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [reservations, setReservations] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [confirmCancel, setConfirmCancel] = useState(null);
  const [filters, setFilters] = useState({
    status: '',
    startDate: '',
    endDate: ''
  });

  useEffect(() => {
    fetchReservations();
  }, [page, filters]);

  const fetchReservations = async () => {
    try {
      const response = await getReservations({ page, ...filters });
      setReservations(response.data);
      setTotalPages(response.totalPages);
    } catch (error) {
      showToast({
        type: 'error',
        message: '예약 목록을 불러오는데 실패했습니다.'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancelReservation = async () => {
    try {
      await cancelReservation(confirmCancel.id);
      showToast({
        type: 'success',
        message: '예약이 취소되었습니다.'
      });
      fetchReservations();
    } catch (error) {
      showToast({
        type: 'error',
        message: '예약 취소에 실패했습니다.'
      });
    } finally {
      setConfirmCancel(null);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
    setPage(1);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="reservation-list-container">
      <div className="page-header">
        <h1>나의 예약</h1>
        <Link to="/reservations/new" className="button primary">
          <i className="material-icons">add</i>
          새 예약
        </Link>
      </div>

      <div className="filters">
        <div className="filter-group">
          <label>상태</label>
          <select name="status" value={filters.status} onChange={handleFilterChange}>
            <option value="">전체</option>
            {Object.entries(RESERVATION_STATUS_KO).map(([key, value]) => (
              <option key={key} value={key}>{value}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>시작일</label>
          <input
            type="date"
            name="startDate"
            value={filters.startDate}
            onChange={handleFilterChange}
          />
        </div>

        <div className="filter-group">
          <label>종료일</label>
          <input
            type="date"
            name="endDate"
            value={filters.endDate}
            onChange={handleFilterChange}
          />
        </div>
      </div>

      {reservations.length === 0 ? (
        <div className="empty-state">
          <i className="material-icons">event_busy</i>
          <p>예약 내역이 없습니다.</p>
          <Link to="/reservations/new" className="button primary">
            첫 예약 만들기
          </Link>
        </div>
      ) : (
        <>
          <div className="reservation-grid">
            {reservations.map(reservation => (
              <div key={reservation.id} className="reservation-card">
                <div className="card-header">
                  <span className={`status-badge ${reservation.status}`}>
                    {RESERVATION_STATUS_KO[reservation.status]}
                  </span>
                  <span className="seat-type">{reservation.seatType}</span>
                </div>

                <div className="card-body">
                  <h3>좌석 {reservation.seatNumber}</h3>
                  <p className="datetime">
                    <i className="material-icons">event</i>
                    {formatDateTime(reservation.date, reservation.startTime)}
                  </p>
                  <p className="duration">
                    <i className="material-icons">schedule</i>
                    {reservation.duration}
                  </p>
                  <p className="purpose">
                    <i className="material-icons">info</i>
                    {reservation.purpose}
                  </p>
                </div>

                <div className="card-footer">
                  <Link 
                    to={`/reservations/${reservation.id}`}
                    className="button text"
                  >
                    상세보기
                  </Link>
                  {reservation.status === 'pending' && (
                    <button
                      className="button text danger"
                      onClick={() => setConfirmCancel(reservation)}
                    >
                      취소
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </>
      )}

      <Confirm
        isOpen={!!confirmCancel}
        onClose={() => setConfirmCancel(null)}
        onConfirm={handleCancelReservation}
        title="예약 취소"
        message="정말 이 예약을 취소하시겠습니까?"
        confirmText="예약 취소"
        type="danger"
      />
    </div>
  );
}; 
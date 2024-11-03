import React, { useState, useEffect } from 'react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { DatePicker } from '../../components/common/DatePicker';
import { Loading } from '../../components/common/Loading';
import { AlertModal } from '../../components/notification/AlertModal';
import { useAdmin } from '../../hooks/useAdmin';
import { formatDateTime } from '../../utils/dateUtils';

const ITEMS_PER_PAGE = 10;

export const AdminReservationPage = () => {
  const { getReservations, updateReservationStatus } = useAdmin();
  const [reservations, setReservations] = useState([]);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [statusReason, setStatusReason] = useState('');
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    startDate: null,
    endDate: null,
    seatType: ''
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0
  });

  useEffect(() => {
    loadReservations();
  }, [filters, pagination.currentPage]);

  const loadReservations = async () => {
    setLoading(true);
    try {
      const response = await getReservations({
        ...filters,
        page: pagination.currentPage,
        limit: ITEMS_PER_PAGE
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

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
    setPagination(prev => ({
      ...prev,
      currentPage: 1
    }));
  };

  const handleStatusUpdate = async (status) => {
    if (!selectedReservation) return;

    try {
      await updateReservationStatus(
        selectedReservation.id,
        status,
        statusReason
      );
      await loadReservations();
      setShowStatusModal(false);
      setSelectedReservation(null);
      setStatusReason('');
    } catch (error) {
      console.error('예약 상태 업데이트 실패:', error);
    }
  };

  const openStatusModal = (reservation, initialStatus) => {
    setSelectedReservation({ ...reservation, initialStatus });
    setShowStatusModal(true);
  };

  const handlePageChange = (page) => {
    setPagination(prev => ({
      ...prev,
      currentPage: page
    }));
  };

  if (loading && !reservations.length) {
    return <Loading />;
  }

  return (
    <div className="admin-reservation-page">
      <Card className="filters-card">
        <div className="filters">
          <div className="search-box">
            <Input
              type="text"
              name="search"
              value={filters.search}
              onChange={handleFilterChange}
              placeholder="예약자명, 학번, 좌석번호 검색..."
              icon="search"
            />
          </div>

          <div className="filter-group">
            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
            >
              <option value="">전체 상태</option>
              <option value="pending">대기중</option>
              <option value="approved">승인됨</option>
              <option value="rejected">거절됨</option>
              <option value="cancelled">취소됨</option>
            </select>
          </div>

          <div className="filter-group">
            <DatePicker
              selected={filters.startDate}
              onChange={(date) => handleFilterChange({
                target: { name: 'startDate', value: date }
              })}
              placeholderText="시작일"
            />
          </div>

          <div className="filter-group">
            <DatePicker
              selected={filters.endDate}
              onChange={(date) => handleFilterChange({
                target: { name: 'endDate', value: date }
              })}
              placeholderText="종료일"
              minDate={filters.startDate}
            />
          </div>

          <div className="filter-group">
            <select
              name="seatType"
              value={filters.seatType}
              onChange={handleFilterChange}
            >
              <option value="">전체 좌석 유형</option>
              <option value="individual">개인석</option>
              <option value="window">창가석</option>
              <option value="imac">아이맥석</option>
              <option value="team">팀프로젝트석</option>
            </select>
          </div>
        </div>
      </Card>

      <Card className="reservations-card">
        <div className="reservations-header">
          <h2>예약 목록</h2>
          <span className="total-count">
            총 {pagination.totalItems}건
          </span>
        </div>

        <div className="reservations-table">
          <table>
            <thead>
              <tr>
                <th>예약번호</th>
                <th>예약자</th>
                <th>좌석정보</th>
                <th>예약시간</th>
                <th>목적</th>
                <th>상태</th>
                <th>작업</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map(reservation => (
                <tr key={reservation.id}>
                  <td>{reservation.id}</td>
                  <td>
                    <div className="user-info">
                      <span>{reservation.user.name}</span>
                      <small>{reservation.user.studentId}</small>
                    </div>
                  </td>
                  <td>
                    <div className="seat-info">
                      <span>{reservation.seat.name}</span>
                      <small>{reservation.seat.type}</small>
                    </div>
                  </td>
                  <td>
                    <div className="time-info">
                      <span>{formatDateTime(reservation.date)}</span>
                      <small>
                        {reservation.startTime} - {reservation.endTime}
                      </small>
                    </div>
                  </td>
                  <td>{reservation.purpose}</td>
                  <td>
                    <span className={`status-badge ${reservation.status}`}>
                      {reservation.status}
                    </span>
                  </td>
                  <td>
                    <div className="actions">
                      {reservation.status === 'pending' && (
                        <>
                          <Button
                            size="small"
                            variant="success"
                            onClick={() => openStatusModal(reservation, 'approve')}
                          >
                            승인
                          </Button>
                          <Button
                            size="small"
                            variant="danger"
                            onClick={() => openStatusModal(reservation, 'reject')}
                          >
                            거절
                          </Button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pagination">
          {Array.from({ length: pagination.totalPages }, (_, i) => (
            <Button
              key={i + 1}
              variant={pagination.currentPage === i + 1 ? 'primary' : 'text'}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </Button>
          ))}
        </div>
      </Card>

      <AlertModal
        isOpen={showStatusModal}
        onClose={() => {
          setShowStatusModal(false);
          setSelectedReservation(null);
          setStatusReason('');
        }}
        title={`예약 ${selectedReservation?.initialStatus === 'approve' ? '승인' : '거절'}`}
        type={selectedReservation?.initialStatus === 'approve' ? 'success' : 'danger'}
        confirmText={selectedReservation?.initialStatus === 'approve' ? '승인' : '거절'}
        cancelText="취소"
        onConfirm={() => handleStatusUpdate(
          selectedReservation?.initialStatus === 'approve' ? 'approved' : 'rejected'
        )}
      >
        <div className="status-modal-content">
          <p>
            {selectedReservation?.initialStatus === 'approve'
              ? '이 예약을 승인하시겠습니까?'
              : '이 예약을 거절하시겠습니까?'
            }
          </p>
          <textarea
            value={statusReason}
            onChange={(e) => setStatusReason(e.target.value)}
            placeholder={
              selectedReservation?.initialStatus === 'approve'
                ? '승인 메시지를 입력하세요 (선택사항)'
                : '거절 사유를 입력하세요'
            }
            required={selectedReservation?.initialStatus === 'reject'}
          />
        </div>
      </AlertModal>

      <style jsx>{`
        .admin-reservation-page {
          padding: 2rem;
          min-height: calc(100vh - var(--header-height));
          background-color: var(--background);
        }

        .filters {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
          gap: 1rem;
          align-items: center;
        }

        .reservations-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .reservations-header h2 {
          margin: 0;
        }

        .total-count {
          color: var(--text-secondary);
        }

        .reservations-table {
          overflow-x: auto;
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        th, td {
          padding: 1rem;
          text-align: left;
          border-bottom: 1px solid var(--border-color);
        }

        th {
          background-color: var(--background-paper);
          font-weight: 500;
        }

        .user-info,
        .seat-info,
        .time-info {
          display: flex;
          flex-direction: column;
        }

        .user-info small,
        .seat-info small,
        .time-info small {
          color: var(--text-secondary);
          font-size: 0.875rem;
        }

        .status-badge {
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-size: 0.875rem;
        }

        .status-badge.pending {
          background-color: var(--warning-light);
          color: var(--warning);
        }

        .status-badge.approved {
          background-color: var(--success-light);
          color: var(--success);
        }

        .status-badge.rejected {
          background-color: var(--error-light);
          color: var(--error);
        }

        .status-badge.cancelled {
          background-color: var(--gray-light);
          color: var(--text-secondary);
        }

        .actions {
          display: flex;
          gap: 0.5rem;
        }

        .pagination {
          display: flex;
          justify-content: center;
          gap: 0.5rem;
          margin-top: 2rem;
        }

        .status-modal-content textarea {
          width: 100%;
          min-height: 100px;
          margin-top: 1rem;
          padding: 0.75rem;
          border: 1px solid var(--border-color);
          border-radius: 4px;
          resize: vertical;
        }

        @media (max-width: 1200px) {
          .filters {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 768px) {
          .admin-reservation-page {
            padding: 1rem;
          }

          .filters {
            grid-template-columns: 1fr;
          }

          th, td {
            padding: 0.75rem;
          }
        }
      `}</style>
    </div>
  );
}; 
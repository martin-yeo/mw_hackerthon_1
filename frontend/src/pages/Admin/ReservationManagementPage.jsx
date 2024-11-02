import React, { useState, useEffect } from 'react';
import { useAdmin } from '../../hooks/useAdmin';
import { useToast } from '../../hooks/useToast';
import { Modal } from '../../components/common/Modal';
import { Confirm } from '../../components/common/Confirm';
import { Pagination } from '../../components/common/Pagination';
import { Loading } from '../../components/common/Loading';
import { DatePicker } from '../../components/common/DatePicker';
import { formatDateTime, formatDuration } from '../../utils/dateUtils';
import { RESERVATION_STATUS_KO } from '../../utils/constants';

export const ReservationManagementPage = () => {
  const { 
    getReservations, 
    updateReservationStatus, 
    deleteReservation 
  } = useAdmin();
  const { showToast } = useToast();
  
  const [loading, setLoading] = useState(true);
  const [reservations, setReservations] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [statusUpdateData, setStatusUpdateData] = useState({
    status: '',
    note: ''
  });
  
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    startDate: '',
    endDate: '',
    seatType: '',
    sortBy: 'createdAt',
    sortOrder: 'desc'
  });

  useEffect(() => {
    fetchReservations();
  }, [page, filters]);

  const fetchReservations = async () => {
    try {
      const response = await getReservations({
        page,
        limit: 10,
        ...filters
      });
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

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
    setPage(1);
  };

  const handleSort = (field) => {
    setFilters(prev => ({
      ...prev,
      sortBy: field,
      sortOrder: prev.sortBy === field && prev.sortOrder === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleStatusUpdate = async () => {
    try {
      await updateReservationStatus(
        selectedReservation.id,
        statusUpdateData.status,
        statusUpdateData.note
      );
      showToast({
        type: 'success',
        message: '예약 상태가 업데이트되었습니다.'
      });
      setShowStatusModal(false);
      fetchReservations();
    } catch (error) {
      showToast({
        type: 'error',
        message: '상태 업데이트에 실패했습니다.'
      });
    }
  };

  const handleDeleteReservation = async () => {
    try {
      await deleteReservation(selectedReservation.id);
      showToast({
        type: 'success',
        message: '예약이 삭제되었습니다.'
      });
      setShowDeleteConfirm(false);
      fetchReservations();
    } catch (error) {
      showToast({
        type: 'error',
        message: '예약 삭제에 실패했습니다.'
      });
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="reservation-management-container">
      <div className="page-header">
        <h1>예약 관리</h1>
        <div className="header-actions">
          <div className="search-box">
            <input
              type="text"
              name="search"
              value={filters.search}
              onChange={handleFilterChange}
              placeholder="예약자명, 학번, 좌석번호 검색..."
            />
            <i className="material-icons">search</i>
          </div>
        </div>
      </div>

      <div className="filters">
        <div className="filter-group">
          <label>상태</label>
          <select
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
          >
            <option value="">전체 상태</option>
            {Object.entries(RESERVATION_STATUS_KO).map(([key, value]) => (
              <option key={key} value={key}>{value}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>시작일</label>
          <DatePicker
            selected={filters.startDate}
            onChange={(date) => handleFilterChange({
              target: { name: 'startDate', value: date }
            })}
          />
        </div>

        <div className="filter-group">
          <label>종료일</label>
          <DatePicker
            selected={filters.endDate}
            onChange={(date) => handleFilterChange({
              target: { name: 'endDate', value: date }
            })}
            minDate={filters.startDate}
          />
        </div>

        <div className="filter-group">
          <label>좌석 유형</label>
          <select
            name="seatType"
            value={filters.seatType}
            onChange={handleFilterChange}
          >
            <option value="">전체 유형</option>
            <option value="INDIVIDUAL">개인석</option>
            <option value="TEAM">팀프로젝트석</option>
            <option value="SEMINAR">세미나실</option>
          </select>
        </div>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th onClick={() => handleSort('createdAt')}>예약번호</th>
              <th onClick={() => handleSort('userName')}>예약자</th>
              <th onClick={() => handleSort('seatNumber')}>좌석정보</th>
              <th onClick={() => handleSort('date')}>예약일시</th>
              <th onClick={() => handleSort('duration')}>이용시간</th>
              <th onClick={() => handleSort('status')}>상태</th>
              <th>작업</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map(reservation => (
              <tr key={reservation.id}>
                <td>{reservation.reservationNumber}</td>
                <td>
                  <div className="user-info">
                    <span>{reservation.userName}</span>
                    <small>{reservation.userStudentId}</small>
                  </div>
                </td>
                <td>
                  <div className="seat-info">
                    <span>좌석 {reservation.seatNumber}</span>
                    <small>{reservation.seatType}</small>
                  </div>
                </td>
                <td>{formatDateTime(reservation.date, reservation.startTime)}</td>
                <td>{formatDuration(reservation.startTime, reservation.endTime)}</td>
                <td>
                  <span className={`status-badge ${reservation.status}`}>
                    {RESERVATION_STATUS_KO[reservation.status]}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="button icon"
                      onClick={() => {
                        setSelectedReservation(reservation);
                        setStatusUpdateData({ status: reservation.status, note: '' });
                        setShowStatusModal(true);
                      }}
                    >
                      <i className="material-icons">edit</i>
                    </button>
                    <button
                      className="button icon danger"
                      onClick={() => {
                        setSelectedReservation(reservation);
                        setShowDeleteConfirm(true);
                      }}
                    >
                      <i className="material-icons">delete</i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />

      <Modal
        isOpen={showStatusModal}
        onClose={() => setShowStatusModal(false)}
        title="예약 상태 변경"
      >
        <div className="status-update-form">
          <div className="form-group">
            <label>상태</label>
            <select
              value={statusUpdateData.status}
              onChange={(e) => setStatusUpdateData(prev => ({
                ...prev,
                status: e.target.value
              }))}
            >
              {Object.entries(RESERVATION_STATUS_KO).map(([key, value]) => (
                <option key={key} value={key}>{value}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>관리자 메모</label>
            <textarea
              value={statusUpdateData.note}
              onChange={(e) => setStatusUpdateData(prev => ({
                ...prev,
                note: e.target.value
              }))}
              placeholder="상태 변경 사유나 메모를 입력하세요"
              rows={4}
            />
          </div>

          <div className="modal-actions">
            <button 
              className="button secondary" 
              onClick={() => setShowStatusModal(false)}
            >
              취소
            </button>
            <button 
              className="button primary" 
              onClick={handleStatusUpdate}
            >
              변경사항 저장
            </button>
          </div>
        </div>
      </Modal>

      <Confirm
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDeleteReservation}
        title="예약 삭제"
        message={`예약번호 ${selectedReservation?.reservationNumber}를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.`}
        confirmText="삭제"
        type="danger"
      />
    </div>
  );
}; 
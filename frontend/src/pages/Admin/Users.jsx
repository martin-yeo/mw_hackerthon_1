import React, { useState, useEffect } from 'react';
import { useAdmin } from '../../hooks/useAdmin';
import { UserSearch } from '../../components/admin/UserSearch';
import { Pagination } from '../../components/common/Pagination';

export const Users = () => {
  const { getUsers, updateUserStatus, exportUserData } = useAdmin();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [filters, setFilters] = useState({
    keyword: '',
    status: 'all',
    sortBy: 'registeredAt'
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadUsers();
  }, [filters, pagination.currentPage]);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const response = await getUsers({
        ...filters,
        page: pagination.currentPage
      });
      setUsers(response.data);
      setPagination({
        currentPage: response.currentPage,
        totalPages: response.totalPages,
        totalItems: response.totalItems
      });
    } catch (error) {
      console.error('사용자 목록 로딩 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (userId, status) => {
    try {
      await updateUserStatus(userId, status);
      await loadUsers();
    } catch (error) {
      console.error('사용자 상태 업데이트 실패:', error);
    }
  };

  const handleExport = async () => {
    try {
      await exportUserData(filters);
    } catch (error) {
      console.error('사용자 데이터 내보내기 실패:', error);
    }
  };

  return (
    <div className="admin-users">
      <div className="page-header">
        <h1>사용자 관리</h1>
        <button onClick={handleExport} className="export-button">
          <i className="material-icons">download</i>
          엑셀 내보내기
        </button>
      </div>

      <UserSearch
        filters={filters}
        onSearch={setFilters}
      />

      {loading ? (
        <div className="loading">로딩 중...</div>
      ) : (
        <div className="users-table-container">
          <table className="users-table">
            <thead>
              <tr>
                <th>이름</th>
                <th>학번</th>
                <th>이메일</th>
                <th>연락처</th>
                <th>가입일</th>
                <th>상태</th>
                <th>최근 예약</th>
                <th>작업</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.studentId}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{new Date(user.registeredAt).toLocaleDateString()}</td>
                  <td>
                    <span className={`status-badge ${user.status}`}>
                      {user.status === 'active' ? '활성' : '비활성'}
                    </span>
                  </td>
                  <td>
                    {user.lastReservation ? 
                      new Date(user.lastReservation).toLocaleDateString() : 
                      '-'
                    }
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="view-button"
                        onClick={() => setSelectedUser(user)}
                      >
                        <i className="material-icons">visibility</i>
                      </button>
                      <button
                        className={`status-button ${user.status === 'active' ? 'danger' : 'success'}`}
                        onClick={() => handleStatusUpdate(
                          user.id, 
                          user.status === 'active' ? 'inactive' : 'active'
                        )}
                      >
                        <i className="material-icons">
                          {user.status === 'active' ? 'block' : 'check_circle'}
                        </i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={(page) => setPagination({...pagination, currentPage: page})}
          />
        </div>
      )}

      {selectedUser && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>사용자 상세 정보</h2>
              <button 
                className="close-button"
                onClick={() => setSelectedUser(null)}
              >
                <i className="material-icons">close</i>
              </button>
            </div>

            <div className="user-details">
              <div className="detail-row">
                <label>이름:</label>
                <span>{selectedUser.name}</span>
              </div>
              <div className="detail-row">
                <label>학번:</label>
                <span>{selectedUser.studentId}</span>
              </div>
              <div className="detail-row">
                <label>이메일:</label>
                <span>{selectedUser.email}</span>
              </div>
              <div className="detail-row">
                <label>연락처:</label>
                <span>{selectedUser.phone}</span>
              </div>
              <div className="detail-row">
                <label>가입일:</label>
                <span>{new Date(selectedUser.registeredAt).toLocaleDateString()}</span>
              </div>
              <div className="detail-row">
                <label>로그인 방식:</label>
                <span>{selectedUser.loginType}</span>
              </div>
              <div className="detail-row">
                <label>총 예약 횟수:</label>
                <span>{selectedUser.totalReservations}</span>
              </div>
            </div>

            <div className="recent-reservations">
              <h3>최근 예약 내역</h3>
              {selectedUser.recentReservations?.length > 0 ? (
                <ul>
                  {selectedUser.recentReservations.map(reservation => (
                    <li key={reservation.id}>
                      {new Date(reservation.date).toLocaleDateString()} - 
                      {reservation.seatInfo}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>최근 예약 내역이 없습니다.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 
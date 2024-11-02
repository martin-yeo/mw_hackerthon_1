import React, { useState, useEffect } from 'react';
import { api } from '../../api/client';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { Modal } from '../common/Modal';
import { Loading } from '../common/Loading';
import { useToast } from '../../hooks/useToast';

export const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    role: '',
    status: ''
  });
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { showToast } = useToast();

  const fetchUsers = async () => {
    try {
      const queryParams = new URLSearchParams();
      if (filters.search) queryParams.append('search', filters.search);
      if (filters.role) queryParams.append('role', filters.role);
      if (filters.status) queryParams.append('status', filters.status);

      const response = await api.get(`/admin/users?${queryParams.toString()}`);
      setUsers(response.data);
    } catch (error) {
      showToast({
        type: 'error',
        message: '사용자 목록을 불러오는데 실패했습니다.'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleStatusChange = async (userId, newStatus) => {
    try {
      await api.put(`/admin/users/${userId}/status`, { status: newStatus });
      showToast({
        type: 'success',
        message: '사용자 상태가 변경되었습니다.'
      });
      fetchUsers();
    } catch (error) {
      showToast({
        type: 'error',
        message: '상태 변경에 실패했습니다.'
      });
    }
  };

  const handleDeleteUser = async () => {
    if (!selectedUser) return;

    try {
      await api.delete(`/admin/users/${selectedUser.id}`);
      showToast({
        type: 'success',
        message: '사용자가 삭제되었습니다.'
      });
      setShowDeleteModal(false);
      setSelectedUser(null);
      fetchUsers();
    } catch (error) {
      showToast({
        type: 'error',
        message: '사용자 삭제에 실패했습니다.'
      });
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="user-management">
      <h1>사용자 관리</h1>

      <div className="filters">
        <Input
          name="search"
          value={filters.search}
          onChange={handleFilterChange}
          placeholder="이름, 학번, 이메일 검색..."
          icon="search"
        />

        <select
          name="role"
          value={filters.role}
          onChange={handleFilterChange}
        >
          <option value="">전체 역할</option>
          <option value="admin">관리자</option>
          <option value="user">일반 사용자</option>
        </select>

        <select
          name="status"
          value={filters.status}
          onChange={handleFilterChange}
        >
          <option value="">전체 상태</option>
          <option value="active">활성</option>
          <option value="inactive">비활성</option>
          <option value="suspended">정지</option>
        </select>
      </div>

      <div className="users-table">
        <table>
          <thead>
            <tr>
              <th>이름</th>
              <th>학번</th>
              <th>이메일</th>
              <th>역할</th>
              <th>상태</th>
              <th>가입일</th>
              <th>작업</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.studentId}</td>
                <td>{user.email}</td>
                <td>
                  <span className={`role-badge ${user.role}`}>
                    {user.role === 'admin' ? '관리자' : '사용자'}
                  </span>
                </td>
                <td>
                  <select
                    value={user.status}
                    onChange={(e) => handleStatusChange(user.id, e.target.value)}
                    className={`status-select ${user.status}`}
                  >
                    <option value="active">활성</option>
                    <option value="inactive">비활성</option>
                    <option value="suspended">정지</option>
                  </select>
                </td>
                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                <td>
                  <div className="action-buttons">
                    <Button
                      variant="text"
                      size="small"
                      onClick={() => {
                        setSelectedUser(user);
                        setShowUserModal(true);
                      }}
                    >
                      상세
                    </Button>
                    <Button
                      variant="error"
                      size="small"
                      onClick={() => {
                        setSelectedUser(user);
                        setShowDeleteModal(true);
                      }}
                    >
                      삭제
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 사용자 상세 모달 */}
      <Modal
        isOpen={showUserModal}
        onClose={() => {
          setShowUserModal(false);
          setSelectedUser(null);
        }}
        title="사용자 상세 정보"
      >
        {selectedUser && (
          <div className="user-details">
            <p><strong>이름:</strong> {selectedUser.name}</p>
            <p><strong>학번:</strong> {selectedUser.studentId}</p>
            <p><strong>이메일:</strong> {selectedUser.email}</p>
            <p><strong>연락처:</strong> {selectedUser.phone}</p>
            <p><strong>가입일:</strong> {new Date(selectedUser.createdAt).toLocaleString()}</p>
            <p><strong>최근 로그인:</strong> {new Date(selectedUser.lastLogin).toLocaleString()}</p>
            <p><strong>예약 횟수:</strong> {selectedUser.reservationCount}</p>
          </div>
        )}
      </Modal>

      {/* 삭제 확인 모달 */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedUser(null);
        }}
        title="사용자 삭제"
        footer={
          <>
            <Button
              variant="text"
              onClick={() => {
                setShowDeleteModal(false);
                setSelectedUser(null);
              }}
            >
              취소
            </Button>
            <Button
              variant="error"
              onClick={handleDeleteUser}
            >
              삭제
            </Button>
          </>
        }
      >
        <p>정말로 이 사용자를 삭제하시겠습니까?</p>
        {selectedUser && (
          <div className="delete-user-info">
            <p>이름: {selectedUser.name}</p>
            <p>학번: {selectedUser.studentId}</p>
            <p>이메일: {selectedUser.email}</p>
          </div>
        )}
        <p className="warning">
          ⚠️ 이 작업은 되돌릴 수 없으며, 사용자의 모든 데이터가 삭제됩니다.
        </p>
      </Modal>

      <style jsx>{`
        .user-management {
          padding: 2rem;
        }

        h1 {
          margin-bottom: 2rem;
          color: var(--text-primary);
        }

        .filters {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        select {
          padding: 0.5rem;
          border: 1px solid var(--border-color);
          border-radius: 4px;
          background-color: white;
        }

        .users-table {
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
          color: var(--text-primary);
        }

        .role-badge {
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-size: 0.875rem;
        }

        .role-badge.admin {
          background-color: var(--burgundy-red);
          color: white;
        }

        .role-badge.user {
          background-color: var(--burgundy-gray);
          color: white;
        }

        .status-select {
          padding: 0.25rem;
          border-radius: 4px;
          border: 1px solid var(--border-color);
        }

        .status-select.active {
          color: var(--success);
          border-color: var(--success);
        }

        .status-select.inactive {
          color: var(--warning);
          border-color: var(--warning);
        }

        .status-select.suspended {
          color: var(--error);
          border-color: var(--error);
        }

        .action-buttons {
          display: flex;
          gap: 0.5rem;
        }

        .user-details {
          display: grid;
          gap: 0.5rem;
        }

        .delete-user-info {
          background: var(--background-paper);
          padding: 1rem;
          border-radius: 4px;
          margin: 1rem 0;
        }

        .warning {
          color: var(--error);
          margin-top: 1rem;
        }

        @media (max-width: 1024px) {
          .filters {
            flex-direction: column;
          }
        }

        @media (max-width: 768px) {
          .user-management {
            padding: 1rem;
          }

          th, td {
            padding: 0.75rem 0.5rem;
          }

          .action-buttons {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
}; 
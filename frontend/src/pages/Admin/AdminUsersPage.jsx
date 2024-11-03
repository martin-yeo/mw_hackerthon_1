import React, { useState, useEffect } from 'react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Loading } from '../../components/common/Loading';
import { AlertModal } from '../../components/notification/AlertModal';
import { useAdmin } from '../../hooks/useAdmin';
import { formatDate } from '../../utils/dateUtils';

const ITEMS_PER_PAGE = 10;

export const AdminUsersPage = () => {
  const { getUsers, updateUserStatus, deleteUser } = useAdmin();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    role: ''
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0
  });

  useEffect(() => {
    loadUsers();
  }, [filters, pagination.currentPage]);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const response = await getUsers({
        ...filters,
        page: pagination.currentPage,
        limit: ITEMS_PER_PAGE
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

  const handleStatusUpdate = async (userId, status) => {
    try {
      await updateUserStatus(userId, status);
      await loadUsers();
    } catch (error) {
      console.error('사용자 상태 업데이트 실패:', error);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!selectedUser) return;

    try {
      await deleteUser(selectedUser.id);
      await loadUsers();
      setShowDeleteModal(false);
      setSelectedUser(null);
    } catch (error) {
      console.error('사용자 삭제 실패:', error);
    }
  };

  const handlePageChange = (page) => {
    setPagination(prev => ({
      ...prev,
      currentPage: page
    }));
  };

  if (loading && !users.length) {
    return <Loading />;
  }

  return (
    <div className="admin-users-page">
      <Card className="filters-card">
        <div className="filters">
          <div className="search-box">
            <Input
              type="text"
              name="search"
              value={filters.search}
              onChange={handleFilterChange}
              placeholder="이름, 학번, 이메일로 검색..."
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
              <option value="active">활성</option>
              <option value="inactive">비활성</option>
              <option value="suspended">정지</option>
            </select>
          </div>

          <div className="filter-group">
            <select
              name="role"
              value={filters.role}
              onChange={handleFilterChange}
            >
              <option value="">전체 역할</option>
              <option value="user">일반 사용자</option>
              <option value="admin">관리자</option>
            </select>
          </div>
        </div>
      </Card>

      <Card className="users-card">
        <div className="users-header">
          <h2>사용자 목록</h2>
          <span className="total-count">
            총 {pagination.totalItems}명
          </span>
        </div>

        <div className="users-table">
          <table>
            <thead>
              <tr>
                <th>이름</th>
                <th>학번</th>
                <th>이메일</th>
                <th>가입일</th>
                <th>상태</th>
                <th>역할</th>
                <th>작업</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.studentId}</td>
                  <td>{user.email}</td>
                  <td>{formatDate(new Date(user.createdAt))}</td>
                  <td>
                    <span className={`status-badge ${user.status}`}>
                      {user.status}
                    </span>
                  </td>
                  <td>
                    <span className={`role-badge ${user.role}`}>
                      {user.role}
                    </span>
                  </td>
                  <td>
                    <div className="actions">
                      {user.status === 'active' ? (
                        <Button
                          variant="warning"
                          size="small"
                          onClick={() => handleStatusUpdate(user.id, 'suspended')}
                        >
                          정지
                        </Button>
                      ) : (
                        <Button
                          variant="success"
                          size="small"
                          onClick={() => handleStatusUpdate(user.id, 'active')}
                        >
                          활성화
                        </Button>
                      )}
                      <Button
                        variant="danger"
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
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedUser(null);
        }}
        title="사용자 삭제"
        message={`정말로 ${selectedUser?.name} 사용자를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.`}
        type="danger"
        confirmText="삭제"
        onConfirm={handleDeleteConfirm}
      />

      <style jsx>{`
        .admin-users-page {
          padding: 2rem;
          min-height: calc(100vh - var(--header-height));
          background-color: var(--background);
        }

        .filters {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          gap: 1rem;
          align-items: center;
        }

        .users-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .users-header h2 {
          margin: 0;
        }

        .total-count {
          color: var(--text-secondary);
        }

        .users-table {
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

        .status-badge,
        .role-badge {
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-size: 0.875rem;
          text-transform: uppercase;
        }

        .status-badge.active {
          background-color: var(--success-light);
          color: var(--success);
        }

        .status-badge.inactive {
          background-color: var(--gray-light);
          color: var(--text-secondary);
        }

        .status-badge.suspended {
          background-color: var(--error-light);
          color: var(--error);
        }

        .role-badge.admin {
          background-color: var(--burgundy-light);
          color: var(--burgundy-red);
        }

        .role-badge.user {
          background-color: var(--info-light);
          color: var(--info);
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

        @media (max-width: 1200px) {
          .filters {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 768px) {
          .admin-users-page {
            padding: 1rem;
          }

          .filters {
            grid-template-columns: 1fr;
          }

          th, td {
            padding: 0.75rem;
          }

          .actions {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
}; 
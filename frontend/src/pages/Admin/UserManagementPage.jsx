import React, { useState, useEffect } from 'react';
import { useAdmin } from '../../hooks/useAdmin';
import { useToast } from '../../hooks/useToast';
import { Modal } from '../../components/common/Modal';
import { Confirm } from '../../components/common/Confirm';
import { Pagination } from '../../components/common/Pagination';
import { Loading } from '../../components/common/Loading';
import { formatDate } from '../../utils/dateUtils';

export const UserManagementPage = () => {
  const { getUsers, updateUserStatus, deleteUser } = useAdmin();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    role: '',
    sortBy: 'createdAt',
    sortOrder: 'desc'
  });

  useEffect(() => {
    fetchUsers();
  }, [page, filters]);

  const fetchUsers = async () => {
    try {
      const response = await getUsers({
        page,
        limit: 10,
        ...filters
      });
      setUsers(response.data);
      setTotalPages(response.totalPages);
    } catch (error) {
      showToast({
        type: 'error',
        message: '사용자 목록을 불러오는데 실패했습니다.'
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

  const handleStatusChange = async (userId, newStatus) => {
    try {
      await updateUserStatus(userId, newStatus);
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
    try {
      await deleteUser(selectedUser.id);
      showToast({
        type: 'success',
        message: '사용자가 삭제되었습니다.'
      });
      setShowDeleteConfirm(false);
      fetchUsers();
    } catch (error) {
      showToast({
        type: 'error',
        message: '사용자 삭제에 실패했습니다.'
      });
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="user-management-container">
      <div className="page-header">
        <h1>사용자 관리</h1>
        <div className="header-actions">
          <div className="search-box">
            <input
              type="text"
              name="search"
              value={filters.search}
              onChange={handleFilterChange}
              placeholder="이름, 이메일, 학번 검색..."
            />
            <i className="material-icons">search</i>
          </div>
        </div>
      </div>

      <div className="filters">
        <div className="filter-group">
          <select
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
          >
            <option value="">모든 상태</option>
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
            <option value="">모든 역할</option>
            <option value="admin">관리자</option>
            <option value="user">일반 사용자</option>
          </select>
        </div>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th onClick={() => handleSort('name')}>
                이름
                {filters.sortBy === 'name' && (
                  <i className="material-icons">
                    {filters.sortOrder === 'asc' ? 'arrow_upward' : 'arrow_downward'}
                  </i>
                )}
              </th>
              <th onClick={() => handleSort('email')}>이메일</th>
              <th onClick={() => handleSort('studentId')}>학번</th>
              <th onClick={() => handleSort('status')}>상태</th>
              <th onClick={() => handleSort('role')}>역할</th>
              <th onClick={() => handleSort('createdAt')}>가입일</th>
              <th onClick={() => handleSort('lastLogin')}>최근 로그인</th>
              <th>작업</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.studentId}</td>
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
                <td>
                  <span className={`role-badge ${user.role}`}>
                    {user.role === 'admin' ? '관리자' : '사용자'}
                  </span>
                </td>
                <td>{formatDate(user.createdAt)}</td>
                <td>{formatDate(user.lastLogin)}</td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="button icon"
                      onClick={() => {
                        setSelectedUser(user);
                        setShowUserModal(true);
                      }}
                    >
                      <i className="material-icons">edit</i>
                    </button>
                    <button
                      className="button icon danger"
                      onClick={() => {
                        setSelectedUser(user);
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

      {showUserModal && selectedUser && (
        <Modal
          isOpen={showUserModal}
          onClose={() => setShowUserModal(false)}
          title="사용자 정보 수정"
        >
          {/* 사용자 수정 폼 컴포넌트 */}
        </Modal>
      )}

      <Confirm
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDeleteUser}
        title="사용자 삭제"
        message={`정말 ${selectedUser?.name} 사용자를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.`}
        confirmText="삭제"
        type="danger"
      />
    </div>
  );
}; 
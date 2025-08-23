import React, { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import adminUserService from '../services/adminUserService';
import UserTable from '../components/UserTable';
import UserEditDialog from '../components/UserEditDialog';
import ConfirmDeleteDialog from '../components/ConfirmDeleteDialog';
import UserCreateDialog from '../components/UserCreateDialog';

const Styles = () => (
  <style>{`
    body { background-color: #111827; font-family: sans-serif; color: #fff; }
    .admin-container { max-width: 1200px; margin: 40px auto; padding: 2rem; }
    .admin-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
    .admin-header h1 { font-size: 2.5rem; font-weight: 700; margin: 0; }
    .btn { padding: 0.6rem 1.2rem; border-radius: 8px; border: none; cursor: pointer; font-weight: 600; transition: background-color 0.2s; font-size: 0.9rem; }
    .btn-primary { background-color: #3b82f6; color: #fff; }
    .btn-primary:hover { background-color: #2563eb; }
    .loading-state, .error-state { text-align: center; margin-top: 4rem; font-size: 1.2rem; color: #9ca3af; }
    .error-state { color: #ef4444; }
    .table-wrapper { background: #1f2937; border-radius: 12px; padding: 1.5rem; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1); overflow-x: auto; }
    .user-table { width: 100%; border-collapse: collapse; text-align: left; }
    .user-table th { padding: 1rem 1.5rem; font-size: 0.9rem; text-transform: uppercase; color: #9ca3af; border-bottom: 2px solid #374151; }
    .user-table td { padding: 1rem 1.5rem; border-bottom: 1px solid #374151; }
    .user-table tbody tr:last-child td { border-bottom: none; }
    .role-badge { padding: 0.3rem 0.8rem; border-radius: 20px; font-size: 0.8rem; font-weight: 600; text-transform: capitalize; }
    .role-admin { background-color: #ef4444; color: #fff; }
    .role-employee { background-color: #3b82f6; color: #fff; }
    .role-citizen { background-color: #22c55e; color: #fff; }
    .action-btn { background: none; border: none; cursor: pointer; padding: 0.5rem; margin-right: 0.5rem; color: #9ca3af; transition: color 0.2s; }
    .action-btn:hover { color: #fff; }
    .edit-btn:hover { color: #3b82f6; }
    .delete-btn:hover { color: #ef4444; }
  `}</style>
);

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modals
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [deletingUser, setDeletingUser] = useState(null);

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await adminUserService.getAllUsers();
      setUsers(response.data || []);
    } catch (err) {
      console.error('Failed to fetch users', err);
      setError('Failed to fetch users.');
      toast.error('Failed to fetch users.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchUsers(); }, [fetchUsers]);

  // Create
  const handleCreateUser = async (userData) => {
    try {
      await adminUserService.createUser(userData);
      setIsCreateOpen(false);
      toast.success('User created! A notification email has been sent.');
      fetchUsers();
    } catch (err) {
      console.error('Failed to create user', err);
      toast.error(err?.response?.data?.message || 'Failed to create user.');
    }
  };

  // Update
  const handleSaveUser = async (id, userData) => {
    try {
      await adminUserService.updateUser(id, userData);
      setEditingUser(null);
      toast.success('User updated! A notification email has been sent.');
      fetchUsers();
    } catch (err) {
      console.error('Failed to update user', err);
      toast.error(err?.response?.data?.message || 'Failed to update user.');
    }
  };

  // Delete
  const handleConfirmDelete = async (id) => {
    try {
      await adminUserService.deleteUser(id);
      setDeletingUser(null);
      toast.success('User deleted! A notification email has been sent.');
      fetchUsers();
    } catch (err) {
      console.error('Failed to delete user', err);
      toast.error(err?.response?.data?.message || 'Failed to delete user.');
    }
  };

  return (
    <>
      <Styles />
      <div className="admin-container">
        <div className="admin-header">
          <h1>User Management</h1>
          <button className="btn btn-primary" onClick={() => setIsCreateOpen(true)}>
            Create New User
          </button>
        </div>

        {loading && <div className="loading-state">Loading users...</div>}
        {error && <div className="error-state">{error}</div>}
        {!loading && !error && (
          <UserTable
            users={users}
            onEdit={(user) => setEditingUser(user)}
            onDelete={(user) => setDeletingUser(user)}
          />
        )}
      </div>

      {/* Modals */}
      <UserCreateDialog
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onSave={handleCreateUser}
      />
      <UserEditDialog
        user={editingUser}
        onClose={() => setEditingUser(null)}
        onSave={handleSaveUser}
      />
      <ConfirmDeleteDialog
        user={deletingUser}
        onClose={() => setDeletingUser(null)}
        onConfirm={() => deletingUser && handleConfirmDelete(deletingUser.id)}
      />
    </>
  );
};

export default AdminUsersPage;

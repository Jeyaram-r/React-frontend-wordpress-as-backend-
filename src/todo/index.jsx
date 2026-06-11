import { useState, useEffect } from "react";
import { getUsers, createUser, editUser, deleteUser } from "../api/api";
import "./style.css";
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .app-root {
    min-height: 100vh;
    background: #0F172A;
    font-family: 'Inter', sans-serif;
    padding: 48px 16px;
    color: #F8FAFC;
  }

  .container {
    max-width: 560px;
    margin: 0 auto;
  }

  /* Header */
  .header {
    margin-bottom: 40px;
    text-align: center;
  }
  .header-eyebrow {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: #6366F1;
    margin-bottom: 8px;
  }
  .header-title {
    font-size: 28px;
    font-weight: 700;
    color: #F8FAFC;
    letter-spacing: -0.02em;
  }
  .header-sub {
    font-size: 14px;
    color: #64748B;
    margin-top: 6px;
  }

  /* Create card */
  .create-card {
    background: #1E293B;
    border: 1px solid #334155;
    border-radius: 16px;
    padding: 24px;
    margin-bottom: 32px;
    box-shadow: 0 4px 24px rgba(0,0,0,0.3);
  }
  .create-card-label {
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #94A3B8;
    margin-bottom: 12px;
  }
  .input-row {
    display: flex;
    gap: 10px;
  }
  .name-input {
    flex: 1;
    background: #0F172A;
    border: 1.5px solid #334155;
    border-radius: 10px;
    padding: 11px 16px;
    font-size: 14px;
    font-family: 'Inter', sans-serif;
    color: #F8FAFC;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .name-input::placeholder { color: #475569; }
  .name-input:focus {
    border-color: #6366F1;
    box-shadow: 0 0 0 3px rgba(99,102,241,0.15);
  }
  .btn-create {
    background: #6366F1;
    color: #fff;
    border: none;
    border-radius: 10px;
    padding: 11px 20px;
    font-size: 14px;
    font-weight: 600;
    font-family: 'Inter', sans-serif;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 6px;
    transition: background 0.2s, transform 0.1s, box-shadow 0.2s;
    white-space: nowrap;
  }
  .btn-create:hover { background: #4F46E5; box-shadow: 0 4px 16px rgba(99,102,241,0.4); }
  .btn-create:active { transform: scale(0.97); }
  .btn-create:disabled { background: #334155; color: #64748B; cursor: not-allowed; box-shadow: none; }

  /* User list */
  .list-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 14px;
  }
  .list-title {
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #94A3B8;
  }
  .list-count {
    background: #1E293B;
    border: 1px solid #334155;
    border-radius: 20px;
    padding: 2px 10px;
    font-size: 12px;
    font-weight: 600;
    color: #6366F1;
  }

  /* User card */
  .user-card {
    background: #1E293B;
    border: 1px solid #334155;
    border-left: 3px solid #6366F1;
    border-radius: 12px;
    padding: 16px 18px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    gap: 14px;
    transition: border-color 0.2s, box-shadow 0.2s, transform 0.15s;
    animation: slideIn 0.25s ease;
  }
  @keyframes slideIn {
    from { opacity: 0; transform: translateY(-8px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .user-card:hover {
    border-left-color: #818CF8;
    box-shadow: 0 4px 20px rgba(99,102,241,0.12);
    transform: translateX(2px);
  }

  .user-avatar {
    width: 38px;
    height: 38px;
    border-radius: 10px;
    background: linear-gradient(135deg, #6366F1, #8B5CF6);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 15px;
    font-weight: 700;
    color: #fff;
    flex-shrink: 0;
    letter-spacing: -0.02em;
  }

  .user-info {
    flex: 1;
    min-width: 0;
  }
  .user-name {
    font-size: 15px;
    font-weight: 600;
    color: #F1F5F9;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .user-id {
    font-size: 11px;
    color: #475569;
    font-family: 'Courier New', monospace;
    margin-top: 2px;
  }

  .user-actions {
    display: flex;
    gap: 8px;
    flex-shrink: 0;
  }

  .btn-icon {
    width: 34px;
    height: 34px;
    border-radius: 8px;
    border: 1px solid;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.15s, transform 0.1s;
    font-size: 14px;
  }
  .btn-icon:active { transform: scale(0.9); }

  .btn-edit {
    background: rgba(99,102,241,0.1);
    border-color: rgba(99,102,241,0.3);
    color: #818CF8;
  }
  .btn-edit:hover { background: rgba(99,102,241,0.2); border-color: #6366F1; }

  .btn-delete {
    background: rgba(239,68,68,0.08);
    border-color: rgba(239,68,68,0.25);
    color: #F87171;
  }
  .btn-delete:hover { background: rgba(239,68,68,0.18); border-color: #EF4444; }

  /* Empty state */
  .empty-state {
    text-align: center;
    padding: 48px 24px;
    background: #1E293B;
    border: 1px dashed #334155;
    border-radius: 16px;
  }
  .empty-icon { font-size: 36px; margin-bottom: 12px; opacity: 0.5; }
  .empty-text { font-size: 14px; color: #64748B; }

  /* Modal overlay */
  .modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.6);
    backdrop-filter: blur(4px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 16px;
    animation: fadeIn 0.15s ease;
  }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

  .modal {
    background: #1E293B;
    border: 1px solid #334155;
    border-radius: 18px;
    padding: 28px;
    width: 100%;
    max-width: 380px;
    box-shadow: 0 20px 60px rgba(0,0,0,0.5);
    animation: scaleIn 0.2s ease;
  }
  @keyframes scaleIn { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }

  .modal-title {
    font-size: 17px;
    font-weight: 700;
    color: #F8FAFC;
    margin-bottom: 6px;
  }
  .modal-sub {
    font-size: 13px;
    color: #64748B;
    margin-bottom: 20px;
  }
  .modal-input {
    width: 100%;
    background: #0F172A;
    border: 1.5px solid #334155;
    border-radius: 10px;
    padding: 11px 16px;
    font-size: 14px;
    font-family: 'Inter', sans-serif;
    color: #F8FAFC;
    outline: none;
    margin-bottom: 20px;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .modal-input:focus {
    border-color: #6366F1;
    box-shadow: 0 0 0 3px rgba(99,102,241,0.15);
  }
  .modal-actions {
    display: flex;
    gap: 10px;
  }
  .btn-cancel {
    flex: 1;
    background: transparent;
    border: 1.5px solid #334155;
    border-radius: 10px;
    padding: 10px;
    font-size: 14px;
    font-weight: 500;
    font-family: 'Inter', sans-serif;
    color: #94A3B8;
    cursor: pointer;
    transition: background 0.15s, border-color 0.15s;
  }
  .btn-cancel:hover { background: #0F172A; border-color: #475569; }
  .btn-save {
    flex: 1;
    background: #6366F1;
    border: none;
    border-radius: 10px;
    padding: 10px;
    font-size: 14px;
    font-weight: 600;
    font-family: 'Inter', sans-serif;
    color: #fff;
    cursor: pointer;
    transition: background 0.15s, box-shadow 0.2s;
  }
  .btn-save:hover { background: #4F46E5; box-shadow: 0 4px 16px rgba(99,102,241,0.4); }

  /* Confirm modal */
  .confirm-icon {
    width: 48px;
    height: 48px;
    border-radius: 14px;
    background: rgba(239,68,68,0.12);
    border: 1px solid rgba(239,68,68,0.25);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
    margin-bottom: 16px;
  }
  .btn-danger {
    flex: 1;
    background: #EF4444;
    border: none;
    border-radius: 10px;
    padding: 10px;
    font-size: 14px;
    font-weight: 600;
    font-family: 'Inter', sans-serif;
    color: #fff;
    cursor: pointer;
    transition: background 0.15s;
  }
  .btn-danger:hover { background: #DC2626; }
`;

function EditModal({ user, onSave, onClose }) {
  const [value, setValue] = useState(user.name);
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-title">Rename user</div>
        <div className="modal-sub">Update the display name for ID #{user.id}</div>
        <input
          className="modal-input"
          autoFocus
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter") onSave(value); if (e.key === "Escape") onClose(); }}
          placeholder="Enter new name"
        />
        <div className="modal-actions">
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
          <button className="btn-save" onClick={() => onSave(value)} disabled={!value.trim()}>Save</button>
        </div>
      </div>
    </div>
  );
}

function ConfirmModal({ user, onConfirm, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="confirm-icon">🗑️</div>
        <div className="modal-title">Remove user?</div>
        <div className="modal-sub">
          <strong style={{ color: "#F1F5F9" }}>{user.name}</strong> will be permanently deleted. This can't be undone.
        </div>
        <div className="modal-actions" style={{ marginTop: 20 }}>
          <button className="btn-cancel" onClick={onClose}>Keep</button>
          <button className="btn-danger" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
}

function getInitials(name) {
  return name
    .split(" ")
    .map(w => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function Todo() {
  const [name, setName] = useState("");
  const [users, setUsers] = useState([]);
  const [editTarget, setEditTarget] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleSubmit = async () => {
    if (!name.trim()) return;
    try {
      await createUser({ name });
      setName("");
      fetchUsers();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditSave = async (newName) => {
    if (!newName.trim()) return;
    try {
      await editUser(editTarget.id, { name: newName });
      setEditTarget(null);
      fetchUsers();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteUser(deleteTarget.id);
      setDeleteTarget(null);
      fetchUsers();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="app-root">
        <div className="container">
          {/* Header */}
          <div className="header">
            <div className="header-eyebrow">User Manager</div>
            <h1 className="header-title">People</h1>
            <p className="header-sub">Add and manage your users in one place.</p>
          </div>

          {/* Create card */}
          <div className="create-card">
            <div className="create-card-label">Add new user</div>
            <div className="input-row">
              <input
                className="name-input"
                type="text"
                placeholder="Full name…"
                value={name}
                onChange={e => setName(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleSubmit()}
              />
              <button
                className="btn-create"
                onClick={handleSubmit}
                disabled={!name.trim()}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                Add
              </button>
            </div>
          </div>

          {/* User list */}
          <div className="list-header">
            <span className="list-title">All users</span>
            <span className="list-count">{users.length}</span>
          </div>

          {users.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">👤</div>
              <div className="empty-text">No users yet. Add one above to get started.</div>
            </div>
          ) : (
            users.map(user => (
              <div className="user-card" key={user.id}>
                <div className="user-avatar">{getInitials(user.name)}</div>
                <div className="user-info">
                  <div className="user-name">{user.name}</div>
                  <div className="user-id">uid#{String(user.id).padStart(4, "0")}</div>
                </div>
                <div className="user-actions">
                  <button
                    className="btn-icon btn-edit"
                    title="Edit user"
                    onClick={() => setEditTarget(user)}
                  >
                    ✏️
                  </button>
                  <button
                    className="btn-icon btn-delete"
                    title="Delete user"
                    onClick={() => setDeleteTarget(user)}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Edit modal */}
      {editTarget && (
        <EditModal
          user={editTarget}
          onSave={handleEditSave}
          onClose={() => setEditTarget(null)}
        />
      )}

      {/* Delete confirm modal */}
      {deleteTarget && (
        <ConfirmModal
          user={deleteTarget}
          onConfirm={handleDeleteConfirm}
          onClose={() => setDeleteTarget(null)}
        />
      )}
    </>
  );
}
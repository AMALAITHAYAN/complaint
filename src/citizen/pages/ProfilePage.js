// src/pages/citizen/ProfilePage.jsx
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Styles = () => (
  <style>{`
    .wrap { max-width: 920px; }
    .profile-card { background:#1f2937; padding:2rem; border-radius:12px; margin-bottom:2rem; }
    .profile-header h1 { margin-top:0; font-size:2.5rem; font-weight:700; }
    .pill { background:#0b1220; color:#9ca3af; border:1px solid #374151; border-radius:999px; padding:.25rem .75rem; font-size:.85rem; display:inline-block; margin:.25rem 0 1rem; }
    .btn { background:#3b82f6; color:#fff; border:none; border-radius:8px; padding:.55rem 1rem; cursor:pointer; }
    .btn.secondary { background:#111827; border:1px solid #374151; color:#d1d5db; }
    .btn.danger { background:#ef4444; }
    .btn:disabled { background:#555; cursor:not-allowed; }
    .grid { display:grid; grid-template-columns: 1fr 1fr; gap:1rem; }
    .full { grid-column: 1 / -1; }
    .field label { display:block; color:#9ca3af; margin-bottom:.35rem; font-size:.95rem; }
    .input, .select, .textarea {
      width:100%; padding:.7rem .9rem; border-radius:10px; border:1px solid #374151;
      background:#0f172a; color:#e5e7eb; outline:none;
    }
    .muted { color:#9ca3af; }
    .err { color:#f87171; margin:.5rem 0 0; }
    .row { display:flex; gap:.75rem; align-items:center; flex-wrap:wrap; }
    .avatar { width:72px; height:72px; border-radius:999px; background:#111827; border:1px solid #374151;
      display:flex; align-items:center; justify-content:center; font-weight:700; font-size:1.25rem; color:#e5e7eb; }
    .kpi { background:#111827; border:1px solid #374151; border-radius:12px; padding:1rem; }
    .kpi h4 { margin:0 0 .35rem; font-size:1rem; color:#9ca3af; font-weight:600; }
    .kpi p { margin:0; font-size:1.25rem; color:#e5e7eb; font-weight:700; }
  `}</style>
);

/** Pull once; we’ll allow edits and persist back to localStorage. */
function useStoredIdentity() {
  return useMemo(() => {
    const username =
      localStorage.getItem('username') ||
      sessionStorage.getItem('username') ||
      'citizen1';

    const name =
      localStorage.getItem('submittedBy') ||
      localStorage.getItem('displayName') ||
      'Citizen One';

    const email =
      localStorage.getItem('submitterEmail') ||
      localStorage.getItem('email') ||
      'citizen1@example.com';

    const role =
      localStorage.getItem('role') || 'ROLE_CITIZEN';

    const createdAt =
      localStorage.getItem('createdAt') ||
      new Date().toISOString(); // set on first save if not present

    return { username, name, email, role, createdAt };
  }, []);
}

function initials(name) {
  return (name || '')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(s => s[0].toUpperCase())
    .join('') || 'U';
}

const ProfilePage = () => {
  const navigate = useNavigate();
  const bootstrap = useStoredIdentity();

  const [form, setForm] = useState(bootstrap);
  const [loading, setLoading] = useState(false);
  const [savedMsg, setSavedMsg] = useState('');
  const [error, setError] = useState('');

  // KPIs are static placeholders you can later wire to real data
  const [kpis] = useState({
    totalComplaints: Number(localStorage.getItem('kpi_totalComplaints') || 1),
    openComplaints: Number(localStorage.getItem('kpi_openComplaints') || 1),
    resolvedComplaints: Number(localStorage.getItem('kpi_resolvedComplaints') || 0),
  });

  useEffect(() => {
    // Clear “saved” message after a moment
    if (!savedMsg) return;
    const t = setTimeout(() => setSavedMsg(''), 1600);
    return () => clearTimeout(t);
  }, [savedMsg]);

  const onChange = (key) => (e) => {
    setForm(f => ({ ...f, [key]: e.target.value }));
  };

  const validate = () => {
    if (!form.username.trim()) return 'Username is required.';
    if (!form.name.trim()) return 'Name is required.';
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) return 'Enter a valid email.';
    return '';
  };

  const save = async () => {
    const err = validate();
    if (err) { setError(err); return; }
    setError('');
    setLoading(true);
    try {
      // Persist locally so other pages (submit/list) stay in sync
      localStorage.setItem('username', form.username.trim());
      localStorage.setItem('submittedBy', form.name.trim());
      localStorage.setItem('displayName', form.name.trim());
      localStorage.setItem('submitterEmail', form.email.trim());
      localStorage.setItem('email', form.email.trim());
      localStorage.setItem('role', form.role);
      if (!localStorage.getItem('createdAt')) {
        localStorage.setItem('createdAt', form.createdAt || new Date().toISOString());
      }
      setSavedMsg('Saved!');
    } finally {
      setLoading(false);
    }
  };

  const clearIdentity = () => {
    [
      'username', 'submittedBy', 'displayName', 'submitterEmail', 'email', 'role', 'createdAt'
    ].forEach(k => localStorage.removeItem(k));
    setForm({
      username: '',
      name: '',
      email: '',
      role: 'ROLE_CITIZEN',
      createdAt: ''
    });
    setSavedMsg('');
    setError('');
  };

  const setDemoCitizen = () => {
    setForm({
      username: 'citizen1',
      name: 'Citizen One',
      email: 'citizen1@example.com',
      role: 'ROLE_CITIZEN',
      createdAt: form.createdAt || new Date().toISOString(),
    });
  };

  const goMyComplaints = () => navigate('/citizen/complaints');

  const fmtDateTime = (v) => {
    if (!v) return '—';
    const d = new Date(v);
    return Number.isNaN(d.getTime()) ? '—' : d.toLocaleString();
  };

  return (
    <>
      <Styles />
      <div className="wrap">
        <div className="profile-header">
          <h1>My Profile</h1>
          <div className="pill">Signed in as: {form.username || 'unknown'}</div>
          <div className="row" style={{ marginBottom: '1rem' }}>
            <button className="btn" onClick={goMyComplaints}>My Complaints</button>
            <button className="btn secondary" onClick={setDemoCitizen}>Use Demo Identity</button>
          </div>
        </div>

        {/* At-a-glance KPIs */}
        <div className="grid" style={{ marginBottom: '1rem' }}>
          <div className="kpi">
            <h4>Total Complaints</h4>
            <p>{kpis.totalComplaints}</p>
          </div>
          <div className="kpi">
            <h4>Open</h4>
            <p>{kpis.openComplaints}</p>
          </div>
          <div className="kpi">
            <h4>Resolved</h4>
            <p>{kpis.resolvedComplaints}</p>
          </div>
        </div>

        <div className="profile-card">
          <div className="row" style={{ marginBottom: '1rem' }}>
            <div className="avatar">{initials(form.name || form.username)}</div>
            <div>
              <div className="muted">Member since</div>
              <div style={{ color:'#e5e7eb', fontWeight:600 }}>{fmtDateTime(form.createdAt)}</div>
            </div>
          </div>

          <div className="grid">
            <div className="field">
              <label>Username *</label>
              <input
                className="input"
                value={form.username}
                onChange={onChange('username')}
                placeholder="e.g., citizen1"
              />
            </div>

            <div className="field">
              <label>Role</label>
              <select className="select" value={form.role} onChange={onChange('role')}>
                <option value="ROLE_CITIZEN">Citizen</option>
                <option value="ROLE_EMPLOYEE">Employee</option>
                <option value="ROLE_ADMIN">Admin</option>
              </select>
            </div>

            <div className="field full">
              <label>Full Name *</label>
              <input
                className="input"
                value={form.name}
                onChange={onChange('name')}
                placeholder="Your full name"
              />
            </div>

            <div className="field full">
              <label>Email *</label>
              <input
                className="input"
                type="email"
                value={form.email}
                onChange={onChange('email')}
                placeholder="name@example.com"
              />
            </div>

            <div className="field full">
              <label>Bio (local only)</label>
              <textarea
                className="textarea"
                rows={3}
                placeholder="Tell us something about you… (saved locally)"
                value={localStorage.getItem('bio') || ''}
                onChange={(e) => localStorage.setItem('bio', e.target.value)}
              />
            </div>
          </div>

          {error && <div className="err">{error}</div>}

          <div className="row" style={{ marginTop:'1rem' }}>
            <button className="btn" onClick={save} disabled={loading}>
              {loading ? 'Saving…' : 'Save Changes'}
            </button>
            <button className="btn danger" onClick={clearIdentity}>Clear Stored Identity</button>
            {savedMsg && <span className="muted"> {savedMsg}</span>}
          </div>
        </div>

       
      </div>
    </>
  );
};

export default ProfilePage;

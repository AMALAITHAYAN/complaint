import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  MessageSquare,
  FileText,
  ListChecks,     // triage
  Gauge,          // workload balancer
  Scale,          // SLA rules
  Map as MapIcon, // map / heatmap
  ThumbsUp,       // feedback
  BarChart3,      // KPIs
  Activity,       // audit log
  UserCog,        // RBAC
} from 'lucide-react';

const Styles = () => (
  <style>{`
    :root { --sidebar-w: 250px; }
    body { margin: 0; background-color: #111827; font-family: ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto; color: #fff; }
    .admin-layout { display: flex; min-height: 100vh; }

    .sidebar {
      width: var(--sidebar-w);
      background-color: #1f2937;
      height: 100vh;
      padding: 1.25rem 1rem;
      position: fixed;
      inset: 0 auto 0 0;
      border-right: 1px solid #374151;
      overflow-y: auto;
    }
    .sidebar-header {
      font-size: 1.9rem;
      font-weight: 800;
      text-align: center;
      margin-bottom: 1.25rem;
      color: #93c5fd;
      letter-spacing: .3px;
    }
    .section-label {
      margin: 1rem 0 .5rem;
      font-size: .85rem;
      letter-spacing: .04em;
      color: #9ca3af;
      text-transform: uppercase;
    }

    .nav { display: flex; flex-direction: column; gap: .4rem; }
    .link {
      display: flex; align-items: center;
      color: #d1d5db; text-decoration: none;
      padding: .75rem .9rem; border-radius: 10px;
      font-weight: 600;
      transition: background .15s ease, color .15s ease, transform .05s ease;
    }
    
    /* --- FIX STARTS HERE --- */
    .link svg {
      margin-right: 10px; /* Space between icon and text */
      flex-shrink: 0;     /* Prevents icon from shrinking */
    }
    .link-text {
      flex-grow: 1;       /* Allows text to take all available space */
    }
    /* --- FIX ENDS HERE --- */
    
    .link:hover { background: #374151; color: #fff; }
    .link.active { background: #3b82f6; color: #fff; }
    .badge {
      margin-left: auto;
      background:#ef4444; color:#fff; font-size:.72rem; font-weight:800;
      padding:.1rem .45rem; border-radius: 999px;
    }

    .main-content {
      margin-left: var(--sidebar-w);
      width: calc(100% - var(--sidebar-w));
      padding: 2rem clamp(1rem, 2.5vw, 2rem);
    }
  `}</style>
);

const linkClass = ({ isActive }) => 'link' + (isActive ? ' active' : '');

const AdminLayout = () => {
  return (
    <>
      <Styles />
      <div className="admin-layout">
        <aside className="sidebar">
          <div className="sidebar-header">Admin Panel</div>

          {/* Core */}
          <div className="section-label">Core</div>
          <nav className="nav">
            <NavLink to="/admin/dashboard" className={linkClass}>
              <LayoutDashboard size={18} />
              <span className="link-text">Dashboard</span>
            </NavLink>
            <NavLink to="/admin/users" className={linkClass}>
              <Users size={18} />
              <span className="link-text">User Management</span>
            </NavLink>
            <NavLink to="/admin/complaints" className={linkClass}>
              <MessageSquare size={18} />
              <span className="link-text">Complaints</span>
            </NavLink>
            <NavLink to="/admin/reports" className={linkClass}>
              <FileText size={18} />
              <span className="link-text">Reports</span>
            </NavLink>
          </nav>

          {/* Operations */}
          <div className="section-label">Operations</div>
          <nav className="nav">
            <NavLink to="/admin/triage" className={linkClass}>
              <ListChecks size={18} />
              <span className="link-text">Triage Queue</span>
              <span className="badge">7</span>
            </NavLink>
            <NavLink to="/admin/workload" className={linkClass}>
              <Gauge size={18} />
              <span className="link-text">Workload & Assignment</span>
            </NavLink>
            <NavLink to="/admin/sla-rules" className={linkClass}>
              <Scale size={18} />
              <span className="link-text">SLA & Escalation Rules</span>
            </NavLink>
          </nav>

          {/* Visibility */}
          <div className="section-label">Visibility</div>
          <nav className="nav">
            <NavLink to="/admin/map" className={linkClass}>
              <MapIcon size={18} />
              <span className="link-text">Live Map / Heatmap</span>
            </NavLink>
            <NavLink to="/admin/feedback" className={linkClass}>
              <ThumbsUp size={18} />
              <span className="link-text">Feedback & Re-open</span>
            </NavLink>
            <NavLink to="/admin/kpis" className={linkClass}>
              <BarChart3 size={18} />
              <span className="link-text">Performance & KPIs</span>
            </NavLink>
            <NavLink to="/admin/audit" className={linkClass}>
              <Activity size={18} />
              <span className="link-text">Audit Log</span>
            </NavLink>
          </nav>

          {/* Security */}
          <div className="section-label">Security</div>
          <nav className="nav">
            <NavLink to="/admin/rbac" className={linkClass}>
              <UserCog size={18} />
              <span className="link-text">Roles & Permissions</span>
            </NavLink>
          </nav>
        </aside>

        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default AdminLayout;
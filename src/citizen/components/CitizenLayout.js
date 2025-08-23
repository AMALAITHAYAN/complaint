import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { 
  FileText, 
  MessageSquare, 
  User, 
  BarChart3, 
  Map, 
  Upload, 
  Bell, 
  AlertTriangle, 
  Star, 
  Clock,
  Home,
  Settings,
  HelpCircle
} from 'lucide-react';

/** Enhanced Styles for Citizen Portal */
const Styles = () => (
  <style>{`
    :root { 
      --sidebar-w: 260px; 
      --primary-blue: #3b82f6;
      --primary-blue-dark: #2563eb;
      --bg-primary: #0f172a;
      --bg-secondary: #1e293b;
      --bg-tertiary: #334155;
      --text-primary: #ffffff;
      --text-secondary: #e2e8f0;
      --text-muted: #94a3b8;
      --border-color: #475569;
    }
    
    * { box-sizing: border-box; }
    
    body { 
      margin: 0; 
      background: var(--bg-primary); 
      color: var(--text-primary); 
      font-family: 'Inter', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.5;
    }
    
    .cit-layout { 
      display: flex; 
      min-height: 100vh; 
    }
    
    .sidebar {
      width: var(--sidebar-w);
      background: var(--bg-secondary);
      height: 100vh;
      padding: 1.5rem 0;
      position: fixed;
      inset: 0 auto 0 0;
      border-right: 1px solid var(--border-color);
      overflow-y: auto;
      z-index: 100;
      box-shadow: 4px 0 20px rgba(0, 0, 0, 0.1);
    }
    
    .sidebar::-webkit-scrollbar {
      width: 6px;
    }
    
    .sidebar::-webkit-scrollbar-track {
      background: transparent;
    }
    
    .sidebar::-webkit-scrollbar-thumb {
      background: var(--border-color);
      border-radius: 3px;
    }
    
    .sidebar-header {
      font-size: 1.5rem;
      font-weight: 800;
      text-align: center;
      margin-bottom: 2rem;
      padding: 0 1.5rem;
      color: var(--text-primary);
      background: linear-gradient(135deg, var(--primary-blue) 0%, var(--primary-blue-dark) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    
    .nav-section {
      margin-bottom: 2rem;
    }
    
    .section-label {
      margin: 0 0 0.75rem;
      padding: 0 1.5rem;
      font-size: 0.75rem;
      letter-spacing: 0.08em;
      color: var(--text-muted);
      text-transform: uppercase;
      font-weight: 600;
    }
    
    .nav { 
      display: flex; 
      flex-direction: column; 
      gap: 0.25rem;
      padding: 0 1rem;
    }
    
    .nav-link {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      color: var(--text-secondary);
      text-decoration: none;
      padding: 0.875rem 1rem;
      border-radius: 12px;
      font-weight: 500;
      font-size: 0.9rem;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
      overflow: hidden;
    }
    
    .nav-link::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 3px;
      background: var(--primary-blue);
      transform: scaleY(0);
      transition: transform 0.2s ease;
      border-radius: 0 2px 2px 0;
    }
    
    .nav-link:hover { 
      background: var(--bg-tertiary);
      color: var(--text-primary);
      transform: translateX(4px);
    }
    
    .nav-link.active { 
      background: linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(37, 99, 235, 0.15) 100%);
      color: var(--primary-blue);
      font-weight: 600;
    }
    
    .nav-link.active::before {
      transform: scaleY(1);
    }
    
    .nav-icon {
      width: 18px;
      height: 18px;
      flex-shrink: 0;
      opacity: 0.7;
    }
    
    .nav-link:hover .nav-icon,
    .nav-link.active .nav-icon {
      opacity: 1;
    }
    
    .main {
      margin-left: var(--sidebar-w);
      width: calc(100% - var(--sidebar-w));
      min-height: 100vh;
      background: var(--bg-primary);
    }
    
    .main-content {
      padding: 0;
      width: 100%;
      min-height: 100vh;
    }
    
    /* Responsive Design */
    @media (max-width: 1024px) {
      :root { --sidebar-w: 240px; }
    }
    
    @media (max-width: 768px) {
      .sidebar {
        transform: translateX(-100%);
        transition: transform 0.3s ease;
      }
      
      .sidebar.open {
        transform: translateX(0);
      }
      
      .main {
        margin-left: 0;
        width: 100%;
      }
    }
    
    /* Animation for page transitions */
    .page-enter {
      opacity: 0;
      transform: translateY(20px);
    }
    
    .page-enter-active {
      opacity: 1;
      transform: translateY(0);
      transition: opacity 0.3s ease, transform 0.3s ease;
    }
    
    /* Custom focus styles */
    .nav-link:focus {
      outline: 2px solid var(--primary-blue);
      outline-offset: -2px;
    }
    
    /* Notification badge */
    .nav-link .badge {
      background: #ef4444;
      color: white;
      font-size: 0.7rem;
      font-weight: 600;
      padding: 0.15rem 0.4rem;
      border-radius: 10px;
      margin-left: auto;
      min-width: 18px;
      text-align: center;
    }
    
    /* Divider */
    .nav-divider {
      height: 1px;
      background: var(--border-color);
      margin: 1rem 1.5rem;
      opacity: 0.3;
    }
  `}</style>
);

const linkClass = ({ isActive }) => (isActive ? 'nav-link active' : 'nav-link');

const CitizenLayout = () => {
  return (
    <>
      <Styles />
      <div className="cit-layout">
        <aside className="sidebar">
          <div className="sidebar-header">Citizen Portal</div>

          {/* Core Features */}
          <div className="nav-section">
            <div className="section-label">Core</div>
            <nav className="nav">
              <NavLink to="/citizen/dashboard" className={linkClass}>
                <Home className="nav-icon" />
                Submit Complaint
              </NavLink>
              <NavLink to="/citizen/complaints" className={linkClass}>
                <MessageSquare className="nav-icon" />
                My Complaints
              </NavLink>
              <NavLink to="/citizen/profile" className={linkClass}>
                <User className="nav-icon" />
                My Profile
              </NavLink>
            </nav>
          </div>

          {/* Analytics & Tracking */}
          <div className="nav-section">
            <div className="section-label">Analytics</div>
            <nav className="nav">
              <NavLink to="/citizen/overview" className={linkClass}>
                <BarChart3 className="nav-icon" />
                My Stats
              </NavLink>
              <NavLink to="/citizen/map" className={linkClass}>
                <Map className="nav-icon" />
                Complaints Map
              </NavLink>
              <NavLink to="/citizen/timeline" className={linkClass}>
                <Clock className="nav-icon" />
                Timeline
              </NavLink>
            </nav>
          </div>

          {/* Tools & Support */}
          <div className="nav-section">
            <div className="section-label">Tools</div>
            <nav className="nav">
              <NavLink to="/citizen/evidence" className={linkClass}>
                <Upload className="nav-icon" />
                Upload Evidence
              </NavLink>
              <NavLink to="/citizen/notifications" className={linkClass}>
                <Bell className="nav-icon" />
                Notifications
                <span className="badge">3</span>
              </NavLink>
              <NavLink to="/citizen/escalate" className={linkClass}>
                <AlertTriangle className="nav-icon" />
                Request Escalation
              </NavLink>
              <NavLink to="/citizen/feedback" className={linkClass}>
                <Star className="nav-icon" />
                Rate & Feedback
              </NavLink>
            </nav>
          </div>

          <div className="nav-divider"></div>

          {/* Settings & Help */}
          <div className="nav-section">
            <nav className="nav">
              <NavLink to="/citizen/settings" className={linkClass}>
                <Settings className="nav-icon" />
                Settings
              </NavLink>
              <NavLink to="/citizen/help" className={linkClass}>
                <HelpCircle className="nav-icon" />
                Help & Support
              </NavLink>
            </nav>
          </div>
        </aside>

        <main className="main">
          <div className="main-content">
            <Outlet />
          </div>
        </main>
      </div>
    </>
  );
};

export default CitizenLayout;
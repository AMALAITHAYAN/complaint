import React, { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { 
  FileText, 
  AlertTriangle, 
  RefreshCw, 
  Paperclip, 
  MapPin, 
  MessageSquare, 
  ArrowRightLeft, 
  BarChart3, 
  FileBarChart, 
  User, 
  Settings, 
  Calendar,
  ChevronDown,
  ChevronRight,
  Bell,
  Search,
  Menu,
  X
} from 'lucide-react';

/** Styles scoped to Employee layout only */
const Styles = () => (
  <style>{`
    :root { --sidebar-w: 280px; }
    
    body { 
      margin: 0; 
      background: #0b1220; 
      color: #fff; 
      font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif; 
      overflow-x: hidden;
    }
    
    .emp-layout { 
      min-height: 100vh;
      display: flex;
    }
    
    .emp-sidebar {
      width: var(--sidebar-w);
      min-width: var(--sidebar-w);
      background: linear-gradient(180deg, #1f2937 0%, #111827 100%);
      border-right: 1px solid #374151;
      position: fixed; 
      top: 0;
      left: 0;
      bottom: 0;
      overflow-y: auto;
      z-index: 10;
      box-shadow: 4px 0 12px rgba(0, 0, 0, 0.15);
      transition: transform 0.3s ease;
    }
    
    .emp-sidebar.mobile-hidden {
      transform: translateX(-100%);
    }
    
    .emp-header {
      padding: 1.5rem 1.25rem;
      border-bottom: 1px solid #374151;
    }
    
    .emp-title { 
      margin: 0 0 1rem 0; 
      text-align: center; 
      font-size: 1.8rem; 
      font-weight: 800; 
      line-height: 1.2;
      background: linear-gradient(45deg, #3b82f6, #8b5cf6);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    
    .emp-search-container {
      position: relative;
      margin-bottom: 0.5rem;
    }
    
    .emp-search {
      width: 100%;
      background: rgba(55, 65, 81, 0.5);
      border: 1px solid #374151;
      border-radius: 8px;
      padding: 0.5rem 0.75rem 0.5rem 2.25rem;
      color: #fff;
      font-size: 0.875rem;
      transition: all 0.2s ease;
      box-sizing: border-box;
    }
    
    .emp-search:focus {
      outline: none;
      border-color: #3b82f6;
      background: rgba(55, 65, 81, 0.8);
    }
    
    .emp-search-icon {
      position: absolute;
      left: 0.75rem;
      top: 50%;
      transform: translateY(-50%);
      color: #9ca3af;
      width: 16px;
      height: 16px;
    }
    
    .emp-user-info {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.75rem;
      background: rgba(55, 65, 81, 0.3);
      border-radius: 10px;
      margin-bottom: 0.5rem;
    }
    
    .emp-avatar {
      width: 36px;
      height: 36px;
      background: linear-gradient(45deg, #3b82f6, #8b5cf6);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      font-size: 0.875rem;
    }
    
    .emp-user-details {
      flex: 1;
    }
    
    .emp-user-name {
      font-weight: 600;
      font-size: 0.875rem;
      margin: 0;
      color: #fff;
    }
    
    .emp-user-role {
      font-size: 0.75rem;
      color: #9ca3af;
      margin: 0;
    }
    
    .emp-notification-badge {
      background: #ef4444;
      color: white;
      font-size: 0.75rem;
      font-weight: 600;
      padding: 0.125rem 0.375rem;
      border-radius: 10px;
      min-width: 18px;
      text-align: center;
    }
    
    .emp-nav-container {
      padding: 0 1.25rem 1.25rem;
    }
    
    .emp-section { 
      margin: 1.25rem 0 .75rem; 
      font-size: .75rem; 
      letter-spacing: .05em; 
      color: #9ca3af; 
      text-transform: uppercase;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
      padding: 0.25rem 0;
      border-radius: 6px;
      transition: all 0.2s ease;
    }
    
    .emp-section:hover {
      background: rgba(55, 65, 81, 0.3);
      padding-left: 0.5rem;
    }
    
    .emp-section:first-child {
      margin-top: 0.5rem;
    }
    
    .emp-section-icon {
      width: 14px;
      height: 14px;
      transition: transform 0.2s ease;
    }
    
    .emp-section.collapsed .emp-section-icon {
      transform: rotate(-90deg);
    }
    
    .emp-nav { 
      display: flex; 
      flex-direction: column; 
      gap: .25rem;
      margin-bottom: 0.5rem;
      overflow: hidden;
      transition: max-height 0.3s ease, opacity 0.3s ease;
    }
    
    .emp-nav.collapsed {
      max-height: 0;
      opacity: 0;
      margin-bottom: 0;
    }
    
    .emp-nav:not(.collapsed) {
      max-height: 500px;
      opacity: 1;
    }
    
    .emp-link {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: .75rem 1rem; 
      border-radius: 10px;
      color: #d1d5db; 
      text-decoration: none; 
      font-weight: 500;
      font-size: 0.875rem;
      transition: all 0.2s ease;
      position: relative;
      margin: 0.125rem 0;
    }
    
    .emp-link:hover { 
      background: rgba(55, 65, 81, 0.6);
      color: #fff;
      transform: translateX(4px);
    }
    
    .emp-link.active { 
      background: linear-gradient(45deg, #3b82f6, #1d4ed8);
      color: #fff;
      box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
    }
    
    .emp-link.active::before {
      content: '';
      position: absolute;
      left: -1.25rem;
      top: 50%;
      transform: translateY(-50%);
      width: 3px;
      height: 20px;
      background: #3b82f6;
      border-radius: 2px;
    }
    
    .emp-link-icon {
      width: 18px;
      height: 18px;
      flex-shrink: 0;
    }
    
    .emp-link-text {
      flex: 1;
    }
    
    .emp-badge {
      background: #ef4444;
      color: white;
      font-size: 0.625rem;
      font-weight: 600;
      padding: 0.125rem 0.375rem;
      border-radius: 8px;
      min-width: 16px;
      text-align: center;
    }
    
    .emp-badge.success {
      background: #10b981;
    }
    
    .emp-badge.warning {
      background: #f59e0b;
    }
    
    .emp-content {
      flex: 1;
      margin-left: var(--sidebar-w);
      padding: 2rem clamp(1.5rem, 4vw, 3rem);
      max-width: calc(100vw - var(--sidebar-w));
      box-sizing: border-box;
    }
    
    .emp-mobile-toggle {
      display: none;
      position: fixed;
      top: 1rem;
      left: 1rem;
      z-index: 20;
      background: #1f2937;
      border: 1px solid #374151;
      border-radius: 8px;
      padding: 0.5rem;
      color: #fff;
      cursor: pointer;
    }
    
    .emp-overlay {
      display: none;
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.5);
      z-index: 9;
    }
    
    /* Mobile responsiveness */
    @media (max-width: 1024px) {
      :root { --sidebar-w: 260px; }
      
      .emp-content {
        padding: 1.5rem;
      }
    }
    
    @media (max-width: 768px) {
      .emp-mobile-toggle {
        display: block;
      }
      
      .emp-overlay.show {
        display: block;
      }
      
      .emp-content {
        margin-left: 0;
        max-width: 100vw;
        padding: 4rem 1rem 1rem;
      }
      
      .emp-sidebar {
        transform: translateX(-100%);
      }
      
      .emp-sidebar.show {
        transform: translateX(0);
      }
      
      .emp-title {
        font-size: 1.6rem;
      }
    }
    
    @media (max-width: 640px) {
      :root { --sidebar-w: 280px; }
      
      .emp-content {
        padding: 4rem 0.75rem 1rem;
      }
    }
  `}</style>
);

const linkClass = ({ isActive }) => 'emp-link' + (isActive ? ' active' : '');

const EmployeeLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsedSections, setCollapsedSections] = useState({});

  const toggleSection = (section) => {
    setCollapsedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <>
      <Styles />
      <div className="emp-layout">
        <button className="emp-mobile-toggle" onClick={toggleSidebar}>
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        
        <div className={`emp-overlay ${sidebarOpen ? 'show' : ''}`} onClick={closeSidebar}></div>
        
        <aside className={`emp-sidebar ${sidebarOpen ? 'show' : ''}`}>
          <div className="emp-header">
            <h2 className="emp-title">Employee<br/>Portal</h2>
            
            <div className="emp-search-container">
              <Search className="emp-search-icon" />
              <input 
                type="text" 
                className="emp-search" 
                placeholder="Search menu..."
              />
            </div>
            
            <div className="emp-user-info">
              <div className="emp-avatar">JD</div>
              <div className="emp-user-details">
                <p className="emp-user-name">John Doe</p>
                <p className="emp-user-role">Employee</p>
              </div>
              <div className="emp-notification-badge">3</div>
            </div>
          </div>

          <div className="emp-nav-container">
            {/* WORK */}
            <div 
              className={`emp-section ${collapsedSections.work ? 'collapsed' : ''}`}
              onClick={() => toggleSection('work')}
            >
              <span>Work</span>
              <ChevronDown className="emp-section-icon" />
            </div>
            <nav className={`emp-nav ${collapsedSections.work ? 'collapsed' : ''}`}>
              <NavLink to="/employee/dashboard" className={linkClass} onClick={closeSidebar}>
                <FileText className="emp-link-icon" />
                <span className="emp-link-text">My Complaints</span>
                <span className="emp-badge">12</span>
              </NavLink>
              <NavLink to="/employee/priorities" className={linkClass} onClick={closeSidebar}>
                <AlertTriangle className="emp-link-icon" />
                <span className="emp-link-text">Task Priorities</span>
                <span className="emp-badge warning">5</span>
              </NavLink>
              <NavLink to="/employee/status-workflow" className={linkClass} onClick={closeSidebar}>
                <RefreshCw className="emp-link-icon" />
                <span className="emp-link-text">Status Updates</span>
              </NavLink>
              <NavLink to="/employee/attachments" className={linkClass} onClick={closeSidebar}>
                <Paperclip className="emp-link-icon" />
                <span className="emp-link-text">Attachments</span>
              </NavLink>
              <NavLink to="/employee/location-map" className={linkClass} onClick={closeSidebar}>
                <MapPin className="emp-link-icon" />
                <span className="emp-link-text">Map / Location View</span>
              </NavLink>
            </nav>

            {/* COLLABORATION */}
            <div 
              className={`emp-section ${collapsedSections.collaboration ? 'collapsed' : ''}`}
              onClick={() => toggleSection('collaboration')}
            >
              <span>Collaboration</span>
              <ChevronDown className="emp-section-icon" />
            </div>
            <nav className={`emp-nav ${collapsedSections.collaboration ? 'collapsed' : ''}`}>
              <NavLink to="/employee/chat" className={linkClass} onClick={closeSidebar}>
                <MessageSquare className="emp-link-icon" />
                <span className="emp-link-text">Team Chat / Notes</span>
                <span className="emp-badge">2</span>
              </NavLink>
              <NavLink to="/employee/reassign" className={linkClass} onClick={closeSidebar}>
                <ArrowRightLeft className="emp-link-icon" />
                <span className="emp-link-text">Reassign / Escalate</span>
              </NavLink>
            </nav>

            {/* INSIGHTS */}
            <div 
              className={`emp-section ${collapsedSections.insights ? 'collapsed' : ''}`}
              onClick={() => toggleSection('insights')}
            >
              <span>Insights</span>
              <ChevronDown className="emp-section-icon" />
            </div>
            <nav className={`emp-nav ${collapsedSections.insights ? 'collapsed' : ''}`}>
              <NavLink to="/employee/performance" className={linkClass} onClick={closeSidebar}>
                <BarChart3 className="emp-link-icon" />
                <span className="emp-link-text">Performance Dashboard</span>
              </NavLink>
              <NavLink to="/employee/reports" className={linkClass} onClick={closeSidebar}>
                <FileBarChart className="emp-link-icon" />
                <span className="emp-link-text">Reports</span>
              </NavLink>
            </nav>

            {/* PROFILE */}
            <div 
              className={`emp-section ${collapsedSections.profile ? 'collapsed' : ''}`}
              onClick={() => toggleSection('profile')}
            >
              <span>Profile</span>
              <ChevronDown className="emp-section-icon" />
            </div>
            <nav className={`emp-nav ${collapsedSections.profile ? 'collapsed' : ''}`}>
              <NavLink to="/employee/profile" className={linkClass} onClick={closeSidebar}>
                <User className="emp-link-icon" />
                <span className="emp-link-text">My Profile</span>
              </NavLink>
              <NavLink to="/employee/profile-settings" className={linkClass} onClick={closeSidebar}>
                <Settings className="emp-link-icon" />
                <span className="emp-link-text">Profile Settings</span>
              </NavLink>
              <NavLink to="/employee/availability" className={linkClass} onClick={closeSidebar}>
                <Calendar className="emp-link-icon" />
                <span className="emp-link-text">Availability / Leave</span>
              </NavLink>
            </nav>
          </div>
        </aside>

        <main className="emp-content">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default EmployeeLayout;
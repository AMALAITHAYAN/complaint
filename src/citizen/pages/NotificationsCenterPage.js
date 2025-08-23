import React, { useState } from "react";
import { Bell, Check, MessageCircle, User, FileText, Clock, Filter } from "lucide-react";

const MOCK = [
  { id:"n5", t:"2025-08-20 10:30", type:"STATUS", text:"Complaint #12 moved to IN_PROGRESS.", read: false },
  { id:"n4", t:"2025-08-20 09:05", type:"COMMENT", text:"Employee replied to your comment on #13.", read: false },
  { id:"n3", t:"2025-08-19 18:00", type:"RESOLVED", text:"Complaint #14 marked as RESOLVED.", read: true },
  { id:"n2", t:"2025-08-19 10:00", type:"ASSIGNED", text:"#12 assigned to employee1.", read: true },
  { id:"n1", t:"2025-08-18 16:20", type:"SUBMITTED", text:"Your complaint #12 was submitted.", read: true },
];

const Styles = () => (
  <style>{`
    * { box-sizing: border-box; }
    body { margin: 0; background: #0f172a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #e2e8f0; }
    
    .notifications-container {
      max-width: 900px;
      margin: 0 auto;
      padding: 2rem;
      background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
      min-height: 100vh;
    }
    
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 2rem;
    }
    
    .title-section {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    
    .title {
      font-size: 2.5rem;
      font-weight: 800;
      margin: 0;
      background: linear-gradient(135deg, #3b82f6, #06b6d4);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    
    .bell-icon {
      padding: 0.75rem;
      background: linear-gradient(135deg, #3b82f6, #1d4ed8);
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
    }
    
    .controls {
      display: flex;
      gap: 1rem;
      align-items: center;
    }
    
    .filter-btn {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1rem;
      background: #1e293b;
      border: 1px solid #334155;
      border-radius: 8px;
      color: #e2e8f0;
      cursor: pointer;
      transition: all 0.2s ease;
      font-size: 0.875rem;
      font-weight: 500;
    }
    
    .filter-btn:hover {
      background: #334155;
      border-color: #475569;
    }
    
    .mark-all-btn {
      padding: 0.75rem 1rem;
      background: linear-gradient(135deg, #10b981, #059669);
      border: none;
      border-radius: 8px;
      color: white;
      cursor: pointer;
      transition: all 0.2s ease;
      font-size: 0.875rem;
      font-weight: 600;
      box-shadow: 0 2px 8px rgba(16, 185, 129, 0.3);
    }
    
    .mark-all-btn:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
    }
    
    .stats {
      display: flex;
      gap: 1rem;
      margin-bottom: 2rem;
    }
    
    .stat-card {
      flex: 1;
      padding: 1.5rem;
      background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
      border: 1px solid #475569;
      border-radius: 12px;
      text-align: center;
      position: relative;
      overflow: hidden;
    }
    
    .stat-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: linear-gradient(90deg, #3b82f6, #06b6d4, #10b981);
    }
    
    .stat-number {
      font-size: 2rem;
      font-weight: 800;
      margin-bottom: 0.5rem;
      background: linear-gradient(135deg, #3b82f6, #06b6d4);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    
    .stat-label {
      color: #94a3b8;
      font-size: 0.875rem;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    .notifications-card {
      background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
      border: 1px solid #475569;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
      backdrop-filter: blur(10px);
    }
    
    .notification-item {
      padding: 1.5rem;
      border-bottom: 1px solid #334155;
      display: flex;
      gap: 1rem;
      align-items: flex-start;
      transition: all 0.3s ease;
      position: relative;
      cursor: pointer;
    }
    
    .notification-item:hover {
      background: rgba(59, 130, 246, 0.05);
      transform: translateX(4px);
    }
    
    .notification-item.unread {
      background: linear-gradient(90deg, rgba(59, 130, 246, 0.1) 0%, transparent 100%);
      border-left: 4px solid #3b82f6;
    }
    
    .notification-item.unread::before {
      content: '';
      position: absolute;
      left: 1rem;
      top: 50%;
      transform: translateY(-50%);
      width: 8px;
      height: 8px;
      background: #3b82f6;
      border-radius: 50%;
      box-shadow: 0 0 8px rgba(59, 130, 246, 0.6);
    }
    
    .icon-wrapper {
      flex-shrink: 0;
      width: 48px;
      height: 48px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    }
    
    .notification-content {
      flex: 1;
      min-width: 0;
    }
    
    .notification-text {
      font-size: 1rem;
      line-height: 1.5;
      margin-bottom: 0.5rem;
      color: #e2e8f0;
      font-weight: 500;
    }
    
    .notification-time {
      color: #94a3b8;
      font-size: 0.875rem;
      display: flex;
      align-items: center;
      gap: 0.25rem;
    }
    
    .badge {
      font-size: 0.75rem;
      font-weight: 700;
      padding: 0.375rem 0.75rem;
      border-radius: 999px;
      color: white;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
      margin-left: auto;
      flex-shrink: 0;
    }
    
    .empty-state {
      padding: 4rem 2rem;
      text-align: center;
      color: #64748b;
      background: linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(16, 185, 129, 0.05) 100%);
      border-top: 1px solid #334155;
    }
    
    .empty-icon {
      margin-bottom: 1rem;
      opacity: 0.5;
    }
    
    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .notification-item {
      animation: slideIn 0.3s ease forwards;
    }
    
    @media (max-width: 768px) {
      .notifications-container { padding: 1rem; }
      .header { flex-direction: column; gap: 1rem; align-items: stretch; }
      .controls { justify-content: center; }
      .stats { flex-direction: column; }
      .notification-item { padding: 1rem; }
      .title { font-size: 2rem; }
    }
  `}</style>
);

const getIcon = (type) => {
  const icons = {
    STATUS: FileText,
    COMMENT: MessageCircle,
    RESOLVED: Check,
    ASSIGNED: User,
    SUBMITTED: Bell
  };
  return icons[type] || Bell;
};

const getColor = (type) => ({
  STATUS: "#3b82f6",
  COMMENT: "#06b6d4", 
  RESOLVED: "#10b981",
  ASSIGNED: "#8b5cf6",
  SUBMITTED: "#f59e0b"
}[type] || "#6b7280");

const formatTime = (timeStr) => {
  const date = new Date(timeStr);
  const now = new Date();
  const diffMs = now - date;
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
  if (diffHours < 1) return "Just now";
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return "Yesterday";
  return `${diffDays} days ago`;
};

export default function NotificationsCenterPage() {
  const [notifications, setNotifications] = useState(MOCK);
  const [filter, setFilter] = useState('ALL');

  const unreadCount = notifications.filter(n => !n.read).length;
  const totalCount = notifications.length;

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const toggleRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: !n.read } : n
    ));
  };

  const filteredNotifications = filter === 'UNREAD' 
    ? notifications.filter(n => !n.read)
    : notifications;

  return (
    <>
      <Styles />
      <div className="notifications-container">
        <div className="header">
          <div className="title-section">
            <div className="bell-icon">
              <Bell size={24} color="white" />
            </div>
            <h1 className="title">Notifications</h1>
          </div>
          <div className="controls">
            <button 
              className="filter-btn"
              onClick={() => setFilter(filter === 'ALL' ? 'UNREAD' : 'ALL')}
            >
              <Filter size={16} />
              {filter === 'ALL' ? 'Show Unread' : 'Show All'}
            </button>
            {unreadCount > 0 && (
              <button className="mark-all-btn" onClick={markAllAsRead}>
                <Check size={16} style={{ marginRight: '0.5rem' }} />
                Mark All Read
              </button>
            )}
          </div>
        </div>

        <div className="stats">
          <div className="stat-card">
            <div className="stat-number">{totalCount}</div>
            <div className="stat-label">Total</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{unreadCount}</div>
            <div className="stat-label">Unread</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{totalCount - unreadCount}</div>
            <div className="stat-label">Read</div>
          </div>
        </div>

        <div className="notifications-card">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((n, index) => {
              const IconComponent = getIcon(n.type);
              const iconColor = getColor(n.type);
              
              return (
                <div 
                  key={n.id} 
                  className={`notification-item ${!n.read ? 'unread' : ''}`}
                  onClick={() => toggleRead(n.id)}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="icon-wrapper" style={{ background: `linear-gradient(135deg, ${iconColor}, ${iconColor}dd)` }}>
                    <IconComponent size={20} color="white" />
                  </div>
                  <div className="notification-content">
                    <div className="notification-text">{n.text}</div>
                    <div className="notification-time">
                      <Clock size={14} />
                      {formatTime(n.t)}
                    </div>
                  </div>
                  <span className="badge" style={{ background: `linear-gradient(135deg, ${iconColor}, ${iconColor}dd)` }}>
                    {n.type}
                  </span>
                </div>
              );
            })
          ) : (
            <div className="empty-state">
              <div className="empty-icon">
                <Bell size={48} />
              </div>
              <div>No notifications to display</div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
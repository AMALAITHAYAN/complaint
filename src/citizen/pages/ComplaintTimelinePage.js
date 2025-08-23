import React, { useState, useEffect } from "react";
import { Clock, User, Shield, Bot, CheckCircle, AlertCircle, FileText, Search, Calendar, MapPin, Eye } from "lucide-react";

const MOCK_TIMELINE = {
  "12": [
    { t: "2025-08-18 16:20", by: "Citizen", text: "Complaint submitted via mobile app", type: "submit", status: "info", location: "Avinashi Road, Coimbatore" },
    { t: "2025-08-19 10:00", by: "System", text: "Auto-assigned to Municipal Inspector (ID: EMP001)", type: "assign", status: "info" },
    { t: "2025-08-20 10:20", by: "Employee", text: "Site inspection scheduled for tomorrow 2 PM", type: "update", status: "progress", inspector: "Rajesh Kumar" },
    { t: "2025-08-21 14:30", by: "Employee", text: "On-site inspection completed. Streetlight pole damaged, replacement required", type: "inspection", status: "progress", inspector: "Rajesh Kumar" },
  ],
  "13": [
    { t: "2025-08-17 08:30", by: "Citizen", text: "Garbage collection complaint submitted", type: "submit", status: "info", location: "RS Puram, Coimbatore" },
    { t: "2025-08-17 09:15", by: "System", text: "High priority case - escalated to senior supervisor", type: "escalate", status: "warning" },
    { t: "2025-08-17 11:00", by: "Employee", text: "Sanitation team dispatched to location", type: "dispatch", status: "progress", inspector: "Priya Singh" },
    { t: "2025-08-18 07:45", by: "Employee", text: "Collection completed. Route schedule updated for future", type: "resolution", status: "progress", inspector: "Priya Singh" },
  ],
  "14": [
    { t: "2025-08-15 09:00", by: "Citizen", text: "Water leakage emergency reported", type: "submit", status: "urgent", location: "Oppanakkara Street, Gandhipuram" },
    { t: "2025-08-15 09:15", by: "System", text: "Emergency protocol activated - immediate response team notified", type: "emergency", status: "urgent" },
    { t: "2025-08-15 10:30", by: "Employee", text: "Emergency repair team on-site, main valve isolated", type: "emergency", status: "progress", inspector: "Suresh Menon" },
    { t: "2025-08-15 15:40", by: "Employee", text: "Pipe repair completed, water supply restored", type: "repair", status: "success", inspector: "Suresh Menon" },
    { t: "2025-08-15 16:00", by: "System", text: "Quality check passed - complaint marked RESOLVED", type: "resolve", status: "success" },
    { t: "2025-08-16 09:00", by: "System", text: "Follow-up SMS sent to citizen for feedback", type: "followup", status: "info" },
  ],
  "15": [
    { t: "2025-08-19 14:15", by: "Citizen", text: "Pothole complaint submitted with photo evidence", type: "submit", status: "info", location: "Trichy Road, Singanallur" },
    { t: "2025-08-19 14:20", by: "System", text: "Photo analysis completed - severity: Medium", type: "analysis", status: "info" },
  ]
};

const COMPLAINT_INFO = {
  "12": { title: "Streetlight not working", status: "IN_PROGRESS", priority: "Medium", category: "Infrastructure" },
  "13": { title: "Garbage not collected", status: "IN_PROGRESS", priority: "High", category: "Sanitation" },
  "14": { title: "Water leakage", status: "RESOLVED", priority: "High", category: "Water Supply" },
  "15": { title: "Pothole on road", status: "PENDING", priority: "Low", category: "Roads" }
};

const Styles = () => (
  <style>{`
    * {
      box-sizing: border-box;
    }
    
    body {
      margin: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }
    
    .timeline-app {
      min-height: 100vh;
      background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
      color: white;
      padding: 2rem;
    }
    
    .container {
      max-width: 1000px;
      margin: 0 auto;
    }
    
    .header {
      text-align: center;
      margin-bottom: 3rem;
    }
    
    .main-title {
      font-size: 3rem;
      font-weight: 800;
      background: linear-gradient(135deg, #60a5fa, #a78bfa);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin: 0 0 0.5rem;
    }
    
    .subtitle {
      color: #cbd5e1;
      font-size: 1.125rem;
    }
    
    .search-section {
      background: rgba(30, 41, 59, 0.5);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(71, 85, 105, 0.3);
      border-radius: 1rem;
      padding: 2rem;
      margin-bottom: 2rem;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    }
    
    .search-header {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 1rem;
    }
    
    .search-title {
      font-size: 1.25rem;
      font-weight: 600;
      margin: 0;
    }
    
    .search-icon {
      color: #60a5fa;
    }
    
    .input-group {
      position: relative;
    }
    
    .input-icon {
      position: absolute;
      left: 1rem;
      top: 50%;
      transform: translateY(-50%);
      color: #94a3b8;
      width: 1.25rem;
      height: 1.25rem;
    }
    
    .search-input {
      width: 100%;
      background: rgba(15, 23, 42, 0.7);
      border: 2px solid rgba(71, 85, 105, 0.3);
      border-radius: 0.75rem;
      padding: 1rem 1rem 1rem 3rem;
      color: white;
      font-size: 1rem;
      font-weight: 500;
      transition: all 0.3s ease;
    }
    
    .search-input::placeholder {
      color: #94a3b8;
    }
    
    .search-input:focus {
      outline: none;
      border-color: #60a5fa;
      box-shadow: 0 0 0 4px rgba(96, 165, 250, 0.1);
      background: rgba(15, 23, 42, 0.9);
    }
    
    .quick-links {
      display: flex;
      gap: 0.75rem;
      margin-top: 1rem;
      flex-wrap: wrap;
    }
    
    .quick-link {
      background: rgba(51, 65, 85, 0.5);
      border: 1px solid rgba(71, 85, 105, 0.3);
      border-radius: 0.5rem;
      padding: 0.5rem 1rem;
      color: #cbd5e1;
      text-decoration: none;
      font-size: 0.875rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    
    .quick-link:hover {
      background: rgba(59, 130, 246, 0.1);
      border-color: #60a5fa;
      color: #60a5fa;
    }
    
    .complaint-header {
      background: rgba(30, 41, 59, 0.5);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(71, 85, 105, 0.3);
      border-radius: 1rem;
      padding: 2rem;
      margin-bottom: 2rem;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    }
    
    .complaint-info {
      display: grid;
      grid-template-columns: 1fr auto;
      gap: 2rem;
      align-items: center;
    }
    
    .complaint-details h2 {
      font-size: 1.75rem;
      font-weight: 700;
      margin: 0 0 0.5rem;
      color: white;
    }
    
    .complaint-meta {
      display: flex;
      gap: 1rem;
      margin-top: 1rem;
      flex-wrap: wrap;
    }
    
    .meta-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.875rem;
      color: #cbd5e1;
    }
    
    .meta-icon {
      width: 1rem;
      height: 1rem;
      color: #94a3b8;
    }
    
    .status-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      font-size: 0.875rem;
      font-weight: 600;
      border-radius: 9999px;
      border: 1px solid;
    }
    
    .status-pending {
      background: rgba(254, 240, 138, 0.1);
      color: #f59e0b;
      border-color: rgba(251, 191, 36, 0.3);
    }
    
    .status-progress {
      background: rgba(147, 197, 253, 0.1);
      color: #3b82f6;
      border-color: rgba(96, 165, 250, 0.3);
    }
    
    .status-resolved {
      background: rgba(167, 243, 208, 0.1);
      color: #10b981;
      border-color: rgba(52, 211, 153, 0.3);
    }
    
    .timeline-section {
      background: rgba(30, 41, 59, 0.5);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(71, 85, 105, 0.3);
      border-radius: 1rem;
      padding: 2rem;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    }
    
    .timeline-header {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 2rem;
    }
    
    .timeline-title {
      font-size: 1.5rem;
      font-weight: 600;
      margin: 0;
    }
    
    .timeline-icon {
      color: #60a5fa;
    }
    
    .timeline {
      position: relative;
    }
    
    .timeline::before {
      content: '';
      position: absolute;
      left: 1.5rem;
      top: 0;
      bottom: 0;
      width: 2px;
      background: linear-gradient(to bottom, #60a5fa, #a78bfa);
    }
    
    .timeline-item {
      position: relative;
      padding-left: 4rem;
      padding-bottom: 2rem;
    }
    
    .timeline-item:last-child {
      padding-bottom: 0;
    }
    
    .timeline-marker {
      position: absolute;
      left: 0.75rem;
      top: 0.5rem;
      width: 1.5rem;
      height: 1.5rem;
      border-radius: 50%;
      border: 3px solid;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .marker-info {
      background: rgba(59, 130, 246, 0.2);
      border-color: #60a5fa;
      color: #60a5fa;
    }
    
    .marker-warning {
      background: rgba(251, 191, 36, 0.2);
      border-color: #f59e0b;
      color: #f59e0b;
    }
    
    .marker-success {
      background: rgba(16, 185, 129, 0.2);
      border-color: #10b981;
      color: #10b981;
    }
    
    .marker-urgent {
      background: rgba(239, 68, 68, 0.2);
      border-color: #ef4444;
      color: #ef4444;
    }
    
    .marker-progress {
      background: rgba(168, 85, 247, 0.2);
      border-color: #a855f7;
      color: #a855f7;
    }
    
    .timeline-content {
      background: rgba(15, 23, 42, 0.4);
      border: 1px solid rgba(71, 85, 105, 0.2);
      border-radius: 0.75rem;
      padding: 1.5rem;
      transition: all 0.3s ease;
    }
    
    .timeline-content:hover {
      background: rgba(15, 23, 42, 0.6);
      border-color: rgba(71, 85, 105, 0.4);
      transform: translateY(-2px);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    }
    
    .event-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 0.75rem;
      gap: 1rem;
    }
    
    .event-time {
      font-weight: 600;
      color: #60a5fa;
      font-size: 0.875rem;
      white-space: nowrap;
    }
    
    .event-actor {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.875rem;
      color: #94a3b8;
    }
    
    .actor-icon {
      width: 1rem;
      height: 1rem;
    }
    
    .event-text {
      color: white;
      line-height: 1.5;
      margin-bottom: 0.5rem;
    }
    
    .event-meta {
      display: flex;
      gap: 1rem;
      font-size: 0.75rem;
      color: #94a3b8;
      flex-wrap: wrap;
    }
    
    .meta-tag {
      background: rgba(51, 65, 85, 0.5);
      padding: 0.25rem 0.5rem;
      border-radius: 0.25rem;
      display: flex;
      align-items: center;
      gap: 0.25rem;
    }
    
    .empty-state {
      text-align: center;
      padding: 4rem 2rem;
      color: #94a3b8;
    }
    
    .empty-icon {
      width: 4rem;
      height: 4rem;
      margin: 0 auto 1rem;
      opacity: 0.5;
    }
    
    .empty-title {
      font-size: 1.25rem;
      font-weight: 600;
      margin: 0 0 0.5rem;
    }
    
    .empty-text {
      font-size: 0.875rem;
      margin: 0;
    }
  `}</style>
);

const StatusBadge = ({ status }) => {
  const statusConfig = {
    PENDING: { class: 'status-pending', icon: Clock, text: 'Pending' },
    IN_PROGRESS: { class: 'status-progress', icon: AlertCircle, text: 'In Progress' },
    RESOLVED: { class: 'status-resolved', icon: CheckCircle, text: 'Resolved' }
  };
  
  const config = statusConfig[status] || statusConfig.PENDING;
  const Icon = config.icon;
  
  return (
    <span className={`status-badge ${config.class}`}>
      <Icon style={{ width: '1rem', height: '1rem' }} />
      {config.text}
    </span>
  );
};

const TimelineMarker = ({ type, status }) => {
  const getMarkerClass = () => {
    if (status === 'urgent') return 'marker-urgent';
    if (status === 'success') return 'marker-success';
    if (status === 'warning') return 'marker-warning';
    if (status === 'progress') return 'marker-progress';
    return 'marker-info';
  };

  const getIcon = () => {
    switch (type) {
      case 'submit': return <FileText style={{ width: '0.75rem', height: '0.75rem' }} />;
      case 'assign': case 'escalate': return <Bot style={{ width: '0.75rem', height: '0.75rem' }} />;
      case 'inspection': case 'update': return <Eye style={{ width: '0.75rem', height: '0.75rem' }} />;
      case 'resolve': case 'repair': return <CheckCircle style={{ width: '0.75rem', height: '0.75rem' }} />;
      case 'emergency': return <AlertCircle style={{ width: '0.75rem', height: '0.75rem' }} />;
      default: return <Clock style={{ width: '0.75rem', height: '0.75rem' }} />;
    }
  };

  return (
    <div className={`timeline-marker ${getMarkerClass()}`}>
      {getIcon()}
    </div>
  );
};

const ActorIcon = ({ actor }) => {
  switch (actor) {
    case 'Citizen': return <User className="actor-icon" />;
    case 'System': return <Bot className="actor-icon" />;
    case 'Employee': return <Shield className="actor-icon" />;
    default: return <User className="actor-icon" />;
  }
};

export default function ComplaintTimelinePage() {
  const [id, setId] = useState("12");
  const [searchValue, setSearchValue] = useState("");
  
  const items = MOCK_TIMELINE[id] || [];
  const complaintInfo = COMPLAINT_INFO[id];
  
  useEffect(() => {
    setSearchValue(id);
  }, [id]);

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return {
      date: date.toLocaleDateString('en-IN'),
      time: date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
    };
  };

  const handleSearch = () => {
    if (searchValue && MOCK_TIMELINE[searchValue]) {
      setId(searchValue);
    }
  };

  const handleQuickLink = (complaintId) => {
    setId(complaintId);
    setSearchValue(complaintId);
  };

  return (
    <div className="timeline-app">
      <Styles />
      
      <div className="container">
        {/* Header */}
        <div className="header">
          <h1 className="main-title">Complaint Timeline</h1>
          <p className="subtitle">Track the complete journey of your complaint from submission to resolution</p>
        </div>

        {/* Search Section */}
        <div className="search-section">
          <div className="search-header">
            <Search className="search-icon" style={{ width: '1.5rem', height: '1.5rem' }} />
            <h2 className="search-title">Find Complaint</h2>
          </div>
          
          <div className="input-group">
            <Search className="input-icon" />
            <input
              className="search-input"
              placeholder="Enter complaint ID (e.g., 12, 13, 14, 15)"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          
          <div className="quick-links">
            <span style={{ color: '#94a3b8', fontSize: '0.875rem', marginRight: '0.5rem' }}>Quick access:</span>
            {Object.keys(MOCK_TIMELINE).map(complaintId => (
              <button
                key={complaintId}
                className="quick-link"
                onClick={() => handleQuickLink(complaintId)}
              >
                #{complaintId}
              </button>
            ))}
          </div>
        </div>

        {/* Complaint Header */}
        {complaintInfo && (
          <div className="complaint-header">
            <div className="complaint-info">
              <div className="complaint-details">
                <h2>#{id} · {complaintInfo.title}</h2>
                <div className="complaint-meta">
                  <div className="meta-item">
                    <FileText className="meta-icon" />
                    <span>{complaintInfo.category}</span>
                  </div>
                  <div className="meta-item">
                    <AlertCircle className="meta-icon" />
                    <span>Priority: {complaintInfo.priority}</span>
                  </div>
                  <div className="meta-item">
                    <Calendar className="meta-icon" />
                    <span>{items.length} events</span>
                  </div>
                </div>
              </div>
              <div>
                <StatusBadge status={complaintInfo.status} />
              </div>
            </div>
          </div>
        )}

        {/* Timeline Section */}
        <div className="timeline-section">
          <div className="timeline-header">
            <Clock className="timeline-icon" style={{ width: '1.5rem', height: '1.5rem' }} />
            <h3 className="timeline-title">Activity Timeline</h3>
          </div>

          {items.length === 0 ? (
            <div className="empty-state">
              <Search className="empty-icon" />
              <h4 className="empty-title">No timeline found</h4>
              <p className="empty-text">
                No events found for complaint #{id}. Please check the complaint ID and try again.
              </p>
            </div>
          ) : (
            <div className="timeline">
              {items.map((event, index) => {
                const timeData = formatTime(event.t);
                return (
                  <div key={index} className="timeline-item">
                    <TimelineMarker type={event.type} status={event.status} />
                    
                    <div className="timeline-content">
                      <div className="event-header">
                        <div className="event-time">
                          {timeData.date} at {timeData.time}
                        </div>
                        <div className="event-actor">
                          <ActorIcon actor={event.by} />
                          {event.by}
                          {event.inspector && (
                            <span style={{ color: '#cbd5e1' }}>({event.inspector})</span>
                          )}
                        </div>
                      </div>
                      
                      <div className="event-text">
                        {event.text}
                      </div>
                      
                      <div className="event-meta">
                        {event.location && (
                          <div className="meta-tag">
                            <MapPin style={{ width: '0.75rem', height: '0.75rem' }} />
                            {event.location}
                          </div>
                        )}
                        <div className="meta-tag">
                          Type: {event.type}
                        </div>
                        <div className="meta-tag">
                          Status: {event.status}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
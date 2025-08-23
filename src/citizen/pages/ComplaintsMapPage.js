import React, { useState, useEffect } from "react";
import { MapPin, Clock, CheckCircle, AlertCircle, Plus, Search, Filter } from "lucide-react";

const MOCK_COMPLAINTS = [
  { 
    id: 12, 
    title: "Streetlight not working", 
    description: "The streetlight on Avinashi Road near Fun Mall has been flickering and completely stopped working since last Tuesday.",
    lat: 11.0168, 
    lng: 76.9558, 
    status: "PENDING",
    category: "Infrastructure",
    reportedDate: "2025-08-18",
    priority: "Medium"
  },
  { 
    id: 13, 
    title: "Garbage not collected", 
    description: "Regular garbage collection has been missed for 3 days in RS Puram area near Brookefields Mall.",
    lat: 11.0041, 
    lng: 76.9674, 
    status: "IN_PROGRESS",
    category: "Sanitation",
    reportedDate: "2025-08-17",
    priority: "High"
  },
  { 
    id: 14, 
    title: "Water leakage", 
    description: "Major water pipe burst causing flooding on Oppanakkara Street in Gandhipuram.",
    lat: 11.0183, 
    lng: 76.9725, 
    status: "RESOLVED",
    category: "Water Supply",
    reportedDate: "2025-08-15",
    priority: "High"
  },
  {
    id: 15,
    title: "Pothole on road",
    description: "Large pothole causing traffic issues on Trichy Road near Singanallur.",
    lat: 10.9925,
    lng: 77.0251,
    status: "PENDING",
    category: "Roads",
    reportedDate: "2025-08-19",
    priority: "Low"
  }
];

const Styles = () => (
  <style>{`
    * {
      box-sizing: border-box;
    }
    
    body {
      margin: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }
    
    .dashboard {
      min-height: 100vh;
      background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
      color: white;
    }
    
    .header {
      background: rgba(30, 41, 59, 0.5);
      backdrop-filter: blur(12px);
      border-bottom: 1px solid rgba(71, 85, 105, 0.3);
      padding: 1.5rem;
    }
    
    .header-content {
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .main-title {
      font-size: 2.5rem;
      font-weight: 800;
      background: linear-gradient(135deg, #60a5fa, #a78bfa);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin: 0 0 0.5rem;
    }
    
    .subtitle {
      color: #cbd5e1;
      margin: 0 0 1rem;
    }
    
    .stats-grid {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
    }
    
    .stat-card {
      background: rgba(51, 65, 85, 0.5);
      border-radius: 0.5rem;
      padding: 0.75rem 1rem;
    }
    
    .stat-number {
      font-weight: 600;
      margin-right: 0.5rem;
    }
    
    .stat-number.pending { color: #fbbf24; }
    .stat-number.progress { color: #60a5fa; }
    .stat-number.resolved { color: #34d399; }
    
    .stat-label {
      color: #cbd5e1;
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 1.5rem;
    }
    
    .grid {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 1.5rem;
    }
    
    @media (max-width: 1024px) {
      .grid {
        grid-template-columns: 1fr;
      }
    }
    
    .card {
      background: rgba(30, 41, 59, 0.5);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(71, 85, 105, 0.3);
      border-radius: 1rem;
      padding: 1.5rem;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    }
    
    .map-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
      flex-wrap: wrap;
      gap: 1rem;
    }
    
    .map-info {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: #cbd5e1;
    }
    
    .map-info strong {
      color: white;
    }
    
    .map-icon {
      color: #60a5fa;
    }
    
    .badge-container {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
    }
    
    .status-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.25rem;
      padding: 0.25rem 0.5rem;
      font-size: 0.75rem;
      font-weight: 500;
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
    
    .priority-badge {
      display: inline-flex;
      padding: 0.25rem 0.5rem;
      font-size: 0.75rem;
      font-weight: 500;
      border-radius: 0.25rem;
      border: 1px solid;
    }
    
    .priority-high {
      background: rgba(254, 226, 226, 0.1);
      color: #dc2626;
      border-color: rgba(239, 68, 68, 0.3);
    }
    
    .priority-medium {
      background: rgba(255, 237, 213, 0.1);
      color: #ea580c;
      border-color: rgba(251, 146, 60, 0.3);
    }
    
    .priority-low {
      background: rgba(243, 244, 246, 0.1);
      color: #6b7280;
      border-color: rgba(156, 163, 175, 0.3);
    }
    
    .map-container {
      position: relative;
      overflow: hidden;
      border-radius: 0.75rem;
      background: rgba(15, 23, 42, 0.5);
    }
    
    .map-loading {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(15, 23, 42, 0.8);
      backdrop-filter: blur(4px);
      z-index: 10;
    }
    
    .loading-text {
      color: #94a3b8;
      animation: pulse 2s infinite;
    }
    
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
    
    .map-iframe {
      width: 100%;
      height: 24rem;
      border: 0;
    }
    
    .details-panel {
      margin-top: 1rem;
      padding: 1rem;
      background: rgba(15, 23, 42, 0.3);
      border-radius: 0.5rem;
    }
    
    .details-title {
      font-weight: 600;
      color: white;
      margin: 0 0 0.5rem;
    }
    
    .details-description {
      color: #cbd5e1;
      font-size: 0.875rem;
      margin-bottom: 0.75rem;
    }
    
    .details-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
      font-size: 0.875rem;
    }
    
    .detail-item {
      display: flex;
      flex-direction: column;
    }
    
    .detail-label {
      color: #94a3b8;
      margin-bottom: 0.25rem;
    }
    
    .detail-value {
      color: white;
    }
    
    .complaints-section {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
    
    .section-header {
      display: flex;
      justify-content: between;
      align-items: center;
      margin-bottom: 1rem;
    }
    
    .section-title {
      font-size: 1.25rem;
      font-weight: 600;
      color: white;
      margin: 0;
    }
    
    .new-button {
      background: linear-gradient(135deg, #3b82f6, #8b5cf6);
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      font-size: 0.875rem;
      font-weight: 500;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      transition: all 0.2s;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }
    
    .new-button:hover {
      background: linear-gradient(135deg, #2563eb, #7c3aed);
      transform: translateY(-1px);
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    }
    
    .controls {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }
    
    .input-wrapper {
      position: relative;
    }
    
    .input-icon {
      position: absolute;
      left: 0.75rem;
      top: 50%;
      transform: translateY(-50%);
      color: #94a3b8;
      width: 1rem;
      height: 1rem;
    }
    
    .search-input, .filter-select {
      width: 100%;
      background: rgba(15, 23, 42, 0.5);
      border: 1px solid #475569;
      border-radius: 0.5rem;
      padding: 0.5rem 0.75rem 0.5rem 2.5rem;
      color: white;
      font-size: 0.875rem;
    }
    
    .search-input::placeholder {
      color: #94a3b8;
    }
    
    .search-input:focus, .filter-select:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }
    
    .complaints-list {
      background: rgba(30, 41, 59, 0.5);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(71, 85, 105, 0.3);
      border-radius: 1rem;
      overflow: hidden;
    }
    
    .list-container {
      max-height: 24rem;
      overflow-y: auto;
    }
    
    .empty-state {
      padding: 1.5rem;
      text-align: center;
      color: #94a3b8;
    }
    
    .complaint-item {
      padding: 1rem;
      transition: all 0.2s;
      cursor: pointer;
      border-bottom: 1px solid rgba(71, 85, 105, 0.3);
    }
    
    .complaint-item:last-child {
      border-bottom: none;
    }
    
    .complaint-item:hover {
      background: rgba(51, 65, 85, 0.3);
    }
    
    .complaint-item.active {
      background: rgba(59, 130, 246, 0.1);
      border-left: 4px solid #60a5fa;
    }
    
    .complaint-content {
      display: flex;
      justify-content: between;
      align-items: flex-start;
      gap: 0.75rem;
    }
    
    .complaint-main {
      flex: 1;
      min-width: 0;
    }
    
    .complaint-header {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 0.5rem;
    }
    
    .complaint-id {
      font-weight: 600;
      color: white;
    }
    
    .complaint-title {
      color: white;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    
    .complaint-badges {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-bottom: 0.5rem;
    }
    
    .complaint-meta {
      font-size: 0.75rem;
      color: #94a3b8;
      line-height: 1.4;
    }
    
    .focus-button {
      padding: 0.375rem 0.75rem;
      font-size: 0.75rem;
      font-weight: 500;
      border-radius: 0.5rem;
      border: none;
      cursor: pointer;
      transition: all 0.2s;
      white-space: nowrap;
    }
    
    .focus-button.active {
      background: #3b82f6;
      color: white;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }
    
    .focus-button.inactive {
      background: #374151;
      color: #cbd5e1;
    }
    
    .focus-button.inactive:hover {
      background: #4b5563;
    }
    
    .footer-tip {
      padding: 1rem;
      background: rgba(15, 23, 42, 0.3);
      border-top: 1px solid rgba(71, 85, 105, 0.3);
    }
    
    .tip-text {
      font-size: 0.75rem;
      color: #94a3b8;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin: 0;
    }
    
    .tip-icon {
      width: 0.75rem;
      height: 0.75rem;
    }
  `}</style>
);

const StatusBadge = ({ status }) => {
  const statusConfig = {
    PENDING: { class: 'status-pending', icon: Clock },
    IN_PROGRESS: { class: 'status-progress', icon: AlertCircle },
    RESOLVED: { class: 'status-resolved', icon: CheckCircle }
  };
  
  const config = statusConfig[status];
  const Icon = config.icon;
  
  return (
    <span className={`status-badge ${config.class}`}>
      <Icon style={{ width: '0.75rem', height: '0.75rem' }} />
      {status.replace('_', ' ')}
    </span>
  );
};

const PriorityBadge = ({ priority }) => {
  const priorityClasses = {
    High: 'priority-high',
    Medium: 'priority-medium', 
    Low: 'priority-low'
  };
  
  return (
    <span className={`priority-badge ${priorityClasses[priority]}`}>
      {priority}
    </span>
  );
};

export default function ComplaintsMapPage() {
  const [focusedComplaint, setFocusedComplaint] = useState(MOCK_COMPLAINTS[0]);
  const [complaints] = useState(MOCK_COMPLAINTS);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [mapLoaded, setMapLoaded] = useState(false);

  const filteredComplaints = complaints.filter(complaint => {
    const matchesSearch = complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         complaint.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || complaint.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const mapSrc = `https://maps.google.com/maps?q=${focusedComplaint.lat},${focusedComplaint.lng}&z=16&output=embed`;

  const statusCounts = complaints.reduce((acc, complaint) => {
    acc[complaint.status] = (acc[complaint.status] || 0) + 1;
    return acc;
  }, {});

  useEffect(() => {
    const timer = setTimeout(() => setMapLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="dashboard">
      <Styles />
      
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <h1 className="main-title">City Complaints Dashboard</h1>
          <p className="subtitle">Track and manage citizen complaints with real-time location mapping</p>
          
          {/* Stats */}
          <div className="stats-grid">
            <div className="stat-card">
              <span className="stat-number pending">{statusCounts.PENDING || 0}</span>
              <span className="stat-label">Pending</span>
            </div>
            <div className="stat-card">
              <span className="stat-number progress">{statusCounts.IN_PROGRESS || 0}</span>
              <span className="stat-label">In Progress</span>
            </div>
            <div className="stat-card">
              <span className="stat-number resolved">{statusCounts.RESOLVED || 0}</span>
              <span className="stat-label">Resolved</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container">
        <div className="grid">
          {/* Map Section */}
          <div className="card">
            <div className="map-header">
              <div className="map-info">
                <MapPin className="map-icon" style={{ width: '1.25rem', height: '1.25rem' }} />
                <span>Viewing: <strong>#{focusedComplaint.id} · {focusedComplaint.title}</strong></span>
              </div>
              <div className="badge-container">
                <StatusBadge status={focusedComplaint.status} />
                <PriorityBadge priority={focusedComplaint.priority} />
              </div>
            </div>
            
            <div className="map-container">
              {!mapLoaded && (
                <div className="map-loading">
                  <div className="loading-text">Loading map...</div>
                </div>
              )}
              <iframe 
                title="complaint-location-map" 
                src={mapSrc}
                className="map-iframe"
                loading="lazy"
                onLoad={() => setMapLoaded(true)}
              />
            </div>
            
            <div className="details-panel">
              <h4 className="details-title">Complaint Details</h4>
              <p className="details-description">{focusedComplaint.description}</p>
              <div className="details-grid">
                <div className="detail-item">
                  <span className="detail-label">Category:</span>
                  <span className="detail-value">{focusedComplaint.category}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Reported:</span>
                  <span className="detail-value">{focusedComplaint.reportedDate}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Coordinates:</span>
                  <span className="detail-value">{focusedComplaint.lat.toFixed(4)}, {focusedComplaint.lng.toFixed(4)}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Priority:</span>
                  <span className="detail-value">{focusedComplaint.priority}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Complaints List */}
          <div className="complaints-section">
            {/* Search and Filter */}
            <div className="card">
              <div className="section-header">
                <h3 className="section-title">My Complaints</h3>
                <button className="new-button">
                  <Plus style={{ width: '1rem', height: '1rem' }} />
                  New
                </button>
              </div>
              
              <div className="controls">
                <div className="input-wrapper">
                  <Search className="input-icon" />
                  <input
                    type="text"
                    placeholder="Search complaints..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                  />
                </div>
                
                <div className="input-wrapper">
                  <Filter className="input-icon" />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="filter-select"
                  >
                    <option value="ALL">All Status</option>
                    <option value="PENDING">Pending</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="RESOLVED">Resolved</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Complaints List */}
            <div className="complaints-list">
              <div className="list-container">
                {filteredComplaints.length === 0 ? (
                  <div className="empty-state">
                    No complaints match your search criteria
                  </div>
                ) : (
                  filteredComplaints.map((complaint) => (
                    <div 
                      key={complaint.id} 
                      className={`complaint-item ${focusedComplaint.id === complaint.id ? 'active' : ''}`}
                      onClick={() => setFocusedComplaint(complaint)}
                    >
                      <div className="complaint-content">
                        <div className="complaint-main">
                          <div className="complaint-header">
                            <span className="complaint-id">#{complaint.id}</span>
                            <span style={{ color: '#cbd5e1' }}>·</span>
                            <span className="complaint-title">{complaint.title}</span>
                          </div>
                          
                          <div className="complaint-badges">
                            <StatusBadge status={complaint.status} />
                            <PriorityBadge priority={complaint.priority} />
                          </div>
                          
                          <div className="complaint-meta">
                            <div>{complaint.category} · {complaint.reportedDate}</div>
                            <div>{complaint.lat.toFixed(4)}, {complaint.lng.toFixed(4)}</div>
                          </div>
                        </div>
                        
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setFocusedComplaint(complaint);
                          }}
                          className={`focus-button ${focusedComplaint.id === complaint.id ? 'active' : 'inactive'}`}
                        >
                          {focusedComplaint.id === complaint.id ? 'Viewing' : 'Focus'}
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
              
              <div className="footer-tip">
                <p className="tip-text">
                  <MapPin className="tip-icon" />
                  GPS location is automatically captured when submitting new complaints
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
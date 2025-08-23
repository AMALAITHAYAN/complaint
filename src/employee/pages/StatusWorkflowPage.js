import React, { useMemo, useState, useCallback } from "react";
import { GitBranch, Clock, Play, CheckCircle, XCircle, ArrowRight, MessageSquare, User, Calendar, AlertTriangle } from "lucide-react";

const MOCK = [
  { 
    id: 3, 
    title: "Water leakage near 5th Ave", 
    status: "PENDING", 
    priority: "HIGH", 
    assignee: "John Doe",
    area: "Ward 4",
    createdAt: "2025-08-19",
    lastUpdated: "2025-08-19",
    history: [
      { status: "PENDING", timestamp: "2025-08-19 10:00", user: "System", remark: "Complaint filed" }
    ]
  },
  { 
    id: 2, 
    title: "Garbage not collected for 3 days", 
    status: "IN_PROGRESS", 
    priority: "MEDIUM", 
    assignee: "Jane Smith",
    area: "Ward 9",
    createdAt: "2025-08-17",
    lastUpdated: "2025-08-18",
    history: [
      { status: "PENDING", timestamp: "2025-08-17 09:00", user: "System", remark: "Complaint filed" },
      { status: "IN_PROGRESS", timestamp: "2025-08-18 14:30", user: "Jane Smith", remark: "Contacted waste management team" }
    ]
  },
  { 
    id: 1, 
    title: "Street light flickering intermittently", 
    status: "PENDING", 
    priority: "LOW", 
    assignee: "Mike Johnson",
    area: "Ward 12",
    createdAt: "2025-08-16",
    lastUpdated: "2025-08-16",
    history: [
      { status: "PENDING", timestamp: "2025-08-16 16:45", user: "System", remark: "Complaint filed" }
    ]
  },
];

const STATUSES = [
  { value: "PENDING", label: "Pending", icon: Clock, color: "#f59e0b" },
  { value: "IN_PROGRESS", label: "In Progress", icon: Play, color: "#3b82f6" },
  { value: "RESOLVED", label: "Resolved", icon: CheckCircle, color: "#10b981" },
  { value: "CLOSED", label: "Closed", icon: XCircle, color: "#6b7280" }
];

const PRIORITY_COLORS = {
  HIGH: "#ef4444",
  MEDIUM: "#f59e0b", 
  LOW: "#10b981"
};

const Styles = () => (
  <style>{`
    .title {
      font-size: 2.2rem;
      font-weight: 800;
      margin: 0 0 1.5rem;
      color: #ffffff;
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }
    
    .workflow-grid {
      display: grid;
      gap: 1.5rem;
      grid-template-columns: 1fr 1fr;
    }
    
    .card {
      background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
      border: 1px solid #334155;
      border-radius: 16px;
      padding: 1.5rem;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }
    
    .card-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1.5rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid #334155;
    }
    
    .card-title {
      color: #f8fafc;
      font-size: 1.1rem;
      font-weight: 700;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    
    .muted {
      color: #94a3b8;
      font-size: 0.85rem;
    }
    
    .complaint-list {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }
    
    .complaint-item {
      background: #0f172a;
      border: 1px solid #1e293b;
      border-radius: 12px;
      padding: 1rem;
      transition: all 0.2s ease;
      cursor: pointer;
    }
    
    .complaint-item:hover {
      border-color: #3b82f6;
      background: #1e293b;
    }
    
    .complaint-item.active {
      border-color: #3b82f6;
      background: rgba(59, 130, 246, 0.1);
    }
    
    .complaint-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 1rem;
      margin-bottom: 0.75rem;
    }
    
    .complaint-title {
      font-weight: 700;
      color: #f8fafc;
      font-size: 0.9rem;
      line-height: 1.3;
      flex: 1;
    }
    
    .complaint-id {
      color: #64748b;
      font-size: 0.8rem;
      font-weight: 600;
    }
    
    .complaint-meta {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
      align-items: center;
    }
    
    .status-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.375rem;
      padding: 0.25rem 0.625rem;
      border-radius: 12px;
      font-size: 0.7rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.025em;
    }
    
    .priority-badge {
      padding: 0.25rem 0.5rem;
      border-radius: 8px;
      font-size: 0.7rem;
      font-weight: 600;
      text-transform: uppercase;
      color: #ffffff;
    }
    
    .assignee-info {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: #94a3b8;
      font-size: 0.8rem;
    }
    
    .choose-btn {
      background: #3b82f6;
      border: none;
      color: #ffffff;
      padding: 0.5rem 1rem;
      border-radius: 8px;
      font-size: 0.8rem;
      font-weight: 600;
      cursor: pointer;
      transition: background-color 0.2s ease;
      display: flex;
      align-items: center;
      gap: 0.375rem;
    }
    
    .choose-btn:hover {
      background: #2563eb;
    }
    
    .active-section {
      background: #0f172a;
      border: 1px solid #1e293b;
      border-radius: 12px;
      padding: 1.5rem;
      margin-bottom: 1.5rem;
    }
    
    .active-title {
      font-weight: 800;
      color: #f8fafc;
      font-size: 1.1rem;
      margin-bottom: 1rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    
    .active-details {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
      margin-bottom: 1.5rem;
    }
    
    .detail-item {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }
    
    .detail-label {
      color: #64748b;
      font-size: 0.8rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      font-weight: 600;
    }
    
    .detail-value {
      color: #f8fafc;
      font-weight: 500;
    }
    
    .form-section {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
    
    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    
    .form-label {
      color: #f8fafc;
      font-weight: 600;
      font-size: 0.9rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    
    .select {
      background: #0f172a;
      color: #ffffff;
      border: 2px solid #334155;
      border-radius: 10px;
      padding: 0.75rem;
      font-size: 0.9rem;
      transition: all 0.2s ease;
    }
    
    .select:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }
    
    .textarea {
      background: #0f172a;
      color: #ffffff;
      border: 2px solid #334155;
      border-radius: 10px;
      padding: 0.75rem;
      font-size: 0.9rem;
      resize: vertical;
      min-height: 100px;
      font-family: inherit;
      transition: all 0.2s ease;
    }
    
    .textarea:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }
    
    .textarea::placeholder {
      color: #64748b;
    }
    
    .btn-container {
      display: flex;
      justify-content: flex-end;
      gap: 0.75rem;
      margin-top: 1rem;
    }
    
    .btn {
      background: #3b82f6;
      border: none;
      color: #ffffff;
      padding: 0.75rem 1.5rem;
      border-radius: 10px;
      font-size: 0.9rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    
    .btn:hover {
      background: #2563eb;
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
    }
    
    .btn:disabled {
      background: #374151;
      cursor: not-allowed;
      transform: none;
      box-shadow: none;
    }
    
    .btn-secondary {
      background: #374151;
      color: #d1d5db;
    }
    
    .btn-secondary:hover {
      background: #4b5563;
      box-shadow: 0 4px 12px rgba(75, 85, 99, 0.3);
    }
    
    .history-section {
      margin-top: 1.5rem;
      padding-top: 1.5rem;
      border-top: 1px solid #334155;
    }
    
    .history-title {
      color: #f8fafc;
      font-weight: 700;
      margin-bottom: 1rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    
    .history-list {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }
    
    .history-item {
      background: #0f172a;
      border-left: 3px solid #3b82f6;
      padding: 0.75rem;
      border-radius: 0 8px 8px 0;
    }
    
    .history-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.25rem;
    }
    
    .history-status {
      font-weight: 600;
      color: #f8fafc;
      font-size: 0.8rem;
    }
    
    .history-time {
      color: #64748b;
      font-size: 0.75rem;
    }
    
    .history-user {
      color: #94a3b8;
      font-size: 0.8rem;
      margin-bottom: 0.25rem;
    }
    
    .history-remark {
      color: #d1d5db;
      font-size: 0.8rem;
      font-style: italic;
    }
    
    .status-flow {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin: 1rem 0;
      padding: 1rem;
      background: #0f172a;
      border-radius: 10px;
      border: 1px solid #1e293b;
    }
    
    .current-status {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: #f8fafc;
      font-weight: 600;
    }
    
    .arrow {
      color: #64748b;
    }
    
    .next-status {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: #3b82f6;
      font-weight: 600;
    }
    
    @media (max-width: 768px) {
      .workflow-grid {
        grid-template-columns: 1fr;
      }
      
      .title {
        font-size: 1.8rem;
      }
      
      .active-details {
        grid-template-columns: 1fr;
      }
      
      .complaint-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
      }
    }
  `}</style>
);

export default function StatusWorkflowPage() {
  const [items, setItems] = useState(MOCK);
  const [activeId, setActiveId] = useState(MOCK[0].id);
  const [nextStatus, setNextStatus] = useState("IN_PROGRESS");
  const [remark, setRemark] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const activeItem = useMemo(() => 
    items.find(item => item.id === activeId), 
    [items, activeId]
  );

  const currentStatusConfig = useMemo(() => 
    STATUSES.find(s => s.value === activeItem?.status),
    [activeItem?.status]
  );

  const nextStatusConfig = useMemo(() => 
    STATUSES.find(s => s.value === nextStatus),
    [nextStatus]
  );

  const availableStatuses = useMemo(() => 
    STATUSES.filter(s => s.value !== activeItem?.status),
    [activeItem?.status]
  );

  const handleSelectComplaint = useCallback((id) => {
    setActiveId(id);
    setNextStatus("IN_PROGRESS");
    setRemark("");
  }, []);

  const handleApplyUpdate = useCallback(async () => {
    if (!activeItem || !remark.trim()) return;
    
    setIsUpdating(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const updatedItems = items.map(item => {
      if (item.id === activeId) {
        const newHistoryEntry = {
          status: nextStatus,
          timestamp: new Date().toISOString().slice(0, 16).replace('T', ' '),
          user: "Current User", // In real app, get from auth
          remark: remark.trim()
        };
        
        return {
          ...item,
          status: nextStatus,
          lastUpdated: new Date().toISOString().slice(0, 10),
          history: [...item.history, newHistoryEntry]
        };
      }
      return item;
    });
    
    setItems(updatedItems);
    setRemark("");
    setIsUpdating(false);
    
    // Show success notification (in real app, use proper toast/notification)
    alert(`✅ Status Updated!\n\nComplaint #${activeId} moved to ${nextStatus}\nRemark: ${remark}`);
  }, [activeId, activeItem, items, nextStatus, remark]);

  const getStatusIcon = (status) => {
    const config = STATUSES.find(s => s.value === status);
    if (!config) return Clock;
    return config.icon;
  };

  const getStatusColor = (status) => {
    const config = STATUSES.find(s => s.value === status);
    return config?.color || "#6b7280";
  };

  return (
    <>
      <Styles />
      <div style={{ minHeight: '100vh' }}>
        <h1 className="title">
          <GitBranch size={28} />
          Status Update Workflow
        </h1>

        <div className="workflow-grid">
          {/* Complaints List */}
          <section className="card">
            <div className="card-header">
              <div className="card-title">
                <Clock size={20} />
                Select Complaint
              </div>
              <div className="muted">{items.length} complaints</div>
            </div>

            <ul className="complaint-list">
              {items.map(item => {
                const StatusIcon = getStatusIcon(item.status);
                const isActive = item.id === activeId;
                
                return (
                  <li 
                    key={item.id} 
                    className={`complaint-item ${isActive ? 'active' : ''}`}
                    onClick={() => handleSelectComplaint(item.id)}
                  >
                    <div className="complaint-header">
                      <div>
                        <div className="complaint-id">#{item.id}</div>
                        <div className="complaint-title">{item.title}</div>
                      </div>
                      {isActive && (
                        <div className="choose-btn" style={{ background: '#10b981' }}>
                          Selected
                        </div>
                      )}
                    </div>
                    
                    <div className="complaint-meta">
                      <div 
                        className="status-badge" 
                        style={{ 
                          backgroundColor: `${getStatusColor(item.status)}20`,
                          color: getStatusColor(item.status),
                          border: `1px solid ${getStatusColor(item.status)}40`
                        }}
                      >
                        <StatusIcon size={12} />
                        {item.status.replace('_', ' ')}
                      </div>
                      
                      <div 
                        className="priority-badge"
                        style={{ backgroundColor: PRIORITY_COLORS[item.priority] }}
                      >
                        {item.priority}
                      </div>
                      
                      <div className="assignee-info">
                        <User size={12} />
                        {item.assignee}
                      </div>
                      
                      <div className="assignee-info">
                        <Calendar size={12} />
                        {item.area}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>

          {/* Status Update Panel */}
          <section className="card">
            <div className="card-header">
              <div className="card-title">
                <ArrowRight size={20} />
                Update Status
              </div>
            </div>

            {activeItem && (
              <>
                <div className="active-section">
                  <div className="active-title">
                    <AlertTriangle size={20} />
                    #{activeItem.id} · {activeItem.title}
                  </div>
                  
                  <div className="active-details">
                    <div className="detail-item">
                      <div className="detail-label">Current Status</div>
                      <div className="detail-value">{activeItem.status.replace('_', ' ')}</div>
                    </div>
                    <div className="detail-item">
                      <div className="detail-label">Priority</div>
                      <div className="detail-value">{activeItem.priority}</div>
                    </div>
                    <div className="detail-item">
                      <div className="detail-label">Assignee</div>
                      <div className="detail-value">{activeItem.assignee}</div>
                    </div>
                    <div className="detail-item">
                      <div className="detail-label">Area</div>
                      <div className="detail-value">{activeItem.area}</div>
                    </div>
                  </div>

                  {/* Status Flow Visualization */}
                  <div className="status-flow">
                    <div className="current-status">
                      {currentStatusConfig && <currentStatusConfig.icon size={16} />}
                      {activeItem.status.replace('_', ' ')}
                    </div>
                    <ArrowRight className="arrow" size={16} />
                    <div className="next-status">
                      {nextStatusConfig && <nextStatusConfig.icon size={16} />}
                      {nextStatus.replace('_', ' ')}
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <div className="form-group">
                    <label className="form-label">
                      <ArrowRight size={16} />
                      Next Status
                    </label>
                    <select 
                      className="select" 
                      value={nextStatus} 
                      onChange={e => setNextStatus(e.target.value)}
                    >
                      {availableStatuses.map(status => (
                        <option key={status.value} value={status.value}>
                          {status.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <MessageSquare size={16} />
                      Update Remark *
                    </label>
                    <textarea 
                      className="textarea"
                      rows={4} 
                      value={remark} 
                      onChange={e => setRemark(e.target.value)}
                      placeholder="Describe the action taken or reason for status change..."
                    />
                  </div>

                  <div className="btn-container">
                    <button 
                      className="btn-secondary btn"
                      onClick={() => setRemark("")}
                      disabled={!remark.trim()}
                    >
                      Clear
                    </button>
                    <button 
                      className="btn"
                      onClick={handleApplyUpdate}
                      disabled={!remark.trim() || isUpdating}
                    >
                      {isUpdating ? (
                        <>
                          <Clock size={16} className="animate-spin" />
                          Updating...
                        </>
                      ) : (
                        <>
                          <CheckCircle size={16} />
                          Apply Update
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Status History */}
                <div className="history-section">
                  <div className="history-title">
                    <Clock size={16} />
                    Status History
                  </div>
                  <div className="history-list">
                    {activeItem.history.slice().reverse().map((entry, index) => (
                      <div key={index} className="history-item">
                        <div className="history-header">
                          <div className="history-status">{entry.status.replace('_', ' ')}</div>
                          <div className="history-time">{entry.timestamp}</div>
                        </div>
                        <div className="history-user">by {entry.user}</div>
                        <div className="history-remark">"{entry.remark}"</div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </section>
        </div>
      </div>
    </>
  );
}
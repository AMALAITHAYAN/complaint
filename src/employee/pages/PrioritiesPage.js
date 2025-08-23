import React, { useMemo, useState, useCallback } from "react";
import { Search, Filter, Clock, AlertTriangle, CheckCircle, Circle, Eye, ArrowUpDown } from "lucide-react";

const MOCK = [
  { id: 3, title: "Water leakage near 5th Ave", priority: "HIGH", due: "Today 17:00", status: "PENDING", area: "Ward 4", assignedTo: "John Doe", createdAt: "2025-08-19" },
  { id: 7, title: "Pothole at Main Rd intersection causing traffic delays", priority: "MEDIUM", due: "Tomorrow", status: "IN_PROGRESS", area: "Ward 2", assignedTo: "Jane Smith", createdAt: "2025-08-18" },
  { id: 2, title: "Garbage not collected for 3 days", priority: "MEDIUM", due: "Today", status: "IN_PROGRESS", area: "Ward 9", assignedTo: "Mike Johnson", createdAt: "2025-08-17" },
  { id: 1, title: "Street light flickering intermittently", priority: "LOW", due: "In 3 days", status: "PENDING", area: "Ward 12", assignedTo: "Sarah Wilson", createdAt: "2025-08-16" },
  { id: 8, title: "Broken sidewalk near school", priority: "HIGH", due: "Today 15:00", status: "RESOLVED", area: "Ward 1", assignedTo: "Tom Brown", createdAt: "2025-08-15" },
  { id: 9, title: "Noise complaint from construction site", priority: "LOW", due: "Next week", status: "CLOSED", area: "Ward 6", assignedTo: "Lisa Davis", createdAt: "2025-08-14" },
];

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
    
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      margin-bottom: 2rem;
    }
    
    .stat-card {
      background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
      border: 1px solid #334155;
      border-radius: 16px;
      padding: 1.5rem;
      display: flex;
      align-items: center;
      gap: 1rem;
      transition: all 0.2s ease;
    }
    
    .stat-card:hover {
      border-color: #3b82f6;
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(59, 130, 246, 0.1);
    }
    
    .stat-icon {
      width: 48px;
      height: 48px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    
    .stat-content h3 {
      font-size: 1.75rem;
      font-weight: 800;
      margin: 0;
      color: #ffffff;
    }
    
    .stat-content p {
      font-size: 0.875rem;
      color: #94a3b8;
      margin: 0.25rem 0 0;
    }
    
    .toolbar {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      margin-bottom: 1.5rem;
      align-items: center;
    }
    
    .search-wrapper {
      position: relative;
      flex: 1;
      min-width: 250px;
    }
    
    .search-icon {
      position: absolute;
      left: 12px;
      top: 50%;
      transform: translateY(-50%);
      color: #64748b;
      width: 20px;
      height: 20px;
    }
    
    .input {
      background: #0f172a;
      color: #ffffff;
      border: 2px solid #334155;
      border-radius: 12px;
      padding: 0.75rem 1rem 0.75rem 2.5rem;
      width: 100%;
      font-size: 0.9rem;
      transition: all 0.2s ease;
    }
    
    .input:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }
    
    .select {
      background: #0f172a;
      color: #ffffff;
      border: 2px solid #334155;
      border-radius: 12px;
      padding: 0.75rem 1rem;
      font-size: 0.9rem;
      cursor: pointer;
      transition: all 0.2s ease;
      min-width: 160px;
    }
    
    .select:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }
    
    .filter-chips {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
    }
    
    .chip {
      background: #1e293b;
      border: 1px solid #334155;
      color: #94a3b8;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      font-size: 0.8rem;
      cursor: pointer;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    
    .chip.active {
      background: #3b82f6;
      border-color: #3b82f6;
      color: #ffffff;
    }
    
    .chip:hover {
      background: #334155;
      color: #ffffff;
    }
    
    .results-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }
    
    .results-count {
      color: #94a3b8;
      font-size: 0.9rem;
    }
    
    .sort-button {
      background: #1e293b;
      border: 1px solid #334155;
      color: #94a3b8;
      padding: 0.5rem 1rem;
      border-radius: 8px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.8rem;
      transition: all 0.2s ease;
    }
    
    .sort-button:hover {
      background: #334155;
      color: #ffffff;
    }
    
    .card {
      background: #0f172a;
      border: 1px solid #1e293b;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }
    
    .table-container {
      overflow-x: auto;
    }
    
    table {
      width: 100%;
      border-collapse: collapse;
      min-width: 800px;
    }
    
    th, td {
      padding: 1rem 1.25rem;
      text-align: left;
      border-bottom: 1px solid #1e293b;
    }
    
    th {
      background: #0b1220;
      color: #94a3b8;
      font-weight: 600;
      font-size: 0.85rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      position: sticky;
      top: 0;
      z-index: 1;
    }
    
    tr {
      transition: background-color 0.2s ease;
    }
    
    tbody tr:hover {
      background: #1e293b;
    }
    
    .priority-row {
      border-left: 4px solid transparent;
    }
    
    .priority-row.high {
      border-left-color: #ef4444;
      background: rgba(239, 68, 68, 0.05);
    }
    
    .priority-row.medium {
      border-left-color: #f59e0b;
    }
    
    .priority-row.low {
      border-left-color: #10b981;
    }
    
    .task-link {
      color: #f8fafc;
      text-decoration: none;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      transition: color 0.2s ease;
    }
    
    .task-link:hover {
      color: #3b82f6;
    }
    
    .pill {
      display: inline-flex;
      align-items: center;
      gap: 0.375rem;
      padding: 0.375rem 0.75rem;
      border-radius: 20px;
      font-size: 0.75rem;
      font-weight: 600;
      color: #ffffff;
      text-transform: uppercase;
      letter-spacing: 0.025em;
    }
    
    .assignee {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: #94a3b8;
    }
    
    .avatar {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: linear-gradient(45deg, #3b82f6, #8b5cf6);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ffffff;
      font-size: 0.7rem;
      font-weight: 600;
    }
    
    .due-date {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: #94a3b8;
    }
    
    .due-urgent {
      color: #ef4444;
      font-weight: 600;
    }
    
    .empty-state {
      text-align: center;
      padding: 3rem;
      color: #64748b;
    }
    
    .empty-state h3 {
      font-size: 1.2rem;
      margin-bottom: 0.5rem;
    }
    
    @media (max-width: 768px) {
      .title {
        font-size: 1.8rem;
      }
      
      .toolbar {
        flex-direction: column;
        align-items: stretch;
      }
      
      .search-wrapper {
        min-width: auto;
      }
      
      .stats-grid {
        grid-template-columns: repeat(2, 1fr);
      }
      
      .filter-chips {
        justify-content: center;
      }
    }
  `}</style>
);

const priorityConfig = {
  HIGH: { color: "#ef4444", bg: "rgba(239, 68, 68, 0.1)", icon: AlertTriangle },
  MEDIUM: { color: "#f59e0b", bg: "rgba(245, 158, 11, 0.1)", icon: Clock },
  LOW: { color: "#10b981", bg: "rgba(16, 185, 129, 0.1)", icon: Circle }
};

const statusConfig = {
  PENDING: { color: "#f59e0b", bg: "rgba(245, 158, 11, 0.1)", icon: Clock },
  IN_PROGRESS: { color: "#3b82f6", bg: "rgba(59, 130, 246, 0.1)", icon: Circle },
  RESOLVED: { color: "#10b981", bg: "rgba(16, 185, 129, 0.1)", icon: CheckCircle },
  CLOSED: { color: "#6b7280", bg: "rgba(107, 114, 128, 0.1)", icon: CheckCircle }
};

export default function PrioritiesPage() {
  const [query, setQuery] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [sortBy, setSortBy] = useState("priority");

  const filteredAndSortedData = useMemo(() => {
    let rows = [...MOCK];
    
    // Apply filters
    if (priorityFilter !== "ALL") {
      rows = rows.filter(r => r.priority === priorityFilter);
    }
    
    if (statusFilter !== "ALL") {
      rows = rows.filter(r => r.status === statusFilter);
    }
    
    if (query.trim()) {
      const searchTerm = query.toLowerCase();
      rows = rows.filter(r => 
        r.title.toLowerCase().includes(searchTerm) ||
        r.area.toLowerCase().includes(searchTerm) ||
        r.assignedTo.toLowerCase().includes(searchTerm)
      );
    }
    
    // Apply sorting
    rows.sort((a, b) => {
      if (sortBy === "priority") {
        const priorityOrder = { HIGH: 3, MEDIUM: 2, LOW: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      }
      if (sortBy === "due") {
        // Simple date comparison (in real app, parse dates properly)
        if (a.due.includes("Today") && !b.due.includes("Today")) return -1;
        if (!a.due.includes("Today") && b.due.includes("Today")) return 1;
        return 0;
      }
      return a.id - b.id;
    });
    
    return rows;
  }, [query, priorityFilter, statusFilter, sortBy]);

  const stats = useMemo(() => {
    const total = MOCK.length;
    const pending = MOCK.filter(t => t.status === "PENDING").length;
    const inProgress = MOCK.filter(t => t.status === "IN_PROGRESS").length;
    const high = MOCK.filter(t => t.priority === "HIGH").length;
    
    return { total, pending, inProgress, high };
  }, []);

  const getInitials = useCallback((name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  }, []);

  const isDueUrgent = useCallback((due) => {
    return due.includes("Today") && due.includes(":") ? 
      parseInt(due.split(" ")[1].split(":")[0]) < 18 : false;
  }, []);

  const renderPriorityPill = (priority) => {
    const config = priorityConfig[priority];
    const Icon = config.icon;
    return (
      <span className="pill" style={{ background: config.color }}>
        <Icon size={12} />
        {priority}
      </span>
    );
  };

  const renderStatusPill = (status) => {
    const config = statusConfig[status];
    const Icon = config.icon;
    return (
      <span className="pill" style={{ background: config.color }}>
        <Icon size={12} />
        {status.replace('_', ' ')}
      </span>
    );
  };

  return (
    <>
      <Styles />
      <div style={{ padding: '0', minHeight: '100vh' }}>
        <h1 className="title">
          <Filter size={28} />
          Task Prioritization
        </h1>

        {/* Statistics Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon" style={{ background: "rgba(59, 130, 246, 0.1)" }}>
              <Circle size={24} color="#3b82f6" />
            </div>
            <div className="stat-content">
              <h3>{stats.total}</h3>
              <p>Total Tasks</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon" style={{ background: "rgba(245, 158, 11, 0.1)" }}>
              <Clock size={24} color="#f59e0b" />
            </div>
            <div className="stat-content">
              <h3>{stats.pending}</h3>
              <p>Pending</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon" style={{ background: "rgba(59, 130, 246, 0.1)" }}>
              <Circle size={24} color="#3b82f6" />
            </div>
            <div className="stat-content">
              <h3>{stats.inProgress}</h3>
              <p>In Progress</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon" style={{ background: "rgba(239, 68, 68, 0.1)" }}>
              <AlertTriangle size={24} color="#ef4444" />
            </div>
            <div className="stat-content">
              <h3>{stats.high}</h3>
              <p>High Priority</p>
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="toolbar">
          <div className="search-wrapper">
            <Search className="search-icon" />
            <input
              className="input"
              placeholder="Search tasks, areas, or assignees..."
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
          </div>
          
          <select 
            className="select" 
            value={priorityFilter} 
            onChange={e => setPriorityFilter(e.target.value)}
          >
            <option value="ALL">All Priorities</option>
            <option value="HIGH">High Priority</option>
            <option value="MEDIUM">Medium Priority</option>
            <option value="LOW">Low Priority</option>
          </select>
          
          <select 
            className="select" 
            value={statusFilter} 
            onChange={e => setStatusFilter(e.target.value)}
          >
            <option value="ALL">All Statuses</option>
            <option value="PENDING">Pending</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="RESOLVED">Resolved</option>
            <option value="CLOSED">Closed</option>
          </select>
        </div>

        {/* Filter Chips */}
        <div className="filter-chips">
          <div 
            className={`chip ${sortBy === "priority" ? "active" : ""}`}
            onClick={() => setSortBy("priority")}
          >
            <AlertTriangle size={14} />
            Sort by Priority
          </div>
          <div 
            className={`chip ${sortBy === "due" ? "active" : ""}`}
            onClick={() => setSortBy("due")}
          >
            <Clock size={14} />
            Sort by Due Date
          </div>
          <div 
            className={`chip ${sortBy === "id" ? "active" : ""}`}
            onClick={() => setSortBy("id")}
          >
            Sort by ID
          </div>
        </div>

        {/* Results Header */}
        <div className="results-header">
          <div className="results-count">
            Showing {filteredAndSortedData.length} of {MOCK.length} tasks
          </div>
          <button className="sort-button">
            <ArrowUpDown size={14} />
            Sort Options
          </button>
        </div>

        {/* Table */}
        <div className="card">
          <div className="table-container">
            {filteredAndSortedData.length === 0 ? (
              <div className="empty-state">
                <h3>No tasks found</h3>
                <p>Try adjusting your search criteria or filters</p>
              </div>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th style={{ width: 60 }}>ID</th>
                    <th>Task Details</th>
                    <th style={{ width: 140 }}>Priority</th>
                    <th style={{ width: 160 }}>Status</th>
                    <th style={{ width: 160 }}>Due Date</th>
                    <th style={{ width: 140 }}>Area</th>
                    <th style={{ width: 160 }}>Assignee</th>
                    <th style={{ width: 80 }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAndSortedData.map(task => (
                    <tr 
                      key={task.id} 
                      className={`priority-row ${task.priority.toLowerCase()}`}
                    >
                      <td>#{task.id}</td>
                      <td>
                        <div className="task-link">
                          {task.title}
                        </div>
                      </td>
                      <td>{renderPriorityPill(task.priority)}</td>
                      <td>{renderStatusPill(task.status)}</td>
                      <td>
                        <div className={`due-date ${isDueUrgent(task.due) ? 'due-urgent' : ''}`}>
                          <Clock size={14} />
                          {task.due}
                        </div>
                      </td>
                      <td>{task.area}</td>
                      <td>
                        <div className="assignee">
                          <div className="avatar">
                            {getInitials(task.assignedTo)}
                          </div>
                          {task.assignedTo}
                        </div>
                      </td>
                      <td>
                        <button 
                          className="chip"
                          style={{ border: 'none', padding: '0.5rem' }}
                        >
                          <Eye size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
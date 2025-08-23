import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ComplaintList() {
  const [complaints, setComplaints] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get('/api/complaints');
        setComplaints(response.data);
      } catch (error) {
        console.error('Error fetching complaints:', error);
      }
    };

    fetchComplaints();
  }, []);

  const filteredComplaints = complaints.filter(c => {
    const matchTitle = c.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = !statusFilter || c.status === statusFilter;
    return matchTitle && matchStatus;
  });

  return (
    <div>
      <h2>Complaint List</h2>
      <div>
        <input
          data-testid="search-input"
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          data-testid="status-filter"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All</option>
          <option value="PENDING">Pending</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="RESOLVED">Resolved</option>
        </select>
      </div>
      <ul>
        {filteredComplaints.length > 0 ? (
          filteredComplaints.map(c => (
            <li key={c.id}>
              <strong>{c.title}</strong> - {c.status} - {c.priority}
            </li>
          ))
        ) : (
          <li>No complaints</li>
        )}
      </ul>
    </div> 
  );
}

export default ComplaintList;

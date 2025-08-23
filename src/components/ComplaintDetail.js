import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function ComplaintDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [complaint, setComplaint] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(`/api/complaints/${id}`)
      .then(res => setComplaint(res.data))
      .catch(err => setError(err.response?.data?.message || 'Not found!'));
  }, [id]);

  if (error) {
    return (
      <div>
        <p>{error}</p>
        <button onClick={() => navigate('/complaints')}>Back to List</button>
      </div>
    );
  }

  if (!complaint) return <p>Loading...</p>;

  return (
    <div>
      <h2>{complaint.title}</h2>
      <p>{complaint.category}</p>
      <p>Resolved Date: {complaint.resolvedDate}</p>
      <p>Assigned To: {complaint.assignedTo}</p>
      <p>{complaint.resolutionComments}</p>
      <button onClick={() => navigate('/complaints')}>Back to List</button>
    </div>
  );
}

export default ComplaintDetail;

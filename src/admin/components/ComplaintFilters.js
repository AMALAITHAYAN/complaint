import React from 'react';

const ComplaintFilters = ({ onFilterChange }) => {
    const handleInputChange = (e) => {
        onFilterChange({ [e.target.name]: e.target.value });
    };

    return (
        <div className="filters-container">
            {/* --- UPDATED STATUSES --- */}
            <select name="status" onChange={handleInputChange} className="filter-select">
                <option value="">All Statuses</option>
                <option value="PENDING">Pending</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="RESOLVED">Resolved</option>
                <option value="REJECTED">Rejected</option>
            </select>
            
            {/* --- UPDATED CATEGORIES --- */}
            <select name="category" onChange={handleInputChange} className="filter-select">
                <option value="">All Categories</option>
                <option value="INFRASTRUCTURE">Infrastructure</option>
                <option value="SERVICE">Service</option>
                <option value="PERSONNEL">Personnel</option>
                <option value="OTHER">Other</option>
            </select>
        </div>
    );
};

export default ComplaintFilters;
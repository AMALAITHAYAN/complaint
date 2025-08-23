import React from 'react';

const EmployeePerformanceTable = ({ data }) => {
    return (
        <div className="table-wrapper">
            <table className="user-table">
                <thead>
                    <tr>
                        <th>Employee</th>
                        <th>Assigned</th>
                        <th>Resolved</th>
                        <th>Avg. Resolution (Hours)</th>
                    </tr>
                </thead>
                <tbody>
                    {data.rows.map(row => (
                        <tr key={row.employeeUsername}>
                            <td>{row.employeeUsername}</td>
                            <td>{row.assignedCount}</td>
                            <td>{row.resolvedCount}</td>
                            <td>{row.avgResolutionHours?.toFixed(2) || 'N/A'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeePerformanceTable;
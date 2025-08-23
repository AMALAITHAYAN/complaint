import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

const AdminDashboard = () => {
    // Static data for demonstration
    const [stats] = useState({
        totalComplaints: 12,
        pendingComplaints: 9,
        resolvedComplaints: 16,
        averageResolutionTime: '4.2 days'
    });

    const [categoryData] = useState([
        { name: 'Infrastructure', value: 2, color: '#3b82f6' },
        { name: 'Utilities', value: 8, color: '#10b981' },
        { name: 'Public Safety', value: 2, color: '#f59e0b' },
        { name: 'Environment', value: 2, color: '#ef4444' },
        { name: 'Transportation', value: 2, color: '#8b5cf6' }
    ]);

    const [monthlyData] = useState([
        { month: 'Jan', complaints: 98, resolved: 92 },
        { month: 'Feb', complaints: 112, resolved: 108 },
        { month: 'Mar', complaints: 89, resolved: 85 },
        { month: 'Apr', complaints: 134, resolved: 128 },
        { month: 'May', complaints: 156, resolved: 148 },
        { month: 'Jun', complaints: 142, resolved: 135 }
    ]);

    const [recentComplaints] = useState([
        { id: 'C-1247', title: 'Streetlight not working on Park Avenue', category: 'Infrastructure', status: 'Pending', priority: 'High', submittedBy: 'John Doe', date: '2025-01-18' },
        { id: 'C-1246', title: 'Water leakage near City Hall', category: 'Utilities', status: 'In Progress', priority: 'Critical', submittedBy: 'Jane Smith', date: '2025-01-18' },
        { id: 'C-1245', title: 'Potholes on Main Street', category: 'Infrastructure', status: 'Resolved', priority: 'Medium', submittedBy: 'Mike Johnson', date: '2025-01-17' },
        { id: 'C-1244', title: 'Noise complaint from construction site', category: 'Environment', status: 'Pending', priority: 'Low', submittedBy: 'Sarah Wilson', date: '2025-01-17' },
        { id: 'C-1243', title: 'Bus stop shelter damaged', category: 'Transportation', status: 'In Progress', priority: 'Medium', submittedBy: 'Tom Brown', date: '2025-01-16' }
    ]);

    const StatCard = ({ title, value, change, icon, color }) => (
        <div style={{
            background: 'rgba(51, 65, 85, 0.6)',
            padding: '1.5rem',
            borderRadius: '12px',
            border: '1px solid rgba(71, 85, 105, 0.3)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '3px',
                background: color
            }}></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div>
                    <h3 style={{ fontSize: '0.75rem', fontWeight: '600', color: '#9ca3af', margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        {title}
                    </h3>
                    <p style={{ fontSize: '2rem', fontWeight: '700', color: '#f8fafc', margin: '0.5rem 0' }}>
                        {value}
                    </p>
                </div>
                <div style={{ fontSize: '1.5rem', opacity: 0.7 }}>{icon}</div>
            </div>
            {change && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ color: change.startsWith('+') ? '#10b981' : '#ef4444', fontSize: '0.75rem', fontWeight: '600' }}>
                        {change}
                    </span>
                    <span style={{ color: '#9ca3af', fontSize: '0.75rem' }}>vs last month</span>
                </div>
            )}
        </div>
    );

    const PriorityBadge = ({ priority }) => {
        const colors = {
            'Critical': { bg: 'rgba(239, 68, 68, 0.2)', text: '#fca5a5', border: 'rgba(239, 68, 68, 0.3)' },
            'High': { bg: 'rgba(245, 158, 11, 0.2)', text: '#fbbf24', border: 'rgba(245, 158, 11, 0.3)' },
            'Medium': { bg: 'rgba(59, 130, 246, 0.2)', text: '#93c5fd', border: 'rgba(59, 130, 246, 0.3)' },
            'Low': { bg: 'rgba(16, 185, 129, 0.2)', text: '#6ee7b7', border: 'rgba(16, 185, 129, 0.3)' }
        };
        const style = colors[priority] || colors['Medium'];
        
        return (
            <span style={{
                background: style.bg,
                color: style.text,
                border: `1px solid ${style.border}`,
                padding: '0.25rem 0.5rem',
                borderRadius: '6px',
                fontSize: '0.7rem',
                fontWeight: '600',
                textTransform: 'uppercase'
            }}>
                {priority}
            </span>
        );
    };

    const StatusBadge = ({ status }) => {
        const colors = {
            'Pending': { bg: 'rgba(245, 158, 11, 0.2)', text: '#fbbf24', border: 'rgba(245, 158, 11, 0.3)' },
            'In Progress': { bg: 'rgba(59, 130, 246, 0.2)', text: '#93c5fd', border: 'rgba(59, 130, 246, 0.3)' },
            'Resolved': { bg: 'rgba(16, 185, 129, 0.2)', text: '#6ee7b7', border: 'rgba(16, 185, 129, 0.3)' }
        };
        const style = colors[status] || colors['Pending'];
        
        return (
            <span style={{
                background: style.bg,
                color: style.text,
                border: `1px solid ${style.border}`,
                padding: '0.25rem 0.5rem',
                borderRadius: '6px',
                fontSize: '0.7rem',
                fontWeight: '600'
            }}>
                {status}
            </span>
        );
    };

    return (
        <div>
            {/* Header - matching your existing style */}
            <h1 style={{ fontSize: '2.5rem', fontWeight: '700', margin: 0, color: '#fff' }}>
                Admin Dashboard
            </h1>
            <p style={{ marginTop: '1rem', fontSize: '1.2rem', color: '#9ca3af', marginBottom: '2rem' }}>
                Monitor and manage citizen complaints effectively
            </p>

            {/* Stats Grid */}
            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
                gap: '1rem',
                marginBottom: '2rem'
            }}>
                <StatCard 
                    title="Total Complaints" 
                    value={stats.totalComplaints.toLocaleString()} 
                    change="+12%" 
                    icon="📋" 
                    color="#3b82f6"
                />
                <StatCard 
                    title="Pending" 
                    value={stats.pendingComplaints} 
                    change="-8%" 
                    icon="⏳" 
                    color="#f59e0b"
                />
                <StatCard 
                    title="Resolved" 
                    value={stats.resolvedComplaints.toLocaleString()} 
                    change="+15%" 
                    icon="✅" 
                    color="#10b981"
                />
                <StatCard 
                    title="Avg Resolution" 
                    value={stats.averageResolutionTime} 
                    change="-0.3 days" 
                    icon="⚡" 
                    color="#8b5cf6"
                />
            </div>

            {/* Charts Section */}
            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
                gap: '1.5rem',
                marginBottom: '2rem'
            }}>
                {/* Monthly Trends */}
                <div style={{
                    background: 'rgba(51, 65, 85, 0.6)',
                    padding: '1.5rem',
                    borderRadius: '12px',
                    border: '1px solid rgba(71, 85, 105, 0.3)'
                }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#f8fafc', marginBottom: '1rem', margin: 0 }}>
                        Monthly Complaint Trends
                    </h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={monthlyData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(156, 163, 175, 0.2)" />
                            <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} />
                            <YAxis stroke="#9ca3af" fontSize={12} />
                            <Line 
                                type="monotone" 
                                dataKey="complaints" 
                                stroke="#3b82f6" 
                                strokeWidth={2}
                                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                            />
                            <Line 
                                type="monotone" 
                                dataKey="resolved" 
                                stroke="#10b981" 
                                strokeWidth={2}
                                dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Category Distribution */}
                <div style={{
                    background: 'rgba(51, 65, 85, 0.6)',
                    padding: '1.5rem',
                    borderRadius: '12px',
                    border: '1px solid rgba(71, 85, 105, 0.3)'
                }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#f8fafc', marginBottom: '1rem', margin: 0 }}>
                        Complaints by Category
                    </h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                        <ResponsiveContainer width="50%" height={200}>
                            <PieChart>
                                <Pie
                                    data={categoryData}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={70}
                                    fill="#8884d8"
                                    dataKey="value"
                                    strokeWidth={2}
                                    stroke="rgba(51, 65, 85, 0.8)"
                                >
                                    {categoryData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                        <div style={{ flex: 1 }}>
                            {categoryData.map((item, index) => (
                                <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                                    <div style={{
                                        width: '10px',
                                        height: '10px',
                                        backgroundColor: item.color,
                                        borderRadius: '50%',
                                        marginRight: '0.5rem'
                                    }}></div>
                                    <span style={{ color: '#f8fafc', fontSize: '0.8rem', flex: 1 }}>{item.name}</span>
                                    <span style={{ color: '#9ca3af', fontSize: '0.75rem', fontWeight: '600' }}>{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Complaints Table */}
            <div style={{
                background: 'rgba(51, 65, 85, 0.6)',
                padding: '1.5rem',
                borderRadius: '12px',
                border: '1px solid rgba(71, 85, 105, 0.3)'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#f8fafc', margin: 0 }}>
                        Recent Complaints
                    </h3>
                    <button style={{
                        background: '#3b82f6',
                        color: 'white',
                        border: 'none',
                        padding: '0.5rem 1rem',
                        borderRadius: '6px',
                        fontSize: '0.8rem',
                        fontWeight: '600',
                        cursor: 'pointer'
                    }}>
                        View All
                    </button>
                </div>
                
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid rgba(71, 85, 105, 0.5)' }}>
                                <th style={{ textAlign: 'left', padding: '0.75rem', color: '#9ca3af', fontWeight: '600', fontSize: '0.8rem' }}>ID</th>
                                <th style={{ textAlign: 'left', padding: '0.75rem', color: '#9ca3af', fontWeight: '600', fontSize: '0.8rem' }}>Title</th>
                                <th style={{ textAlign: 'left', padding: '0.75rem', color: '#9ca3af', fontWeight: '600', fontSize: '0.8rem' }}>Category</th>
                                <th style={{ textAlign: 'left', padding: '0.75rem', color: '#9ca3af', fontWeight: '600', fontSize: '0.8rem' }}>Status</th>
                                <th style={{ textAlign: 'left', padding: '0.75rem', color: '#9ca3af', fontWeight: '600', fontSize: '0.8rem' }}>Priority</th>
                                <th style={{ textAlign: 'left', padding: '0.75rem', color: '#9ca3af', fontWeight: '600', fontSize: '0.8rem' }}>Submitted By</th>
                                <th style={{ textAlign: 'left', padding: '0.75rem', color: '#9ca3af', fontWeight: '600', fontSize: '0.8rem' }}>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentComplaints.map((complaint, index) => (
                                <tr key={index} style={{ 
                                    borderBottom: '1px solid rgba(71, 85, 105, 0.3)',
                                    transition: 'background-color 0.2s ease'
                                }}>
                                    <td style={{ padding: '0.75rem', color: '#60a5fa', fontWeight: '600', fontSize: '0.8rem' }}>
                                        {complaint.id}
                                    </td>
                                    <td style={{ padding: '0.75rem', color: '#f8fafc', fontSize: '0.85rem', maxWidth: '250px' }}>
                                        {complaint.title}
                                    </td>
                                    <td style={{ padding: '0.75rem', color: '#9ca3af', fontSize: '0.8rem' }}>
                                        {complaint.category}
                                    </td>
                                    <td style={{ padding: '0.75rem' }}>
                                        <StatusBadge status={complaint.status} />
                                    </td>
                                    <td style={{ padding: '0.75rem' }}>
                                        <PriorityBadge priority={complaint.priority} />
                                    </td>
                                    <td style={{ padding: '0.75rem', color: '#9ca3af', fontSize: '0.8rem' }}>
                                        {complaint.submittedBy}
                                    </td>
                                    <td style={{ padding: '0.75rem', color: '#9ca3af', fontSize: '0.8rem' }}>
                                        {complaint.date}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
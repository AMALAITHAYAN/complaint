import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = {
    PENDING: '#f97316',
    IN_PROGRESS: '#3b82f6',
    RESOLVED: '#22c55e',
    REJECTED: '#ef4444',
};

const StatusDonut = ({ data }) => {
    const chartData = Object.entries(data.byStatus).map(([name, value]) => ({
        name: name.replace('_', ' '),
        value,
    }));

    return (
        <ResponsiveContainer width="100%" height={300}>
            <PieChart>
                <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                >
                    {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[entry.name.replace(' ', '_').toUpperCase()]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        </ResponsiveContainer>
    );
};

export default StatusDonut;
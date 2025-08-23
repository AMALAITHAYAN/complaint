import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AvgResolutionBar = ({ data }) => {
    const chartData = Object.entries(data.avgHoursByCategory).map(([name, value]) => ({
        name,
        'Avg Hours': value.toFixed(2),
    }));

    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Avg Hours" fill="#8884d8" />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default AvgResolutionBar;
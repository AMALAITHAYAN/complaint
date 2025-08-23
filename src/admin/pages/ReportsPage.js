import React, { useState, useEffect } from 'react';
import reportService from '../../services/reportService';
import StatusDonut from '../components/StatusDonut';
import AvgResolutionBar from '../components/AvgResolutionBar';
import EmployeePerformanceTable from '../components/EmployeePerformanceTable';

const Styles = () => (
    <style>{`
        .reports-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 2rem;
            margin-top: 2rem;
        }
        .report-card {
            background: #1f2937;
            padding: 1.5rem;
            border-radius: 12px;
        }
        .report-card h2 {
            margin-top: 0;
            border-bottom: 1px solid #374151;
            padding-bottom: 1rem;
            margin-bottom: 1.5rem;
        }
        .full-width {
            grid-column: 1 / -1;
        }
        .table-wrapper {
            background: #1f2937;
            border-radius: 12px;
            padding: 1.5rem;
            box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
            overflow-x: auto;
        }
        .user-table {
            width: 100%;
            border-collapse: collapse;
            text-align: left;
        }
        .user-table th {
            padding: 1rem 1.5rem;
            font-size: 0.9rem;
            text-transform: uppercase;
            color: #9ca3af;
            border-bottom: 2px solid #374151;
        }
        .user-table td {
            padding: 1rem 1.5rem;
            border-bottom: 1px solid #374151;
        }
        .user-table tbody tr:last-child td {
            border-bottom: none;
        }
    `}</style>
);

const ReportsPage = () => {
    const [reportData, setReportData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAllReports = async () => {
            try {
                const [statusRes, resolutionRes, performanceRes] = await Promise.all([
                    reportService.getStatusBreakdown(),
                    reportService.getResolutionTime(),
                    reportService.getEmployeePerformance(),
                ]);
                setReportData({
                    status: statusRes.data,
                    resolution: resolutionRes.data,
                    performance: performanceRes.data,
                });
            } catch (error) {
                console.error("Failed to load reports", error);
            } finally {
                setLoading(false);
            }
        };
        fetchAllReports();
    }, []);

    if (loading) return <p>Loading reports...</p>;
    if (!reportData) return <p>Failed to load reports.</p>;

    return (
        <>
            <Styles />
            <div className="admin-container">
                <div className="admin-header">
                    <h1>Reports & Analytics</h1>
                </div>
                <div className="reports-grid">
                    <div className="report-card">
                        <h2>Status Breakdown</h2>
                        <StatusDonut data={reportData.status} />
                    </div>
                    <div className="report-card">
                        <h2>Avg. Resolution Time</h2>
                        <AvgResolutionBar data={reportData.resolution} />
                    </div>
                    <div className="report-card full-width">
                        <h2>Employee Performance</h2>
                        <EmployeePerformanceTable data={reportData.performance} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default ReportsPage;
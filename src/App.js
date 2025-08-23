import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Auth Pages
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

// Admin Section
import AdminLayout from './admin/components/AdminLayout';
import AdminDashboard from './admin/pages/AdminDashboard';
import AdminUsersPage from './admin/pages/AdminUsersPage';
import AdminComplaintsPage from './admin/pages/AdminComplaintsPage';
import AdminComplaintDetailsPage from './admin/pages/ComplaintDetailsPage';
import ReportsPage from './admin/pages/ReportsPage';


import TriageDashboardPage from './admin/pages/TriageDashboardPage';
import WorkloadBalancerPage from './admin/pages/WorkloadBalancerPage';
import SlaRulesPage from './admin/pages/SlaRulesPage';
import MapHeatmapPage from './admin/pages/MapHeatmapPage';
import FeedbackReopenPage from './admin/pages/FeedbackReopenPage';
import KpisDashboardPage from './admin/pages/KpisDashboardPage';
import AuditLogPage from './admin/pages/AuditLogPage';
import RbacManagementPage from './admin/pages/RbacManagementPage';

/* ---------------- Employee ---------------- */
import EmployeeLayout from './employee/components/EmployeeLayout';
import AssignedComplaintsPage from './employee/pages/AssignedComplaintsPage';
import EmployeeComplaintDetailsPage from './employee/pages/ComplaintDetailsPage';
import { default as EmployeeProfilePage } from './employee/pages/ProfilePage';

/* mock-only / new employee pages */
import StatusWorkflowPage from './employee/pages/StatusWorkflowPage';
import AttachmentsPage from './employee/pages/AttachmentsPage';
import PrioritiesPage from './employee/pages/PrioritiesPage';
import PerformanceDashboardPage from './employee/pages/PerformanceDashboardPage';
import NotificationsPage from './employee/pages/NotificationsPage';
import MapViewPage from './employee/pages/MapViewPage';
import ChatPage from './employee/pages/ChatPage';
import ReassignPage from './employee/pages/ReassignPage';
import ReportsPageEmp from './employee/pages/ReportsPage';
import ProfileSettingsPage from './employee/pages/ProfileSettingsPage';
import AvailabilityPage from './employee/pages/AvailabilityPage';
import FeedbackPage from './employee/pages/FeedbackPage';

// Citizen Section (tabbed)
import CitizenLayout from './citizen/components/CitizenLayout';
import NewComplaintPage from './citizen/pages/NewComplaintPage';
import MyComplaintsPage from './citizen/pages/MyComplaintsPage';
import { default as CitizenProfilePage } from './citizen/pages/ProfilePage';
import CitizenComplaintDetailLayout from './citizen/components/ComplaintDetailLayout';
import CitizenComplaintDetailsTab from './citizen/pages/ComplaintDetailsTab';
import CitizenComplaintCommentsTab from './citizen/pages/ComplaintCommentsTab';
import CitizenComplaintHistoryTab from './citizen/pages/ComplaintHistoryTab';

// Citizen – new pages
import MyStatsPage from './citizen/pages/MyStatsPage';
import ComplaintsMapPage from './citizen/pages/ComplaintsMapPage';
import EvidenceUploadPage from './citizen/pages/EvidenceUploadPage';
import NotificationsCenterPage from './citizen/pages/NotificationsCenterPage';
import EscalationRequestPage from './citizen/pages/EscalationRequestPage';
import FeedbackRatingPage from './citizen/pages/FeedbackRatingPage';
import ComplaintTimelinePage from './citizen/pages/ComplaintTimelinePage';


function App() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          success: { style: { background: '#22c55e', color: '#fff' } },
          error: { style: { background: '#ef4444', color: '#fff' } },
        }}
      />

      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<LoginPage />} />

        {/* Admin Nested Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsersPage />} />
          <Route path="complaints" element={<AdminComplaintsPage />} />
          <Route path="complaints/:id" element={<AdminComplaintDetailsPage />} />
          <Route path="reports" element={<ReportsPage />} />



          <Route path="triage" element={<TriageDashboardPage />} />
          <Route path="workload" element={<WorkloadBalancerPage />} />
          <Route path="sla-rules" element={<SlaRulesPage />} />
          <Route path="map" element={<MapHeatmapPage />} />
          <Route path="feedback" element={<FeedbackReopenPage />} />
          <Route path="kpis" element={<KpisDashboardPage />} />
          <Route path="audit" element={<AuditLogPage />} />
          <Route path="rbac" element={<RbacManagementPage />} />
        </Route>

        {/* Employee Nested Routes */}
  {/* Employee */}
  <Route path="/employee" element={<EmployeeLayout />}>
          {/* existing */}
          <Route path="dashboard" element={<AssignedComplaintsPage />} />
          <Route path="profile" element={<EmployeeProfilePage />} />
          <Route path="complaints/:id" element={<EmployeeComplaintDetailsPage />} />

          {/* work */}
          <Route path="priorities" element={<PrioritiesPage />} />
          <Route path="task-prioritization" element={<PrioritiesPage />} /> {/* alias */}
          <Route path="status-workflow" element={<StatusWorkflowPage />} />
          <Route path="attachments" element={<AttachmentsPage />} />
          <Route path="location-map" element={<MapViewPage />} />

          {/* collaboration */}
          <Route path="chat" element={<ChatPage />} />
          <Route path="reassign" element={<ReassignPage />} />

          {/* insights */}
          <Route path="performance" element={<PerformanceDashboardPage />} />
          <Route path="reports" element={<ReportsPageEmp />} />

          {/* profile */}
          <Route path="profile-settings" element={<ProfileSettingsPage />} />
          <Route path="availability" element={<AvailabilityPage />} />

          {/* communication */}
          <Route path="notifications" element={<NotificationsPage />} />
          <Route path="feedback" element={<FeedbackPage />} />
        </Route>


        {/* Citizen Nested Routes */}
        <Route path="/citizen" element={<CitizenLayout />}>
  {/* existing */}
  <Route path="dashboard" element={<NewComplaintPage />} />
  <Route path="complaints" element={<MyComplaintsPage />} />
  <Route path="profile" element={<CitizenProfilePage />} />

  {/* NEW pages */}
  <Route path="overview" element={<MyStatsPage />} />
  <Route path="map" element={<ComplaintsMapPage />} />
  <Route path="evidence" element={<EvidenceUploadPage />} />
  <Route path="notifications" element={<NotificationsCenterPage />} />
  <Route path="escalate" element={<EscalationRequestPage />} />
  <Route path="feedback" element={<FeedbackRatingPage />} />
  <Route path="timeline" element={<ComplaintTimelinePage />} />

  {/* details layout (already present) */}
  <Route path="complaints/:id" element={<CitizenComplaintDetailLayout />}>
    <Route index element={<CitizenComplaintDetailsTab />} />
    <Route path="comments" element={<CitizenComplaintCommentsTab />} />
    <Route path="history" element={<CitizenComplaintHistoryTab />} />
  </Route>
</Route>

      </Routes>
    </>
  );
}

export default App;

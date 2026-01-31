import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Box } from '@mui/material';

// Layout
import Navbar from './components/Layout/Navbar';

// Pages
import LandingPage from './pages/Landing/LandingPage';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import VerifyOTPPage from './pages/Auth/VerifyOTPPage';
import CompleteProfilePage from './pages/Auth/CompleteProfilePage';
import HomePage from './pages/Home/HomePage';
import PublicFeedPage from './pages/Public/PublicFeedPage';
import LeaderboardPage from './pages/Leaderboard/LeaderboardPage';
import SuccessStoryPage from './pages/SuccessStory/SuccessStoryPage';
import AnalyticsReportPage from './pages/Analytics/AnalyticsReportPage';
import PostIssuePage from './pages/Issues/PostIssuePage';
import MyIssuesPage from './pages/Issues/MyIssuesPage';
import IssueDetailPage from './pages/Issues/IssueDetailPage';
import IssueVerificationPage from './pages/Issues/IssueVerificationPage';
import MinistryActionPage from './pages/Issues/MinistryActionPage';
import ProfilePage from './pages/Profile/ProfilePage';
import GovDashboard from './pages/Government/GovDashboard';
import CrisisDashboard from './pages/Government/CrisisDashboard';
import NGODashboard from './pages/NGO/NGODashboard';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminDashboardPage from './pages/Admin/AdminDashboardPage';

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  const { user } = useSelector((state) => state.auth);

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Routes>
          {/* Public Routes */}
          <Route 
            path="/" 
            element={user ? <Navigate to="/home" /> : <LandingPage />} 
          />
          <Route 
            path="/login" 
            element={user ? <Navigate to="/home" /> : <LoginPage />} 
          />
          <Route 
            path="/register" 
            element={user ? <Navigate to="/home" /> : <RegisterPage />} 
          />
          <Route 
            path="/verify-otp" 
            element={user ? <Navigate to="/home" /> : <VerifyOTPPage />} 
          />
          <Route 
            path="/register/complete" 
            element={user ? <Navigate to="/home" /> : <CompleteProfilePage />} 
          />

          {/* Protected Routes */}
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route            path="/public-feed"
            element={
              <ProtectedRoute>
                <PublicFeedPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/leaderboard"
            element={
              <ProtectedRoute>
                <LeaderboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/success-story"
            element={
              <ProtectedRoute>
                <SuccessStoryPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/analytics-report"
            element={
              <ProtectedRoute>
                <AnalyticsReportPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/issues/new"
            element={
              <ProtectedRoute>
                <PostIssuePage />
              </ProtectedRoute>
            }
          />
          <Route            path="/post-issue"
            element={
              <ProtectedRoute allowedRoles={['citizen']}>
                <PostIssuePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-issues"
            element={
              <ProtectedRoute allowedRoles={['citizen']}>
                <MyIssuesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/issues/:id"
            element={
              <ProtectedRoute>
                <IssueDetailPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/issues/:id/verify"
            element={
              <ProtectedRoute>
                <IssueVerificationPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/issues/:id/ministry-action"
            element={
              <ProtectedRoute>
                <MinistryActionPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/government"
            element={
              <ProtectedRoute allowedRoles={['government', 'admin']}>
                <GovDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/government/crisis"
            element={
              <ProtectedRoute>
                <CrisisDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ngo"
            element={
              <ProtectedRoute>
                <NGODashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/panel"
            element={
              <ProtectedRoute>
                <AdminDashboardPage />
              </ProtectedRoute>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to={user ? "/home" : "/"} replace />} />
        </Routes>
    </Box>
  );
}

export default App;

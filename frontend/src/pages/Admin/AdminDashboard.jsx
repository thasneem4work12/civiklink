import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  Chip,
  IconButton,
  Avatar,
  Switch,
} from '@mui/material';
import {
  Dashboard,
  PeopleAlt,
  ReportProblem,
  BarChart,
  Settings,
  Notifications,
  Warning,
  TrendingUp,
  CheckCircle,
  Block,
  ArrowForward,
} from '@mui/icons-material';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [crisisMode, setCrisisMode] = useState(false);

  const recentActivity = [
    { action: 'New user registered', user: 'Kasun Silva', time: '2 min ago', type: 'info' },
    { action: 'Issue flagged as fake', issue: '#2341', time: '15 min ago', type: 'warning' },
    { action: 'Government verified issue', issue: '#2339', time: '1 hour ago', type: 'success' },
    { action: 'User blocked for spam', user: 'John Doe', time: '2 hours ago', type: 'error' },
    { action: 'NGO claimed issue', ngo: 'Hope Foundation', time: '3 hours ago', type: 'info' },
  ];

  const systemAlerts = [
    { message: 'High server load detected', severity: 'warning', time: '5 min ago' },
    { message: '15 pending user verifications', severity: 'info', time: '1 hour ago' },
    { message: 'Database backup completed', severity: 'success', time: '2 hours ago' },
  ];

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', background: '#F9FAFB' }}>
      {/* Sidebar */}
      <Box
        sx={{
          width: 240,
          background: 'linear-gradient(180deg, #7C3AED 0%, #6D28D9 100%)',
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          py: 3,
        }}
      >
        <Box sx={{ px: 3, mb: 4 }}>
          <Typography sx={{ fontSize: 20, fontWeight: 700, fontFamily: 'Inter' }}>
            CivikLink SL
          </Typography>
          <Typography sx={{ fontSize: 12, opacity: 0.8, mt: 0.5 }}>
            Admin Overview
          </Typography>
        </Box>

        <Box sx={{ flex: 1 }}>
          {[
            { id: 'dashboard', icon: <Dashboard />, label: 'Dashboard', path: '/admin' },
            { id: 'users', icon: <PeopleAlt />, label: 'User Management', path: '/admin/panel' },
            { id: 'reports', icon: <ReportProblem />, label: 'Report Moderation', path: '/admin/panel' },
            { id: 'analytics', icon: <BarChart />, label: 'Analytics', path: '/admin/panel' },
            { id: 'settings', icon: <Settings />, label: 'System Settings', path: '/admin/panel' },
          ].map((item) => (
            <Box
              key={item.id}
              onClick={() => navigate(item.path)}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                px: 3,
                py: 2,
                cursor: 'pointer',
                background: item.id === 'dashboard' ? 'rgba(255,255,255,0.15)' : 'transparent',
                borderLeft: item.id === 'dashboard' ? '4px solid white' : '4px solid transparent',
                transition: 'all 0.2s',
                '&:hover': {
                  background: 'rgba(255,255,255,0.1)',
                },
              }}
            >
              {item.icon}
              <Typography sx={{ fontSize: 14, fontWeight: item.id === 'dashboard' ? 600 : 400 }}>
                {item.label}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Main Content */}
      <Box sx={{ flex: 1 }}>
        {/* Top Bar */}
        <Box
          sx={{
            background: 'white',
            borderBottom: '1px solid #E5E7EB',
            py: 2,
            px: 4,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box>
            <Typography sx={{ fontSize: 22, fontWeight: 700, color: '#1F2937', fontFamily: 'Inter' }}>
              Admin Dashboard
            </Typography>
            <Typography sx={{ fontSize: 13, color: '#6B7280' }}>
              System overview and quick actions
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton>
              <Notifications sx={{ color: '#6B7280' }} />
              <Box
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: '#DC2626',
                }}
              />
            </IconButton>
            <Avatar sx={{ width: 40, height: 40, background: '#7C3AED' }}>AD</Avatar>
          </Box>
        </Box>

        <Box sx={{ p: 4 }}>
          {/* Stats Cards */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} md={3}>
              <Card
                sx={{
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                  borderRadius: 2,
                  background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
                  color: 'white',
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography sx={{ fontSize: 14, opacity: 0.9 }}>
                      Total Users
                    </Typography>
                    <PeopleAlt sx={{ fontSize: 28, opacity: 0.9 }} />
                  </Box>
                  <Typography sx={{ fontSize: 36, fontWeight: 700, fontFamily: 'Inter' }}>
                    15,420
                  </Typography>
                  <Typography sx={{ fontSize: 12, opacity: 0.8, mt: 1 }}>
                    ↑ 234 new this week
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={3}>
              <Card
                sx={{
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                  borderRadius: 2,
                  background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                  color: 'white',
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography sx={{ fontSize: 14, opacity: 0.9 }}>
                      Active Issues
                    </Typography>
                    <Warning sx={{ fontSize: 28, opacity: 0.9 }} />
                  </Box>
                  <Typography sx={{ fontSize: 36, fontWeight: 700, fontFamily: 'Inter' }}>
                    1,284
                  </Typography>
                  <Typography sx={{ fontSize: 12, opacity: 0.8, mt: 1 }}>
                    ↑ 42 today
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={3}>
              <Card
                sx={{
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                  borderRadius: 2,
                  background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                  color: 'white',
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography sx={{ fontSize: 14, opacity: 0.9 }}>
                      Resolved Today
                    </Typography>
                    <CheckCircle sx={{ fontSize: 28, opacity: 0.9 }} />
                  </Box>
                  <Typography sx={{ fontSize: 36, fontWeight: 700, fontFamily: 'Inter' }}>
                    87
                  </Typography>
                  <Typography sx={{ fontSize: 12, opacity: 0.8, mt: 1 }}>
                    68% resolution rate
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={3}>
              <Card
                sx={{
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                  borderRadius: 2,
                  background: 'linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)',
                  color: 'white',
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography sx={{ fontSize: 14, opacity: 0.9 }}>
                      Flagged Reports
                    </Typography>
                    <Block sx={{ fontSize: 28, opacity: 0.9 }} />
                  </Box>
                  <Typography sx={{ fontSize: 36, fontWeight: 700, fontFamily: 'Inter' }}>
                    32
                  </Typography>
                  <Typography sx={{ fontSize: 12, opacity: 0.8, mt: 1 }}>
                    Needs moderation
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            {/* Quick Actions */}
            <Grid item xs={12} md={4}>
              <Card sx={{ boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderRadius: 3 }}>
                <Box sx={{ p: 3, borderBottom: '1px solid #E5E7EB' }}>
                  <Typography sx={{ fontSize: 18, fontWeight: 700, color: '#1F2937', fontFamily: 'Inter' }}>
                    Quick Actions
                  </Typography>
                </Box>
                <Box sx={{ p: 3 }}>
                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={() => navigate('/admin/panel')}
                    sx={{
                      textTransform: 'none',
                      mb: 2,
                      py: 1.5,
                      justifyContent: 'flex-start',
                      borderColor: '#E5E7EB',
                      color: '#1F2937',
                      '&:hover': {
                        borderColor: '#2563EB',
                        background: '#EFF6FF',
                      },
                    }}
                  >
                    <PeopleAlt sx={{ mr: 1.5, color: '#2563EB' }} />
                    Manage Users
                  </Button>
                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={() => navigate('/admin/panel')}
                    sx={{
                      textTransform: 'none',
                      mb: 2,
                      py: 1.5,
                      justifyContent: 'flex-start',
                      borderColor: '#E5E7EB',
                      color: '#1F2937',
                      '&:hover': {
                        borderColor: '#DC2626',
                        background: '#FEF2F2',
                      },
                    }}
                  >
                    <ReportProblem sx={{ mr: 1.5, color: '#DC2626' }} />
                    Moderate Reports
                  </Button>
                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={() => navigate('/admin/panel')}
                    sx={{
                      textTransform: 'none',
                      mb: 2,
                      py: 1.5,
                      justifyContent: 'flex-start',
                      borderColor: '#E5E7EB',
                      color: '#1F2937',
                      '&:hover': {
                        borderColor: '#8B5CF6',
                        background: '#F5F3FF',
                      },
                    }}
                  >
                    <BarChart sx={{ mr: 1.5, color: '#8B5CF6' }} />
                    View Analytics
                  </Button>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      p: 2,
                      background: crisisMode ? '#FEE2E2' : '#F3F4F6',
                      borderRadius: 2,
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Warning sx={{ color: crisisMode ? '#DC2626' : '#6B7280', fontSize: 20 }} />
                      <Typography sx={{ fontSize: 14, fontWeight: 600, color: '#1F2937' }}>
                        Crisis Mode
                      </Typography>
                    </Box>
                    <Switch
                      checked={crisisMode}
                      onChange={(e) => setCrisisMode(e.target.checked)}
                      sx={{
                        '& .MuiSwitch-thumb': {
                          background: crisisMode ? '#DC2626' : '#9CA3AF',
                        },
                        '& .MuiSwitch-track': {
                          background: crisisMode ? '#FCA5A5' : '#D1D5DB',
                        },
                      }}
                    />
                  </Box>
                </Box>
              </Card>
            </Grid>

            {/* Recent Activity */}
            <Grid item xs={12} md={4}>
              <Card sx={{ boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderRadius: 3 }}>
                <Box sx={{ p: 3, borderBottom: '1px solid #E5E7EB' }}>
                  <Typography sx={{ fontSize: 18, fontWeight: 700, color: '#1F2937', fontFamily: 'Inter' }}>
                    Recent Activity
                  </Typography>
                </Box>
                <List sx={{ p: 0 }}>
                  {recentActivity.map((activity, index) => (
                    <ListItem
                      key={index}
                      sx={{
                        borderBottom: index < recentActivity.length - 1 ? '1px solid #E5E7EB' : 'none',
                        py: 2,
                      }}
                    >
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          background:
                            activity.type === 'success'
                              ? '#10B981'
                              : activity.type === 'warning'
                              ? '#F59E0B'
                              : activity.type === 'error'
                              ? '#DC2626'
                              : '#3B82F6',
                          mr: 2,
                        }}
                      />
                      <ListItemText
                        primary={
                          <Typography sx={{ fontSize: 13, fontWeight: 500, color: '#1F2937' }}>
                            {activity.action}
                          </Typography>
                        }
                        secondary={
                          <Typography sx={{ fontSize: 12, color: '#6B7280' }}>
                            {activity.user || activity.issue || activity.ngo} • {activity.time}
                          </Typography>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </Card>
            </Grid>

            {/* System Alerts */}
            <Grid item xs={12} md={4}>
              <Card sx={{ boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderRadius: 3 }}>
                <Box sx={{ p: 3, borderBottom: '1px solid #E5E7EB' }}>
                  <Typography sx={{ fontSize: 18, fontWeight: 700, color: '#1F2937', fontFamily: 'Inter' }}>
                    System Alerts
                  </Typography>
                </Box>
                <Box sx={{ p: 3 }}>
                  {systemAlerts.map((alert, index) => (
                    <Box
                      key={index}
                      sx={{
                        p: 2,
                        mb: 2,
                        borderRadius: 2,
                        background:
                          alert.severity === 'success'
                            ? '#D1FAE5'
                            : alert.severity === 'warning'
                            ? '#FEF3C7'
                            : '#DBEAFE',
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                        {alert.severity === 'success' && <CheckCircle sx={{ fontSize: 16, color: '#10B981' }} />}
                        {alert.severity === 'warning' && <Warning sx={{ fontSize: 16, color: '#F59E0B' }} />}
                        {alert.severity === 'info' && <TrendingUp sx={{ fontSize: 16, color: '#3B82F6' }} />}
                        <Typography
                          sx={{
                            fontSize: 13,
                            fontWeight: 600,
                            color:
                              alert.severity === 'success'
                                ? '#065F46'
                                : alert.severity === 'warning'
                                ? '#92400E'
                                : '#1E40AF',
                          }}
                        >
                          {alert.message}
                        </Typography>
                      </Box>
                      <Typography sx={{ fontSize: 11, color: '#6B7280', ml: 3 }}>
                        {alert.time}
                      </Typography>
                    </Box>
                  ))}
                  <Button
                    fullWidth
                    variant="text"
                    onClick={() => navigate('/admin/panel')}
                    sx={{
                      textTransform: 'none',
                      color: '#2563EB',
                      fontWeight: 600,
                      mt: 1,
                    }}
                  >
                    View All System Logs
                    <ArrowForward sx={{ ml: 1, fontSize: 18 }} />
                  </Button>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}

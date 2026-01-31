import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  Button,
  Chip,
  IconButton,
  Avatar,
  Tab,
  Tabs,
  Badge,
  Divider,
} from '@mui/material';
import {
  Description,
  LocationOn,
  Warning,
  ThumbUp,
  CheckCircle,
  Info,
  Notifications,
  Settings,
  Language,
} from '@mui/icons-material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function HomePage() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState(0);

  const myReports = [
    {
      id: 1,
      title: 'Broken Street Light on Main Road',
      description: 'Street light has been non-functional for 2 weeks causing safety concerns',
      ministry: 'Ministry',
      category: 'Infrastructure',
      status: 'Pending',
      likes: 12,
      timeAgo: '5 days ago',
    },
    {
      id: 2,
      title: 'Pothole on Independence Avenue',
      description: 'Large pothole causing vehicle damage, needs immediate attention',
      ministry: 'NGO',
      category: 'Roads',
      status: 'Completed',
      likes: 8,
      timeAgo: '2 weeks ago',
    },
    {
      id: 3,
      title: 'Garbage Collection Delay',
      description: 'Garbage not collected for 3 days in residential area',
      ministry: 'Ministry',
      category: 'Sanitation',
      status: 'Pending',
      likes: 15,
      timeAgo: '1 day ago',
    },
  ];

  const notifications = [
    {
      type: 'Official Reply',
      message: 'Response to your light report',
      timeAgo: '5 days ago',
      icon: <CheckCircle sx={{ color: '#10B981' }} />,
    },
    {
      type: 'Community Verification',
      message: 'Your report was verified by 3 users',
      timeAgo: '1 week ago',
      icon: <CheckCircle sx={{ color: '#10B981' }} />,
    },
    {
      type: 'Nearby Alerts',
      message: 'Emergency reported in your area',
      timeAgo: '2 days ago',
      icon: <Info sx={{ color: '#F59E0B' }} />,
    },
  ];

  const activityData = [
    { name: 'Oct', value: 100 },
    { name: 'Nov', value: 35 },
    { name: 'Dec', value: 45 },
    { name: 'Jan', value: 20 },
  ];

  const stats = {
    totalReported: 128,
    solved: 27,
    pending: 40,
    upvotes: 19,
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return '#FEF3C7';
      case 'completed':
        return '#D1FAE5';
      case 'in progress':
        return '#DBEAFE';
      default:
        return '#F3F4F6';
    }
  };

  const getStatusTextColor = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return '#92400E';
      case 'completed':
        return '#065F46';
      case 'in progress':
        return '#1E40AF';
      default:
        return '#374151';
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', background: '#F9FAFB' }}>
      {/* Top Navigation */}
      <Box
        sx={{
          background: 'white',
          borderBottom: '1px solid #E5E7EB',
          py: 1.5,
          px: 4,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            maxWidth: 1400,
            mx: 'auto',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box
              component="img"
              src="/images/logo.png"
              alt="CivikLink SL"
              sx={{ width: 36, height: 36, objectFit: 'contain' }}
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            <Typography
              sx={{
                fontFamily: 'Inter',
                fontWeight: 700,
                fontSize: 18,
                color: '#1F2937',
              }}
            >
              CivikLink SL
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <Typography
              onClick={() => navigate('/home')}
              sx={{
                fontFamily: 'Inter',
                fontSize: 14,
                fontWeight: 600,
                color: '#2563EB',
                cursor: 'pointer',
              }}
            >
              Dashboard
            </Typography>
            <Typography
              onClick={() => navigate('/public-feed')}
              sx={{
                fontFamily: 'Inter',
                fontSize: 14,
                color: '#6B7280',
                cursor: 'pointer',
                '&:hover': { color: '#2563EB' },
              }}
            >
              Public Feed
            </Typography>
            <Typography
              onClick={() => navigate('/leaderboard')}
              sx={{
                fontFamily: 'Inter',
                fontSize: 14,
                color: '#6B7280',
                cursor: 'pointer',
                '&:hover': { color: '#2563EB' },
              }}
            >
              Leaderboard
            </Typography>
            <Typography
              onClick={() => navigate('/success-story')}
              sx={{
                fontFamily: 'Inter',
                fontSize: 14,
                color: '#6B7280',
                cursor: 'pointer',
                '&:hover': { color: '#2563EB' },
              }}
            >
              Success story
            </Typography>
            <Typography
              onClick={() => navigate('/analytics-report')}
              sx={{
                fontFamily: 'Inter',
                fontSize: 14,
                color: '#6B7280',
                cursor: 'pointer',
                '&:hover': { color: '#2563EB' },
              }}
            >
              Analytics & report
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                px: 1.5,
                py: 0.5,
                borderRadius: 1.5,
                background: '#EEF2FF',
                cursor: 'pointer',
              }}
            >
              <Language sx={{ fontSize: 18, color: '#2563EB' }} />
              <Typography sx={{ fontSize: 13, fontWeight: 600, color: '#2563EB' }}>
                EN
              </Typography>
            </Box>

            <IconButton>
              <Badge badgeContent={1} color="error">
                <Notifications sx={{ color: '#6B7280' }} />
              </Badge>
            </IconButton>

            <Avatar sx={{ width: 36, height: 36, cursor: 'pointer' }} />

            <Button
              variant="outlined"
              onClick={() => navigate('/login')}
              sx={{
                textTransform: 'none',
                fontFamily: 'Inter',
                fontSize: 13,
                fontWeight: 600,
                color: '#DC2626',
                borderColor: '#FEE2E2',
                px: 2,
                py: 0.75,
                '&:hover': {
                  borderColor: '#DC2626',
                  background: '#FEF2F2',
                },
              }}
            >
              Log out
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Main Content */}
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Hero Section */}
        <Box
          sx={{
            background: 'linear-gradient(135deg, #DBEAFE 0%, #BFDBFE 100%)',
            borderRadius: 4,
            p: 4,
            mb: 3,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box>
            <Typography
              sx={{
                fontFamily: 'Inter',
                fontWeight: 800,
                fontSize: 32,
                color: '#1F2937',
                mb: 1,
              }}
            >
              Hello, {user?.full_name?.split(' ')[0] || 'Sarah'}!
            </Typography>
            <Typography
              sx={{
                fontFamily: 'Inter',
                fontSize: 16,
                color: '#374151',
                mb: 0.5,
              }}
            >
              Track your civic impact in real time.
            </Typography>
            <Typography
              sx={{
                fontFamily: 'Inter',
                fontSize: 12,
                color: '#9CA3AF',
              }}
            >
              7m illustrated 3D civic image
            </Typography>
          </Box>

          <Box
            sx={{
              width: 180,
              height: 140,
              background: 'rgba(255, 255, 255, 0.5)',
              borderRadius: 3,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography sx={{ fontSize: 12, color: '#9CA3AF' }}>
              Civic Building
            </Typography>
          </Box>
        </Box>

        {/* Action Cards */}
        <Grid container spacing={2} sx={{ mb: 4 }}>
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                borderRadius: 3,
                p: 3,
                cursor: 'pointer',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                },
              }}
              onClick={() => navigate('/issues/new')}
            >
              <Description sx={{ fontSize: 32, color: 'white', mb: 1 }} />
              <Typography
                sx={{
                  fontFamily: 'Inter',
                  fontWeight: 700,
                  fontSize: 18,
                  color: 'white',
                  mb: 0.5,
                }}
              >
                Report New Issue
              </Typography>
              <Typography sx={{ fontSize: 13, color: 'rgba(255,255,255,0.9)' }}>
                Report your new issue
              </Typography>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card
              sx={{
                background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
                borderRadius: 3,
                p: 3,
                cursor: 'pointer',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                },
              }}
            >
              <LocationOn sx={{ fontSize: 32, color: 'white', mb: 1 }} />
              <Typography
                sx={{
                  fontFamily: 'Inter',
                  fontWeight: 700,
                  fontSize: 18,
                  color: 'white',
                  mb: 0.5,
                }}
              >
                View Nearby Issues
              </Typography>
              <Typography sx={{ fontSize: 13, color: 'rgba(255,255,255,0.9)' }}>
                View nearby issues
              </Typography>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card
              sx={{
                background: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
                borderRadius: 3,
                p: 3,
                cursor: 'pointer',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                },
              }}
            >
              <Warning sx={{ fontSize: 32, color: 'white', mb: 1 }} />
              <Typography
                sx={{
                  fontFamily: 'Inter',
                  fontWeight: 700,
                  fontSize: 18,
                  color: 'white',
                  mb: 0.5,
                }}
              >
                Emergency Mode
              </Typography>
              <Typography sx={{ fontSize: 13, color: 'rgba(255,255,255,0.9)' }}>
                Emergency mode if critical
              </Typography>
            </Card>
          </Grid>
        </Grid>

        {/* Main Content Grid */}
        <Grid container spacing={3}>
          {/* Left Column - My Reports */}
          <Grid item xs={12} lg={8}>
            <Card sx={{ borderRadius: 3, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <Box sx={{ p: 3, pb: 0 }}>
                <Typography
                  sx={{
                    fontFamily: 'Inter',
                    fontWeight: 700,
                    fontSize: 20,
                    color: '#1F2937',
                    mb: 2,
                  }}
                >
                  My Reports
                </Typography>

                <Tabs
                  value={activeTab}
                  onChange={handleTabChange}
                  sx={{
                    borderBottom: '1px solid #E5E7EB',
                    '& .MuiTab-root': {
                      textTransform: 'none',
                      fontFamily: 'Inter',
                      fontSize: 14,
                      fontWeight: 500,
                      color: '#6B7280',
                      minWidth: 120,
                    },
                    '& .Mui-selected': {
                      color: '#2563EB !important',
                      fontWeight: 600,
                    },
                  }}
                >
                  <Tab label="Pending Issues" />
                  <Tab label="Solved Issues" />
                  <Tab label="Archived Issues" />
                </Tabs>
              </Box>

              <Box sx={{ p: 3 }}>
                {myReports.map((report) => (
                  <Box
                    key={report.id}
                    sx={{
                      mb: 2,
                      pb: 2,
                      borderBottom: '1px solid #F3F4F6',
                      '&:last-child': { borderBottom: 'none', mb: 0, pb: 0 },
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        mb: 1,
                      }}
                    >
                      <Typography
                        sx={{
                          fontFamily: 'Inter',
                          fontWeight: 600,
                          fontSize: 15,
                          color: '#1F2937',
                        }}
                      >
                        {report.title}
                      </Typography>
                      <Chip
                        label={report.status}
                        sx={{
                          background: getStatusColor(report.status),
                          color: getStatusTextColor(report.status),
                          fontWeight: 600,
                          fontSize: 11,
                          height: 24,
                          borderRadius: 1.5,
                        }}
                      />
                    </Box>

                    <Typography
                      sx={{
                        fontSize: 13,
                        color: '#6B7280',
                        mb: 1.5,
                      }}
                    >
                      {report.description}
                    </Typography>

                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Chip
                          label={report.ministry}
                          sx={{
                            background: '#DBEAFE',
                            color: '#1E40AF',
                            fontSize: 11,
                            height: 22,
                            fontWeight: 500,
                          }}
                        />
                        <Chip
                          label={report.category}
                          sx={{
                            background: '#F3F4F6',
                            color: '#4B5563',
                            fontSize: 11,
                            height: 22,
                            fontWeight: 500,
                          }}
                        />
                      </Box>

                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <ThumbUp sx={{ fontSize: 16, color: '#6B7280' }} />
                          <Typography sx={{ fontSize: 12, color: '#6B7280' }}>
                            {report.likes}
                          </Typography>
                        </Box>
                        <Typography sx={{ fontSize: 12, color: '#9CA3AF' }}>
                          {report.timeAgo}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Card>
          </Grid>

          {/* Right Column - Notifications & Activity */}
          <Grid item xs={12} lg={4}>
            {/* Notifications */}
            <Card sx={{ borderRadius: 3, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', mb: 3 }}>
              <Box
                sx={{
                  p: 2.5,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Typography
                  sx={{
                    fontFamily: 'Inter',
                    fontWeight: 700,
                    fontSize: 16,
                    color: '#1F2937',
                  }}
                >
                  Notifications
                </Typography>
                <IconButton size="small">
                  <Settings sx={{ fontSize: 18, color: '#9CA3AF' }} />
                </IconButton>
              </Box>

              <Divider />

              <Box sx={{ p: 2 }}>
                {notifications.map((notif, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      gap: 1.5,
                      mb: 2,
                      '&:last-child': { mb: 0 },
                    }}
                  >
                    <Box
                      sx={{
                        width: 36,
                        height: 36,
                        borderRadius: '50%',
                        background: '#F9FAFB',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      {notif.icon}
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography
                        sx={{
                          fontFamily: 'Inter',
                          fontWeight: 600,
                          fontSize: 13,
                          color: '#1F2937',
                          mb: 0.25,
                        }}
                      >
                        {notif.type}
                      </Typography>
                      <Typography sx={{ fontSize: 12, color: '#6B7280', mb: 0.5 }}>
                        {notif.message}
                      </Typography>
                      <Typography sx={{ fontSize: 11, color: '#9CA3AF' }}>
                        {notif.timeAgo}
                      </Typography>
                    </Box>
                  </Box>
                ))}

                <Button
                  fullWidth
                  sx={{
                    mt: 2,
                    textTransform: 'none',
                    color: '#2563EB',
                    fontWeight: 600,
                    fontSize: 13,
                  }}
                >
                  View all
                </Button>
              </Box>
            </Card>

            {/* Activity Summary */}
            <Card sx={{ borderRadius: 3, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <Box sx={{ p: 2.5 }}>
                <Typography
                  sx={{
                    fontFamily: 'Inter',
                    fontWeight: 700,
                    fontSize: 16,
                    color: '#1F2937',
                    mb: 2,
                  }}
                >
                  Activity Summary
                </Typography>

                <Grid container spacing={2} sx={{ mb: 3 }}>
                  <Grid item xs={6}>
                    <Box>
                      <Typography sx={{ fontSize: 12, color: '#6B7280', mb: 0.5 }}>
                        Total Reported
                      </Typography>
                      <Typography
                        sx={{
                          fontWeight: 700,
                          fontSize: 24,
                          color: '#1F2937',
                        }}
                      >
                        {stats.totalReported}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box>
                      <Typography sx={{ fontSize: 12, color: '#6B7280', mb: 0.5 }}>
                        Solved
                      </Typography>
                      <Typography
                        sx={{
                          fontWeight: 700,
                          fontSize: 24,
                          color: '#10B981',
                        }}
                      >
                        {stats.solved}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box>
                      <Typography sx={{ fontSize: 12, color: '#6B7280', mb: 0.5 }}>
                        Pending
                      </Typography>
                      <Typography
                        sx={{
                          fontWeight: 700,
                          fontSize: 24,
                          color: '#F59E0B',
                        }}
                      >
                        {stats.pending}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box>
                      <Typography sx={{ fontSize: 12, color: '#6B7280', mb: 0.5 }}>
                        Upvotes
                      </Typography>
                      <Typography
                        sx={{
                          fontWeight: 700,
                          fontSize: 24,
                          color: '#3B82F6',
                        }}
                      >
                        {stats.upvotes}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>

                <ResponsiveContainer width="100%" height={150}>
                  <BarChart data={activityData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                    <XAxis
                      dataKey="name"
                      tick={{ fontSize: 11, fill: '#9CA3AF' }}
                      axisLine={{ stroke: '#E5E7EB' }}
                    />
                    <YAxis
                      tick={{ fontSize: 11, fill: '#9CA3AF' }}
                      axisLine={{ stroke: '#E5E7EB' }}
                    />
                    <Tooltip />
                    <Bar dataKey="value" fill="#3B82F6" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

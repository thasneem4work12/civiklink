import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Chip,
  Card,
  CardContent,
  Avatar,
  Grid,
  Select,
  MenuItem,
  FormControl,
  Divider,
  IconButton,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  ErrorOutline,
  Assignment,
  CloudUpload,
  Timeline,
  AccountBalance,
  Settings,
  Language,
  Logout,
  TrendingUp,
  Warning,
  CheckCircle,
  LocationOn,
  Visibility,
  ThumbUp,
} from '@mui/icons-material';

export default function NGODashboard() {
  const navigate = useNavigate();

  const stats = [
    { label: 'Unresolved Issues', value: '24', icon: '📋', color: '#FEF3C7', textColor: '#92400E' },
    { label: 'High-Priority Cases', value: '8', icon: '🔔', color: '#FEE2E2', textColor: '#991B1B' },
    { label: 'Issues You Solved', value: '142', icon: '✅', color: '#D1FAE5', textColor: '#065F46' },
    { label: 'Impact Score', value: '8.7', icon: '🎯', color: '#DBEAFE', textColor: '#1E40AF' },
  ];

  const recentUpdates = [
    {
      org: 'Hope Foundation',
      time: '2 hours ago',
      activity: 'Water tank delivered to Galle community: 250 families',
      likes: 24,
      comments: 2,
      verified: true,
      avatar: '',
    },
    {
      org: 'Hope Foundation',
      time: '4 hours ago',
      activity: 'Food kits provided to 50 families in Matara district',
      likes: 42,
      comments: 12,
      verified: true,
      avatar: '',
    },
    {
      org: 'Hope Foundation',
      time: '1 day ago',
      activity: 'Repaired broken water pipe in Kandy: Service restored',
      likes: 31,
      comments: 6,
      verified: true,
      avatar: '',
    },
  ];

  const unresolvedIssues = [
    {
      id: 1,
      priority: 'URGENT',
      priorityColor: '#DC2626',
      category: 'Water Supply',
      title: 'Burst Water Pipe Burst - Water for 3 Days',
      location: 'Galle, Hikkaduwa',
      affected: '300 affected',
      image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400',
      description: 'Main water supply pipe broken. Over 300 families without water for 72 hours. Children...',
      verifications: 47,
      waiting: '64hrs',
      status: 'Pending Government',
    },
    {
      id: 2,
      priority: 'HIGH',
      priorityColor: '#EA580C',
      category: 'Roads',
      title: 'Village Road Completely Damaged',
      location: 'Kandy, Peradeniya',
      affected: '180 affected',
      image: 'https://images.unsplash.com/photo-1590859808308-3d2d9c515b1a?w=400',
      description: 'Main access road to village destroyed. Ambulances cannot reach, students unable to attend...',
      verifications: 33,
      waiting: '56hrs',
      status: 'Pending Government',
    },
    {
      id: 3,
      priority: 'MEDIUM',
      priorityColor: '#F59E0B',
      category: 'Electricity',
      title: 'Street Lights Not Working: Safety Concern',
      location: 'Colombo, Kirulapone',
      affected: '482 affected',
      image: 'https://images.unsplash.com/photo-1584555684040-bad07f8e093f?w=400',
      description: 'All street lights in residential area not functioning for 2 weeks. Safety concerns raised...',
      verifications: 28,
      waiting: '28hrs',
      status: 'Pending Government',
    },
    {
      id: 4,
      priority: 'HIGH',
      priorityColor: '#EA580C',
      category: 'Sanitation',
      title: 'Garbage Collection Stopped - Health Hazard',
      location: 'Matara, Weligama',
      affected: '280 affected',
      image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400',
      description: 'Municipal garbage collection stopped. Waste piling up causing health issues and bad smell...',
      verifications: 41,
      waiting: '62hrs',
      status: 'Pending Government',
    },
  ];

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', background: '#F9FAFB' }}>
      {/* Left Sidebar */}
      <Box
        sx={{
          width: 220,
          background: 'white',
          borderRight: '1px solid #E5E7EB',
          py: 2,
        }}
      >
        <Box sx={{ px: 2, mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box
              component="img"
              src="/images/logo.png"
              alt="CivikLink SL"
              sx={{ width: 32, height: 32, objectFit: 'contain' }}
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            <Typography
              sx={{
                fontFamily: 'Inter',
                fontWeight: 700,
                fontSize: 16,
                color: '#1F2937',
              }}
            >
              CivikLink SL
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, px: 2 }}>
          <Button
            startIcon={<DashboardIcon />}
            sx={{
              justifyContent: 'flex-start',
              textTransform: 'none',
              color: 'white',
              background: '#2563EB',
              fontWeight: 600,
              py: 1,
              fontSize: 14,
              '&:hover': { background: '#1D4ED8' },
            }}
          >
            Dashboard Overview
          </Button>
          <Button
            startIcon={<ErrorOutline />}
            sx={{
              justifyContent: 'flex-start',
              textTransform: 'none',
              color: '#6B7280',
              fontWeight: 500,
              py: 1,
              fontSize: 14,
              '&:hover': { background: '#F9FAFB' },
            }}
          >
            Unresolved Issues
          </Button>
          <Button
            startIcon={<Assignment />}
            sx={{
              justifyContent: 'flex-start',
              textTransform: 'none',
              color: '#6B7280',
              fontWeight: 500,
              py: 1,
              fontSize: 14,
              '&:hover': { background: '#F9FAFB' },
            }}
          >
            Claimed Issues
          </Button>
          <Button
            startIcon={<CloudUpload />}
            sx={{
              justifyContent: 'flex-start',
              textTransform: 'none',
              color: '#6B7280',
              fontWeight: 500,
              py: 1,
              fontSize: 14,
              '&:hover': { background: '#F9FAFB' },
            }}
          >
            Upload Proof
          </Button>
          <Button
            startIcon={<Timeline />}
            sx={{
              justifyContent: 'flex-start',
              textTransform: 'none',
              color: '#6B7280',
              fontWeight: 500,
              py: 1,
              fontSize: 14,
              '&:hover': { background: '#F9FAFB' },
            }}
          >
            NGO Activity Log
          </Button>
          <Button
            startIcon={<AccountBalance />}
            sx={{
              justifyContent: 'flex-start',
              textTransform: 'none',
              color: '#6B7280',
              fontWeight: 500,
              py: 1,
              fontSize: 14,
              '&:hover': { background: '#F9FAFB' },
            }}
          >
            Financial Contributions
          </Button>
          <Divider sx={{ my: 1 }} />
          <Button
            startIcon={<Settings />}
            sx={{
              justifyContent: 'flex-start',
              textTransform: 'none',
              color: '#6B7280',
              fontWeight: 500,
              py: 1,
              fontSize: 14,
              '&:hover': { background: '#F9FAFB' },
            }}
          >
            Settings
          </Button>
        </Box>
      </Box>

      {/* Main Content */}
      <Box sx={{ flex: 1, overflow: 'auto' }}>
        {/* Top Bar */}
        <Box
          sx={{
            background: 'white',
            borderBottom: '1px solid #E5E7EB',
            px: 4,
            py: 1.5,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CheckCircle sx={{ fontSize: 18, color: '#10B981' }} />
              <Box>
                <Typography sx={{ fontSize: 14, fontWeight: 700, color: '#1F2937' }}>
                  Hope Foundation
                </Typography>
                <Typography sx={{ fontSize: 11, color: '#6B7280' }}>
                  (Water & Sanitation Specialist)
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography sx={{ fontSize: 13, color: '#6B7280' }}>සි | தமிழ் | ENG</Typography>
              <Button
                startIcon={<Logout />}
                onClick={() => navigate('/login')}
                sx={{
                  textTransform: 'none',
                  fontSize: 13,
                  color: '#DC2626',
                  fontWeight: 600,
                }}
              >
                Logout
              </Button>
            </Box>
          </Box>
        </Box>

        <Container maxWidth="xl" sx={{ py: 4 }}>
          {/* Stats Cards */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {stats.map((stat, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card
                  sx={{
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                    borderRadius: 2,
                    border: '1px solid #E5E7EB',
                  }}
                >
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography sx={{ fontSize: 32, mb: 1 }}>{stat.icon}</Typography>
                    <Typography
                      sx={{
                        fontSize: 32,
                        fontWeight: 700,
                        color: stat.textColor,
                        fontFamily: 'Inter',
                        mb: 0.5,
                      }}
                    >
                      {stat.value}
                    </Typography>
                    <Typography sx={{ fontSize: 13, color: '#6B7280' }}>
                      {stat.label}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Grid container spacing={3}>
            {/* Impact Map */}
            <Grid item xs={12} md={7}>
              <Card sx={{ boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderRadius: 2, mb: 3 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography sx={{ fontSize: 18, fontWeight: 700, color: '#1F2937', fontFamily: 'Inter' }}>
                      Impact Map
                    </Typography>
                    <Button
                      startIcon={<LocationOn />}
                      size="small"
                      sx={{
                        textTransform: 'none',
                        fontSize: 12,
                        color: '#2563EB',
                        fontWeight: 600,
                      }}
                    >
                      Districts Where You've Helped
                    </Button>
                  </Box>
                  <Box
                    sx={{
                      position: 'relative',
                      height: 400,
                      background: 'linear-gradient(135deg, #E0F2F1 0%, #B2DFDB 100%)',
                      borderRadius: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography sx={{ fontSize: 14, color: '#6B7280' }}>
                      🗺️ Sri Lanka Impact Map
                    </Typography>
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: 16,
                        left: 16,
                        display: 'flex',
                        gap: 2,
                        background: 'rgba(255,255,255,0.9)',
                        p: 1.5,
                        borderRadius: 1,
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Box sx={{ width: 16, height: 16, background: '#BFDBFE', borderRadius: 0.5 }} />
                        <Typography sx={{ fontSize: 11, color: '#6B7280' }}>Low Activity</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Box sx={{ width: 16, height: 16, background: '#60A5FA', borderRadius: 0.5 }} />
                        <Typography sx={{ fontSize: 11, color: '#6B7280' }}>Medium</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Box sx={{ width: 16, height: 16, background: '#2563EB', borderRadius: 0.5 }} />
                        <Typography sx={{ fontSize: 11, color: '#6B7280' }}>High Activity</Typography>
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Recent NGO Updates */}
            <Grid item xs={12} md={5}>
              <Card sx={{ boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderRadius: 2, mb: 3 }}>
                <CardContent>
                  <Typography sx={{ fontSize: 18, fontWeight: 700, color: '#1F2937', fontFamily: 'Inter', mb: 2 }}>
                    Recent NGO Updates
                  </Typography>

                  {recentUpdates.map((update, index) => (
                    <Box
                      key={index}
                      sx={{
                        mb: 2,
                        pb: 2,
                        borderBottom: index < recentUpdates.length - 1 ? '1px solid #F3F4F6' : 'none',
                      }}
                    >
                      <Box sx={{ display: 'flex', gap: 1.5, mb: 1.5 }}>
                        <Avatar sx={{ width: 40, height: 40 }} />
                        <Box sx={{ flex: 1 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                            <Typography sx={{ fontSize: 13, fontWeight: 700, color: '#1F2937' }}>
                              {update.org}
                            </Typography>
                            {update.verified && (
                              <CheckCircle sx={{ fontSize: 16, color: '#10B981' }} />
                            )}
                          </Box>
                          <Typography sx={{ fontSize: 11, color: '#9CA3AF', mb: 1 }}>
                            {update.time}
                          </Typography>
                          <Typography sx={{ fontSize: 13, color: '#4B5563', mb: 1 }}>
                            {update.activity}
                          </Typography>
                          <Box
                            sx={{
                              width: '100%',
                              height: 120,
                              background: index === 0 ? '#DBEAFE' : index === 1 ? '#D1FAE5' : '#FEF3C7',
                              borderRadius: 1,
                              mb: 1,
                            }}
                          />
                          <Box sx={{ display: 'flex', gap: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                              <ThumbUp sx={{ fontSize: 14, color: '#6B7280' }} />
                              <Typography sx={{ fontSize: 11, color: '#6B7280' }}>
                                {update.likes}
                              </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                              <Typography sx={{ fontSize: 11, color: '#6B7280' }}>💬</Typography>
                              <Typography sx={{ fontSize: 11, color: '#6B7280' }}>
                                {update.comments}
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  ))}
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Unresolved Issues Near You */}
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography sx={{ fontSize: 20, fontWeight: 700, color: '#1F2937', fontFamily: 'Inter' }}>
                Unresolved Issues Near You
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <FormControl size="small" sx={{ minWidth: 140 }}>
                  <Select defaultValue="all">
                    <MenuItem value="all">All Categories</MenuItem>
                    <MenuItem value="water">Water</MenuItem>
                    <MenuItem value="road">Road</MenuItem>
                  </Select>
                </FormControl>
                <FormControl size="small" sx={{ minWidth: 120 }}>
                  <Select defaultValue="all">
                    <MenuItem value="all">All Urgency</MenuItem>
                    <MenuItem value="urgent">Urgent</MenuItem>
                    <MenuItem value="high">High</MenuItem>
                  </Select>
                </FormControl>
                <FormControl size="small" sx={{ minWidth: 130 }}>
                  <Select defaultValue="all">
                    <MenuItem value="all">All Districts</MenuItem>
                    <MenuItem value="colombo">Colombo</MenuItem>
                    <MenuItem value="galle">Galle</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>

            <Grid container spacing={3}>
              {unresolvedIssues.map((issue) => (
                <Grid item xs={12} md={6} key={issue.id}>
                  <Card
                    sx={{
                      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                      borderRadius: 2,
                      overflow: 'hidden',
                    }}
                  >
                    <Box sx={{ position: 'relative' }}>
                      <Box
                        component="img"
                        src={issue.image}
                        sx={{
                          width: '100%',
                          height: 180,
                          objectFit: 'cover',
                        }}
                      />
                      <Chip
                        label={issue.priority}
                        sx={{
                          position: 'absolute',
                          top: 12,
                          left: 12,
                          background: issue.priorityColor,
                          color: 'white',
                          fontSize: 11,
                          fontWeight: 700,
                          height: 24,
                        }}
                      />
                      <Chip
                        label={issue.category}
                        sx={{
                          position: 'absolute',
                          top: 12,
                          right: 12,
                          background: 'white',
                          color: '#1F2937',
                          fontSize: 11,
                          fontWeight: 600,
                          height: 24,
                        }}
                      />
                    </Box>
                    <CardContent>
                      <Typography sx={{ fontSize: 16, fontWeight: 700, color: '#1F2937', mb: 1 }}>
                        {issue.title}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1.5 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <LocationOn sx={{ fontSize: 14, color: '#6B7280' }} />
                          <Typography sx={{ fontSize: 12, color: '#6B7280' }}>
                            {issue.location}
                          </Typography>
                        </Box>
                        <Typography sx={{ fontSize: 12, color: '#DC2626', fontWeight: 600 }}>
                          🚨 {issue.affected}
                        </Typography>
                      </Box>
                      <Typography sx={{ fontSize: 13, color: '#6B7280', mb: 2, lineHeight: 1.5 }}>
                        {issue.description}
                      </Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                          <Box>
                            <Typography sx={{ fontSize: 18, fontWeight: 700, color: '#1F2937' }}>
                              {issue.verifications}
                            </Typography>
                            <Typography sx={{ fontSize: 11, color: '#6B7280' }}>
                              Verifications
                            </Typography>
                          </Box>
                          <Box>
                            <Typography sx={{ fontSize: 18, fontWeight: 700, color: '#DC2626' }}>
                              {issue.waiting}
                            </Typography>
                            <Typography sx={{ fontSize: 11, color: '#6B7280' }}>
                              Waiting
                            </Typography>
                          </Box>
                        </Box>
                        <Chip
                          label={issue.status}
                          sx={{
                            background: '#FEF3C7',
                            color: '#92400E',
                            fontSize: 11,
                            fontWeight: 600,
                          }}
                        />
                      </Box>
                      <Button
                        variant="contained"
                        fullWidth
                        startIcon={<Assignment />}
                        sx={{
                          background: 'linear-gradient(90deg, #2563EB 0%, #0D9488 100%)',
                          color: 'white',
                          textTransform: 'none',
                          fontSize: 14,
                          fontWeight: 600,
                          py: 1.2,
                          '&:hover': {
                            background: 'linear-gradient(90deg, #1D4ED8 0%, #0F766E 100%)',
                          },
                        }}
                      >
                        🤝 Claim This Issue
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

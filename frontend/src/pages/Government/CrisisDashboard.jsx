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
  Checkbox,
  IconButton,
  Divider,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Warning,
  Assessment,
  Settings,
  TrendingUp,
  LocalHospital,
  Schedule,
  People,
  Refresh,
  Close,
  LocationOn,
  Timer,
} from '@mui/icons-material';

export default function CrisisDashboard() {
  const navigate = useNavigate();
  const [selectedIssue, setSelectedIssue] = useState('kelaniya');

  const stats = [
    { label: 'Urgent Issues', value: '47', icon: '🔺', color: '#FEE2E2', textColor: '#991B1B' },
    { label: 'Awaiting Response', value: '23', icon: '⏰', color: '#FED7AA', textColor: '#9A3412' },
    { label: 'NGOs/Donors Active', value: '12', icon: '🤝', color: '#FEF3C7', textColor: '#92400E' },
    { label: 'Citizens Verified', value: '156', icon: '👥', color: '#DBEAFE', textColor: '#1E40AF' },
    { label: 'Avg Response Time', value: '8m', icon: '⏱️', color: '#E0E7FF', textColor: '#3730A3' },
  ];

  const activeResponders = [
    { name: 'Janur Vamara', role: 'Active responder', status: 'Critical', avatar: '' },
    { name: 'Jord Sor', role: 'Active responder', status: 'Critical', avatar: '' },
    { name: 'Miral Shara', role: 'Active responder', status: 'Critical', avatar: '' },
    { name: 'Ainan Rohi', role: 'Active responder', status: 'Critical', avatar: '' },
    { name: 'Jammy Nattry', role: 'Active responder', status: 'Urgent', avatar: '' },
  ];

  const priorityIssues = [
    {
      id: 1,
      priority: 'CRITICAL',
      title: 'Water contamination in Galle',
      description: 'Multiple reports of contaminated water supply',
      time: '2 mins ago',
      code: 'S-32',
      verified: 12,
      location: 'Galle District',
      status: 'claim',
      color: '#DC2626',
    },
    {
      id: 2,
      priority: 'HIGH',
      title: 'Road blockage A1 highway',
      description: 'Fallen tree blocking main highway near Kurunegala',
      time: '3 mins ago',
      code: '12-15',
      verified: 5,
      location: 'Kurunegala',
      status: 'claim',
      color: '#EA580C',
    },
    {
      id: 3,
      priority: 'MEDIUM',
      title: 'Drainage issue Kandy',
      description: 'Blocked drainage causing minor flooding',
      time: '25 mins ago',
      code: '28-45',
      verified: 5,
      location: 'Kandy Central',
      status: 'claim',
      color: '#F59E0B',
    },
    {
      id: 4,
      priority: 'IN PROGRESS',
      title: 'Power outage Colony 7',
      description: 'Claimed by CEB Emergency Team',
      time: '15 mins ago',
      assignedTo: 'CEB Team Alpha',
      eta: 'ETA: 30 mins',
      verified: null,
      location: null,
      status: 'assigned',
      color: '#10B981',
    },
  ];

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', background: '#F9FAFB' }}>
      {/* Left Sidebar */}
      <Box
        sx={{
          width: 200,
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
              color: '#6B7280',
              fontWeight: 500,
              py: 1,
              '&:hover': { background: '#F9FAFB' },
            }}
          >
            Dashboard
          </Button>
          <Button
            startIcon={<Warning />}
            sx={{
              justifyContent: 'flex-start',
              textTransform: 'none',
              color: 'white',
              background: '#2563EB',
              fontWeight: 600,
              py: 1,
              '&:hover': { background: '#1D4ED8' },
            }}
          >
            Urgent Issues
          </Button>
          <Button
            startIcon={<Assessment />}
            sx={{
              justifyContent: 'flex-start',
              textTransform: 'none',
              color: '#6B7280',
              fontWeight: 500,
              py: 1,
              '&:hover': { background: '#F9FAFB' },
            }}
          >
            Reports & Analytics
          </Button>
          <Button
            startIcon={<Settings />}
            sx={{
              justifyContent: 'flex-start',
              textTransform: 'none',
              color: '#6B7280',
              fontWeight: 500,
              py: 1,
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
            <Chip
              icon={<Warning sx={{ fontSize: 18, color: '#DC2626' }} />}
              label="Crisis Response Mode"
              sx={{
                background: '#FEE2E2',
                color: '#991B1B',
                fontWeight: 700,
                fontSize: 13,
              }}
            />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography sx={{ fontSize: 13, color: '#6B7280' }}>Role:</Typography>
                <Chip
                  label="Government"
                  sx={{
                    background: '#2563EB',
                    color: 'white',
                    fontWeight: 600,
                    fontSize: 13,
                    height: 28,
                  }}
                />
              </Box>
              <Typography sx={{ fontSize: 14, color: '#6B7280' }}>සි | த | ENG</Typography>
              <IconButton size="small">
                <Settings sx={{ fontSize: 20, color: '#6B7280' }} />
              </IconButton>
              <IconButton size="small">
                <Avatar sx={{ width: 32, height: 32 }} />
              </IconButton>
            </Box>
          </Box>
        </Box>

        {/* Stats Cards */}
        <Box sx={{ px: 4, py: 3 }}>
          <Grid container spacing={2}>
            {stats.map((stat, index) => (
              <Grid item xs={12} sm={6} md={2.4} key={index}>
                <Card
                  sx={{
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                    borderRadius: 2,
                    border: '1px solid #E5E7EB',
                  }}
                >
                  <CardContent sx={{ p: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <Typography sx={{ fontSize: 24 }}>{stat.icon}</Typography>
                      {index === 0 && <TrendingUp sx={{ fontSize: 20, color: '#DC2626' }} />}
                    </Box>
                    <Typography
                      sx={{
                        fontSize: 28,
                        fontWeight: 700,
                        color: stat.textColor,
                        fontFamily: 'Inter',
                        mb: 0.5,
                      }}
                    >
                      {stat.value}
                    </Typography>
                    <Typography sx={{ fontSize: 12, color: '#6B7280' }}>
                      {stat.label}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Filters and Map */}
        <Box sx={{ px: 4, pb: 3 }}>
          <Grid container spacing={3}>
            {/* Left: Filters */}
            <Grid item xs={12} md={3}>
              <Card sx={{ boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderRadius: 2 }}>
                <CardContent>
                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <Typography sx={{ fontSize: 12, color: '#6B7280', mb: 0.5 }}>
                      Category:
                    </Typography>
                    <Select defaultValue="all" size="small">
                      <MenuItem value="all">All</MenuItem>
                      <MenuItem value="water">Water</MenuItem>
                      <MenuItem value="road">Road</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <Typography sx={{ fontSize: 12, color: '#6B7280', mb: 0.5 }}>
                      Urgency:
                    </Typography>
                    <Select defaultValue="all" size="small">
                      <MenuItem value="all">All</MenuItem>
                      <MenuItem value="critical">Critical</MenuItem>
                      <MenuItem value="high">High</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <Typography sx={{ fontSize: 12, color: '#6B7280', mb: 0.5 }}>
                      Status:
                    </Typography>
                    <Select defaultValue="all" size="small">
                      <MenuItem value="all">All</MenuItem>
                      <MenuItem value="pending">Pending</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <Typography sx={{ fontSize: 12, color: '#6B7280', mb: 0.5 }}>
                      Assigned to:
                    </Typography>
                    <Select defaultValue="all" size="small">
                      <MenuItem value="all">All Assigned</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl fullWidth>
                    <Typography sx={{ fontSize: 12, color: '#6B7280', mb: 0.5 }}>
                      Sort by:
                    </Typography>
                    <Select defaultValue="all" size="small">
                      <MenuItem value="all">All Filters</MenuItem>
                    </Select>
                  </FormControl>
                </CardContent>
              </Card>

              {/* Aid Coordination */}
              <Card sx={{ mt: 2, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderRadius: 2 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography sx={{ fontSize: 14, fontWeight: 700, color: '#1F2937' }}>
                      Aid Coordination View
                    </Typography>
                    <IconButton size="small">
                      <Close sx={{ fontSize: 18 }} />
                    </IconButton>
                  </Box>

                  <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', gap: 2, mb: 2, borderBottom: '2px solid #E5E7EB', pb: 1 }}>
                      <Typography sx={{ fontSize: 11, fontWeight: 600, color: '#1F2937', flex: 1 }}>
                        Active Responders
                      </Typography>
                      <Typography sx={{ fontSize: 11, fontWeight: 600, color: '#1F2937', width: 60 }}>
                        Status
                      </Typography>
                      <Typography sx={{ fontSize: 11, fontWeight: 600, color: '#1F2937', flex: 1 }}>
                        Task Assignment
                      </Typography>
                    </Box>

                    {activeResponders.map((responder, index) => (
                      <Box
                        key={index}
                        sx={{
                          display: 'flex',
                          gap: 2,
                          alignItems: 'center',
                          mb: 1.5,
                          pb: 1.5,
                          borderBottom: index < activeResponders.length - 1 ? '1px solid #F3F4F6' : 'none',
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1 }}>
                          <Avatar sx={{ width: 28, height: 28 }} />
                          <Box>
                            <Typography sx={{ fontSize: 12, fontWeight: 600, color: '#1F2937' }}>
                              {responder.name}
                            </Typography>
                            <Typography sx={{ fontSize: 10, color: '#6B7280' }}>
                              {responder.role}
                            </Typography>
                          </Box>
                        </Box>
                        <Chip
                          label={responder.status}
                          sx={{
                            background: responder.status === 'Critical' ? '#FEE2E2' : '#FEF3C7',
                            color: responder.status === 'Critical' ? '#991B1B' : '#92400E',
                            fontSize: 10,
                            height: 22,
                            fontWeight: 600,
                            width: 60,
                          }}
                        />
                        <Box sx={{ flex: 1 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
                            <Checkbox size="small" sx={{ p: 0 }} />
                            <Typography sx={{ fontSize: 10, color: '#1F2937' }}>
                              Flooded Road at Kelaniya
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Schedule sx={{ fontSize: 10, color: '#6B7280' }} />
                            <Typography sx={{ fontSize: 9, color: '#6B7280' }}>
                              16 hrs ago
                            </Typography>
                            <Button
                              variant="contained"
                              size="small"
                              sx={{
                                background: '#DC2626',
                                color: 'white',
                                fontSize: 8,
                                py: 0.3,
                                px: 1,
                                minWidth: 'auto',
                                textTransform: 'none',
                                '&:hover': {
                                  background: '#B91C1C',
                                },
                              }}
                            >
                              Real time update
                            </Button>
                          </Box>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Right: Map */}
            <Grid item xs={12} md={9}>
              <Card sx={{ boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderRadius: 2, position: 'relative', height: 600 }}>
                <Box
                  component="img"
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200&h=600&fit=crop"
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    opacity: 0.4,
                  }}
                />

                {/* Issue Popup */}
                <Card
                  sx={{
                    position: 'absolute',
                    top: 120,
                    left: '40%',
                    width: 280,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    zIndex: 10,
                  }}
                >
                  <CardContent sx={{ p: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                      <Typography sx={{ fontSize: 14, fontWeight: 700, color: '#1F2937', flex: 1 }}>
                        Flooded Road at Kelaniya (Road)
                      </Typography>
                      <IconButton size="small" sx={{ mt: -0.5 }}>
                        <Close sx={{ fontSize: 18 }} />
                      </IconButton>
                    </Box>
                    <Typography sx={{ fontSize: 12, color: '#6B7280', mb: 1 }}>
                      Verified: 25
                    </Typography>
                    <Typography sx={{ fontSize: 12, color: '#6B7280', mb: 1.5 }}>
                      Status: Pending
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button
                        size="small"
                        sx={{
                          fontSize: 11,
                          textTransform: 'none',
                          color: '#2563EB',
                          fontWeight: 600,
                        }}
                      >
                        [Claim]
                      </Button>
                      <Button
                        size="small"
                        sx={{
                          fontSize: 11,
                          textTransform: 'none',
                          color: '#2563EB',
                          fontWeight: 600,
                        }}
                      >
                        [Assign]
                      </Button>
                    </Box>
                  </CardContent>
                </Card>

                {/* Countdown Tooltips */}
                <Card
                  sx={{
                    position: 'absolute',
                    top: 20,
                    right: 20,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  }}
                >
                  <CardContent sx={{ p: 2 }}>
                    <Typography sx={{ fontSize: 14, fontWeight: 700, color: '#1F2937' }}>
                      Countdown : tooltips
                    </Typography>
                  </CardContent>
                </Card>

                {/* Live Moving Rescue Team */}
                <Card
                  sx={{
                    position: 'absolute',
                    bottom: 80,
                    right: 160,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  }}
                >
                  <CardContent sx={{ p: 2 }}>
                    <Typography sx={{ fontSize: 13, fontWeight: 700, color: '#1F2937', mb: 1 }}>
                      Live Moving Rescue Team
                    </Typography>
                    <Box
                      sx={{
                        fontSize: 40,
                        textAlign: 'center',
                      }}
                    >
                      🚑
                    </Box>
                  </CardContent>
                </Card>
              </Card>
            </Grid>
          </Grid>
        </Box>

        {/* Priority Issues */}
        <Box sx={{ px: 4, pb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Typography sx={{ fontSize: 18, fontWeight: 700, color: '#1F2937', fontFamily: 'Inter' }}>
              Priority Issues
            </Typography>
            <Chip
              label="Live"
              sx={{
                background: '#DC2626',
                color: 'white',
                fontSize: 11,
                height: 24,
                fontWeight: 600,
              }}
            />
            <IconButton size="small">
              <Refresh sx={{ fontSize: 20, color: '#6B7280' }} />
            </IconButton>
          </Box>

          <Grid container spacing={2}>
            {priorityIssues.map((issue) => (
              <Grid item xs={12} md={3} key={issue.id}>
                <Card
                  sx={{
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                    borderRadius: 2,
                    borderLeft: `4px solid ${issue.color}`,
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                      <Chip
                        label={issue.priority}
                        sx={{
                          background: issue.color,
                          color: 'white',
                          fontSize: 10,
                          height: 22,
                          fontWeight: 700,
                        }}
                      />
                      <Button
                        size="small"
                        variant={issue.status === 'claim' ? 'contained' : 'outlined'}
                        sx={{
                          background: issue.status === 'claim' ? issue.color : 'transparent',
                          color: issue.status === 'claim' ? 'white' : issue.color,
                          borderColor: issue.color,
                          fontSize: 10,
                          textTransform: 'none',
                          px: 1.5,
                          py: 0.5,
                          fontWeight: 600,
                          minWidth: 'auto',
                          '&:hover': {
                            background: issue.status === 'claim' ? issue.color : 'transparent',
                          },
                        }}
                      >
                        {issue.status === 'claim' ? 'Claim' : 'Assigned'}
                      </Button>
                    </Box>

                    <Typography sx={{ fontSize: 14, fontWeight: 700, color: '#1F2937', mb: 0.5 }}>
                      {issue.title}
                    </Typography>
                    <Typography sx={{ fontSize: 11, color: '#6B7280', mb: 1.5, lineHeight: 1.4 }}>
                      {issue.description}
                    </Typography>

                    {issue.status === 'claim' ? (
                      <>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                          <People sx={{ fontSize: 14, color: '#6B7280' }} />
                          <Typography sx={{ fontSize: 11, color: '#6B7280' }}>
                            {issue.verified} verified
                          </Typography>
                          <LocationOn sx={{ fontSize: 14, color: '#6B7280', ml: 1 }} />
                          <Typography sx={{ fontSize: 11, color: '#6B7280' }}>
                            {issue.location}
                          </Typography>
                        </Box>
                        <Chip
                          label={issue.code}
                          sx={{
                            background: '#FEF3C7',
                            color: '#92400E',
                            fontSize: 10,
                            height: 20,
                            fontWeight: 600,
                          }}
                        />
                      </>
                    ) : (
                      <>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                          <People sx={{ fontSize: 14, color: '#10B981' }} />
                          <Typography sx={{ fontSize: 11, color: '#10B981', fontWeight: 600 }}>
                            {issue.assignedTo}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Timer sx={{ fontSize: 14, color: '#6B7280' }} />
                          <Typography sx={{ fontSize: 11, color: '#6B7280' }}>
                            {issue.eta}
                          </Typography>
                        </Box>
                      </>
                    )}

                    <Typography
                      sx={{
                        fontSize: 10,
                        color: '#9CA3AF',
                        mt: 1,
                        textAlign: 'right',
                      }}
                    >
                      {issue.time}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}

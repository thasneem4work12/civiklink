import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Avatar,
  IconButton,
  LinearProgress,
  Grid,
} from '@mui/material';
import {
  Dashboard,
  AssignmentInd,
  Assessment,
  Settings,
  Notifications,
  Warning,
  CheckCircle,
  Schedule,
  ArrowForward,
} from '@mui/icons-material';

export default function GovDashboard() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('dashboard');

  const taggedIssues = [
    {
      id: 1,
      title: 'Water Pipeline Burst in Galle Road',
      reporter: 'Kasun Silva',
      location: 'Colombo 03',
      category: 'Water',
      priority: 'High',
      priorityColor: '#DC2626',
      verifications: 42,
      status: 'Awaiting Response',
      timeRemaining: '36 hours',
      daysAgo: 2,
    },
    {
      id: 2,
      title: 'Broken Streetlights - Residential Area',
      reporter: 'Priya Fernando',
      location: 'Kandy',
      category: 'Electricity',
      priority: 'Medium',
      priorityColor: '#F59E0B',
      verifications: 28,
      status: 'In Progress',
      timeRemaining: '',
      daysAgo: 5,
    },
    {
      id: 3,
      title: 'Flooded Road After Heavy Rain',
      reporter: 'Nimal Perera',
      location: 'Gampaha',
      category: 'Flood',
      priority: 'Critical',
      priorityColor: '#7C3AED',
      verifications: 67,
      status: 'Awaiting Response',
      timeRemaining: '12 hours',
      daysAgo: 1,
    },
  ];

  const officers = [
    {
      name: 'Eng. Ranjith Dissanayake',
      position: 'Senior Engineer - Water Supply',
      assigned: 8,
      resolved: 45,
      rating: 4.7,
    },
    {
      name: 'Chamara Wickramasinghe',
      position: 'Field Officer - Maintenance',
      assigned: 5,
      resolved: 32,
      rating: 4.5,
    },
    {
      name: 'Anura Rajapaksa',
      position: 'Emergency Response Coordinator',
      assigned: 12,
      resolved: 67,
      rating: 4.9,
    },
  ];

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', background: '#F9FAFB' }}>
      {/* Sidebar */}
      <Box
        sx={{
          width: 240,
          background: 'linear-gradient(180deg, #1E40AF 0%, #1E3A8A 100%)',
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
            Ministry Dashboard
          </Typography>
        </Box>

        <Box sx={{ flex: 1 }}>
          {[
            { id: 'dashboard', icon: <Dashboard />, label: 'Dashboard Overview' },
            { id: 'officers', icon: <AssignmentInd />, label: 'Officers & Teams' },
            { id: 'reports', icon: <Assessment />, label: 'Performance Reports' },
            { id: 'settings', icon: <Settings />, label: 'Ministry Settings' },
          ].map((item) => (
            <Box
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                px: 3,
                py: 2,
                cursor: 'pointer',
                background: activeSection === item.id ? 'rgba(255,255,255,0.15)' : 'transparent',
                borderLeft: activeSection === item.id ? '4px solid white' : '4px solid transparent',
                transition: 'all 0.2s',
                '&:hover': {
                  background: 'rgba(255,255,255,0.1)',
                },
              }}
            >
              {item.icon}
              <Typography sx={{ fontSize: 14, fontWeight: activeSection === item.id ? 600 : 400 }}>
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
              Ministry of Water Supply
            </Typography>
            <Typography sx={{ fontSize: 13, color: '#6B7280' }}>
              Welcome back, Minister Ranil Jayawardena
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
            <Avatar sx={{ width: 40, height: 40, background: '#2563EB' }}>RJ</Avatar>
          </Box>
        </Box>

        <Box sx={{ p: 4 }}>
          {/* Stats Cards */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} md={3}>
              <Card sx={{ boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderRadius: 2 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography sx={{ fontSize: 14, color: '#6B7280' }}>
                      Tagged Issues
                    </Typography>
                    <Warning sx={{ color: '#F59E0B', fontSize: 28 }} />
                  </Box>
                  <Typography sx={{ fontSize: 36, fontWeight: 700, color: '#1F2937', fontFamily: 'Inter' }}>
                    23
                  </Typography>
                  <Typography sx={{ fontSize: 12, color: '#6B7280', mt: 1 }}>
                    Awaiting response
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={3}>
              <Card sx={{ boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderRadius: 2 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography sx={{ fontSize: 14, color: '#6B7280' }}>
                      In Progress
                    </Typography>
                    <Schedule sx={{ color: '#3B82F6', fontSize: 28 }} />
                  </Box>
                  <Typography sx={{ fontSize: 36, fontWeight: 700, color: '#1F2937', fontFamily: 'Inter' }}>
                    15
                  </Typography>
                  <Typography sx={{ fontSize: 12, color: '#6B7280', mt: 1 }}>
                    Being resolved
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={3}>
              <Card sx={{ boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderRadius: 2 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography sx={{ fontSize: 14, color: '#6B7280' }}>
                      Resolved
                    </Typography>
                    <CheckCircle sx={{ color: '#10B981', fontSize: 28 }} />
                  </Box>
                  <Typography sx={{ fontSize: 36, fontWeight: 700, color: '#1F2937', fontFamily: 'Inter' }}>
                    187
                  </Typography>
                  <Typography sx={{ fontSize: 12, color: '#6B7280', mt: 1 }}>
                    This month
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={3}>
              <Card sx={{ boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderRadius: 2 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography sx={{ fontSize: 14, color: '#6B7280' }}>
                      Avg Response Time
                    </Typography>
                    <Assessment sx={{ color: '#8B5CF6', fontSize: 28 }} />
                  </Box>
                  <Typography sx={{ fontSize: 36, fontWeight: 700, color: '#1F2937', fontFamily: 'Inter' }}>
                    18h
                  </Typography>
                  <Typography sx={{ fontSize: 12, color: '#10B981', mt: 1 }}>
                    ↓ 6h from last month
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Tagged Issues Table */}
          <Card sx={{ boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderRadius: 3, mb: 4 }}>
            <Box sx={{ p: 3, borderBottom: '1px solid #E5E7EB' }}>
              <Typography sx={{ fontSize: 18, fontWeight: 700, color: '#1F2937', fontFamily: 'Inter' }}>
                Issues Tagged to Your Ministry
              </Typography>
              <Typography sx={{ fontSize: 13, color: '#6B7280', mt: 0.5 }}>
                Respond within 72 hours to maintain accountability rating
              </Typography>
            </Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ background: '#F9FAFB' }}>
                    <TableCell sx={{ fontWeight: 600, fontSize: 13 }}>Issue Title</TableCell>
                    <TableCell sx={{ fontWeight: 600, fontSize: 13 }}>Reporter</TableCell>
                    <TableCell sx={{ fontWeight: 600, fontSize: 13 }}>Location</TableCell>
                    <TableCell sx={{ fontWeight: 600, fontSize: 13 }}>Priority</TableCell>
                    <TableCell sx={{ fontWeight: 600, fontSize: 13 }}>Verifications</TableCell>
                    <TableCell sx={{ fontWeight: 600, fontSize: 13 }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: 600, fontSize: 13 }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {taggedIssues.map((issue) => (
                    <TableRow key={issue.id} sx={{ '&:hover': { background: '#F9FAFB' } }}>
                      <TableCell>
                        <Typography sx={{ fontSize: 14, fontWeight: 600, color: '#1F2937' }}>
                          {issue.title}
                        </Typography>
                        <Typography sx={{ fontSize: 12, color: '#6B7280' }}>
                          {issue.category} • {issue.daysAgo} days ago
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Avatar sx={{ width: 32, height: 32, fontSize: 14 }}>
                            {issue.reporter[0]}
                          </Avatar>
                          <Typography sx={{ fontSize: 13 }}>{issue.reporter}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography sx={{ fontSize: 13, color: '#6B7280' }}>
                          {issue.location}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={issue.priority}
                          size="small"
                          sx={{
                            background: issue.priorityColor,
                            color: 'white',
                            fontWeight: 600,
                            fontSize: 11,
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={`${issue.verifications} verified`}
                          size="small"
                          sx={{
                            background: '#D1FAE5',
                            color: '#065F46',
                            fontWeight: 600,
                            fontSize: 11,
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Box>
                          <Chip
                            label={issue.status}
                            size="small"
                            sx={{
                              background: issue.status === 'Awaiting Response' ? '#FEE2E2' : '#DBEAFE',
                              color: issue.status === 'Awaiting Response' ? '#991B1B' : '#1E40AF',
                              fontWeight: 600,
                              fontSize: 11,
                            }}
                          />
                          {issue.timeRemaining && (
                            <Typography sx={{ fontSize: 11, color: '#DC2626', mt: 0.5 }}>
                              ⏰ {issue.timeRemaining} left
                            </Typography>
                          )}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Button
                          size="small"
                          variant="contained"
                          onClick={() => navigate(`/issues/${issue.id}/ministry-action`)}
                          sx={{
                            textTransform: 'none',
                            fontSize: 12,
                            background: '#2563EB',
                            '&:hover': {
                              background: '#1D4ED8',
                            },
                          }}
                        >
                          Respond
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>

          {/* Officers Section */}
          <Card sx={{ boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderRadius: 3 }}>
            <Box sx={{ p: 3, borderBottom: '1px solid #E5E7EB' }}>
              <Typography sx={{ fontSize: 18, fontWeight: 700, color: '#1F2937', fontFamily: 'Inter' }}>
                Assigned Officers & Performance
              </Typography>
            </Box>
            <Box sx={{ p: 3 }}>
              {officers.map((officer, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    py: 2,
                    borderBottom: index < officers.length - 1 ? '1px solid #E5E7EB' : 'none',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ width: 50, height: 50, background: '#2563EB' }}>
                      {officer.name.split(' ').map((n) => n[0]).join('')}
                    </Avatar>
                    <Box>
                      <Typography sx={{ fontSize: 15, fontWeight: 600, color: '#1F2937' }}>
                        {officer.name}
                      </Typography>
                      <Typography sx={{ fontSize: 13, color: '#6B7280' }}>
                        {officer.position}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography sx={{ fontSize: 24, fontWeight: 700, color: '#F59E0B', fontFamily: 'Inter' }}>
                        {officer.assigned}
                      </Typography>
                      <Typography sx={{ fontSize: 12, color: '#6B7280' }}>
                        Assigned
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography sx={{ fontSize: 24, fontWeight: 700, color: '#10B981', fontFamily: 'Inter' }}>
                        {officer.resolved}
                      </Typography>
                      <Typography sx={{ fontSize: 12, color: '#6B7280' }}>
                        Resolved
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography sx={{ fontSize: 24, fontWeight: 700, color: '#8B5CF6', fontFamily: 'Inter' }}>
                        {officer.rating}⭐
                      </Typography>
                      <Typography sx={{ fontSize: 12, color: '#6B7280' }}>
                        Rating
                      </Typography>
                    </Box>
                    <IconButton size="small">
                      <ArrowForward sx={{ fontSize: 20, color: '#6B7280' }} />
                    </IconButton>
                  </Box>
                </Box>
              ))}
            </Box>
          </Card>
        </Box>
      </Box>
    </Box>
  );
}

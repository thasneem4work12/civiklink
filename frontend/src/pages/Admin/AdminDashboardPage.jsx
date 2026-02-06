import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Switch,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  AdminPanelSettings,
  Visibility,
  People,
  PersonAdd,
  Settings,
  Logout,
  Assessment,
  Block,
  LockOpen,
  VerifiedUser,
  Flag,
  Delete,
  CheckCircle,
  Warning,
  Groups,
  ReportProblem,
} from '@mui/icons-material';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [crisisMode, setCrisisMode] = useState(true);

  const stats = [
    { label: 'Total Users', value: '15,420', sublabel: 'Active', icon: <Groups sx={{ fontSize: 24, color: '#10B981' }} />, color: '#D1FAE5' },
    { label: 'Reports Pending Verification', value: '32', sublabel: '', icon: <Assessment sx={{ fontSize: 24, color: '#F59E0B' }} />, color: '#FEF3C7' },
    { label: 'Fake Reports Detected', value: '18', sublabel: '', icon: <Warning sx={{ fontSize: 24, color: '#DC2626' }} />, color: '#FEE2E2' },
    { label: 'Active Crisis Mode', value: 'ON - Floods', sublabel: '', icon: <ReportProblem sx={{ fontSize: 24, color: '#EA580C' }} />, color: '#FED7AA' },
  ];

  const users = [
    { id: 101, name: 'Ravi S.', email: 'ravi.seelam@gmail.com', role: 'Senior', status: 'Active', statusColor: '#10B981' },
    { id: 102, name: 'Ravi S. Env', email: 'ravi.environs@gmail.com', role: 'Moderator', status: 'Active', statusColor: '#10B981' },
    { id: 103, name: 'Ravi Rane', email: 'ravi@gmail.com', role: 'Moderator', status: 'Active', statusColor: '#10B981' },
    { id: 104, name: 'Ravi Vattson', email: 'ravi@gmail.com', role: 'Moderator', status: 'Active', statusColor: '#10B981' },
  ];

  const reports = [
    { id: 106, title: 'Fake Report Re...', reporter: 'Ravi S.', verifications: 1, reason: 'Fake Report from...', actions: ['Delete', 'Warn', 'Mark as Safe'] },
    { id: 147, title: 'Fake Report Re...', reporter: 'Ravi S.', verifications: 1, reason: 'Fake Report from...', actions: ['Delete', 'Warn', 'Mark as Safe'] },
    { id: 149, title: 'Fake Report Re...', reporter: 'Ravi Item', verifications: 1, reason: 'Removals', actions: ['Delete', 'Warn', 'Mark as Safe'] },
    { id: 144, title: 'Fake Report Re...', reporter: 'Ravi Fares', verifications: 1, reason: 'Removals', actions: ['Delete', 'Warn', 'Mark as Safe'] },
  ];

  const auditLogs = [
    { user: 'CivikLink SL', action: 'Admin actions sector Admin action', timestamp: '2023-06-20 17:35:55' },
    { user: 'CivikLink SL', action: 'Admin actions sector Annila action', timestamp: '2023-06-20 11:27:33' },
    { user: 'CivikLink SL', action: 'Admin actions Commited action', timestamp: '2023-06-20 11:27:17' },
    { user: 'CivikLink SL', action: 'Admin actions sector Admin action', timestamp: '2023-06-20 11:27:16' },
    { user: 'CivikLink SL', action: 'Admin actions sector Admin action', timestamp: '2023-06-20 11:23:10' },
    { user: 'CivikLink SL', action: 'Admin actions sector Admin action', timestamp: '2023-06-20 11:23:10' },
  ];

  const categoryData = [
    { name: 'Category 1', value: 30, color: '#3B82F6' },
    { name: 'Category 2', value: 25, color: '#1E40AF' },
    { name: 'Category 3', value: 20, color: '#60A5FA' },
    { name: 'Category 4', value: 15, color: '#93C5FD' },
    { name: 'Category 5', value: 10, color: '#DBEAFE' },
  ];

  const usersData = [
    { name: 'Users 1', value: 40, color: '#3B82F6' },
    { name: 'Users 2', value: 30, color: '#60A5FA' },
    { name: 'Users 3', value: 20, color: '#93C5FD' },
    { name: 'Users 4', value: 10, color: '#DBEAFE' },
  ];

  const resolutionData = [
    { category: 'Cat 1', value: 80 },
    { category: 'Cat 2', value: 65 },
    { category: 'Cat 3', value: 45 },
    { category: 'Cat 4', value: 30 },
    { category: 'Cat 5', value: 20 },
  ];

  const statusData = [
    { status: 'Status 1', value: 70 },
    { status: 'Status 2', value: 55 },
    { status: 'Status 3', value: 40 },
    { status: 'Status 4', value: 25 },
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
              fontSize: 14,
              '&:hover': { background: '#F9FAFB' },
            }}
          >
            Dashboard
          </Button>
          <Button
            startIcon={<AdminPanelSettings />}
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
            Admin Panel
          </Button>
          <Button
            startIcon={<Visibility />}
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
            Overview
          </Button>
          <Button
            startIcon={<People />}
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
            User Management
          </Button>
          <Button
            startIcon={<PersonAdd />}
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
            Users
          </Button>
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
            <Typography sx={{ fontSize: 16, fontWeight: 600, color: '#1F2937', fontFamily: 'Inter' }}>
              Admin Panel - Internal
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <Typography sx={{ fontSize: 13, color: '#6B7280' }}>
                Admin: <strong>Ravi S. - Senior Moderator</strong>
              </Typography>
              <IconButton size="small">
                <Settings sx={{ fontSize: 20, color: '#6B7280' }} />
              </IconButton>
              <Box sx={{ position: 'relative' }}>
                <IconButton size="small">
                  <Box sx={{ fontSize: 20 }}>🔔</Box>
                </IconButton>
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
              </Box>
              <Typography sx={{ fontSize: 13, color: '#6B7280' }}>සි | தமிழ் | ENG</Typography>
              <Button
                startIcon={<Logout />}
                onClick={() => {
                  localStorage.removeItem('token');
                  localStorage.removeItem('user');
                  dispatch(logout());
                  navigate('/');
                }}
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
          <Grid container spacing={2} sx={{ mb: 4 }}>
            {stats.map((stat, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card
                  sx={{
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                    borderRadius: 2,
                    border: '1px solid #E5E7EB',
                  }}
                >
                  <CardContent sx={{ p: 2.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: 2,
                          background: stat.color,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {stat.icon}
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography sx={{ fontSize: 12, color: '#6B7280', mb: 0.5 }}>
                          {stat.label}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: 20,
                            fontWeight: 700,
                            color: '#1F2937',
                            fontFamily: 'Inter',
                          }}
                        >
                          {stat.value}
                        </Typography>
                        {stat.sublabel && (
                          <Typography sx={{ fontSize: 11, color: '#10B981', fontWeight: 600 }}>
                            {stat.sublabel}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* User Management */}
          <Card sx={{ mb: 3, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderRadius: 2 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography
                sx={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: '#1F2937',
                  mb: 3,
                  fontFamily: 'Inter',
                }}
              >
                User Management
              </Typography>

              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow sx={{ background: '#F9FAFB' }}>
                      <TableCell sx={{ fontWeight: 600, fontSize: 13 }}>User ID</TableCell>
                      <TableCell sx={{ fontWeight: 600, fontSize: 13 }}>Name</TableCell>
                      <TableCell sx={{ fontWeight: 600, fontSize: 13 }}>Email</TableCell>
                      <TableCell sx={{ fontWeight: 600, fontSize: 13 }}>Role</TableCell>
                      <TableCell sx={{ fontWeight: 600, fontSize: 13 }}>Status</TableCell>
                      <TableCell sx={{ fontWeight: 600, fontSize: 13 }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell sx={{ fontSize: 13 }}>{user.id}</TableCell>
                        <TableCell sx={{ fontSize: 13, fontWeight: 600 }}>{user.name}</TableCell>
                        <TableCell sx={{ fontSize: 13, color: '#6B7280' }}>{user.email}</TableCell>
                        <TableCell sx={{ fontSize: 13 }}>{user.role}</TableCell>
                        <TableCell>
                          <Chip
                            label={user.status}
                            sx={{
                              background: '#D1FAE5',
                              color: '#065F46',
                              fontSize: 11,
                              height: 24,
                              fontWeight: 600,
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', gap: 1 }}>
                            <Button
                              variant="contained"
                              size="small"
                              sx={{
                                background: '#DC2626',
                                color: 'white',
                                fontSize: 11,
                                textTransform: 'none',
                                minWidth: 60,
                                py: 0.5,
                                '&:hover': { background: '#B91C1C' },
                              }}
                            >
                              Block
                            </Button>
                            <Button
                              variant="outlined"
                              size="small"
                              sx={{
                                borderColor: '#E5E7EB',
                                color: '#6B7280',
                                fontSize: 11,
                                textTransform: 'none',
                                minWidth: 70,
                                py: 0.5,
                              }}
                            >
                              Unblock
                            </Button>
                            <Button
                              variant="contained"
                              size="small"
                              sx={{
                                background: '#0D9488',
                                color: 'white',
                                fontSize: 11,
                                textTransform: 'none',
                                minWidth: 80,
                                py: 0.5,
                                '&:hover': { background: '#0F766E' },
                              }}
                            >
                              Verify ID
                            </Button>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                <Typography sx={{ fontSize: 12, color: '#6B7280' }}>
                  &lt; Previous &nbsp;&nbsp; 1 &nbsp;&nbsp; Next &gt;
                </Typography>
              </Box>
            </CardContent>
          </Card>

          <Grid container spacing={3}>
            {/* Reports Moderation */}
            <Grid item xs={12} md={7}>
              <Card sx={{ mb: 3, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderRadius: 2 }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Box>
                      <Typography
                        sx={{
                          fontSize: 18,
                          fontWeight: 700,
                          color: '#1F2937',
                          mb: 0.5,
                          fontFamily: 'Inter',
                        }}
                      >
                        Reports Moderation
                      </Typography>
                      <Typography sx={{ fontSize: 13, color: '#6B7280' }}>
                        Fake Report Removal
                      </Typography>
                    </Box>
                    <Button
                      variant="contained"
                      size="small"
                      sx={{
                        background: '#DC2626',
                        color: 'white',
                        fontSize: 12,
                        textTransform: 'none',
                        '&:hover': { background: '#B91C1C' },
                      }}
                    >
                      ⚠️ Flag as Reports
                    </Button>
                  </Box>

                  <TableContainer>
                    <Table size="small">
                      <TableHead>
                        <TableRow sx={{ background: '#F9FAFB' }}>
                          <TableCell sx={{ fontWeight: 600, fontSize: 12 }}>Report ID</TableCell>
                          <TableCell sx={{ fontWeight: 600, fontSize: 12 }}>Title</TableCell>
                          <TableCell sx={{ fontWeight: 600, fontSize: 12 }}>Reporter</TableCell>
                          <TableCell sx={{ fontWeight: 600, fontSize: 12 }}>Verification Count</TableCell>
                          <TableCell sx={{ fontWeight: 600, fontSize: 12 }}>Flag Reason</TableCell>
                          <TableCell sx={{ fontWeight: 600, fontSize: 12 }}>Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {reports.map((report) => (
                          <TableRow key={report.id}>
                            <TableCell sx={{ fontSize: 12 }}>{report.id}</TableCell>
                            <TableCell sx={{ fontSize: 12 }}>{report.title}</TableCell>
                            <TableCell sx={{ fontSize: 12 }}>{report.reporter}</TableCell>
                            <TableCell sx={{ fontSize: 12 }}>{report.verifications}</TableCell>
                            <TableCell sx={{ fontSize: 12, color: '#DC2626' }}>{report.reason}</TableCell>
                            <TableCell>
                              <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                                <Button
                                  variant="contained"
                                  size="small"
                                  sx={{
                                    background: '#DC2626',
                                    color: 'white',
                                    fontSize: 10,
                                    textTransform: 'none',
                                    minWidth: 50,
                                    py: 0.3,
                                    '&:hover': { background: '#B91C1C' },
                                  }}
                                >
                                  Delete
                                </Button>
                                <Button
                                  variant="contained"
                                  size="small"
                                  sx={{
                                    background: '#F59E0B',
                                    color: 'white',
                                    fontSize: 10,
                                    textTransform: 'none',
                                    minWidth: 45,
                                    py: 0.3,
                                    '&:hover': { background: '#D97706' },
                                  }}
                                >
                                  Warn
                                </Button>
                                <Button
                                  variant="contained"
                                  size="small"
                                  sx={{
                                    background: '#10B981',
                                    color: 'white',
                                    fontSize: 10,
                                    textTransform: 'none',
                                    minWidth: 70,
                                    py: 0.3,
                                    '&:hover': { background: '#059669' },
                                  }}
                                >
                                  Mark as Safe
                                </Button>
                              </Box>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                    <Typography sx={{ fontSize: 12, color: '#6B7280' }}>
                      &lt; Previous &nbsp;&nbsp; 1 &nbsp;&nbsp; Next &gt;
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Data Analytics */}
            <Grid item xs={12} md={5}>
              <Card sx={{ mb: 3, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderRadius: 2 }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography
                    sx={{
                      fontSize: 18,
                      fontWeight: 700,
                      color: '#1F2937',
                      mb: 3,
                      fontFamily: 'Inter',
                    }}
                  >
                    Data Analytics
                  </Typography>

                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography sx={{ fontSize: 13, fontWeight: 600, color: '#1F2937', mb: 1, textAlign: 'center' }}>
                        Reports
                      </Typography>
                      <ResponsiveContainer width="100%" height={120}>
                        <PieChart>
                          <Pie
                            data={categoryData}
                            cx="50%"
                            cy="50%"
                            innerRadius={30}
                            outerRadius={50}
                            dataKey="value"
                          >
                            {categoryData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                      <Typography sx={{ fontSize: 11, color: '#6B7280', textAlign: 'center', mt: 1 }}>
                        Category Distribution
                      </Typography>
                    </Grid>

                    <Grid item xs={6}>
                      <Typography sx={{ fontSize: 13, fontWeight: 600, color: '#1F2937', mb: 1, textAlign: 'center' }}>
                        
                      </Typography>
                      <ResponsiveContainer width="100%" height={120}>
                        <PieChart>
                          <Pie
                            data={usersData}
                            cx="50%"
                            cy="50%"
                            innerRadius={30}
                            outerRadius={50}
                            dataKey="value"
                          >
                            {usersData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                      <Typography sx={{ fontSize: 11, color: '#6B7280', textAlign: 'center', mt: 1 }}>
                        Users Distribution
                      </Typography>
                    </Grid>

                    <Grid item xs={6}>
                      <Typography sx={{ fontSize: 13, fontWeight: 600, color: '#1F2937', mb: 1, textAlign: 'center' }}>
                        
                      </Typography>
                      <ResponsiveContainer width="100%" height={120}>
                        <BarChart data={resolutionData}>
                          <XAxis dataKey="category" tick={{ fontSize: 10 }} />
                          <YAxis tick={{ fontSize: 10 }} />
                          <Bar dataKey="value" fill="#DC2626" />
                        </BarChart>
                      </ResponsiveContainer>
                      <Typography sx={{ fontSize: 11, color: '#6B7280', textAlign: 'center', mt: 1 }}>
                        Resolution Rate
                      </Typography>
                    </Grid>

                    <Grid item xs={6}>
                      <Typography sx={{ fontSize: 13, fontWeight: 600, color: '#1F2937', mb: 1, textAlign: 'center' }}>
                        
                      </Typography>
                      <ResponsiveContainer width="100%" height={120}>
                        <BarChart data={statusData}>
                          <XAxis dataKey="status" tick={{ fontSize: 10 }} />
                          <YAxis tick={{ fontSize: 10 }} />
                          <Bar dataKey="value" fill="#3B82F6" />
                        </BarChart>
                      </ResponsiveContainer>
                      <Typography sx={{ fontSize: 11, color: '#6B7280', textAlign: 'center', mt: 1 }}>
                        
                      </Typography>
                    </Grid>
                  </Grid>

                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 2, mt: 3 }}>
                    <Typography sx={{ fontSize: 13, color: '#6B7280' }}>Crisis Mode</Typography>
                    <Switch checked={crisisMode} onChange={(e) => setCrisisMode(e.target.checked)} />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* System Logs & Audit Trail */}
          <Card sx={{ mb: 3, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderRadius: 2 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography
                sx={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: '#1F2937',
                  mb: 3,
                  fontFamily: 'Inter',
                }}
              >
                System Logs & Audit Trail
              </Typography>

              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow sx={{ background: '#F9FAFB' }}>
                      <TableCell sx={{ fontWeight: 600, fontSize: 13 }}>User ID</TableCell>
                      <TableCell sx={{ fontWeight: 600, fontSize: 13 }}>Action</TableCell>
                      <TableCell sx={{ fontWeight: 600, fontSize: 13 }}>Timestamp</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {auditLogs.map((log, index) => (
                      <TableRow key={index}>
                        <TableCell sx={{ fontSize: 12 }}>{log.user}</TableCell>
                        <TableCell sx={{ fontSize: 12 }}>{log.action}</TableCell>
                        <TableCell sx={{ fontSize: 12, color: '#6B7280' }}>{log.timestamp}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                <Typography sx={{ fontSize: 12, color: '#6B7280' }}>
                  &lt; Previous &nbsp;&nbsp; 1 &nbsp;&nbsp; Next &gt;
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </Box>
  );
}

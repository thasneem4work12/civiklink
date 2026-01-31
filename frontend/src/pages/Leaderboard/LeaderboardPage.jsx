import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Box,
  Container,
  Typography,
  IconButton,
  Avatar,
  Badge,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Card,
  CardContent,
} from '@mui/material';
import {
  Notifications,
  Language,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  Schedule,
} from '@mui/icons-material';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export default function LeaderboardPage() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const topStats = [
    {
      label: 'Total Issues Reported',
      value: '12,450',
      icon: <Schedule sx={{ fontSize: 32, color: '#2563EB' }} />,
      bgColor: '#EFF6FF',
    },
    {
      label: 'Avg Response Time',
      value: '4.2 hrs',
      icon: null,
      bgColor: '#F9FAFB',
    },
    {
      label: 'Issues Resolved',
      value: '10,800',
      icon: <CheckCircle sx={{ fontSize: 32, color: '#10B981' }} />,
      bgColor: '#ECFDF5',
    },
    {
      label: 'Avg Resolution Rate',
      value: '86.7%',
      icon: null,
      bgColor: '#F9FAFB',
    },
  ];

  const ministriesData = [
    {
      rank: 1,
      ministry: 'Ministry of Water Supply',
      resolved: '2,735',
      avgResponse: '4.2 hrs',
      resolutionRate: '86.7%',
      trend: 'improving',
    },
    {
      rank: 2,
      ministry: 'Road Development Authority',
      resolved: '1,238',
      avgResponse: '4.2 hrs',
      resolutionRate: '86.7%',
      trend: 'declining',
    },
    {
      rank: 3,
      ministry: 'Ministry of Power & Energy',
      resolved: '3,800',
      avgResponse: '4.2 hrs',
      resolutionRate: '86.7%',
      trend: 'declining',
    },
  ];

  const districtData = [
    {
      rank: 1,
      district: 'Colombo',
      reported: '10,450',
      avgResponse: '4.2 hrs',
      resolutionRate: '93.7%',
    },
    {
      rank: 2,
      district: 'Gampaha',
      reported: '2,513',
      avgResponse: '4.2 hrs',
      resolutionRate: '83.3%',
    },
    {
      rank: 3,
      district: 'Kandy',
      reported: '2,117',
      avgResponse: '4.2 hrs',
      resolutionRate: '86.3%',
    },
  ];

  const ministryResolutionData = [
    { name: '1', value: 93 },
    { name: '2', value: 87 },
    { name: '3', value: 85 },
    { name: '4', value: 83 },
    { name: '5', value: 81 },
    { name: '6', value: 79 },
    { name: '7', value: 77 },
    { name: '8', value: 75 },
    { name: '9', value: 73 },
    { name: '10', value: 70 },
  ];

  const responseTimeData = [
    { month: 'Jan', time: 8 },
    { month: 'Feb', time: 5 },
    { month: 'Mar', time: 3.5 },
    { month: 'Apr', time: 5.5 },
    { month: 'May', time: 4 },
    { month: 'Jun', time: 5 },
    { month: 'Jul', time: 4.5 },
    { month: 'Aug', time: 6 },
    { month: 'Sep', time: 7 },
    { month: 'Oct', time: 5 },
    { month: 'Nov', time: 4 },
  ];

  const solvedPendingData = [
    { name: 'Solved', value: 10800 },
    { name: 'Pending', value: 1650 },
  ];

  const COLORS = ['#1E40AF', '#F59E0B'];

  const handleLogout = () => {
    navigate('/login');
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
                color: '#6B7280',
                cursor: 'pointer',
                '&:hover': { color: '#2563EB' },
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
                fontWeight: 600,
                color: '#2563EB',
                cursor: 'pointer',
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
                borderRadius: 1,
                border: '1px solid #E5E7EB',
                cursor: 'pointer',
              }}
            >
              <Language sx={{ fontSize: 18, color: '#2563EB' }} />
              <Typography sx={{ fontSize: 14, color: '#1F2937' }}>EN</Typography>
            </Box>
            <IconButton size="small">
              <Badge badgeContent={3} color="error">
                <Notifications sx={{ color: '#6B7280' }} />
              </Badge>
            </IconButton>
            <Avatar
              src={user?.profilePicture}
              sx={{ width: 36, height: 36, cursor: 'pointer' }}
            >
              {user?.full_name?.charAt(0) || 'U'}
            </Avatar>
            <Typography
              onClick={handleLogout}
              sx={{
                fontFamily: 'Inter',
                fontSize: 14,
                color: '#6B7280',
                cursor: 'pointer',
                '&:hover': { color: '#DC2626' },
              }}
            >
              Log out
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Main Content */}
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Top Stats */}
        <Box sx={{ display: 'flex', gap: 3, mb: 4 }}>
          {topStats.map((stat, index) => (
            <Card
              key={index}
              sx={{
                flex: 1,
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                borderRadius: 2,
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  {stat.icon && (
                    <Box
                      sx={{
                        width: 56,
                        height: 56,
                        borderRadius: 2,
                        background: stat.bgColor,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {stat.icon}
                    </Box>
                  )}
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      sx={{
                        fontSize: 12,
                        color: '#6B7280',
                        mb: 0.5,
                        fontFamily: 'Inter',
                      }}
                    >
                      {stat.label}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: 28,
                        fontWeight: 700,
                        color: '#1F2937',
                        fontFamily: 'Inter',
                      }}
                    >
                      {stat.value}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* Ministries Ranking */}
        <Card sx={{ mb: 4, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderRadius: 2 }}>
          <CardContent>
            <Typography
              sx={{
                fontSize: 18,
                fontWeight: 700,
                color: '#1F2937',
                mb: 3,
                fontFamily: 'Inter',
              }}
            >
              🏛️ Ministries Ranking
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ background: '#F9FAFB' }}>
                    <TableCell sx={{ fontWeight: 600, fontSize: 13, color: '#6B7280' }}>
                      Rank
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, fontSize: 13, color: '#6B7280' }}>
                      Ministry
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, fontSize: 13, color: '#6B7280' }}>
                      Issues Resolved
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, fontSize: 13, color: '#6B7280' }}>
                      Avg Response
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, fontSize: 13, color: '#6B7280' }}>
                      Resolution Rate
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, fontSize: 13, color: '#6B7280' }}>
                      Trend
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {ministriesData.map((row) => (
                    <TableRow key={row.rank}>
                      <TableCell sx={{ fontSize: 14, color: '#1F2937' }}>
                        {row.rank}
                      </TableCell>
                      <TableCell sx={{ fontSize: 14, color: '#1F2937' }}>
                        {row.ministry}
                      </TableCell>
                      <TableCell sx={{ fontSize: 14, color: '#1F2937' }}>
                        {row.resolved}
                      </TableCell>
                      <TableCell sx={{ fontSize: 14, color: '#1F2937' }}>
                        {row.avgResponse}
                      </TableCell>
                      <TableCell sx={{ fontSize: 14, color: '#1F2937' }}>
                        {row.resolutionRate}
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          {row.trend === 'improving' ? (
                            <>
                              <TrendingUp sx={{ fontSize: 18, color: '#10B981' }} />
                              <Typography sx={{ fontSize: 13, color: '#10B981' }}>
                                Improving
                              </Typography>
                            </>
                          ) : (
                            <>
                              <TrendingDown sx={{ fontSize: 18, color: '#EF4444' }} />
                              <Typography sx={{ fontSize: 13, color: '#EF4444' }}>
                                Declining
                              </Typography>
                            </>
                          )}
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>

        {/* District Ranking */}
        <Card sx={{ mb: 4, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderRadius: 2 }}>
          <CardContent>
            <Typography
              sx={{
                fontSize: 18,
                fontWeight: 700,
                color: '#1F2937',
                mb: 3,
                fontFamily: 'Inter',
              }}
            >
              📍 District Ranking
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ background: '#F9FAFB' }}>
                    <TableCell sx={{ fontWeight: 600, fontSize: 13, color: '#6B7280' }}>
                      Rank
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, fontSize: 13, color: '#6B7280' }}>
                      District
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, fontSize: 13, color: '#6B7280' }}>
                      Issues Reported
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, fontSize: 13, color: '#6B7280' }}>
                      Avg Response
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, fontSize: 13, color: '#6B7280' }}>
                      Resolution Rate
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {districtData.map((row) => (
                    <TableRow key={row.rank}>
                      <TableCell sx={{ fontSize: 14, color: '#1F2937' }}>
                        {row.rank}
                      </TableCell>
                      <TableCell sx={{ fontSize: 14, color: '#1F2937' }}>
                        {row.district}
                      </TableCell>
                      <TableCell sx={{ fontSize: 14, color: '#1F2937' }}>
                        {row.reported}
                      </TableCell>
                      <TableCell sx={{ fontSize: 14, color: '#1F2937' }}>
                        {row.avgResponse}
                      </TableCell>
                      <TableCell sx={{ fontSize: 14, color: '#1F2937' }}>
                        {row.resolutionRate}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>

        {/* Charts Section */}
        <Box sx={{ display: 'flex', gap: 3 }}>
          {/* Top Ministries by Resolution Rate */}
          <Card sx={{ flex: 1, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderRadius: 2 }}>
            <CardContent>
              <Typography
                sx={{
                  fontSize: 16,
                  fontWeight: 700,
                  color: '#1F2937',
                  mb: 3,
                  fontFamily: 'Inter',
                }}
              >
                Top Ministries by Resolution Rate
              </Typography>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={ministryResolutionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 12, fill: '#6B7280' }}
                    axisLine={{ stroke: '#E5E7EB' }}
                  />
                  <YAxis
                    tick={{ fontSize: 12, fill: '#6B7280' }}
                    axisLine={{ stroke: '#E5E7EB' }}
                    domain={[0, 100]}
                    ticks={[0, 20, 40, 60, 80, 100]}
                    label={{
                      value: '%',
                      angle: 0,
                      position: 'top',
                      offset: 10,
                      style: { fontSize: 12, fill: '#6B7280' },
                    }}
                  />
                  <Tooltip
                    contentStyle={{
                      background: 'white',
                      border: '1px solid #E5E7EB',
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                    formatter={(value) => [`${value}%`, 'Resolution Rate']}
                  />
                  <Bar dataKey="value" fill="#1E40AF" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Avg Response Time */}
          <Card sx={{ flex: 1, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderRadius: 2 }}>
            <CardContent>
              <Typography
                sx={{
                  fontSize: 16,
                  fontWeight: 700,
                  color: '#1F2937',
                  mb: 3,
                  fontFamily: 'Inter',
                }}
              >
                Avg Response Time (Monthly)
              </Typography>
              <ResponsiveContainer width="100%" height={240}>
                <LineChart data={responseTimeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 12, fill: '#6B7280' }}
                    axisLine={{ stroke: '#E5E7EB' }}
                  />
                  <YAxis
                    tick={{ fontSize: 12, fill: '#6B7280' }}
                    axisLine={{ stroke: '#E5E7EB' }}
                    domain={[0, 10]}
                  />
                  <Tooltip
                    contentStyle={{
                      background: 'white',
                      border: '1px solid #E5E7EB',
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                    formatter={(value) => [`${value} hrs`, 'Response Time']}
                  />
                  <Line
                    type="monotone"
                    dataKey="time"
                    stroke="#6B7280"
                    strokeWidth={2}
                    dot={{ fill: '#6B7280', r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Solved vs Pending */}
          <Card sx={{ flex: 1, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderRadius: 2 }}>
            <CardContent>
              <Typography
                sx={{
                  fontSize: 16,
                  fontWeight: 700,
                  color: '#1F2937',
                  mb: 3,
                  fontFamily: 'Inter',
                }}
              >
                Solved vs Pending Issues
              </Typography>
              <ResponsiveContainer width="100%" height={240}>
                <PieChart>
                  <Pie
                    data={solvedPendingData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {solvedPendingData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: 'white',
                      border: '1px solid #E5E7EB',
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: 3,
                  mt: 2,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box
                    sx={{
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      background: '#1E40AF',
                    }}
                  />
                  <Typography sx={{ fontSize: 13, color: '#6B7280' }}>
                    Solved
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box
                    sx={{
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      background: '#F59E0B',
                    }}
                  />
                  <Typography sx={{ fontSize: 13, color: '#6B7280' }}>
                    Pending
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </Box>
  );
}

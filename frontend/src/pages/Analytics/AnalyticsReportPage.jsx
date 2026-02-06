import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import {
  Box,
  Container,
  Typography,
  IconButton,
  Avatar,
  Badge,
  Card,
  CardContent,
  Grid,
  Select,
  MenuItem,
  Button,
  Chip,
  Divider,
} from '@mui/material';
import {
  Notifications,
  Language,
  InfoOutlined,
  TrendingUp,
  TrendingDown,
  TrendingFlat,
  Description,
  CheckCircle,
  Schedule,
  HourglassEmpty,
  LocationOn,
  OpenInNew,
  Add,
} from '@mui/icons-material';
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export default function AnalyticsReportPage() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [selectedYear, setSelectedYear] = useState('2024');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [filterTime, setFilterTime] = useState('All Time');
  const [filterDistrict, setFilterDistrict] = useState('All Districts');
  const [filterCategory, setFilterCategory] = useState('All Categories');
  const [filterStatus, setFilterStatus] = useState('All Status');

  const topStats = [
    {
      label: 'Total Issues Reported',
      value: '12,847',
      icon: <Description sx={{ fontSize: 28, color: '#10B981' }} />,
      bgColor: '#ECFDF5',
    },
    {
      label: 'Issues Solved',
      value: '8,934',
      icon: <CheckCircle sx={{ fontSize: 28, color: '#0EA5E9' }} />,
      bgColor: '#F0F9FF',
    },
    {
      label: 'Avg Resolution (hours)',
      value: '72',
      icon: <Schedule sx={{ fontSize: 28, color: '#F59E0B' }} />,
      bgColor: '#FEF3C7',
    },
    {
      label: 'Pending Issues',
      value: '3,913',
      icon: <HourglassEmpty sx={{ fontSize: 28, color: '#EF4444' }} />,
      bgColor: '#FEE2E2',
    },
    {
      label: 'Active Districts',
      value: '25',
      icon: <LocationOn sx={{ fontSize: 28, color: '#3B82F6' }} />,
      bgColor: '#DBEAFE',
    },
  ];

  const monthlyData = [
    { month: 'Jan', reported: 850, solved: 620 },
    { month: 'Feb', reported: 950, solved: 710 },
    { month: 'Mar', reported: 1100, solved: 890 },
    { month: 'Apr', reported: 1000, solved: 820 },
    { month: 'May', reported: 1250, solved: 1050 },
    { month: 'Jun', reported: 1150, solved: 950 },
    { month: 'Jul', reported: 1380, solved: 1180 },
    { month: 'Aug', commenced: 1450, solved: 1250 },
    { month: 'Sep', reported: 1320, solved: 1080 },
    { month: 'Oct', reported: 1180, solved: 930 },
    { month: 'Nov', reported: 1080, solved: 870 },
    { month: 'Dec', reported: 1240, solved: 1000 },
  ];

  const categoryData = [
    { name: 'Water', value: 32, color: '#14B8A6' },
    { name: 'Roads', value: 25, color: '#1E40AF' },
    { name: 'Electricity', value: 20, color: '#F97316' },
    { name: 'Sanitation', value: 18, color: '#EF4444' },
    { name: 'Emergency', value: 5, color: '#8B5CF6' },
  ];

  const topDistricts = [
    { name: 'Colombo', issues: 2847, trend: 'up' },
    { name: 'Gampaha', issues: 1934, trend: 'flat' },
    { name: 'Kandy', issues: 1523, trend: 'down' },
    { name: 'Kalutara', issues: 1287, trend: 'up' },
  ];

  const governmentVsCitizenData = [
    { name: 'Ministry of Health', government: 85, citizen: 78 },
    { name: 'Road Development Authority', government: 82, citizen: 75 },
    { name: 'Water Board', government: 88, citizen: 80 },
    { name: 'Electricity Board', government: 92, citizen: 90 },
    { name: 'Urban Council', government: 76, citizen: 73 },
  ];
  
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch(logout());
    navigate('/');
  };

  const getTrendIcon = (trend) => {
    if (trend === 'up') return <TrendingUp sx={{ fontSize: 18, color: '#10B981' }} />;
    if (trend === 'down') return <TrendingDown sx={{ fontSize: 18, color: '#EF4444' }} />;
    return <TrendingFlat sx={{ fontSize: 18, color: '#6B7280' }} />;
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
                fontWeight: 600,
                color: '#2563EB',
                cursor: 'pointer',
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
        {/* Page Header */}
        <Typography
          sx={{
            fontSize: 28,
            fontWeight: 700,
            color: '#1F2937',
            mb: 0.5,
            fontFamily: 'Inter',
          }}
        >
          Analytics & Reports
        </Typography>
        <Typography
          sx={{
            fontSize: 14,
            color: '#6B7280',
            mb: 4,
            fontFamily: 'Inter',
          }}
        >
          Transparent insights into platform performance and government response effectiveness
        </Typography>

        {/* Top Stats */}
        <Grid container spacing={2} sx={{ mb: 4 }}>
          {topStats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={2.4} key={index}>
              <Card
                sx={{
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                  borderRadius: 2,
                  height: '100%',
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      mb: 1,
                    }}
                  >
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: 2,
                        background: stat.bgColor,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {stat.icon}
                    </Box>
                    <IconButton size="small" sx={{ mt: -1, mr: -1 }}>
                      <InfoOutlined sx={{ fontSize: 18, color: '#9CA3AF' }} />
                    </IconButton>
                  </Box>
                  <Typography
                    sx={{
                      fontSize: 24,
                      fontWeight: 700,
                      color: '#1F2937',
                      mb: 0.5,
                      fontFamily: 'Inter',
                    }}
                  >
                    {stat.value}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: 12,
                      color: '#6B7280',
                      fontFamily: 'Inter',
                      lineHeight: 1.3,
                    }}
                  >
                    {stat.label}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Monthly Performance Trends */}
        <Card sx={{ mb: 4, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderRadius: 2 }}>
          <CardContent>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 3,
              }}
            >
              <Typography
                sx={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: '#1F2937',
                  fontFamily: 'Inter',
                }}
              >
                Monthly Performance Trends
              </Typography>
              <Select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                size="small"
                sx={{
                  fontSize: 14,
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#E5E7EB',
                  },
                }}
              >
                <MenuItem value="2024">2024</MenuItem>
                <MenuItem value="2023">2023</MenuItem>
                <MenuItem value="2022">2022</MenuItem>
              </Select>
            </Box>

            <Box sx={{ display: 'flex', gap: 3, mb: 2, justifyContent: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box
                  sx={{
                    width: 40,
                    height: 3,
                    background: '#1E40AF',
                    borderRadius: 2,
                  }}
                />
                <Typography sx={{ fontSize: 13, color: '#6B7280' }}>
                  Issues Reported
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box
                  sx={{
                    width: 40,
                    height: 3,
                    background: '#14B8A6',
                    borderRadius: 2,
                  }}
                />
                <Typography sx={{ fontSize: 13, color: '#6B7280' }}>
                  Issues Solved
                </Typography>
              </Box>
            </Box>

            <ResponsiveContainer width="100%" height={320}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 12, fill: '#6B7280' }}
                  axisLine={{ stroke: '#E5E7EB' }}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: '#6B7280' }}
                  axisLine={{ stroke: '#E5E7EB' }}
                  domain={[600, 1500]}
                />
                <Tooltip
                  contentStyle={{
                    background: 'white',
                    border: '1px solid #E5E7EB',
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="reported"
                  stroke="#1E40AF"
                  strokeWidth={2}
                  dot={{ fill: '#1E40AF', r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="solved"
                  stroke="#14B8A6"
                  strokeWidth={2}
                  dot={{ fill: '#14B8A6', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Issues by Category & Top Districts */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {/* Issues by Category */}
          <Grid item xs={12} md={6}>
            <Card sx={{ boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderRadius: 2 }}>
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
                  Issues by Category
                </Typography>
                <ResponsiveContainer width="100%" height={280}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={110}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        background: 'white',
                        border: '1px solid #E5E7EB',
                        borderRadius: 8,
                        fontSize: 12,
                      }}
                      formatter={(value) => `${value}%`}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <Box
                  sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 2,
                    justifyContent: 'center',
                    mt: 2,
                  }}
                >
                  {categoryData.map((cat, index) => (
                    <Box
                      key={index}
                      sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                    >
                      <Box
                        sx={{
                          width: 12,
                          height: 12,
                          borderRadius: '50%',
                          background: cat.color,
                        }}
                      />
                      <Typography sx={{ fontSize: 12, color: '#6B7280' }}>
                        {cat.name}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Top Districts */}
          <Grid item xs={12} md={6}>
            <Card sx={{ boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderRadius: 2 }}>
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
                  Top Districts
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {topDistricts.map((district, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        p: 2,
                        background: '#F9FAFB',
                        borderRadius: 2,
                        border: '1px solid #E5E7EB',
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Typography
                          sx={{
                            fontSize: 16,
                            fontWeight: 600,
                            color: '#1F2937',
                            fontFamily: 'Inter',
                          }}
                        >
                          {district.name}
                        </Typography>
                        {getTrendIcon(district.trend)}
                      </Box>
                      <Box sx={{ textAlign: 'right' }}>
                        <Typography
                          sx={{
                            fontSize: 20,
                            fontWeight: 700,
                            color: '#1F2937',
                            fontFamily: 'Inter',
                          }}
                        >
                          {district.issues.toLocaleString()}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: 11,
                            color: '#6B7280',
                          }}
                        >
                          Issues reported
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Government vs Citizen Reports */}
        <Card sx={{ mb: 4, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderRadius: 2 }}>
          <CardContent>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 3,
              }}
            >
              <Typography
                sx={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: '#1F2937',
                  fontFamily: 'Inter',
                }}
              >
                Government vs Citizen Reports
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Chip
                  label="All Categories"
                  onClick={() => setSelectedCategory('All Categories')}
                  sx={{
                    background:
                      selectedCategory === 'All Categories' ? '#14B8A6' : '#F3F4F6',
                    color:
                      selectedCategory === 'All Categories' ? 'white' : '#6B7280',
                    fontWeight: 600,
                    fontSize: 13,
                    '&:hover': {
                      background:
                        selectedCategory === 'All Categories' ? '#0D9488' : '#E5E7EB',
                    },
                  }}
                />
                <Chip
                  label="Water"
                  onClick={() => setSelectedCategory('Water')}
                  sx={{
                    background: selectedCategory === 'Water' ? '#14B8A6' : '#F3F4F6',
                    color: selectedCategory === 'Water' ? 'white' : '#6B7280',
                    fontWeight: 600,
                    fontSize: 13,
                    '&:hover': {
                      background: selectedCategory === 'Water' ? '#0D9488' : '#E5E7EB',
                    },
                  }}
                />
                <Chip
                  label="Roads"
                  onClick={() => setSelectedCategory('Roads')}
                  sx={{
                    background: selectedCategory === 'Roads' ? '#14B8A6' : '#F3F4F6',
                    color: selectedCategory === 'Roads' ? 'white' : '#6B7280',
                    fontWeight: 600,
                    fontSize: 13,
                    '&:hover': {
                      background: selectedCategory === 'Roads' ? '#0D9488' : '#E5E7EB',
                    },
                  }}
                />
              </Box>
            </Box>

            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={governmentVsCitizenData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 11, fill: '#6B7280' }}
                  axisLine={{ stroke: '#E5E7EB' }}
                  angle={0}
                  textAnchor="middle"
                  height={80}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: '#6B7280' }}
                  axisLine={{ stroke: '#E5E7EB' }}
                  domain={[0, 100]}
                />
                <Tooltip
                  contentStyle={{
                    background: 'white',
                    border: '1px solid #E5E7EB',
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                />
                <Legend
                  wrapperStyle={{ fontSize: 13 }}
                  iconType="square"
                  formatter={(value) =>
                    value === 'government' ? 'Government Reports' : 'Citizen Verified'
                  }
                />
                <Bar dataKey="government" fill="#1E40AF" radius={[4, 4, 0, 0]} />
                <Bar dataKey="citizen" fill="#F59E0B" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Filter Data */}
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
              Filter Data
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <Select
                  value={filterTime}
                  onChange={(e) => setFilterTime(e.target.value)}
                  fullWidth
                  size="small"
                  sx={{
                    fontSize: 14,
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#E5E7EB',
                    },
                  }}
                >
                  <MenuItem value="All Time">All Time</MenuItem>
                  <MenuItem value="Last Year">Last Year</MenuItem>
                  <MenuItem value="Last 6 Months">Last 6 Months</MenuItem>
                  <MenuItem value="Last Month">Last Month</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Select
                  value={filterDistrict}
                  onChange={(e) => setFilterDistrict(e.target.value)}
                  fullWidth
                  size="small"
                  sx={{
                    fontSize: 14,
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#E5E7EB',
                    },
                  }}
                >
                  <MenuItem value="All Districts">All Districts</MenuItem>
                  <MenuItem value="Colombo">Colombo</MenuItem>
                  <MenuItem value="Gampaha">Gampaha</MenuItem>
                  <MenuItem value="Kandy">Kandy</MenuItem>
                  <MenuItem value="Kalutara">Kalutara</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  fullWidth
                  size="small"
                  sx={{
                    fontSize: 14,
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#E5E7EB',
                    },
                  }}
                >
                  <MenuItem value="All Categories">All Categories</MenuItem>
                  <MenuItem value="Water">Water</MenuItem>
                  <MenuItem value="Electricity">Electricity</MenuItem>
                  <MenuItem value="Roads">Roads</MenuItem>
                  <MenuItem value="Sanitation">Sanitation</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  fullWidth
                  size="small"
                  sx={{
                    fontSize: 14,
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#E5E7EB',
                    },
                  }}
                >
                  <MenuItem value="All Status">All Status</MenuItem>
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="In Progress">In Progress</MenuItem>
                  <MenuItem value="Solved">Solved</MenuItem>
                  <MenuItem value="Urgent">Urgent</MenuItem>
                </Select>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Data Transparency Banner */}
        <Box
          sx={{
            background: 'linear-gradient(135deg, #14B8A6 0%, #0D9488 50%, #1E40AF 100%)',
            borderRadius: 3,
            p: 4,
            textAlign: 'center',
          }}
        >
          <Typography
            sx={{
              fontSize: 24,
              fontWeight: 700,
              color: 'white',
              mb: 2,
              fontFamily: 'Inter',
            }}
          >
            Data Transparency
          </Typography>
          <Typography
            sx={{
              fontSize: 14,
              color: 'white',
              mb: 3,
              maxWidth: 700,
              mx: 'auto',
            }}
          >
            All data shown here comes from real-time citizen reports and official government
            performance records. Verified for transparency.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Button
              variant="contained"
              startIcon={<OpenInNew />}
              onClick={() => navigate('/public-feed')}
              sx={{
                background: 'white',
                color: '#1E40AF',
                textTransform: 'none',
                fontSize: 14,
                fontWeight: 600,
                px: 3,
                py: 1,
                borderRadius: 2,
                '&:hover': {
                  background: '#F3F4F6',
                },
              }}
            >
              View Live Issues Feed
            </Button>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => navigate('/issues/new')}
              sx={{
                background: '#F59E0B',
                color: 'white',
                textTransform: 'none',
                fontSize: 14,
                fontWeight: 600,
                px: 3,
                py: 1,
                borderRadius: 2,
                '&:hover': {
                  background: '#D97706',
                },
              }}
            >
              Report an Issue
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

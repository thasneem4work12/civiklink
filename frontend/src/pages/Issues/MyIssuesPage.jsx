import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Chip,
  Grid,
  Tabs,
  Tab,
  IconButton,
} from '@mui/material';
import {
  ArrowBack,
  LocationOn,
  AccessTime,
  Visibility,
  Edit,
  Delete,
} from '@mui/icons-material';

export default function MyIssuesPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);

  const issues = [
    {
      id: 1,
      title: 'Broken Water Pipeline Flooding Road',
      category: 'Water',
      status: 'Pending',
      statusColor: '#F59E0B',
      location: 'Galle Road, Colombo',
      timeAgo: '2 days ago',
      verifications: 35,
      image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400',
      description: 'Major water pipeline burst causing road flooding...',
    },
    {
      id: 2,
      title: 'Street Lights Not Working',
      category: 'Electricity',
      status: 'In Progress',
      statusColor: '#3B82F6',
      location: 'Kandy Central',
      timeAgo: '5 days ago',
      verifications: 28,
      image: 'https://images.unsplash.com/photo-1584555684040-bad07f8e093f?w=400',
      description: 'All street lights in residential area not functioning...',
    },
    {
      id: 3,
      title: 'Road Damaged After Heavy Rain',
      category: 'Road',
      status: 'Solved',
      statusColor: '#10B981',
      location: 'Matara Junction',
      timeAgo: '2 weeks ago',
      verifications: 42,
      image: 'https://images.unsplash.com/photo-1590859808308-3d2d9c515b1a?w=400',
      description: 'Main road severely damaged, needs urgent repair...',
    },
  ];

  const filteredIssues = issues.filter(issue => {
    if (activeTab === 0) return issue.status === 'Pending';
    if (activeTab === 1) return issue.status === 'In Progress';
    if (activeTab === 2) return issue.status === 'Solved';
    return true;
  });

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #E0F2F1 0%, #B2DFDB 50%, #80CBC4 100%)' }}>
      {/* Top Navigation */}
      <Box
        sx={{
          background: 'white',
          borderBottom: '1px solid #E5E7EB',
          py: 2,
          px: 4,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton onClick={() => navigate(-1)} size="small">
            <ArrowBack />
          </IconButton>
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
            <Typography sx={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 18, color: '#1F2937' }}>
              CivikLink SL
            </Typography>
          </Box>
          <Typography sx={{ fontSize: 16, fontWeight: 600, color: '#6B7280', ml: 2 }}>
            My Issues
          </Typography>
        </Box>
      </Box>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Box>
            <Typography sx={{ fontSize: 28, fontWeight: 700, color: '#1F2937', fontFamily: 'Inter', mb: 1 }}>
              My Reported Issues
            </Typography>
            <Typography sx={{ fontSize: 14, color: '#6B7280' }}>
              Track all your reported civic issues in one place
            </Typography>
          </Box>
          <Button
            variant="contained"
            onClick={() => navigate('/issues/new')}
            sx={{
              background: '#2563EB',
              textTransform: 'none',
              fontWeight: 600,
              px: 3,
              py: 1.5,
              '&:hover': {
                background: '#1D4ED8',
              },
            }}
          >
            + Report New Issue
          </Button>
        </Box>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                borderRadius: 2,
                background: 'white',
              }}
            >
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography sx={{ fontSize: 36, fontWeight: 700, color: '#F59E0B', fontFamily: 'Inter' }}>
                  {issues.filter(i => i.status === 'Pending').length}
                </Typography>
                <Typography sx={{ fontSize: 14, color: '#6B7280' }}>
                  Pending Issues
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                borderRadius: 2,
                background: 'white',
              }}
            >
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography sx={{ fontSize: 36, fontWeight: 700, color: '#3B82F6', fontFamily: 'Inter' }}>
                  {issues.filter(i => i.status === 'In Progress').length}
                </Typography>
                <Typography sx={{ fontSize: 14, color: '#6B7280' }}>
                  In Progress
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                borderRadius: 2,
                background: 'white',
              }}
            >
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography sx={{ fontSize: 36, fontWeight: 700, color: '#10B981', fontFamily: 'Inter' }}>
                  {issues.filter(i => i.status === 'Solved').length}
                </Typography>
                <Typography sx={{ fontSize: 14, color: '#6B7280' }}>
                  Solved
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Tabs */}
        <Card sx={{ boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderRadius: 3, mb: 3 }}>
          <Tabs
            value={activeTab}
            onChange={(e, newValue) => setActiveTab(newValue)}
            sx={{
              borderBottom: '1px solid #E5E7EB',
              px: 2,
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 600,
                fontSize: 15,
              },
            }}
          >
            <Tab label="Pending" />
            <Tab label="In Progress" />
            <Tab label="Solved" />
          </Tabs>
        </Card>

        {/* Issues List */}
        <Grid container spacing={3}>
          {filteredIssues.map((issue) => (
            <Grid item xs={12} md={6} key={issue.id}>
              <Card
                sx={{
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                  borderRadius: 2,
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  },
                }}
                onClick={() => navigate(`/issues/${issue.id}`)}
              >
                <Box sx={{ position: 'relative' }}>
                  <Box
                    component="img"
                    src={issue.image}
                    sx={{
                      width: '100%',
                      height: 200,
                      objectFit: 'cover',
                    }}
                  />
                  <Chip
                    label={issue.status}
                    sx={{
                      position: 'absolute',
                      top: 12,
                      right: 12,
                      background: issue.statusColor,
                      color: 'white',
                      fontWeight: 600,
                      fontSize: 12,
                    }}
                  />
                  <Chip
                    label={issue.category}
                    sx={{
                      position: 'absolute',
                      top: 12,
                      left: 12,
                      background: 'white',
                      fontWeight: 600,
                      fontSize: 12,
                    }}
                  />
                </Box>
                <CardContent>
                  <Typography sx={{ fontSize: 18, fontWeight: 700, color: '#1F2937', mb: 1 }}>
                    {issue.title}
                  </Typography>
                  <Typography sx={{ fontSize: 14, color: '#6B7280', mb: 2 }}>
                    {issue.description}
                  </Typography>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <LocationOn sx={{ fontSize: 16, color: '#6B7280' }} />
                      <Typography sx={{ fontSize: 13, color: '#6B7280' }}>
                        {issue.location}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <AccessTime sx={{ fontSize: 16, color: '#6B7280' }} />
                      <Typography sx={{ fontSize: 13, color: '#6B7280' }}>
                        {issue.timeAgo}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Chip
                      label={`${issue.verifications} verifications`}
                      size="small"
                      sx={{
                        background: '#D1FAE5',
                        color: '#065F46',
                        fontWeight: 600,
                        fontSize: 12,
                      }}
                    />
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/issues/${issue.id}`);
                        }}
                      >
                        <Visibility sx={{ fontSize: 20, color: '#6B7280' }} />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <Edit sx={{ fontSize: 20, color: '#6B7280' }} />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <Delete sx={{ fontSize: 20, color: '#DC2626' }} />
                      </IconButton>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {filteredIssues.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography sx={{ fontSize: 18, color: '#6B7280', mb: 2 }}>
              No {activeTab === 0 ? 'pending' : activeTab === 1 ? 'in progress' : 'solved'} issues found
            </Typography>
            <Button
              variant="contained"
              onClick={() => navigate('/issues/new')}
              sx={{
                background: '#2563EB',
                textTransform: 'none',
                fontWeight: 600,
                '&:hover': {
                  background: '#1D4ED8',
                },
              }}
            >
              Report Your First Issue
            </Button>
          </Box>
        )}
      </Container>
    </Box>
  );
}

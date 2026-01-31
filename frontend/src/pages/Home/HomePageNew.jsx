import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getIssues } from '../../redux/slices/issueSlice';
import { logout } from '../../redux/slices/authSlice';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  IconButton,
  Avatar,
  CircularProgress,
} from '@mui/material';
import {
  Add,
  LocationOn,
  CheckCircle,
  Pending,
  ExitToApp,
} from '@mui/icons-material';
import { publicAPI } from '../../services/api';
import toast from 'react-hot-toast';

export default function HomePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { issues, loading } = useSelector((state) => state.issues);
  
  const [stats, setStats] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch issues
    dispatch(getIssues({ limit: 10 }));
    
    // Fetch stats
    publicAPI.getStats()
      .then(res => setStats(res.data))
      .catch(err => console.error('Failed to fetch stats:', err));
    
    // Fetch categories
    publicAPI.getCategories()
      .then(res => setCategories(res.data.categories))
      .catch(err => console.error('Failed to fetch categories:', err));
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#F59E0B';
      case 'verified': return '#3B82F6';
      case 'in_progress': return '#8B5CF6';
      case 'solved': return '#10B981';
      default: return '#6B7280';
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#F9FAFB' }}>
      {/* Top Navigation */}
      <Box sx={{ bgcolor: 'white', borderBottom: '1px solid #E5E7EB', py: 2, px: 4 }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h5" sx={{ fontWeight: 700, color: '#00796B' }}>
              CivikLink SL
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <Typography variant="body2" sx={{ color: '#6B7280' }}>
                Welcome, {user?.full_name || user?.email}
              </Typography>
              <Chip 
                label={user?.role} 
                size="small" 
                color="primary"
                sx={{ textTransform: 'capitalize' }}
              />
              <IconButton onClick={handleLogout} size="small" title="Logout">
                <ExitToApp />
              </IconButton>
            </Box>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Quick Actions */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={user?.role === 'citizen' ? 12 : 6}>
            {user?.role === 'citizen' && (
              <Card sx={{ bgcolor: '#00796B', color: 'white' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                        Report an Issue
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.9 }}>
                        Help improve your community by reporting problems
                      </Typography>
                    </Box>
                    <Button
                      variant="contained"
                      startIcon={<Add />}
                      onClick={() => navigate('/post-issue')}
                      sx={{ bgcolor: 'white', color: '#00796B', '&:hover': { bgcolor: '#F0F0F0' } }}
                    >
                      Post Issue
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            )}
            
            {user?.role === 'government' && (
              <Card>
                <CardContent>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => navigate('/government')}
                    sx={{ bgcolor: '#00796B', py: 2 }}
                  >
                    Go to Government Dashboard
                  </Button>
                </CardContent>
              </Card>
            )}
            
            {user?.role === 'ngo' && (
              <Card>
                <CardContent>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => navigate('/ngo')}
                    sx={{ bgcolor: '#00796B', py: 2 }}
                  >
                    Go to NGO Dashboard
                  </Button>
                </CardContent>
              </Card>
            )}
            
            {user?.role === 'admin' && (
              <Card>
                <CardContent>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => navigate('/admin')}
                    sx={{ bgcolor: '#00796B', py: 2 }}
                  >
                    Go to Admin Dashboard
                  </Button>
                </CardContent>
              </Card>
            )}
          </Grid>

          {user?.role === 'citizen' && (
            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={() => navigate('/my-issues')}
                    sx={{ py: 2 }}
                  >
                    My Issues
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          )}
        </Grid>

        {/* Platform Stats */}
        {stats && (
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={6} md={3}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: '#00796B' }}>
                    {stats.total_issues || 0}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Issues
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} md={3}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: '#10B981' }}>
                    {stats.solved_issues || 0}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Solved
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} md={3}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: '#3B82F6' }}>
                    {stats.active_users || 0}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Active Users
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} md={3}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: '#F59E0B' }}>
                    {stats.resolution_rate || 0}%
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Resolution Rate
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}

        {/* Recent Issues */}
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
              Recent Issues
            </Typography>

            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                <CircularProgress />
              </Box>
            ) : issues.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="body1" color="text.secondary">
                  No issues reported yet. Be the first to report an issue!
                </Typography>
              </Box>
            ) : (
              <Grid container spacing={2}>
                {issues.map((issue) => (
                  <Grid item xs={12} key={issue.id}>
                    <Card 
                      variant="outlined" 
                      sx={{ 
                        cursor: 'pointer',
                        '&:hover': { bgcolor: '#F9FAFB' }
                      }}
                      onClick={() => navigate(`/issues/${issue.id}`)}
                    >
                      <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                            {issue.title}
                          </Typography>
                          <Chip
                            label={issue.status}
                            size="small"
                            sx={{
                              bgcolor: getStatusColor(issue.status),
                              color: 'white',
                              textTransform: 'capitalize',
                            }}
                          />
                        </Box>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                          {issue.description}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                          <Chip label={issue.category} size="small" />
                          {issue.location?.district && (
                            <Chip
                              icon={<LocationOn fontSize="small" />}
                              label={issue.location.district}
                              size="small"
                              variant="outlined"
                            />
                          )}
                          {issue.verification_count > 0 && (
                            <Chip
                              icon={<CheckCircle fontSize="small" />}
                              label={`${issue.verification_count} verified`}
                              size="small"
                              color="success"
                            />
                          )}
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

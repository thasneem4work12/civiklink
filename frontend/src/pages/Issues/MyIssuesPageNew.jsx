import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMyIssues } from '../../redux/slices/issueSlice';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  IconButton,
  CircularProgress,
  Button,
} from '@mui/material';
import {
  ArrowBack,
  LocationOn,
  CheckCircle,
  Add,
} from '@mui/icons-material';

export default function MyIssuesPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { myIssues, loading } = useSelector((state) => state.issues);

  useEffect(() => {
    dispatch(getMyIssues());
  }, [dispatch]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#F59E0B';
      case 'verified': return '#3B82F6';
      case 'in_progress': return '#8B5CF6';
      case 'solved': return '#10B981';
      default: return '#6B7280';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical': return '#EF4444';
      case 'high': return '#F59E0B';
      case 'medium': return '#3B82F6';
      case 'low': return '#6B7280';
      default: return '#6B7280';
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#F9FAFB' }}>
      {/* Header */}
      <Box sx={{ bgcolor: 'white', borderBottom: '1px solid #E5E7EB', py: 2, px: 4 }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <IconButton onClick={() => navigate('/home')}>
                <ArrowBack />
              </IconButton>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                My Issues
              </Typography>
            </Box>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => navigate('/post-issue')}
              sx={{ bgcolor: '#00796B' }}
            >
              New Issue
            </Button>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress />
          </Box>
        ) : myIssues.length === 0 ? (
          <Card>
            <CardContent sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                You haven't reported any issues yet
              </Typography>
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={() => navigate('/post-issue')}
                sx={{ bgcolor: '#00796B' }}
              >
                Report Your First Issue
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Grid container spacing={3}>
            {myIssues.map((issue) => (
              <Grid item xs={12} key={issue.id}>
                <Card
                  sx={{
                    cursor: 'pointer',
                    '&:hover': { boxShadow: 4 },
                    transition: 'box-shadow 0.2s',
                  }}
                  onClick={() => navigate(`/issues/${issue.id}`)}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {issue.title}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Chip
                          label={issue.priority}
                          size="small"
                          sx={{
                            bgcolor: getPriorityColor(issue.priority),
                            color: 'white',
                            textTransform: 'capitalize',
                          }}
                        />
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
                    </Box>

                    <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                      {issue.description}
                    </Typography>

                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
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
                          label={`${issue.verification_count} verifications`}
                          size="small"
                          color="success"
                        />
                      )}
                      <Typography variant="caption" color="text.secondary" sx={{ ml: 'auto' }}>
                        {new Date(issue.created_at).toLocaleDateString()}
                      </Typography>
                    </Box>

                    {issue.government_response && (
                      <Box sx={{ mt: 2, p: 2, bgcolor: '#E8F5E9', borderRadius: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                          Government Response:
                        </Typography>
                        <Typography variant="body2">
                          {issue.government_response.message}
                        </Typography>
                      </Box>
                    )}

                    {issue.ngo_claim && (
                      <Box sx={{ mt: 2, p: 2, bgcolor: '#E3F2FD', borderRadius: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                          NGO Action:
                        </Typography>
                        <Typography variant="body2">
                          Claimed by NGO - {issue.ngo_claim.action_plan}
                        </Typography>
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}

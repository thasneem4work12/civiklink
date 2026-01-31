import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getIssueById, verifyIssue } from '../../redux/slices/issueSlice';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Chip,
  IconButton,
  Button,
  Divider,
  CircularProgress,
  Grid,
} from '@mui/material';
import {
  ArrowBack,
  LocationOn,
  CheckCircle,
  ThumbUp,
  AccessTime,
} from '@mui/icons-material';
import toast from 'react-hot-toast';

export default function IssueDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentIssue, loading } = useSelector((state) => state.issues);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getIssueById(id));
  }, [dispatch, id]);

  const handleVerify = async () => {
    const result = await dispatch(verifyIssue(id));
    if (result.type === 'issues/verifyIssue/fulfilled') {
      toast.success('Issue verified successfully!');
    } else {
      toast.error(result.payload || 'Failed to verify issue');
    }
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

  if (loading || !currentIssue) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  const canVerify = user?.id !== currentIssue.user_id && !currentIssue.verified_by.includes(user?.id);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#F9FAFB' }}>
      {/* Header */}
      <Box sx={{ bgcolor: 'white', borderBottom: '1px solid #E5E7EB', py: 2, px: 4 }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton onClick={() => navigate(-1)}>
              <ArrowBack />
            </IconButton>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              Issue Details
            </Typography>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={3}>
          {/* Main Content */}
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent sx={{ p: 4 }}>
                {/* Title and Status */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                  <Typography variant="h5" sx={{ fontWeight: 600, flex: 1 }}>
                    {currentIssue.title}
                  </Typography>
                  <Chip
                    label={currentIssue.status}
                    sx={{
                      bgcolor: getStatusColor(currentIssue.status),
                      color: 'white',
                      textTransform: 'capitalize',
                      fontWeight: 600,
                    }}
                  />
                </Box>

                {/* Description */}
                <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
                  {currentIssue.description}
                </Typography>

                {/* Meta Information */}
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 3 }}>
                  <Chip label={currentIssue.category} />
                  <Chip label={currentIssue.priority} color="warning" />
                  {currentIssue.location?.district && (
                    <Chip
                      icon={<LocationOn fontSize="small" />}
                      label={currentIssue.location.district}
                      variant="outlined"
                    />
                  )}
                  <Chip
                    icon={<AccessTime fontSize="small" />}
                    label={new Date(currentIssue.created_at).toLocaleDateString()}
                    variant="outlined"
                  />
                </Box>

                {/* Location */}
                {currentIssue.location?.address && (
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                      Location
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {currentIssue.location.address}, {currentIssue.location.district}
                    </Typography>
                  </Box>
                )}

                <Divider sx={{ my: 3 }} />

                {/* Verification Section */}
                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CheckCircle color="success" />
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        Community Verification
                      </Typography>
                    </Box>
                    <Chip
                      label={`${currentIssue.verification_count} verifications`}
                      color="success"
                      variant="outlined"
                    />
                  </Box>

                  {canVerify && (
                    <Button
                      variant="outlined"
                      startIcon={<ThumbUp />}
                      onClick={handleVerify}
                      fullWidth
                      sx={{ borderColor: '#00796B', color: '#00796B' }}
                    >
                      Verify This Issue
                    </Button>
                  )}

                  {!canVerify && currentIssue.verified_by.includes(user?.id) && (
                    <Typography variant="body2" color="success.main" sx={{ textAlign: 'center' }}>
                      ✓ You have verified this issue
                    </Typography>
                  )}
                </Box>

                {/* Government Response */}
                {currentIssue.government_response && (
                  <>
                    <Divider sx={{ my: 3 }} />
                    <Box sx={{ p: 3, bgcolor: '#E8F5E9', borderRadius: 2 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                        Government Response
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        {currentIssue.government_response.message}
                      </Typography>
                      {currentIssue.government_response.action_taken && (
                        <Typography variant="caption" color="text.secondary">
                          Action Taken: {currentIssue.government_response.action_taken}
                        </Typography>
                      )}
                    </Box>
                  </>
                )}

                {/* NGO Claim */}
                {currentIssue.ngo_claim && (
                  <>
                    <Divider sx={{ my: 3 }} />
                    <Box sx={{ p: 3, bgcolor: '#E3F2FD', borderRadius: 2 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                        NGO Action Plan
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        {currentIssue.ngo_claim.action_plan}
                      </Typography>
                      <Chip
                        label={currentIssue.ngo_claim.status}
                        size="small"
                        color="primary"
                        sx={{ textTransform: 'capitalize' }}
                      />
                    </Box>
                  </>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* Sidebar */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                  Issue Statistics
                </Typography>
                
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Status
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600, textTransform: 'capitalize' }}>
                    {currentIssue.status}
                  </Typography>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Priority
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600, textTransform: 'capitalize' }}>
                    {currentIssue.priority}
                  </Typography>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Verifications
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {currentIssue.verification_count}
                  </Typography>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Reported On
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {new Date(currentIssue.created_at).toLocaleDateString()}
                  </Typography>
                </Box>

                {currentIssue.verified_at && (
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      Verified On
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      {new Date(currentIssue.verified_at).toLocaleDateString()}
                    </Typography>
                  </Box>
                )}

                {currentIssue.is_crisis && (
                  <Chip
                    label="CRISIS MODE"
                    color="error"
                    sx={{ width: '100%', fontWeight: 600 }}
                  />
                )}
              </CardContent>
            </Card>

            {currentIssue.tagged_ministries && currentIssue.tagged_ministries.length > 0 && (
              <Card sx={{ mt: 2 }}>
                <CardContent>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                    Tagged Ministries
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {currentIssue.tagged_ministries.length} ministry(ies) notified
                  </Typography>
                </CardContent>
              </Card>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

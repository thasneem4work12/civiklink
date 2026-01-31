import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Avatar,
  Button,
  TextField,
  Grid,
  Chip,
  Divider,
  IconButton,
  Switch,
  FormControlLabel,
} from '@mui/material';
import {
  Edit,
  ArrowBack,
  Verified,
  LocationOn,
  Email,
  Phone,
  Language,
  Notifications,
  Security,
  Logout,
} from '@mui/icons-material';

export default function ProfilePage() {
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  const user = {
    name: 'Rajesh Fernando',
    email: 'rajesh.fernando@email.com',
    phone: '+94 77 123 4567',
    role: 'Citizen',
    district: 'Colombo',
    verified: true,
    joinedDate: 'Jan 2025',
    issuesReported: 12,
    issuesVerified: 47,
    impactScore: 8.5,
  };

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
            My Profile
          </Typography>
        </Box>
      </Box>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={3}>
          {/* Left Column - Profile Info */}
          <Grid item xs={12} md={4}>
            <Card sx={{ boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderRadius: 3 }}>
              <CardContent sx={{ textAlign: 'center', p: 4 }}>
                <Avatar sx={{ width: 120, height: 120, mx: 'auto', mb: 2, fontSize: 48 }}>
                  {user.name.charAt(0)}
                </Avatar>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 1 }}>
                  <Typography sx={{ fontSize: 24, fontWeight: 700, color: '#1F2937', fontFamily: 'Inter' }}>
                    {user.name}
                  </Typography>
                  {user.verified && <Verified sx={{ color: '#10B981', fontSize: 24 }} />}
                </Box>
                <Chip
                  label={user.role}
                  sx={{
                    background: '#DBEAFE',
                    color: '#1E40AF',
                    fontWeight: 600,
                    mb: 3,
                  }}
                />

                <Divider sx={{ my: 3 }} />

                <Box sx={{ textAlign: 'left' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <Email sx={{ color: '#6B7280', fontSize: 20 }} />
                    <Typography sx={{ fontSize: 14, color: '#4B5563' }}>
                      {user.email}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <Phone sx={{ color: '#6B7280', fontSize: 20 }} />
                    <Typography sx={{ fontSize: 14, color: '#4B5563' }}>
                      {user.phone}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <LocationOn sx={{ color: '#6B7280', fontSize: 20 }} />
                    <Typography sx={{ fontSize: 14, color: '#4B5563' }}>
                      {user.district}
                    </Typography>
                  </Box>
                </Box>

                <Divider sx={{ my: 3 }} />

                <Typography sx={{ fontSize: 12, color: '#9CA3AF', mb: 1 }}>
                  Member since {user.joinedDate}
                </Typography>

                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<Logout />}
                  onClick={() => navigate('/login')}
                  sx={{
                    mt: 2,
                    borderColor: '#DC2626',
                    color: '#DC2626',
                    textTransform: 'none',
                    fontWeight: 600,
                    '&:hover': {
                      borderColor: '#B91C1C',
                      background: '#FEE2E2',
                    },
                  }}
                >
                  Logout
                </Button>
              </CardContent>
            </Card>

            {/* Stats Card */}
            <Card sx={{ boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderRadius: 3, mt: 3 }}>
              <CardContent sx={{ p: 3 }}>
                <Typography sx={{ fontSize: 16, fontWeight: 700, color: '#1F2937', mb: 2, fontFamily: 'Inter' }}>
                  Activity Stats
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box>
                    <Typography sx={{ fontSize: 24, fontWeight: 700, color: '#2563EB', fontFamily: 'Inter' }}>
                      {user.issuesReported}
                    </Typography>
                    <Typography sx={{ fontSize: 13, color: '#6B7280' }}>
                      Issues Reported
                    </Typography>
                  </Box>
                  <Divider />
                  <Box>
                    <Typography sx={{ fontSize: 24, fontWeight: 700, color: '#10B981', fontFamily: 'Inter' }}>
                      {user.issuesVerified}
                    </Typography>
                    <Typography sx={{ fontSize: 13, color: '#6B7280' }}>
                      Issues Verified
                    </Typography>
                  </Box>
                  <Divider />
                  <Box>
                    <Typography sx={{ fontSize: 24, fontWeight: 700, color: '#F59E0B', fontFamily: 'Inter' }}>
                      {user.impactScore}
                    </Typography>
                    <Typography sx={{ fontSize: 13, color: '#6B7280' }}>
                      Impact Score
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Right Column - Edit Profile & Settings */}
          <Grid item xs={12} md={8}>
            {/* Edit Profile */}
            <Card sx={{ boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderRadius: 3, mb: 3 }}>
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography sx={{ fontSize: 20, fontWeight: 700, color: '#1F2937', fontFamily: 'Inter' }}>
                    Profile Information
                  </Typography>
                  <Button
                    variant="outlined"
                    startIcon={<Edit />}
                    onClick={() => setEditMode(!editMode)}
                    sx={{
                      textTransform: 'none',
                      fontWeight: 600,
                      borderColor: editMode ? '#DC2626' : '#2563EB',
                      color: editMode ? '#DC2626' : '#2563EB',
                    }}
                  >
                    {editMode ? 'Cancel' : 'Edit Profile'}
                  </Button>
                </Box>

                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      defaultValue={user.name}
                      disabled={!editMode}
                      sx={{
                        '& .MuiInputBase-input.Mui-disabled': {
                          WebkitTextFillColor: '#1F2937',
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      defaultValue={user.email}
                      disabled={!editMode}
                      sx={{
                        '& .MuiInputBase-input.Mui-disabled': {
                          WebkitTextFillColor: '#1F2937',
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Phone Number"
                      defaultValue={user.phone}
                      disabled={!editMode}
                      sx={{
                        '& .MuiInputBase-input.Mui-disabled': {
                          WebkitTextFillColor: '#1F2937',
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="District"
                      defaultValue={user.district}
                      disabled={!editMode}
                      sx={{
                        '& .MuiInputBase-input.Mui-disabled': {
                          WebkitTextFillColor: '#1F2937',
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Bio"
                      multiline
                      rows={3}
                      defaultValue="Passionate about civic engagement and community development."
                      disabled={!editMode}
                      sx={{
                        '& .MuiInputBase-input.Mui-disabled': {
                          WebkitTextFillColor: '#1F2937',
                        },
                      }}
                    />
                  </Grid>
                </Grid>

                {editMode && (
                  <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                    <Button
                      variant="contained"
                      fullWidth
                      sx={{
                        background: '#2563EB',
                        textTransform: 'none',
                        fontWeight: 600,
                        py: 1.2,
                        '&:hover': {
                          background: '#1D4ED8',
                        },
                      }}
                    >
                      Save Changes
                    </Button>
                  </Box>
                )}
              </CardContent>
            </Card>

            {/* Settings */}
            <Card sx={{ boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderRadius: 3, mb: 3 }}>
              <CardContent sx={{ p: 4 }}>
                <Typography sx={{ fontSize: 20, fontWeight: 700, color: '#1F2937', mb: 3, fontFamily: 'Inter' }}>
                  Settings
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Notifications sx={{ color: '#6B7280', fontSize: 24 }} />
                      <Box>
                        <Typography sx={{ fontSize: 15, fontWeight: 600, color: '#1F2937' }}>
                          Push Notifications
                        </Typography>
                        <Typography sx={{ fontSize: 13, color: '#6B7280' }}>
                          Receive alerts for issue updates
                        </Typography>
                      </Box>
                    </Box>
                    <Switch checked={notifications} onChange={(e) => setNotifications(e.target.checked)} />
                  </Box>

                  <Divider />

                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Language sx={{ color: '#6B7280', fontSize: 24 }} />
                      <Box>
                        <Typography sx={{ fontSize: 15, fontWeight: 600, color: '#1F2937' }}>
                          Language
                        </Typography>
                        <Typography sx={{ fontSize: 13, color: '#6B7280' }}>
                          English, සිංහල, தமிழ்
                        </Typography>
                      </Box>
                    </Box>
                    <Button size="small" sx={{ textTransform: 'none' }}>
                      Change
                    </Button>
                  </Box>

                  <Divider />

                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Security sx={{ color: '#6B7280', fontSize: 24 }} />
                      <Box>
                        <Typography sx={{ fontSize: 15, fontWeight: 600, color: '#1F2937' }}>
                          Password & Security
                        </Typography>
                        <Typography sx={{ fontSize: 13, color: '#6B7280' }}>
                          Update your password
                        </Typography>
                      </Box>
                    </Box>
                    <Button size="small" sx={{ textTransform: 'none' }}>
                      Change
                    </Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

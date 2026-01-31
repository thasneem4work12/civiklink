import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  IconButton,
  Button,
  Chip,
  Card,
  CardContent,
  Avatar,
  Stepper,
  Step,
  StepLabel,
  Grid,
  Divider,
} from '@mui/material';
import {
  ArrowBack,
  Language,
  CheckCircle,
  Lock,
  Warning,
  Schedule,
  VerifiedUser,
  Info,
} from '@mui/icons-material';

export default function IssueVerificationPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    { label: 'Posted', sublabel: 'Jan 12, 2025', status: 'completed' },
    { label: 'Community Verification', sublabel: '2/3 verified', status: 'active' },
    { label: 'Ministry Action', sublabel: 'Locked', status: 'locked' },
    { label: 'Solution Submitted', sublabel: 'Locked', status: 'locked' },
    { label: 'Solution Confirmation', sublabel: 'Locked', status: 'locked' },
    { label: 'Issue Archived', sublabel: 'Locked', status: 'locked' },
  ];

  const issue = {
    id: 'WTR-2024-247',
    title: 'Water Pipeline Burst on Galle Road',
    submittedBy: 'Rajesh Fernando',
    submittedRole: 'Verified Resident',
    category: 'Water Supply',
    timeAgo: '3 days ago',
    description:
      'Major water pipeline has burst near the Galle Road junction causing flooding and disrupting water supply to the area.',
    images: [
      'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400',
      'https://images.unsplash.com/photo-1590859808308-3d2d9c515b1a?w=400',
    ],
    taggedAuthority: 'Ministry of Water Supply',
    verificationCount: 2,
    verificationRequired: 3,
    recentVerifications: [
      { name: 'Priya Wickramasnghe', time: 'Verified 2 hours ago', location: '1.5km from issue' },
      { name: 'Kumar Perera', time: 'Verified 5 hours ago', location: '0.8km from issue' },
    ],
  };

  const getStepIcon = (status) => {
    if (status === 'completed') {
      return (
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            background: '#10B981',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CheckCircle sx={{ color: 'white', fontSize: 24 }} />
        </Box>
      );
    } else if (status === 'active') {
      return (
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            background: '#F59E0B',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Schedule sx={{ color: 'white', fontSize: 24 }} />
        </Box>
      );
    } else {
      return (
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            background: '#E5E7EB',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Lock sx={{ color: '#9CA3AF', fontSize: 20 }} />
        </Box>
      );
    }
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
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton onClick={() => navigate(-1)} size="small">
              <ArrowBack sx={{ color: '#6B7280' }} />
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
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography
              sx={{
                fontSize: 16,
                fontWeight: 600,
                color: '#1F2937',
                fontFamily: 'Inter',
              }}
            >
              Issue Verification Flow
            </Typography>
            <Chip
              label={`Issue #${issue.id}`}
              sx={{
                background: '#F3F4F6',
                color: '#1F2937',
                fontWeight: 600,
                fontSize: 13,
              }}
            />
            <Chip
              icon={<Warning sx={{ fontSize: 18 }} />}
              label="Verification Pending"
              sx={{
                background: '#FEF3C7',
                color: '#92400E',
                fontWeight: 600,
                fontSize: 13,
              }}
            />
          </Box>

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
            <Typography sx={{ fontSize: 14, color: '#1F2937', fontWeight: 600 }}>
              EN
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Main Content */}
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Verification Progress Stepper */}
        <Card
          sx={{
            mb: 4,
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            borderRadius: 3,
            overflow: 'visible',
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Typography
              sx={{
                fontSize: 18,
                fontWeight: 700,
                color: '#1F2937',
                mb: 1,
                fontFamily: 'Inter',
              }}
            >
              Verification Progress
            </Typography>
            <Typography
              sx={{
                fontSize: 13,
                color: '#6B7280',
                mb: 4,
              }}
            >
              Every step is publicly tracked and cannot be skipped or edited
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
              {/* Progress Line */}
              <Box
                sx={{
                  position: 'absolute',
                  top: 20,
                  left: '8%',
                  right: '8%',
                  height: 2,
                  background: '#E5E7EB',
                  zIndex: 0,
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  top: 20,
                  left: '8%',
                  width: '15%',
                  height: 2,
                  background: '#10B981',
                  zIndex: 1,
                }}
              />

              {steps.map((step, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    flex: 1,
                    position: 'relative',
                    zIndex: 2,
                  }}
                >
                  {getStepIcon(step.status)}
                  <Typography
                    sx={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: step.status === 'locked' ? '#9CA3AF' : '#1F2937',
                      mt: 1,
                      textAlign: 'center',
                      fontFamily: 'Inter',
                    }}
                  >
                    {step.label}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: 11,
                      color: step.status === 'locked' ? '#D1D5DB' : '#6B7280',
                      textAlign: 'center',
                    }}
                  >
                    {step.sublabel}
                  </Typography>
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>

        <Grid container spacing={3}>
          {/* Left Column */}
          <Grid item xs={12} md={8}>
            {/* Issue Details */}
            <Card sx={{ mb: 3, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderRadius: 2 }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Typography
                    sx={{
                      fontSize: 22,
                      fontWeight: 700,
                      color: '#1F2937',
                      fontFamily: 'Inter',
                    }}
                  >
                    {issue.title}
                  </Typography>
                  <Chip
                    label="Pending Verification"
                    sx={{
                      background: '#FEF3C7',
                      color: '#92400E',
                      fontWeight: 600,
                      fontSize: 12,
                    }}
                  />
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                  <Avatar sx={{ width: 40, height: 40 }} />
                  <Box>
                    <Typography sx={{ fontSize: 14, fontWeight: 600, color: '#1F2937' }}>
                      {issue.submittedBy}
                    </Typography>
                    <Typography sx={{ fontSize: 12, color: '#6B7280' }}>
                      {issue.submittedRole}
                    </Typography>
                  </Box>
                  <Chip
                    label={`🏛️ ${issue.taggedAuthority}`}
                    sx={{
                      background: '#DBEAFE',
                      color: '#1E40AF',
                      fontSize: 12,
                      fontWeight: 600,
                    }}
                  />
                  <Typography sx={{ fontSize: 13, color: '#9CA3AF', ml: 'auto' }}>
                    {issue.timeAgo}
                  </Typography>
                </Box>

                <Typography sx={{ fontSize: 14, color: '#4B5563', mb: 3, lineHeight: 1.6 }}>
                  {issue.description}
                </Typography>

                <Box sx={{ display: 'flex', gap: 2 }}>
                  {issue.images.map((img, index) => (
                    <Box
                      key={index}
                      component="img"
                      src={img}
                      sx={{
                        width: '48%',
                        height: 200,
                        objectFit: 'cover',
                        borderRadius: 2,
                      }}
                    />
                  ))}
                </Box>
              </CardContent>
            </Card>

            {/* Current Step: Community Verification */}
            <Card sx={{ mb: 3, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderRadius: 2 }}>
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
                  Current Step: Community Verification
                </Typography>

                <Box
                  sx={{
                    background: '#FFFBEB',
                    border: '1px solid #FCD34D',
                    borderRadius: 2,
                    p: 3,
                    mb: 3,
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, mb: 2 }}>
                    <Warning sx={{ color: '#F59E0B', fontSize: 24 }} />
                    <Box sx={{ flex: 1 }}>
                      <Typography
                        sx={{
                          fontSize: 15,
                          fontWeight: 600,
                          color: '#92400E',
                          mb: 0.5,
                        }}
                      >
                        Verification Required
                      </Typography>
                      <Typography sx={{ fontSize: 13, color: '#92400E' }}>
                        This issue needs 3 verifications from nearby residents before it can proceed to
                        official action.
                      </Typography>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      pt: 2,
                      borderTop: '1px solid #FDE68A',
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: 32,
                        fontWeight: 700,
                        color: '#92400E',
                        fontFamily: 'Inter',
                      }}
                    >
                      {issue.verificationCount}/{issue.verificationRequired}
                    </Typography>
                    <Button
                      variant="contained"
                      startIcon={<CheckCircle />}
                      sx={{
                        background: '#F59E0B',
                        color: 'white',
                        textTransform: 'none',
                        fontSize: 14,
                        fontWeight: 600,
                        px: 3,
                        py: 1,
                        '&:hover': {
                          background: '#D97706',
                        },
                      }}
                    >
                      Verify This Issue
                    </Button>
                  </Box>
                </Box>

                <Typography
                  sx={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: '#1F2937',
                    mb: 2,
                    fontFamily: 'Inter',
                  }}
                >
                  Recent Verifications
                </Typography>

                {issue.recentVerifications.map((verification, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      p: 2,
                      background: '#ECFDF5',
                      borderRadius: 2,
                      mb: 1.5,
                    }}
                  >
                    <Avatar sx={{ width: 40, height: 40 }} />
                    <Box sx={{ flex: 1 }}>
                      <Typography sx={{ fontSize: 14, fontWeight: 600, color: '#1F2937' }}>
                        {verification.name}
                      </Typography>
                      <Typography sx={{ fontSize: 12, color: '#6B7280' }}>
                        {verification.location}
                      </Typography>
                    </Box>
                    <Chip
                      label={verification.time}
                      sx={{
                        background: '#D1FAE5',
                        color: '#065F46',
                        fontSize: 11,
                        fontWeight: 600,
                      }}
                    />
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>

          {/* Right Column */}
          <Grid item xs={12} md={4}>
            {/* Verification Rules */}
            <Card sx={{ mb: 3, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderRadius: 2 }}>
              <CardContent>
                <Typography
                  sx={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: '#1F2937',
                    mb: 2,
                    fontFamily: 'Inter',
                  }}
                >
                  Verification Rules
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <CheckCircle sx={{ color: '#10B981', fontSize: 20 }} />
                    <Typography sx={{ fontSize: 13, color: '#4B5563' }}>
                      Must be within 300m radius
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <CheckCircle sx={{ color: '#10B981', fontSize: 20 }} />
                    <Typography sx={{ fontSize: 13, color: '#4B5563' }}>
                      Verified account required
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Schedule sx={{ color: '#F59E0B', fontSize: 20 }} />
                    <Typography sx={{ fontSize: 13, color: '#4B5563' }}>
                      Minimum 3 verifications needed
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Box
                      sx={{
                        width: 20,
                        height: 20,
                        borderRadius: '50%',
                        border: '2px solid #E5E7EB',
                      }}
                    />
                    <Typography sx={{ fontSize: 13, color: '#9CA3AF' }}>
                      Cannot be undone once verified
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>

            {/* Next Steps */}
            <Card sx={{ mb: 3, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderRadius: 2 }}>
              <CardContent>
                <Typography
                  sx={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: '#1F2937',
                    mb: 2,
                    fontFamily: 'Inter',
                  }}
                >
                  Next Steps
                </Typography>

                <Box sx={{ mb: 2 }}>
                  <Typography sx={{ fontSize: 13, fontWeight: 600, color: '#1F2937', mb: 0.5 }}>
                    After Verification
                  </Typography>
                  <Typography sx={{ fontSize: 12, color: '#6B7280' }}>
                    Ministry of Water Supply will be notified automatically
                  </Typography>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box sx={{ mb: 2 }}>
                  <Typography sx={{ fontSize: 13, fontWeight: 600, color: '#1F2937', mb: 0.5 }}>
                    Official Response
                  </Typography>
                  <Typography sx={{ fontSize: 12, color: '#6B7280' }}>
                    Government can claim and provide updates
                  </Typography>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box>
                  <Typography sx={{ fontSize: 13, fontWeight: 600, color: '#1F2937', mb: 0.5 }}>
                    Solution Tracking
                  </Typography>
                  <Typography sx={{ fontSize: 12, color: '#6B7280' }}>
                    Progress photos and timeline will be public
                  </Typography>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => navigate(`/issues/${id}/ministry-action`)}
                  sx={{
                    background: '#2563EB',
                    color: 'white',
                    textTransform: 'none',
                    fontSize: 14,
                    fontWeight: 600,
                    py: 1.2,
                    '&:hover': {
                      background: '#1D4ED8',
                    },
                  }}
                >
                  View Ministry Response Page →
                </Button>
              </CardContent>
            </Card>

            {/* Transparency Guarantee */}
            <Box
              sx={{
                background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
                borderRadius: 2,
                p: 3,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                <Info sx={{ color: 'white', fontSize: 24 }} />
                <Typography
                  sx={{
                    fontSize: 15,
                    fontWeight: 700,
                    color: 'white',
                    fontFamily: 'Inter',
                  }}
                >
                  Transparency Guarantee
                </Typography>
              </Box>
              <Typography sx={{ fontSize: 12, color: 'rgba(255,255,255,0.9)', lineHeight: 1.5 }}>
                Every step in this process is publicly visible and cannot be edited or skipped. All
                timestamps are permanent.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

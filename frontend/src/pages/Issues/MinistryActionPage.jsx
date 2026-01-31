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
  Grid,
  Divider,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import {
  ArrowBack,
  Language,
  CheckCircle,
  Lock,
  Schedule,
  AccountBalance,
  Assignment,
  CalendarToday,
  Timer,
  AttachFile,
  Send,
  Info,
  Warning,
} from '@mui/icons-material';

export default function MinistryActionPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeStep, setActiveStep] = useState(2);

  const steps = [
    { label: 'Posted', sublabel: 'Jan 12, 2025', status: 'completed' },
    { label: 'Community Verification', sublabel: '3/3 verified', status: 'completed' },
    { label: 'Ministry Action', sublabel: 'In Progress', status: 'active' },
    { label: 'Solution Submitted', sublabel: 'Locked', status: 'locked' },
    { label: 'Solution Confirmation', sublabel: 'Locked', status: 'locked' },
    { label: 'Issue Archived', sublabel: 'Locked', status: 'locked' },
  ];

  const issue = {
    id: 'WTR-2024-247',
    title: 'Water Pipeline Burst on Galle Road',
    submittedBy: 'Rajesh Fernando',
    category: 'Water Supply',
    location: 'Galle Road Junction, Colombo',
    timeAgo: '3 days ago',
    verifiedCount: 3,
    description:
      'Major water pipeline has burst near the Galle Road junction causing flooding and disrupting water supply to the area.',
    images: [
      'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400',
      'https://images.unsplash.com/photo-1590859808308-3d2d9c515b1a?w=400',
    ],
    taggedAuthority: 'Ministry of Water Supply',
    assignedOfficer: 'Not Yet Assigned',
    estimatedTime: 'Not Set',
    priority: 'Not Set',
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
            background: '#3B82F6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <AccountBalance sx={{ color: 'white', fontSize: 24 }} />
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
              Ministry Action Required
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
              icon={<AccountBalance sx={{ fontSize: 18 }} />}
              label="Awaiting Ministry"
              sx={{
                background: '#DBEAFE',
                color: '#1E40AF',
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
                  width: '32%',
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
            {/* Issue Summary */}
            <Card sx={{ mb: 3, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderRadius: 2 }}>
              <CardContent>
                <Typography
                  sx={{
                    fontSize: 20,
                    fontWeight: 700,
                    color: '#1F2937',
                    mb: 2,
                    fontFamily: 'Inter',
                  }}
                >
                  {issue.title}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                  <Avatar sx={{ width: 40, height: 40 }} />
                  <Box>
                    <Typography sx={{ fontSize: 14, fontWeight: 600, color: '#1F2937' }}>
                      {issue.submittedBy}
                    </Typography>
                    <Typography sx={{ fontSize: 12, color: '#6B7280' }}>
                      Verified Resident
                    </Typography>
                  </Box>
                  <Chip
                    label={`✅ ${issue.verifiedCount} Verifications`}
                    sx={{
                      background: '#D1FAE5',
                      color: '#065F46',
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

            {/* Ministry Response Form */}
            <Card sx={{ mb: 3, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderRadius: 2 }}>
              <CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
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
                    Ministry Response Form
                  </Typography>
                  <Chip
                    label="Government Only"
                    icon={<AccountBalance sx={{ fontSize: 18 }} />}
                    sx={{
                      background: '#DBEAFE',
                      color: '#1E40AF',
                      fontWeight: 600,
                      fontSize: 12,
                    }}
                  />
                </Box>

                <Box
                  sx={{
                    background: '#EFF6FF',
                    border: '1px solid #BFDBFE',
                    borderRadius: 2,
                    p: 2.5,
                    mb: 3,
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                    <Info sx={{ color: '#2563EB', fontSize: 22 }} />
                    <Box>
                      <Typography
                        sx={{
                          fontSize: 14,
                          fontWeight: 600,
                          color: '#1E40AF',
                          mb: 0.5,
                        }}
                      >
                        Action Required
                      </Typography>
                      <Typography sx={{ fontSize: 13, color: '#1E40AF' }}>
                        This verified issue requires official acknowledgment from {issue.taggedAuthority}.
                        Please claim this issue and provide an action plan.
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                <Grid container spacing={2} sx={{ mb: 3 }}>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <InputLabel>Assign Officer</InputLabel>
                      <Select
                        defaultValue=""
                        label="Assign Officer"
                        sx={{
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#E5E7EB',
                          },
                        }}
                      >
                        <MenuItem value="officer1">Eng. Sunil Perera</MenuItem>
                        <MenuItem value="officer2">Mr. Kamal Silva</MenuItem>
                        <MenuItem value="officer3">Ms. Nisha Fernando</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <InputLabel>Priority Level</InputLabel>
                      <Select
                        defaultValue=""
                        label="Priority Level"
                        sx={{
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#E5E7EB',
                          },
                        }}
                      >
                        <MenuItem value="critical">🔴 Critical</MenuItem>
                        <MenuItem value="high">🟠 High</MenuItem>
                        <MenuItem value="medium">🟡 Medium</MenuItem>
                        <MenuItem value="low">🟢 Low</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      type="date"
                      label="Expected Start Date"
                      InputLabelProps={{ shrink: true }}
                      sx={{
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#E5E7EB',
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <InputLabel>Estimated Duration</InputLabel>
                      <Select
                        defaultValue=""
                        label="Estimated Duration"
                        sx={{
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#E5E7EB',
                          },
                        }}
                      >
                        <MenuItem value="1-3">1-3 days</MenuItem>
                        <MenuItem value="4-7">4-7 days</MenuItem>
                        <MenuItem value="1-2">1-2 weeks</MenuItem>
                        <MenuItem value="2-4">2-4 weeks</MenuItem>
                        <MenuItem value="1-3m">1-3 months</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>

                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  placeholder="Official Response: Describe the action plan, steps to be taken, and any relevant information for the public..."
                  sx={{
                    mb: 2,
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#E5E7EB',
                    },
                  }}
                />

                <Box
                  sx={{
                    border: '2px dashed #D1D5DB',
                    borderRadius: 2,
                    p: 3,
                    textAlign: 'center',
                    mb: 3,
                    cursor: 'pointer',
                    '&:hover': {
                      borderColor: '#2563EB',
                      background: '#F9FAFB',
                    },
                  }}
                >
                  <AttachFile sx={{ fontSize: 40, color: '#9CA3AF', mb: 1 }} />
                  <Typography sx={{ fontSize: 14, color: '#6B7280', fontWeight: 600 }}>
                    Attach Documents
                  </Typography>
                  <Typography sx={{ fontSize: 12, color: '#9CA3AF' }}>
                    Upload action plans, permits, or relevant documents (PDF, Images)
                  </Typography>
                </Box>

                <Button
                  variant="contained"
                  startIcon={<Send />}
                  fullWidth
                  sx={{
                    background: '#2563EB',
                    color: 'white',
                    textTransform: 'none',
                    fontSize: 15,
                    fontWeight: 600,
                    py: 1.5,
                    '&:hover': {
                      background: '#1D4ED8',
                    },
                  }}
                >
                  Claim Issue & Submit Action Plan
                </Button>
              </CardContent>
            </Card>

            {/* Public Accountability Notice */}
            <Box
              sx={{
                background: '#FEF3C7',
                border: '1px solid #FCD34D',
                borderRadius: 2,
                p: 3,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                <Warning sx={{ color: '#F59E0B', fontSize: 24 }} />
                <Box>
                  <Typography
                    sx={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: '#92400E',
                      mb: 0.5,
                    }}
                  >
                    Public Accountability
                  </Typography>
                  <Typography sx={{ fontSize: 13, color: '#92400E', lineHeight: 1.6 }}>
                    All ministry responses are publicly visible and permanently recorded. Response time
                    and completion status will affect your ministry's performance score and public rating.
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>

          {/* Right Column */}
          <Grid item xs={12} md={4}>
            {/* Issue Status */}
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
                  Issue Status
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box>
                    <Typography sx={{ fontSize: 12, color: '#6B7280', mb: 0.5 }}>
                      Category
                    </Typography>
                    <Chip
                      label={issue.category}
                      sx={{
                        background: '#DBEAFE',
                        color: '#1E40AF',
                        fontWeight: 600,
                        fontSize: 13,
                      }}
                    />
                  </Box>
                  <Divider />
                  <Box>
                    <Typography sx={{ fontSize: 12, color: '#6B7280', mb: 0.5 }}>
                      Tagged Authority
                    </Typography>
                    <Typography sx={{ fontSize: 14, fontWeight: 600, color: '#1F2937' }}>
                      🏛️ {issue.taggedAuthority}
                    </Typography>
                  </Box>
                  <Divider />
                  <Box>
                    <Typography sx={{ fontSize: 12, color: '#6B7280', mb: 0.5 }}>
                      Assigned Officer
                    </Typography>
                    <Typography sx={{ fontSize: 14, fontWeight: 600, color: '#DC2626' }}>
                      {issue.assignedOfficer}
                    </Typography>
                  </Box>
                  <Divider />
                  <Box>
                    <Typography sx={{ fontSize: 12, color: '#6B7280', mb: 0.5 }}>
                      Priority
                    </Typography>
                    <Typography sx={{ fontSize: 14, fontWeight: 600, color: '#DC2626' }}>
                      {issue.priority}
                    </Typography>
                  </Box>
                  <Divider />
                  <Box>
                    <Typography sx={{ fontSize: 12, color: '#6B7280', mb: 0.5 }}>
                      Estimated Time
                    </Typography>
                    <Typography sx={{ fontSize: 14, fontWeight: 600, color: '#DC2626' }}>
                      {issue.estimatedTime}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>

            {/* Response Time Tracker */}
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
                  Response Time Tracker
                </Typography>

                <Box sx={{ textAlign: 'center', py: 3 }}>
                  <Timer sx={{ fontSize: 48, color: '#F59E0B', mb: 1 }} />
                  <Typography
                    sx={{
                      fontSize: 32,
                      fontWeight: 700,
                      color: '#F59E0B',
                      fontFamily: 'Inter',
                    }}
                  >
                    72 hours
                  </Typography>
                  <Typography sx={{ fontSize: 13, color: '#6B7280' }}>
                    Since verification completed
                  </Typography>
                </Box>

                <Box sx={{ background: '#FEF3C7', borderRadius: 2, p: 2 }}>
                  <Typography sx={{ fontSize: 12, color: '#92400E', textAlign: 'center' }}>
                    ⚠️ Average ministry response time: <strong>48 hours</strong>
                  </Typography>
                </Box>
              </CardContent>
            </Card>

            {/* Performance Impact */}
            <Box
              sx={{
                background: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
                borderRadius: 2,
                p: 3,
              }}
            >
              <Assignment sx={{ color: 'white', fontSize: 32, mb: 1.5 }} />
              <Typography
                sx={{
                  fontSize: 15,
                  fontWeight: 700,
                  color: 'white',
                  mb: 1,
                  fontFamily: 'Inter',
                }}
              >
                Performance Impact
              </Typography>
              <Typography sx={{ fontSize: 12, color: 'rgba(255,255,255,0.9)', lineHeight: 1.5 }}>
                Delayed responses negatively affect your ministry's public rating. Quick action improves
                citizen trust and performance scores.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

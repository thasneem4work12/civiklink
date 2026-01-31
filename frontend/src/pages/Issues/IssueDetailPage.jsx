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
  Divider,
  Grid,
} from '@mui/material';
import {
  ArrowBack,
  Language,
  LocationOn,
  ThumbUp,
  CheckCircle,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  Share,
  Verified,
  Groups,
  InfoOutlined,
} from '@mui/icons-material';

export default function IssueDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Sample data - would come from API in real app
  const issue = {
    id: 'ISS-2847',
    title: 'Broken Water Pipeline Flooding Road in Kotahena',
    category: 'Water',
    status: 'Pending',
    priority: 'Solved',
    language: 'Pound',
    owner: 'Owner',
    description: 'Description text: Broken water pipeline flooding road inundation represents the fragility of the organization with syllabus its momentument left an encounter. Broken water pipeline flooding road in Kotahena causing frequent water supply and hygiene concerns for local residents.',
    images: [
      'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600',
      'https://images.unsplash.com/photo-1590859808308-3d2d9c515b1a?w=600',
      'https://images.unsplash.com/photo-1584555684040-bad07f8e093f?w=600',
    ],
    location: {
      address: '274 Kotahena Road, Kandy, distance',
      coordinates: [6.9271, 79.8612],
    },
    postedAt: '3 days ago',
    verifications: 35,
    taggedAuthority: 'Ministry of Water Supply',
    timeline: [
      { event: 'Flooding road', date: '3 days ago' },
      { event: 'Broken Water Pipeline', date: '3 days ago' },
      { event: 'Farishsole media', date: '2 days ago' },
    ],
    comments: [
      {
        id: 1,
        user: 'Manal conoor',
        time: '3 days ago',
        text: 'Any one out the cases do not thwies coles wner pipeline, same in frequently spoken.',
        likes: 16,
      },
      {
        id: 2,
        user: 'Maria Nick',
        time: '3 days ago',
        text: 'While asking out pairs redes in lower. 🤔',
        likes: 0,
      },
    ],
    officialResponse: {
      user: 'Official Response',
      text: "The authority also just can't solve the conler Response in the evidence they following Officie Response I've response are delay.",
      time: '2 days ago',
    },
    ngoSupport: {
      user: 'NGO Support',
      text: 'Thanks to the new Auxe NGO support with decorating on and prepared to shaker what to help, and providence we with the trouble at policy.',
      time: '2 days ago',
    },
    opComment: {
      user: 'OP comments',
      text: 'The comments in donestly accord service tweeting what is the answer city finds it opened ns.',
      time: '1 day ago',
    },
    similarIssues: [
      {
        id: 1,
        title: 'Broken Water Pipeline Flooding Road in Kotahena',
        image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=100',
        status: 'Near',
      },
      {
        id: 2,
        title: 'Broken Water Pipeline Flooding Road in Kotahena',
        image: 'https://images.unsplash.com/photo-1590859808308-3d2d9c515b1a?w=100',
        status: 'Near',
      },
      {
        id: 3,
        title: 'Broken Water Pipeline Flooding Road in Kotahena',
        image: 'https://images.unsplash.com/photo-1584555684040-bad07f8e093f?w=100',
        status: 'Near',
      },
    ],
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? issue.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === issue.images.length - 1 ? 0 : prev + 1
    );
  };

  const getCategoryColor = (category) => {
    const colors = {
      Water: '#0EA5E9',
      Electricity: '#F59E0B',
      Road: '#6B7280',
      Sanitation: '#10B981',
    };
    return colors[category] || '#6B7280';
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
        <Grid container spacing={3}>
          {/* Left Column */}
          <Grid item xs={12} md={8}>
            {/* Title and Category */}
            <Box sx={{ mb: 3 }}>
              <Typography
                sx={{
                  fontSize: 28,
                  fontWeight: 700,
                  color: '#1F2937',
                  mb: 1.5,
                  fontFamily: 'Inter',
                }}
              >
                {issue.title}
              </Typography>
              <Chip
                label={issue.category}
                sx={{
                  background: getCategoryColor(issue.category),
                  color: 'white',
                  fontWeight: 600,
                  fontSize: 13,
                }}
              />
            </Box>

            {/* Image Gallery */}
            <Card sx={{ mb: 3, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderRadius: 2 }}>
              <Box sx={{ position: 'relative', height: 400 }}>
                <Box
                  component="img"
                  src={issue.images[currentImageIndex]}
                  alt="Issue"
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '8px 8px 0 0',
                  }}
                />
                <IconButton
                  onClick={handlePrevImage}
                  sx={{
                    position: 'absolute',
                    left: 16,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'rgba(255,255,255,0.9)',
                    '&:hover': {
                      background: 'white',
                    },
                  }}
                >
                  <KeyboardArrowLeft />
                </IconButton>
                <IconButton
                  onClick={handleNextImage}
                  sx={{
                    position: 'absolute',
                    right: 16,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'rgba(255,255,255,0.9)',
                    '&:hover': {
                      background: 'white',
                    },
                  }}
                >
                  <KeyboardArrowRight />
                </IconButton>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  gap: 1,
                  p: 2,
                  borderTop: '1px solid #E5E7EB',
                }}
              >
                {issue.images.map((img, index) => (
                  <Box
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    component="img"
                    src={img}
                    sx={{
                      width: 80,
                      height: 60,
                      objectFit: 'cover',
                      borderRadius: 1,
                      cursor: 'pointer',
                      border:
                        index === currentImageIndex
                          ? '2px solid #2563EB'
                          : '2px solid transparent',
                    }}
                  />
                ))}
              </Box>
            </Card>

            {/* Description */}
            <Card sx={{ mb: 3, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderRadius: 2 }}>
              <CardContent>
                <Typography
                  sx={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: '#1F2937',
                    mb: 1.5,
                    fontFamily: 'Inter',
                  }}
                >
                  Description
                </Typography>
                <Typography
                  sx={{
                    fontSize: 14,
                    color: '#4B5563',
                    lineHeight: 1.6,
                    mb: 2,
                  }}
                >
                  {issue.description}
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    p: 1.5,
                    background: '#EFF6FF',
                    borderRadius: 2,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: 13,
                      color: '#1E40AF',
                      fontWeight: 600,
                    }}
                  >
                    Time
                  </Typography>
                  <Typography sx={{ fontSize: 13, color: '#6B7280' }}>
                    3 days ago
                  </Typography>
                </Box>
              </CardContent>
            </Card>

            {/* Location */}
            <Card sx={{ mb: 3, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderRadius: 2 }}>
              <CardContent>
                <Typography
                  sx={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: '#1F2937',
                    mb: 1.5,
                    fontFamily: 'Inter',
                  }}
                >
                  Location
                </Typography>
                <Typography
                  sx={{
                    fontSize: 14,
                    color: '#4B5563',
                    mb: 2,
                  }}
                >
                  {issue.location.address}
                </Typography>
                <Box
                  sx={{
                    height: 200,
                    background: '#E5E7EB',
                    borderRadius: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <LocationOn sx={{ fontSize: 48, color: '#EF4444' }} />
                </Box>
                <Button
                  fullWidth
                  variant="outlined"
                  sx={{
                    mt: 2,
                    textTransform: 'none',
                    borderColor: '#E5E7EB',
                    color: '#1F2937',
                  }}
                >
                  Open full Map
                </Button>
              </CardContent>
            </Card>

            {/* Tagged Authority */}
            <Card sx={{ mb: 3, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderRadius: 2 }}>
              <CardContent>
                <Typography
                  sx={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: '#1F2937',
                    mb: 1.5,
                    fontFamily: 'Inter',
                  }}
                >
                  Tagged Authority
                </Typography>
                <Chip
                  label={`🏛️ ${issue.taggedAuthority}`}
                  sx={{
                    background: '#DBEAFE',
                    color: '#1E40AF',
                    fontWeight: 600,
                    fontSize: 13,
                    px: 1,
                  }}
                />
              </CardContent>
            </Card>

            {/* Status */}
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
                  Status
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                  <Chip
                    label="Pending"
                    sx={{
                      background: '#FEF3C7',
                      color: '#92400E',
                      fontWeight: 600,
                      fontSize: 13,
                    }}
                  />
                  <Chip
                    label={`${issue.verifications} people verified`}
                    sx={{
                      background: '#F3F4F6',
                      color: '#1F2937',
                      fontWeight: 600,
                      fontSize: 13,
                    }}
                  />
                </Box>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button
                    variant="contained"
                    startIcon={<CheckCircle />}
                    onClick={() => navigate(`/issues/${id}/verify`)}
                    sx={{
                      flex: 1,
                      background: '#10B981',
                      textTransform: 'none',
                      fontWeight: 600,
                      '&:hover': {
                        background: '#059669',
                      },
                    }}
                  >
                    Verify
                  </Button>
                  <Button
                    variant="outlined"
                    disabled
                    sx={{
                      flex: 1,
                      textTransform: 'none',
                      fontWeight: 600,
                    }}
                  >
                    Need to be near
                  </Button>
                </Box>
              </CardContent>
            </Card>

            {/* Special Buttons */}
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
                  Special buttons
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Button
                    variant="outlined"
                    sx={{
                      textTransform: 'none',
                      fontWeight: 600,
                      borderColor: '#E5E7EB',
                      color: '#1F2937',
                      justifyContent: 'flex-start',
                    }}
                  >
                    Claim Help (NGO) <Typography sx={{ ml: 1, fontSize: 12, color: '#9CA3AF' }}>If I appr nake</Typography>
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<ThumbUp />}
                    sx={{
                      textTransform: 'none',
                      fontWeight: 600,
                      borderColor: '#E5E7EB',
                      color: '#1F2937',
                    }}
                  >
                    Upvote
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      textTransform: 'none',
                      fontWeight: 600,
                      background: '#10B981',
                      '&:hover': {
                        background: '#059669',
                      },
                    }}
                  >
                    Mark as Solved
                  </Button>
                </Box>
              </CardContent>
            </Card>

            {/* Public Comments */}
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
                  Public Comments
                </Typography>

                {/* Avatars */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Box sx={{ display: 'flex', mr: 1 }}>
                    {[1, 2, 3, 4].map((i) => (
                      <Avatar
                        key={i}
                        sx={{
                          width: 32,
                          height: 32,
                          ml: i > 1 ? -1 : 0,
                          border: '2px solid white',
                        }}
                      />
                    ))}
                  </Box>
                  <Typography sx={{ fontSize: 13, color: '#6B7280' }}>+12</Typography>
                </Box>

                {/* Comments */}
                {issue.comments.map((comment) => (
                  <Box key={comment.id} sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                      <Avatar sx={{ width: 32, height: 32 }} />
                      <Typography sx={{ fontSize: 14, fontWeight: 600, color: '#1F2937' }}>
                        {comment.user}
                      </Typography>
                      <Typography sx={{ fontSize: 12, color: '#9CA3AF' }}>
                        {comment.time}
                      </Typography>
                    </Box>
                    <Typography sx={{ fontSize: 14, color: '#4B5563', ml: 5, mb: 0.5 }}>
                      {comment.text}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 5 }}>
                      <ThumbUp sx={{ fontSize: 16, color: '#6B7280' }} />
                      <Typography sx={{ fontSize: 13, color: '#6B7280' }}>
                        {comment.likes}
                      </Typography>
                      <Typography sx={{ fontSize: 13, color: '#2563EB', cursor: 'pointer' }}>
                        Reply
                      </Typography>
                    </Box>
                  </Box>
                ))}

                <Divider sx={{ my: 2 }} />

                {/* Official Response */}
                <Box sx={{ mb: 2, p: 2, background: '#DBEAFE', borderRadius: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                    <Verified sx={{ fontSize: 20, color: '#2563EB' }} />
                    <Typography
                      sx={{
                        fontSize: 14,
                        fontWeight: 600,
                        color: '#1E40AF',
                      }}
                    >
                      {issue.officialResponse.user}
                    </Typography>
                  </Box>
                  <Typography sx={{ fontSize: 14, color: '#1E40AF' }}>
                    {issue.officialResponse.text}
                  </Typography>
                </Box>

                {/* NGO Support */}
                <Box sx={{ mb: 2, p: 2, background: '#ECFDF5', borderRadius: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                    <Groups sx={{ fontSize: 20, color: '#10B981' }} />
                    <Typography
                      sx={{
                        fontSize: 14,
                        fontWeight: 600,
                        color: '#065F46',
                      }}
                    >
                      {issue.ngoSupport.user}
                    </Typography>
                  </Box>
                  <Typography sx={{ fontSize: 14, color: '#065F46' }}>
                    {issue.ngoSupport.text}
                  </Typography>
                </Box>

                {/* OP Comment */}
                <Box sx={{ mb: 2, p: 2, background: '#F3F4F6', borderRadius: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                    <Avatar sx={{ width: 24, height: 24 }} />
                    <Typography
                      sx={{
                        fontSize: 14,
                        fontWeight: 600,
                        color: '#1F2937',
                      }}
                    >
                      {issue.opComment.user}
                    </Typography>
                  </Box>
                  <Typography sx={{ fontSize: 14, color: '#4B5563' }}>
                    {issue.opComment.text}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Right Column */}
          <Grid item xs={12} md={4}>
            {/* Special Buttons (Mobile) */}
            <Box sx={{ display: { md: 'none' }, mb: 3 }}>
              <Button
                fullWidth
                variant="outlined"
                sx={{
                  mb: 1,
                  textTransform: 'none',
                  fontWeight: 600,
                  borderColor: '#E5E7EB',
                }}
              >
                Special buttons (to applicable)
              </Button>
              <Button
                fullWidth
                variant="contained"
                sx={{
                  background: '#10B981',
                  textTransform: 'none',
                  fontWeight: 600,
                  '&:hover': {
                    background: '#059669',
                  },
                }}
              >
                Mark as Solved
              </Button>
            </Box>

            {/* Quick Metadata */}
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
                  Quick Metadata
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography sx={{ fontSize: 14, color: '#6B7280' }}>Category:</Typography>
                    <Typography sx={{ fontSize: 14, fontWeight: 600, color: '#1F2937' }}>
                      {issue.category}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography sx={{ fontSize: 14, color: '#6B7280' }}>Issue#:</Typography>
                    <Typography sx={{ fontSize: 14, fontWeight: 600, color: '#1F2937' }}>
                      {issue.id}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography sx={{ fontSize: 14, color: '#6B7280' }}>Priority:</Typography>
                    <Typography sx={{ fontSize: 14, fontWeight: 600, color: '#1F2937' }}>
                      {issue.priority}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography sx={{ fontSize: 14, color: '#6B7280' }}>Language:</Typography>
                    <Typography sx={{ fontSize: 14, fontWeight: 600, color: '#1F2937' }}>
                      {issue.language}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography sx={{ fontSize: 14, color: '#6B7280' }}>Owner:</Typography>
                    <Typography sx={{ fontSize: 14, fontWeight: 600, color: '#1F2937' }}>
                      {issue.owner}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>

            {/* Similar Issues Nearby */}
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
                  Similar Issues Nearby
                </Typography>
                {issue.similarIssues.map((similar) => (
                  <Box
                    key={similar.id}
                    sx={{
                      display: 'flex',
                      gap: 1.5,
                      mb: 2,
                      cursor: 'pointer',
                      '&:hover': {
                        opacity: 0.8,
                      },
                    }}
                  >
                    <Box
                      component="img"
                      src={similar.image}
                      sx={{
                        width: 60,
                        height: 60,
                        objectFit: 'cover',
                        borderRadius: 1,
                      }}
                    />
                    <Box sx={{ flex: 1 }}>
                      <Typography
                        sx={{
                          fontSize: 13,
                          fontWeight: 600,
                          color: '#1F2937',
                          mb: 0.5,
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        {similar.title}
                      </Typography>
                      <Chip
                        label={similar.status}
                        size="small"
                        sx={{
                          background: '#DBEAFE',
                          color: '#1E40AF',
                          fontSize: 11,
                          height: 20,
                        }}
                      />
                    </Box>
                  </Box>
                ))}
              </CardContent>
            </Card>

            {/* Issue Timeline */}
            <Card sx={{ boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderRadius: 2 }}>
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
                  Issue Timeline
                </Typography>
                {issue.timeline.map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1.5,
                      mb: 1.5,
                    }}
                  >
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        background: '#2563EB',
                      }}
                    />
                    <Box sx={{ flex: 1 }}>
                      <Typography sx={{ fontSize: 14, fontWeight: 600, color: '#1F2937' }}>
                        {item.event}
                      </Typography>
                      <Typography sx={{ fontSize: 12, color: '#9CA3AF' }}>
                        {item.date}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

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
  Grid,
  Card,
  CardMedia,
  CardContent,
  Chip,
  Dialog,
  Button,
  Divider,
} from '@mui/material';
import {
  Notifications,
  Language,
  LocationOn,
  CheckCircle,
  Close,
  ArrowForward,
  Groups,
  Apartment,
} from '@mui/icons-material';

export default function SuccessStoryPage() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [selectedStory, setSelectedStory] = useState(null);

  const successStories = [
    {
      id: 1,
      title: 'Water Pump Installation - Anuradhapura',
      category: 'Water',
      location: 'Anuradhapura, North Central',
      beforeImage: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400',
      afterImage: 'https://images.unsplash.com/photo-1590859808308-3d2d9c515b1a?w=400',
      completedDate: 'Mar 20, 2024',
      beneficiaries: '500+ residents',
      projectDescription: 'A new water pump and storage tank were installed to address the severe water scarcity issue affecting over 500 residents in the local community. The project included the installation of a high-capacity submersible pump, construction of a 10,000-liter storage tank, and connection of distribution pipelines to 75 households.',
      background: 'The community had been experiencing long-term water scarcity for over five years, with the existing well running dry during the dry season. Residents, particularly women and children, were forced to travel up to 3 kilometers to access water from unsafe sources, including contaminated streams. This situation posed serious health risks and placed an enormous burden on families. The immediate need for a sustainable water solution became a top priority for the community and local authorities.',
      whatWasDone: [
        'Installed a high-capacity submersible water pump with solar backup power system',
        'Built a 10,000-liter elevated water storage tank with filtration system',
        'Connected distribution pipelines to 75 households within a 2km radius',
        'Established a community water management committee for ongoing maintenance',
      ],
      appreciation: [
        { quote: 'Thank you for the clean water! Our children no longer have to walk long distances, and we feel safer knowing the water is clean.', author: 'Amara' },
        { quote: 'This project has changed our lives. We now have time to focus on our farms and businesses instead of fetching water all day.', author: 'Keuden' },
        { quote: 'Thank you for the clean water! The health of our community has improved significantly since the installation.', author: 'Dhara' },
      ],
      credits: [
        { type: 'Government', name: 'Government', icon: '🏛️' },
        { type: 'NGO', name: 'XYZ NGO', icon: '🤝' },
        { type: 'Verifiers', name: 'Community Verifiers', icon: '👥' },
      ],
      timeline: [
        { label: 'Posted', date: 'Jan 15, 2024', status: 'completed' },
        { label: 'Verified', date: 'Feb 3, 2024', status: 'completed' },
        { label: 'Confirmed', date: 'Mar 20, 2024', status: 'completed' },
      ],
      likes: 342,
      verifications: 28,
    },
    {
      id: 2,
      title: 'Road Repair - Galle Main Street',
      category: 'Roads',
      location: 'Galle, Southern Province',
      beforeImage: 'https://images.unsplash.com/photo-1505229167722-bec49b6aa4f8?w=400',
      afterImage: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400',
      completedDate: 'Feb 15, 2024',
      beneficiaries: '2000+ daily commuters',
      projectDescription: 'Major road repair project covering 2.5 km of Galle Main Street, including pothole filling, resurfacing, and drainage system improvements to address flooding issues.',
      background: 'The main street had deteriorated significantly over the past three years, with numerous deep potholes causing vehicle damage and safety hazards. During monsoon season, poor drainage led to severe flooding, making the road impassable.',
      whatWasDone: [
        'Filled and repaired over 150 potholes along 2.5 km stretch',
        'Complete road resurfacing with high-quality asphalt',
        'Installed new drainage system with 25 catch basins',
        'Added road markings and reflective signs for improved safety',
      ],
      appreciation: [
        { quote: 'Finally we can drive without damaging our vehicles! Thank you for making our daily commute safe.', author: 'Priya' },
        { quote: 'The new drainage system has solved our flooding problem completely.', author: 'Sunil' },
      ],
      credits: [
        { type: 'Authority', name: 'Road Development Authority', icon: '🏛️' },
        { type: 'Verifiers', name: 'Community Verifiers', icon: '👥' },
      ],
      timeline: [
        { label: 'Posted', date: 'Dec 10, 2023', status: 'completed' },
        { label: 'Verified', date: 'Dec 28, 2023', status: 'completed' },
        { label: 'Confirmed', date: 'Feb 15, 2024', status: 'completed' },
      ],
      likes: 256,
      verifications: 18,
    },
    {
      id: 3,
      title: 'Street Lighting Installation - Kandy',
      category: 'Infrastructure',
      location: 'Kandy, Central Province',
      beforeImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
      afterImage: 'https://images.unsplash.com/photo-1524850011238-e3d235c7d4c9?w=400',
      completedDate: 'Jan 30, 2024',
      beneficiaries: '800+ residents',
      projectDescription: 'Installation of 45 LED street lights along residential streets to improve safety and security in the neighborhood.',
      background: 'The area had been without proper street lighting for years, leading to safety concerns, especially for women and children walking at night.',
      whatWasDone: [
        'Installed 45 energy-efficient LED street lights',
        'Set up solar panels for sustainable power supply',
        'Established maintenance schedule with local council',
        'Created community safety patrol program',
      ],
      appreciation: [
        { quote: 'Our children can now walk home safely from evening classes. This has changed our lives!', author: 'Nimal' },
        { quote: 'Crime has reduced significantly since the lights were installed.', author: 'Lakshmi' },
      ],
      credits: [
        { type: 'Ministry', name: 'Ministry of Power & Energy', icon: '🏛️' },
        { type: 'NGO', name: 'Light Up SL', icon: '🤝' },
        { type: 'Verifiers', name: 'Community Verifiers', icon: '👥' },
      ],
      timeline: [
        { label: 'Posted', date: 'Nov 5, 2023', status: 'completed' },
        { label: 'Verified', date: 'Nov 20, 2023', status: 'completed' },
        { label: 'Confirmed', date: 'Jan 30, 2024', status: 'completed' },
      ],
      likes: 189,
      verifications: 15,
    },
    {
      id: 4,
      title: 'Garbage Collection System - Colombo',
      category: 'Sanitation',
      location: 'Colombo 7, Western Province',
      beforeImage: 'https://images.unsplash.com/photo-1605600659908-0ef719419d41?w=400',
      afterImage: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400',
      completedDate: 'Mar 5, 2024',
      beneficiaries: '1200+ households',
      projectDescription: 'Implementation of systematic garbage collection with recycling program and installation of designated collection points.',
      background: 'Irregular garbage collection led to waste accumulation in public areas, creating health hazards and environmental concerns.',
      whatWasDone: [
        'Established daily garbage collection schedule',
        'Installed 20 color-coded bins for waste segregation',
        'Started recycling program with community education',
        'Deployed 3 dedicated collection vehicles',
      ],
      appreciation: [
        { quote: 'Our neighborhood is clean now! The recycling program is excellent.', author: 'Chaminda' },
        { quote: 'Finally consistent service. Thank you for making our area livable again.', author: 'Rashmi' },
      ],
      credits: [
        { type: 'Council', name: 'Colombo Municipal Council', icon: '🏛️' },
        { type: 'Verifiers', name: 'Community Verifiers', icon: '👥' },
      ],
      timeline: [
        { label: 'Posted', date: 'Jan 8, 2024', status: 'completed' },
        { label: 'Verified', date: 'Jan 25, 2024', status: 'completed' },
        { label: 'Confirmed', date: 'Mar 5, 2024', status: 'completed' },
      ],
      likes: 298,
      verifications: 22,
    },
    {
      id: 5,
      title: 'Electricity Grid Expansion - Jaffna',
      category: 'Electricity',
      location: 'Jaffna, Northern Province',
      beforeImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
      afterImage: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400',
      completedDate: 'Feb 28, 2024',
      beneficiaries: '350+ households',
      projectDescription: 'Extension of electricity grid to previously unconnected rural area, bringing reliable power to hundreds of families.',
      background: 'Families in this area relied on generators and kerosene lamps, limiting economic opportunities and educational activities.',
      whatWasDone: [
        'Extended power lines covering 8 km to reach rural communities',
        'Installed transformers and distribution infrastructure',
        'Connected 350 households to the national grid',
        'Provided subsidized electrical installation support',
      ],
      appreciation: [
        { quote: 'Our children can now study at night. This opens so many opportunities for us!', author: 'Kumar' },
        { quote: 'We can finally run small businesses from home. Life-changing!', author: 'Theva' },
      ],
      credits: [
        { type: 'Board', name: 'Ceylon Electricity Board', icon: '🏛️' },
        { type: 'NGO', name: 'Power for All', icon: '🤝' },
        { type: 'Verifiers', name: 'Community Verifiers', icon: '👥' },
      ],
      timeline: [
        { label: 'Posted', date: 'Oct 12, 2023', status: 'completed' },
        { label: 'Verified', date: 'Nov 5, 2023', status: 'completed' },
        { label: 'Confirmed', date: 'Feb 28, 2024', status: 'completed' },
      ],
      likes: 412,
      verifications: 31,
    },
    {
      id: 6,
      title: 'School Playground Construction',
      category: 'Infrastructure',
      location: 'Matara, Southern Province',
      beforeImage: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400',
      afterImage: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=400',
      completedDate: 'Jan 18, 2024',
      beneficiaries: '400+ students',
      projectDescription: 'Construction of new playground with safety equipment, sports facilities, and shaded areas for school children.',
      background: 'The school lacked proper recreational facilities, forcing children to play in unsafe areas during breaks.',
      whatWasDone: [
        'Built safe playground with rubber flooring',
        'Installed swings, slides, and climbing equipment',
        'Created mini sports court for volleyball and basketball',
        'Added shaded seating areas and drinking water facilities',
      ],
      appreciation: [
        { quote: 'The children are so happy! Physical activity has improved their health and focus.', author: 'Principal Dias' },
        { quote: 'As a parent, I feel relieved knowing my children play safely.', author: 'Malini' },
      ],
      credits: [
        { type: 'Ministry', name: 'Ministry of Education', icon: '🏛️' },
        { type: 'NGO', name: 'Build SL', icon: '🤝' },
        { type: 'Verifiers', name: 'Community Verifiers', icon: '👥' },
      ],
      timeline: [
        { label: 'Posted', date: 'Sep 20, 2023', status: 'completed' },
        { label: 'Verified', date: 'Oct 8, 2023', status: 'completed' },
        { label: 'Confirmed', date: 'Jan 18, 2024', status: 'completed' },
      ],
      likes: 367,
      verifications: 26,
    },
  ];

  const getCategoryColor = (category) => {
    const colors = {
      Water: '#0EA5E9',
      Electricity: '#F59E0B',
      Roads: '#6B7280',
      Infrastructure: '#8B5CF6',
      Sanitation: '#10B981',
    };
    return colors[category] || '#6B7280';
  };

  const handleLogout = () => {
    navigate('/login');
  };

  const handleCloseDialog = () => {
    setSelectedStory(null);
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
                fontWeight: 600,
                color: '#2563EB',
                cursor: 'pointer',
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
        <Typography
          sx={{
            fontSize: 28,
            fontWeight: 700,
            color: '#1F2937',
            mb: 1,
            fontFamily: 'Inter',
          }}
        >
          Success Stories
        </Typography>
        <Typography
          sx={{
            fontSize: 14,
            color: '#6B7280',
            mb: 4,
            fontFamily: 'Inter',
          }}
        >
          Celebrating completed projects that made a real difference in communities across Sri Lanka
        </Typography>

        {/* Success Stories Grid */}
        <Grid container spacing={3}>
          {successStories.map((story) => (
            <Grid item xs={12} md={6} lg={4} key={story.id}>
              <Card
                sx={{
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                  borderRadius: 2,
                  cursor: 'pointer',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  },
                }}
                onClick={() => setSelectedStory(story)}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={story.afterImage}
                  alt={story.title}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Chip
                      label={story.category}
                      size="small"
                      sx={{
                        background: getCategoryColor(story.category),
                        color: 'white',
                        fontSize: 11,
                        fontWeight: 600,
                        height: 22,
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: 12,
                        color: '#10B981',
                        fontWeight: 600,
                      }}
                    >
                      ✓ Completed
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      fontSize: 16,
                      fontWeight: 600,
                      color: '#1F2937',
                      mb: 1,
                      fontFamily: 'Inter',
                    }}
                  >
                    {story.title}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
                    <LocationOn sx={{ fontSize: 16, color: '#6B7280' }} />
                    <Typography sx={{ fontSize: 13, color: '#6B7280' }}>
                      {story.location}
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      fontSize: 13,
                      color: '#6B7280',
                      mb: 2,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {story.projectDescription}
                  </Typography>
                  <Divider sx={{ my: 1.5 }} />
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <CheckCircle sx={{ fontSize: 16, color: '#10B981' }} />
                        <Typography sx={{ fontSize: 12, color: '#6B7280' }}>
                          {story.verifications}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Groups sx={{ fontSize: 16, color: '#6B7280' }} />
                        <Typography sx={{ fontSize: 12, color: '#6B7280' }}>
                          {story.beneficiaries}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography
                      sx={{
                        fontSize: 12,
                        color: '#2563EB',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                      }}
                    >
                      Read More
                      <ArrowForward sx={{ fontSize: 14 }} />
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Success Story Detail Dialog */}
      <Dialog
        open={!!selectedStory}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            maxHeight: '90vh',
          },
        }}
      >
        {selectedStory && (
          <Box sx={{ position: 'relative' }}>
            <IconButton
              onClick={handleCloseDialog}
              sx={{
                position: 'absolute',
                right: 16,
                top: 16,
                background: 'white',
                zIndex: 10,
                '&:hover': { background: '#F3F4F6' },
              }}
            >
              <Close />
            </IconButton>

            <Box sx={{ p: 4 }}>
              {/* Before & After Images */}
              <Typography
                sx={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: '#1F2937',
                  mb: 2,
                  fontFamily: 'Inter',
                }}
              >
                Before & After
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                <Box sx={{ flex: 1 }}>
                  <Box
                    sx={{
                      position: 'relative',
                      borderRadius: 2,
                      overflow: 'hidden',
                      height: 200,
                    }}
                  >
                    <img
                      src={selectedStory.beforeImage}
                      alt="Before"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 12,
                        left: 12,
                        background: 'rgba(0,0,0,0.7)',
                        color: 'white',
                        px: 2,
                        py: 0.5,
                        borderRadius: 1,
                        fontSize: 13,
                        fontWeight: 600,
                      }}
                    >
                      Before
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Box
                    sx={{
                      position: 'relative',
                      borderRadius: 2,
                      overflow: 'hidden',
                      height: 200,
                    }}
                  >
                    <img
                      src={selectedStory.afterImage}
                      alt="After"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 12,
                        left: 12,
                        background: '#10B981',
                        color: 'white',
                        px: 2,
                        py: 0.5,
                        borderRadius: 1,
                        fontSize: 13,
                        fontWeight: 600,
                      }}
                    >
                      After
                    </Box>
                  </Box>
                </Box>
              </Box>

              {/* What Was Done - Project */}
              <Typography
                sx={{
                  fontSize: 20,
                  fontWeight: 700,
                  color: '#1F2937',
                  mb: 1,
                  fontFamily: 'Inter',
                }}
              >
                What Was Done - Project
              </Typography>
              <Typography
                sx={{
                  fontSize: 14,
                  color: '#4B5563',
                  mb: 2,
                  lineHeight: 1.6,
                }}
              >
                {selectedStory.projectDescription}
              </Typography>
              <Typography
                sx={{
                  fontSize: 14,
                  color: '#6B7280',
                  mb: 3,
                  lineHeight: 1.6,
                }}
              >
                Prior to this intervention, residents had to walk long distances to access unsafe water sources. The new infrastructure has significantly improved water access, ensuring clean and reliable water supply for daily needs, improving health outcomes, and saving valuable time for community members.
              </Typography>
              <Button
                endIcon={<ArrowForward />}
                sx={{
                  color: '#10B981',
                  textTransform: 'none',
                  fontSize: 14,
                  fontWeight: 600,
                  mb: 3,
                  '&:hover': { background: '#ECFDF5' },
                }}
              >
                Read More
              </Button>

              {/* Issue Background */}
              <Typography
                sx={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: '#1F2937',
                  mb: 1,
                  fontFamily: 'Inter',
                }}
              >
                Issue Background
              </Typography>
              <Typography
                sx={{
                  fontSize: 14,
                  color: '#4B5563',
                  mb: 3,
                  lineHeight: 1.6,
                }}
              >
                {selectedStory.background}
              </Typography>

              {/* What Was Done */}
              <Typography
                sx={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: '#1F2937',
                  mb: 2,
                  fontFamily: 'Inter',
                }}
              >
                What Was Done
              </Typography>
              <Box sx={{ mb: 3 }}>
                {selectedStory.whatWasDone.map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 1.5,
                      mb: 1.5,
                    }}
                  >
                    <CheckCircle sx={{ fontSize: 20, color: '#10B981', mt: 0.2 }} />
                    <Typography sx={{ fontSize: 14, color: '#4B5563', lineHeight: 1.6 }}>
                      {item}
                    </Typography>
                  </Box>
                ))}
              </Box>

              <Box sx={{ display: 'flex', gap: 3, mb: 3 }}>
                {/* Public Appreciation */}
                <Box sx={{ flex: 2 }}>
                  <Typography
                    sx={{
                      fontSize: 18,
                      fontWeight: 700,
                      color: '#1F2937',
                      mb: 2,
                      fontFamily: 'Inter',
                    }}
                  >
                    Public Appreciation
                  </Typography>
                  {selectedStory.appreciation.map((item, index) => (
                    <Box
                      key={index}
                      sx={{
                        mb: 2,
                        p: 2,
                        background: '#F9FAFB',
                        borderRadius: 2,
                        borderLeft: '3px solid #10B981',
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: 13,
                          color: '#4B5563',
                          fontStyle: 'italic',
                          mb: 1,
                          lineHeight: 1.5,
                        }}
                      >
                        "{item.quote}"
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: 12,
                          color: '#6B7280',
                          textAlign: 'right',
                          fontWeight: 600,
                        }}
                      >
                        — {item.author}
                      </Typography>
                    </Box>
                  ))}
                </Box>

                {/* Credits & Timeline */}
                <Box sx={{ flex: 1 }}>
                  {/* Credits */}
                  <Typography
                    sx={{
                      fontSize: 18,
                      fontWeight: 700,
                      color: '#1F2937',
                      mb: 2,
                      fontFamily: 'Inter',
                    }}
                  >
                    Credits
                  </Typography>
                  <Box sx={{ mb: 3 }}>
                    {selectedStory.credits.map((credit, index) => (
                      <Box
                        key={index}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1.5,
                          mb: 1.5,
                          p: 1.5,
                          background: credit.type === 'NGO' ? '#F3E8FF' : credit.type === 'Verifiers' ? '#FEF3C7' : '#DBEAFE',
                          borderRadius: 2,
                        }}
                      >
                        <Box
                          sx={{
                            fontSize: 24,
                          }}
                        >
                          {credit.type === 'Government' || credit.type === 'Authority' || credit.type === 'Ministry' || credit.type === 'Council' || credit.type === 'Board' ? (
                            <Apartment sx={{ fontSize: 24, color: '#2563EB' }} />
                          ) : credit.type === 'NGO' ? (
                            '🤝'
                          ) : (
                            <Groups sx={{ fontSize: 24, color: '#F59E0B' }} />
                          )}
                        </Box>
                        <Typography sx={{ fontSize: 13, color: '#1F2937', fontWeight: 600 }}>
                          {credit.name}
                        </Typography>
                      </Box>
                    ))}
                  </Box>

                  {/* Time Breakdown */}
                  <Typography
                    sx={{
                      fontSize: 18,
                      fontWeight: 700,
                      color: '#1F2937',
                      mb: 2,
                      fontFamily: 'Inter',
                    }}
                  >
                    Time Breakdown
                  </Typography>
                  <Box>
                    {selectedStory.timeline.map((step, index) => (
                      <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Box
                          sx={{
                            width: 40,
                            height: 40,
                            borderRadius: '50%',
                            background: step.label === 'Posted' ? '#DBEAFE' : step.label === 'Verified' ? '#ECFDF5' : '#D1FAE5',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mr: 1.5,
                          }}
                        >
                          <CheckCircle
                            sx={{
                              fontSize: 24,
                              color: step.label === 'Posted' ? '#2563EB' : step.label === 'Verified' ? '#10B981' : '#059669',
                            }}
                          />
                        </Box>
                        <Box>
                          <Typography
                            sx={{
                              fontSize: 13,
                              fontWeight: 600,
                              color: '#1F2937',
                            }}
                          >
                            {step.label}
                          </Typography>
                          <Typography sx={{ fontSize: 11, color: '#6B7280' }}>
                            {step.date}
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        )}
      </Dialog>
    </Box>
  );
}

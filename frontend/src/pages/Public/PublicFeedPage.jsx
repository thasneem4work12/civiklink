import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  Chip,
  IconButton,
  Avatar,
  Badge,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
} from '@mui/material';
import {
  Search,
  ThumbUpOutlined,
  ChatBubbleOutline,
  CheckCircle,
  LocationOn,
  Notifications,
  Language,
  Person,
} from '@mui/icons-material';

export default function PublicFeedPage() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState(['All']);
  const [selectedDistrict, setSelectedDistrict] = useState('All Districts');
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [sortBy, setSortBy] = useState('Most Recent');

  // Sample issues data
  const issues = [
    {
      id: 1,
      title: 'Main water pipe burst flooding Galle Road',
      image: 'https://images.unsplash.com/photo-1527427337751-fdca2f128ce5?w=500',
      category: 'Water',
      categoryColor: '#2196F3',
      location: 'Galle Road, Colombo 3',
      distance: '1.2 km from you',
      ministry: 'Ministry of Water Supply',
      verifiedCount: 47,
      status: 'Urgent',
      statusColor: '#DC2626',
      likes: 23,
      comments: 12,
      morePhotos: 3,
    },
    {
      id: 2,
      title: 'Dangerous potholes on Kandy Road causing accidents',
      image: 'https://images.unsplash.com/photo-1502767089025-6572583495f9?w=500',
      category: 'Road',
      categoryColor: '#78716C',
      location: 'Kandy Road, Kaduwela',
      distance: '8.1 km from you',
      ministry: 'Road Development Authority',
      verifiedCount: 32,
      status: 'Pending',
      statusColor: '#F59E0B',
      likes: 18,
      comments: 8,
      tooFar: true,
    },
    {
      id: 3,
      title: 'Power outage in residential area for 6 hours',
      image: 'https://images.unsplash.com/photo-1517303650219-83c8b1788c4c?w=500',
      category: 'Electricity',
      categoryColor: '#EAB308',
      location: 'Wellawatta, Colombo 6',
      distance: '3.8 km from you',
      ministry: 'Ceylon Electricity Board',
      verifiedCount: 89,
      status: 'In Progress',
      statusColor: '#3B82F6',
      likes: 45,
      comments: 23,
    },
    {
      id: 4,
      title: 'Illegal garbage dumping site causing health hazards',
      image: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=500',
      category: 'Sanitation',
      categoryColor: '#22C55E',
      location: 'Maharagama, Colombo',
      distance: '9.7 km from you',
      ministry: 'Claimed by Green Lanka NGO',
      verifiedCount: 156,
      status: 'Solved',
      statusColor: '#10B981',
      likes: 78,
      comments: 34,
      tooFar: true,
    },
    {
      id: 5,
      title: 'Flash flooding blocking main highway',
      image: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?w=500',
      category: 'Emergency',
      categoryColor: '#EF4444',
      location: 'Colombo-Kandy Highway',
      distance: '12.5 km from you',
      ministry: 'Disaster Management Centre',
      verifiedCount: 203,
      status: 'Official Responded',
      statusColor: '#8B5CF6',
      likes: 134,
      comments: 67,
      tooFar: true,
    },
    {
      id: 6,
      title: 'Multiple streetlights not working creating safety concerns',
      image: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?w=500',
      category: 'Electricity',
      categoryColor: '#EAB308',
      location: 'Marine Drive, Colombo 3',
      distance: '2.1 km from you',
      ministry: 'Colombo Municipal Council',
      verifiedCount: 28,
      status: 'Pending',
      statusColor: '#F59E0B',
      likes: 15,
      comments: 6,
    },
  ];

  const categories = [
    { label: 'All', color: '#1F2937' },
    { label: 'Water', color: '#2196F3' },
    { label: 'Electricity', color: '#EAB308' },
    { label: 'Road', color: '#78716C' },
  ];

  const statuses = [
    { label: 'Pending', color: '#F59E0B' },
    { label: 'Solved', color: '#10B981' },
    { label: 'Urgent', color: '#DC2626' },
  ];

  const handleCategoryToggle = (category) => {
    if (category === 'All') {
      setSelectedCategories(['All']);
    } else {
      const newCategories = selectedCategories.includes(category)
        ? selectedCategories.filter((c) => c !== category)
        : [...selectedCategories.filter((c) => c !== 'All'), category];
      setSelectedCategories(newCategories.length === 0 ? ['All'] : newCategories);
    }
  };

  const handleStatusToggle = (status) => {
    setSelectedStatuses(
      selectedStatuses.includes(status)
        ? selectedStatuses.filter((s) => s !== status)
        : [...selectedStatuses, status]
    );
  };

  const handleResetAll = () => {
    setSearchQuery('');
    setSelectedCategories(['All']);
    setSelectedDistrict('All Districts');
    setSelectedStatuses([]);
    setSortBy('Most Recent');
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
              sx={{
                fontFamily: 'Inter',
                fontSize: 14,
                fontWeight: 600,
                color: '#2563EB',
                cursor: 'pointer',
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
                borderRadius: 1.5,
                background: '#EEF2FF',
                cursor: 'pointer',
              }}
            >
              <Language sx={{ fontSize: 18, color: '#2563EB' }} />
              <Typography sx={{ fontSize: 13, fontWeight: 600, color: '#2563EB' }}>
                EN
              </Typography>
            </Box>

            <IconButton>
              <Badge badgeContent={1} color="error">
                <Notifications sx={{ color: '#6B7280' }} />
              </Badge>
            </IconButton>

            <Avatar sx={{ width: 36, height: 36, cursor: 'pointer' }}>
              <Person />
            </Avatar>

            <Button
              variant="outlined"
              onClick={() => navigate('/login')}
              sx={{
                textTransform: 'none',
                fontFamily: 'Inter',
                fontSize: 13,
                fontWeight: 600,
                color: '#DC2626',
                borderColor: '#FEE2E2',
                px: 2,
                py: 0.75,
                '&:hover': {
                  borderColor: '#DC2626',
                  background: '#FEF2F2',
                },
              }}
            >
              Log out
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Main Content */}
      <Container maxWidth="xl" sx={{ py: 3 }}>
        {/* Search Bar */}
        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            placeholder="Search issues..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: '#9CA3AF' }} />
                </InputAdornment>
              ),
            }}
            sx={{
              background: 'white',
              borderRadius: 2,
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  border: '1px solid #E5E7EB',
                },
                '&:hover fieldset': {
                  border: '1px solid #D1D5DB',
                },
                '&.Mui-focused fieldset': {
                  border: '2px solid #2563EB',
                },
              },
            }}
          />
        </Box>

        {/* Filters */}
        <Box
          sx={{
            background: 'white',
            borderRadius: 2,
            p: 2,
            mb: 3,
            border: '1px solid #E5E7EB',
          }}
        >
          <Grid container spacing={2} alignItems="center">
            {/* Category Filter */}
            <Grid item>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography sx={{ fontSize: 14, fontWeight: 600, color: '#374151' }}>
                  Category:
                </Typography>
                {categories.map((cat) => (
                  <Chip
                    key={cat.label}
                    label={cat.label}
                    onClick={() => handleCategoryToggle(cat.label)}
                    sx={{
                      background: selectedCategories.includes(cat.label) ? cat.color : 'white',
                      color: selectedCategories.includes(cat.label) ? 'white' : '#6B7280',
                      border: `1px solid ${selectedCategories.includes(cat.label) ? cat.color : '#E5E7EB'}`,
                      fontWeight: 600,
                      fontSize: 13,
                      cursor: 'pointer',
                      '&:hover': {
                        background: selectedCategories.includes(cat.label) ? cat.color : '#F3F4F6',
                      },
                    }}
                  />
                ))}
              </Box>
            </Grid>

            {/* District Filter */}
            <Grid item>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography sx={{ fontSize: 14, fontWeight: 600, color: '#374151' }}>
                  District:
                </Typography>
                <FormControl size="small">
                  <Select
                    value={selectedDistrict}
                    onChange={(e) => setSelectedDistrict(e.target.value)}
                    sx={{
                      fontSize: 13,
                      minWidth: 140,
                      '& .MuiOutlinedInput-notchedOutline': {
                        border: '1px solid #E5E7EB',
                      },
                    }}
                  >
                    <MenuItem value="All Districts">All Districts</MenuItem>
                    <MenuItem value="Colombo">Colombo</MenuItem>
                    <MenuItem value="Gampaha">Gampaha</MenuItem>
                    <MenuItem value="Kandy">Kandy</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid>

            {/* Status Filter */}
            <Grid item>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography sx={{ fontSize: 14, fontWeight: 600, color: '#374151' }}>
                  Status:
                </Typography>
                {statuses.map((status) => (
                  <Chip
                    key={status.label}
                    label={status.label}
                    onClick={() => handleStatusToggle(status.label)}
                    sx={{
                      background: selectedStatuses.includes(status.label) ? status.color : 'white',
                      color: selectedStatuses.includes(status.label) ? 'white' : '#6B7280',
                      border: `1px solid ${selectedStatuses.includes(status.label) ? status.color : '#E5E7EB'}`,
                      fontWeight: 600,
                      fontSize: 13,
                      cursor: 'pointer',
                      '&:hover': {
                        background: selectedStatuses.includes(status.label) ? status.color : '#F3F4F6',
                      },
                    }}
                  />
                ))}
              </Box>
            </Grid>

            <Grid item sx={{ ml: 'auto', display: 'flex', alignItems: 'center', gap: 2 }}>
              {/* Sort By */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography sx={{ fontSize: 14, fontWeight: 600, color: '#374151' }}>
                  Sort by:
                </Typography>
                <FormControl size="small">
                  <Select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    sx={{
                      fontSize: 13,
                      minWidth: 140,
                      '& .MuiOutlinedInput-notchedOutline': {
                        border: '1px solid #E5E7EB',
                      },
                    }}
                  >
                    <MenuItem value="Most Recent">Most Recent</MenuItem>
                    <MenuItem value="Most Verified">Most Verified</MenuItem>
                    <MenuItem value="Most Liked">Most Liked</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              {/* Reset All Button */}
              <Button
                onClick={handleResetAll}
                sx={{
                  textTransform: 'none',
                  fontSize: 13,
                  fontWeight: 600,
                  color: '#6B7280',
                  '&:hover': {
                    background: '#F3F4F6',
                  },
                }}
              >
                Reset All
              </Button>
            </Grid>
          </Grid>
        </Box>

        {/* Issues Grid */}
        <Grid container spacing={3}>
          {issues.map((issue) => (
            <Grid item xs={12} md={6} lg={4} key={issue.id}>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                  cursor: 'pointer',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
                  },
                }}
              >
                <Box sx={{ position: 'relative' }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={issue.image}
                    alt={issue.title}
                  />
                  {issue.morePhotos && (
                    <Chip
                      label={`+${issue.morePhotos} more`}
                      sx={{
                        position: 'absolute',
                        top: 12,
                        right: 12,
                        background: 'rgba(0,0,0,0.7)',
                        color: 'white',
                        fontSize: 11,
                        fontWeight: 600,
                        height: 24,
                      }}
                    />
                  )}
                </Box>

                <CardContent sx={{ p: 2.5 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
                    <Typography
                      sx={{
                        fontFamily: 'Inter',
                        fontWeight: 600,
                        fontSize: 15,
                        color: '#1F2937',
                        lineHeight: 1.4,
                        flex: 1,
                      }}
                    >
                      {issue.title}
                    </Typography>
                    <Chip
                      label={issue.category}
                      sx={{
                        background: issue.categoryColor,
                        color: 'white',
                        fontSize: 10,
                        height: 22,
                        fontWeight: 600,
                        ml: 1,
                      }}
                    />
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
                    <LocationOn sx={{ fontSize: 14, color: '#9CA3AF' }} />
                    <Typography sx={{ fontSize: 12, color: '#6B7280' }}>
                      {issue.location}
                    </Typography>
                  </Box>

                  <Typography sx={{ fontSize: 11, color: '#9CA3AF', mb: 1.5 }}>
                    • {issue.distance}
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: 12,
                      color: '#374151',
                      mb: 1.5,
                      fontWeight: 500,
                    }}
                  >
                    {issue.ministry}
                  </Typography>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <CheckCircle sx={{ fontSize: 14, color: '#10B981' }} />
                      <Typography sx={{ fontSize: 12, fontWeight: 600, color: '#10B981' }}>
                        {issue.verifiedCount} people verified
                      </Typography>
                    </Box>
                    <Chip
                      label={issue.status}
                      sx={{
                        background: issue.statusColor,
                        color: 'white',
                        fontSize: 10,
                        height: 20,
                        fontWeight: 600,
                        ml: 'auto',
                      }}
                    />
                  </Box>

                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      pt: 2,
                      borderTop: '1px solid #F3F4F6',
                    }}
                  >
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <ThumbUpOutlined sx={{ fontSize: 16, color: '#6B7280' }} />
                        <Typography sx={{ fontSize: 13, color: '#6B7280' }}>
                          {issue.likes}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <ChatBubbleOutline sx={{ fontSize: 16, color: '#6B7280' }} />
                        <Typography sx={{ fontSize: 13, color: '#6B7280' }}>
                          {issue.comments}
                        </Typography>
                      </Box>
                    </Box>

                    {issue.tooFar ? (
                      <Button
                        disabled
                        sx={{
                          textTransform: 'none',
                          fontSize: 12,
                          color: '#9CA3AF',
                          fontWeight: 600,
                        }}
                      >
                        Too far
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        sx={{
                          textTransform: 'none',
                          fontSize: 12,
                          background: '#10B981',
                          color: 'white',
                          fontWeight: 600,
                          px: 2,
                          py: 0.5,
                          '&:hover': {
                            background: '#059669',
                          },
                        }}
                      >
                        Verify
                      </Button>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Load More Button */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button
            variant="contained"
            sx={{
              textTransform: 'none',
              fontSize: 14,
              fontWeight: 600,
              background: '#1E40AF',
              color: 'white',
              px: 6,
              py: 1.5,
              borderRadius: 2.5,
              '&:hover': {
                background: '#1E3A8A',
              },
            }}
          >
            Load More Issues
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

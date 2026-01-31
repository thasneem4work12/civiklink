import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  IconButton,
  Card,
  CardContent,
} from '@mui/material';
import {
  ArrowBack,
  Language,
  MyLocation,
  Map,
  CloudUpload,
} from '@mui/icons-material';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import BoltIcon from '@mui/icons-material/Bolt';
import TerrainIcon from '@mui/icons-material/Terrain';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import WarningIcon from '@mui/icons-material/Warning';

export default function PostIssuePage() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    photos: [],
  });

  const categories = [
    { id: 'water', label: 'Water', icon: WaterDropIcon, color: '#0EA5E9' },
    { id: 'electricity', label: 'Electricity', icon: BoltIcon, color: '#F59E0B' },
    { id: 'road', label: 'Road', icon: TerrainIcon, color: '#6B7280' },
    { id: 'sanitation', label: 'Sanitation', icon: CleaningServicesIcon, color: '#10B981' },
    { id: 'emergency', label: 'Emergency', icon: WarningIcon, color: '#EF4444' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCategorySelect = (categoryId) => {
    setFormData({ ...formData, category: categoryId });
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, photos: [...formData.photos, ...files] });
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log('Form data:', formData);
    // Navigate to success page or back
    navigate('/home');
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

          <Typography
            sx={{
              fontFamily: 'Inter',
              fontWeight: 600,
              fontSize: 18,
              color: '#1F2937',
            }}
          >
            Report an Issue
          </Typography>

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
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Card sx={{ boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderRadius: 3 }}>
          <CardContent sx={{ p: 4 }}>
            {/* Issue Title */}
            <Box sx={{ mb: 3 }}>
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: '#1F2937',
                  mb: 1,
                  fontFamily: 'Inter',
                }}
              >
                Issue Title <span style={{ color: '#EF4444' }}>*</span>
              </Typography>
              <TextField
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Ex. Water shortage in Navinma Road"
                fullWidth
                variant="outlined"
                inputProps={{ maxLength: 60 }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    fontSize: 14,
                    '& fieldset': {
                      borderColor: '#E5E7EB',
                    },
                    '&:hover fieldset': {
                      borderColor: '#D1D5DB',
                    },
                  },
                }}
              />
              <Typography
                sx={{
                  fontSize: 12,
                  color: '#9CA3AF',
                  textAlign: 'right',
                  mt: 0.5,
                }}
              >
                {formData.title.length}/60
              </Typography>
            </Box>

            {/* Description */}
            <Box sx={{ mb: 3 }}>
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: '#1F2937',
                  mb: 1,
                  fontFamily: 'Inter',
                }}
              >
                Description <span style={{ color: '#EF4444' }}>*</span>
              </Typography>
              <TextField
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the issue in simple words..."
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    fontSize: 14,
                    '& fieldset': {
                      borderColor: '#E5E7EB',
                    },
                    '&:hover fieldset': {
                      borderColor: '#D1D5DB',
                    },
                  },
                }}
              />
            </Box>

            {/* Tips */}
            <Box
              sx={{
                background: '#EFF6FF',
                borderRadius: 2,
                p: 2,
                mb: 3,
              }}
            >
              <Typography
                sx={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: '#1E40AF',
                  mb: 1,
                  fontFamily: 'Inter',
                }}
              >
                Tips for better reporting:
              </Typography>
              <Box component="ul" sx={{ m: 0, pl: 2.5 }}>
                <Typography
                  component="li"
                  sx={{ fontSize: 12, color: '#1E40AF', mb: 0.5 }}
                >
                  What happened?
                </Typography>
                <Typography
                  component="li"
                  sx={{ fontSize: 12, color: '#1E40AF', mb: 0.5 }}
                >
                  How long has it been?
                </Typography>
                <Typography component="li" sx={{ fontSize: 12, color: '#1E40AF' }}>
                  Who is affected?
                </Typography>
              </Box>
            </Box>

            {/* Upload Photo/Video */}
            <Box sx={{ mb: 3 }}>
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: '#1F2937',
                  mb: 1,
                  fontFamily: 'Inter',
                }}
              >
                Upload Photo / Video
              </Typography>
              <Box
                component="label"
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 180,
                  border: '2px dashed #D1D5DB',
                  borderRadius: 2,
                  background: '#F9FAFB',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  '&:hover': {
                    borderColor: '#2563EB',
                    background: '#F0F9FF',
                  },
                }}
              >
                <input
                  type="file"
                  multiple
                  accept="image/*,video/*"
                  onChange={handleFileUpload}
                  style={{ display: 'none' }}
                />
                <CloudUpload sx={{ fontSize: 48, color: '#9CA3AF', mb: 1 }} />
                <Typography
                  sx={{
                    fontSize: 14,
                    color: '#6B7280',
                    fontWeight: 500,
                  }}
                >
                  Drop files here or click to upload
                </Typography>
                <Typography
                  sx={{
                    fontSize: 12,
                    color: '#9CA3AF',
                    mt: 0.5,
                  }}
                >
                  Photo (JPG/PNG) or Video (max 20 sec) • Max 5 files
                </Typography>
              </Box>
            </Box>

            {/* Category */}
            <Box sx={{ mb: 3 }}>
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: '#1F2937',
                  mb: 1.5,
                  fontFamily: 'Inter',
                }}
              >
                Category <span style={{ color: '#EF4444' }}>*</span>
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  gap: 2,
                  flexWrap: 'wrap',
                }}
              >
                {categories.map((cat) => {
                  const IconComponent = cat.icon;
                  return (
                    <Box
                      key={cat.id}
                      onClick={() => handleCategorySelect(cat.id)}
                      sx={{
                        flex: '1 1 calc(20% - 16px)',
                        minWidth: 100,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 1,
                        py: 2.5,
                        px: 2,
                        border: '2px solid',
                        borderColor:
                          formData.category === cat.id ? cat.color : '#E5E7EB',
                        borderRadius: 2,
                        background:
                          formData.category === cat.id
                            ? `${cat.color}08`
                            : 'white',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        '&:hover': {
                          borderColor: cat.color,
                          background: `${cat.color}08`,
                        },
                      }}
                    >
                      <IconComponent sx={{ fontSize: 32, color: cat.color }} />
                      <Typography
                        sx={{
                          fontSize: 13,
                          fontWeight: 600,
                          color: '#1F2937',
                          fontFamily: 'Inter',
                        }}
                      >
                        {cat.label}
                      </Typography>
                    </Box>
                  );
                })}
              </Box>
            </Box>

            {/* Location */}
            <Box sx={{ mb: 4 }}>
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: '#1F2937',
                  mb: 1.5,
                  fontFamily: 'Inter',
                }}
              >
                Location <span style={{ color: '#EF4444' }}>*</span>
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  startIcon={<MyLocation />}
                  variant="contained"
                  fullWidth
                  sx={{
                    background: '#1E40AF',
                    color: 'white',
                    textTransform: 'none',
                    fontSize: 14,
                    fontWeight: 600,
                    py: 1.5,
                    borderRadius: 2,
                    '&:hover': {
                      background: '#1E3A8A',
                    },
                  }}
                >
                  Use My Location
                </Button>
                <Button
                  startIcon={<Map />}
                  variant="outlined"
                  fullWidth
                  sx={{
                    borderColor: '#1E40AF',
                    color: '#1E40AF',
                    textTransform: 'none',
                    fontSize: 14,
                    fontWeight: 600,
                    py: 1.5,
                    borderRadius: 2,
                    '&:hover': {
                      borderColor: '#1E3A8A',
                      background: '#F0F9FF',
                    },
                  }}
                >
                  Pin on Map
                </Button>
              </Box>
            </Box>

            {/* Submit Button */}
            <Button
              onClick={handleSubmit}
              variant="contained"
              fullWidth
              sx={{
                background: '#1E40AF',
                color: 'white',
                textTransform: 'none',
                fontSize: 16,
                fontWeight: 600,
                py: 1.8,
                borderRadius: 2,
                '&:hover': {
                  background: '#1E3A8A',
                },
              }}
            >
              Submit Issue to CivikLink SL
            </Button>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createIssue } from '../../redux/slices/issueSlice';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
} from '@mui/material';
import {
  ArrowBack,
  WaterDrop,
  Bolt,
  Construction,
  Flood,
  Delete,
  LocationOn,
} from '@mui/icons-material';
import { publicAPI } from '../../services/api';
import toast from 'react-hot-toast';

export default function PostIssuePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.issues);
  
  const [districts, setDistricts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    location: {
      address: '',
      district: '',
      coordinates: [6.9271, 79.8612], // Default to Colombo
    },
    priority: 'medium',
    images: [],
  });

  useEffect(() => {
    // Fetch districts
    publicAPI.getDistricts()
      .then(res => setDistricts(res.data.districts))
      .catch(err => console.error('Failed to fetch districts:', err));
    
    // Fetch categories
    publicAPI.getCategories()
      .then(res => setCategories(res.data.categories))
      .catch(err => console.error('Failed to fetch categories:', err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('location.')) {
      const field = name.split('.')[1];
      setFormData({
        ...formData,
        location: { ...formData.location, [field]: value }
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.title || !formData.description || !formData.category) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (!formData.location.address || !formData.location.district) {
      toast.error('Please provide location details');
      return;
    }

    const result = await dispatch(createIssue(formData));
    if (result.type === 'issues/createIssue/fulfilled') {
      toast.success('Issue reported successfully!');
      navigate('/my-issues');
    } else {
      toast.error(result.payload || 'Failed to create issue');
    }
  };

  const getCategoryIcon = (categoryId) => {
    switch (categoryId) {
      case 'water': return <WaterDrop />;
      case 'electricity': return <Bolt />;
      case 'road': return <Construction />;
      case 'flood': return <Flood />;
      default: return null;
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#F9FAFB' }}>
      {/* Header */}
      <Box sx={{ bgcolor: 'white', borderBottom: '1px solid #E5E7EB', py: 2, px: 4 }}>
        <Container maxWidth="md">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton onClick={() => navigate(-1)}>
              <ArrowBack />
            </IconButton>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              Report an Issue
            </Typography>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="md" sx={{ py: 4 }}>
        <Card>
          <CardContent sx={{ p: 4 }}>
            <Box component="form" onSubmit={handleSubmit}>
              {/* Title */}
              <TextField
                fullWidth
                label="Issue Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                sx={{ mb: 3 }}
                placeholder="Brief description of the issue"
              />

              {/* Description */}
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                multiline
                rows={4}
                sx={{ mb: 3 }}
                placeholder="Provide detailed information about the issue"
              />

              {/* Category Selection */}
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                Category *
              </Typography>
              <Grid container spacing={2} sx={{ mb: 3 }}>
                {categories.map((category) => (
                  <Grid item xs={6} sm={4} key={category.id}>
                    <Card
                      sx={{
                        cursor: 'pointer',
                        border: 2,
                        borderColor: formData.category === category.id ? '#00796B' : 'transparent',
                        bgcolor: formData.category === category.id ? '#E0F2F1' : 'white',
                        '&:hover': { borderColor: '#00796B' },
                      }}
                      onClick={() => setFormData({ ...formData, category: category.id })}
                    >
                      <CardContent sx={{ textAlign: 'center', py: 2 }}>
                        {getCategoryIcon(category.id)}
                        <Typography variant="body2" sx={{ mt: 1 }}>
                          {category.name_en}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>

              {/* Location */}
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                Location *
              </Typography>
              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Address"
                    name="location.address"
                    value={formData.location.address}
                    onChange={handleChange}
                    required
                    placeholder="Street, building, or landmark"
                    InputProps={{
                      startAdornment: <LocationOn sx={{ mr: 1, color: '#6B7280' }} />,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth required>
                    <InputLabel>District</InputLabel>
                    <Select
                      name="location.district"
                      value={formData.location.district}
                      onChange={handleChange}
                      label="District"
                    >
                      {districts.map((district) => (
                        <MenuItem key={district} value={district}>
                          {district}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth required>
                    <InputLabel>Priority</InputLabel>
                    <Select
                      name="priority"
                      value={formData.priority}
                      onChange={handleChange}
                      label="Priority"
                    >
                      <MenuItem value="low">Low</MenuItem>
                      <MenuItem value="medium">Medium</MenuItem>
                      <MenuItem value="high">High</MenuItem>
                      <MenuItem value="critical">Critical</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              {/* Submit Button */}
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 4 }}>
                <Button
                  variant="outlined"
                  onClick={() => navigate(-1)}
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  sx={{ bgcolor: '#00796B', px: 4 }}
                >
                  {loading ? 'Submitting...' : 'Submit Issue'}
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

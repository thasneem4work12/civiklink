import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createIssue } from '../../redux/slices/issueSlice';
import { useNavigate } from 'react-router-dom';
import {
  Container, Paper, Typography, TextField, Button, Box,
  FormControl, InputLabel, Select, MenuItem, Grid
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';

const DISTRICTS = ['Colombo', 'Gampaha', 'Kalutara', 'Kandy', 'Matale', 'Nuwara Eliya', 'Galle', 'Matara', 'Hambantota', 'Jaffna', 'Kilinochchi', 'Mannar', 'Vavuniya', 'Mullaitivu', 'Batticaloa', 'Ampara', 'Trincomalee', 'Kurunegala', 'Puttalam', 'Anuradhapura', 'Polonnaruwa', 'Badulla', 'Moneragala', 'Ratnapura', 'Kegalle'];

export default function PostIssuePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.issues);
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'water',
    district: 'Colombo',
    city: '',
    latitude: '',
    longitude: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const issueData = {
      ...formData,
      location: {
        type: 'Point',
        coordinates: [parseFloat(formData.longitude) || 79.8612, parseFloat(formData.latitude) || 6.9271],
      },
    };

    const result = await dispatch(createIssue(issueData));
    
    if (result.type === 'issues/createIssue/fulfilled') {
      toast.success('Issue posted successfully!');
      navigate('/');
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          {t('postIssue')}
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label={t('issueTitle')}
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label={t('description')}
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                multiline
                rows={4}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel>{t('category')}</InputLabel>
                <Select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  label={t('category')}
                >
                  <MenuItem value="water">{t('water')}</MenuItem>
                  <MenuItem value="electricity">{t('electricity')}</MenuItem>
                  <MenuItem value="road">{t('road')}</MenuItem>
                  <MenuItem value="garbage">{t('garbage')}</MenuItem>
                  <MenuItem value="flood">{t('flood')}</MenuItem>
                  <MenuItem value="drainage">{t('drainage')}</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel>District</InputLabel>
                <Select
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  label="District"
                >
                  {DISTRICTS.map((district) => (
                    <MenuItem key={district} value={district}>{district}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="City/Area"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Latitude"
                name="latitude"
                type="number"
                value={formData.latitude}
                onChange={handleChange}
                placeholder="6.9271"
                inputProps={{ step: 'any' }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Longitude"
                name="longitude"
                type="number"
                value={formData.longitude}
                onChange={handleChange}
                placeholder="79.8612"
                inputProps={{ step: 'any' }}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="caption" color="text.secondary">
                Note: Image upload will be available after Cloudinary configuration
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                size="large"
                disabled={loading}
              >
                {loading ? 'Posting...' : t('submit')}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
}

import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register, clearError } from '../../redux/slices/authSlice';
import { 
  Container, Box, TextField, Button, Typography, Paper, Alert,
  FormControl, InputLabel, Select, MenuItem 
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';

export default function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'citizen',
  });

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }

    const { confirmPassword, ...userData } = formData;
    const result = await dispatch(register(userData));
    
    if (result.type === 'auth/register/fulfilled') {
      toast.success('Registration successful!');
      navigate('/');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
          <Typography variant="h4" align="center" gutterBottom>
            CivikLink SL
          </Typography>
          <Typography variant="h6" align="center" color="text.secondary" gutterBottom>
            {t('register')}
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label={t('fullName')}
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              required
              margin="normal"
            />
            <TextField
              fullWidth
              label={t('email')}
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              margin="normal"
            />
            <TextField
              fullWidth
              label={t('phone')}
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              margin="normal"
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>{t('role')}</InputLabel>
              <Select
                name="role"
                value={formData.role}
                onChange={handleChange}
                label={t('role')}
              >
                <MenuItem value="citizen">{t('citizen')}</MenuItem>
                <MenuItem value="government">{t('government')}</MenuItem>
                <MenuItem value="ngo">{t('ngo')}</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label={t('password')}
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              margin="normal"
            />
            <TextField
              fullWidth
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              margin="normal"
            />
            <Button
              fullWidth
              type="submit"
              variant="contained"
              size="large"
              disabled={loading}
              sx={{ mt: 3 }}
            >
              {loading ? 'Creating account...' : t('register')}
            </Button>

            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Typography variant="body2">
                Already have an account?{' '}
                <Link to="/login" style={{ color: '#1976d2' }}>
                  {t('login')}
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}

import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register, clearError } from '../../redux/slices/authSlice';
import { 
  Box, TextField, Button, Typography, Alert, IconButton, InputAdornment,
  FormControl, InputLabel, Select, MenuItem 
} from '@mui/material';
import { 
  Visibility, VisibilityOff, Security, Speed, Verified, 
  ArrowBack, Language, LockOutlined 
} from '@mui/icons-material';
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

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
    <Box sx={{ 
      height: '100vh',
      overflow: 'hidden',
      background: 'linear-gradient(135deg, #E0F2F1 0%, #B2DFDB 33%, #80CBC4 66%, #4DB6AC 100%)',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Header */}
      <Box
        sx={{
          height: 50,
          background: 'rgba(255, 255, 255, 0.95)',
          borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 4,
        }}
      >
        {/* Logo */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            component="img"
            src="/images/logo.png"
            alt="CivikLink SL"
            sx={{ width: 40, height: 40, objectFit: 'contain' }}
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          <Typography
            sx={{
              fontFamily: 'Inter',
              fontWeight: 700,
              fontSize: 20,
              color: '#1F2937',
            }}
          >
            CivikLink SL
          </Typography>
        </Box>

        {/* Right Actions */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <Button
            startIcon={<Language />}
            sx={{
              color: '#374151',
              textTransform: 'none',
              fontWeight: 500,
            }}
          >
            EN
          </Button>
          <Button
            startIcon={<ArrowBack />}
            onClick={() => navigate('/')}
            sx={{
              color: '#374151',
              textTransform: 'none',
              fontWeight: 500,
            }}
          >
            Back to Home
          </Button>
        </Box>
      </Box>

      {/* Main Content */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2,
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: 1100,
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '24px',
            boxShadow: '0px 20px 40px rgba(0, 0, 0, 0.15)',
            overflow: 'hidden',
            display: 'flex',
          }}
        >
          {/* Left Panel - Illustration */}
          <Box
            sx={{
              width: '45%',
              background: 'linear-gradient(180deg, #E3F2FD 0%, #BBDEFB 100%)',
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography
              sx={{
                fontFamily: 'Inter',
                fontWeight: 700,
                fontSize: 24,
                color: '#1F2937',
                mb: 0.5,
                textAlign: 'center',
              }}
            >
              Secure Digital Identity
            </Typography>
            <Typography
              sx={{
                fontFamily: 'Inter',
                fontWeight: 400,
                fontSize: 13,
                color: '#4B5563',
                mb: 3,
                textAlign: 'center',
              }}
            >
              Your gateway to government services
            </Typography>

            {/* Phone Illustration Placeholder */}
            <Box
              sx={{
                width: 180,
                height: 240,
                background: 'linear-gradient(135deg, #FF9A56 0%, #FF6B35 100%)',
                borderRadius: '30px',
                position: 'relative',
                mb: 3,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0px 20px 40px rgba(255, 107, 53, 0.3)',
              }}
            >
              <Box
                sx={{
                  width: 150,
                  height: 210,
                  background: 'white',
                  borderRadius: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 1,
                }}
              >
                <Security sx={{ fontSize: 50, color: '#0D9488' }} />
                <Typography
                  sx={{
                    fontFamily: 'Inter',
                    fontWeight: 600,
                    fontSize: 11,
                    color: '#374151',
                  }}
                >
                  VERIFIED
                </Typography>
                <Box
                  sx={{
                    width: 80,
                    height: 30,
                    background: '#000',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Box
                    sx={{
                      width: '80%',
                      height: '60%',
                      background: 'repeating-linear-gradient(90deg, white 0, white 2px, transparent 2px, transparent 4px)',
                    }}
                  />
                </Box>
              </Box>
            </Box>

            {/* Features */}
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <Box sx={{ textAlign: 'center' }}>
                <Box
                  sx={{
                    width: 42,
                    height: 42,
                    background: 'white',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 0.5,
                    mx: 'auto',
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <Security sx={{ fontSize: 22, color: '#6B7280' }} />
                </Box>
                <Typography
                  sx={{
                    fontFamily: 'Inter',
                    fontWeight: 600,
                    fontSize: 11,
                    color: '#1F2937',
                  }}
                >
                  Secure
                </Typography>
              </Box>

              <Box sx={{ textAlign: 'center' }}>
                <Box
                  sx={{
                    width: 42,
                    height: 42,
                    background: 'white',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 0.5,
                    mx: 'auto',
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <Speed sx={{ fontSize: 22, color: '#0D9488' }} />
                </Box>
                <Typography
                  sx={{
                    fontFamily: 'Inter',
                    fontWeight: 600,
                    fontSize: 11,
                    color: '#1F2937',
                  }}
                >
                  Fast
                </Typography>
              </Box>

              <Box sx={{ textAlign: 'center' }}>
                <Box
                  sx={{
                    width: 42,
                    height: 42,
                    background: 'white',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 0.5,
                    mx: 'auto',
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <Verified sx={{ fontSize: 22, color: '#2563EB' }} />
                </Box>
                <Typography
                  sx={{
                    fontFamily: 'Inter',
                    fontWeight: 600,
                    fontSize: 11,
                    color: '#1F2937',
                  }}
                >
                  Verified
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Right Panel - Register Form */}
          <Box
            sx={{
              width: '55%',
              p: 3,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5, textAlign: 'center' }}>
              Complete your profile
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ mb: 2.5, textAlign: 'center', display: 'block' }}>
              Please enter following detail to set up your account
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 2, borderRadius: 2, py: 0.5 }}>
                {error}
              </Alert>
            )}

          <Box component="form" onSubmit={handleSubmit}>
            <Typography variant="caption" sx={{ mb: 0.5, fontWeight: 500, display: 'block' }}>
              Full Name
            </Typography>
            <TextField
              fullWidth
              size="small"
              name="full_name"
              placeholder="eg: Perera Silva"
              value={formData.full_name}
              onChange={handleChange}
              required
              sx={{ mb: 1.5 }}
              inputProps={{ style: { fontSize: 13 } }}
            />

            <Typography variant="caption" sx={{ mb: 0.5, fontWeight: 500, display: 'block' }}>
              Email
            </Typography>
            <TextField
              fullWidth
              size="small"
              name="email"
              type="email"
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              sx={{ mb: 1.5 }}
              inputProps={{ style: { fontSize: 13 } }}
            />

            <Typography variant="caption" sx={{ mb: 0.5, fontWeight: 500, display: 'block' }}>
              Phone Number
            </Typography>
            <TextField
              fullWidth
              size="small"
              name="phone"
              placeholder="+94 77 123 4567"
              value={formData.phone}
              onChange={handleChange}
              sx={{ mb: 1.5 }}
              inputProps={{ style: { fontSize: 13 } }}
            />

            <Typography variant="caption" sx={{ mb: 0.5, fontWeight: 500, display: 'block' }}>
              Role
            </Typography>
            <FormControl fullWidth size="small" sx={{ mb: 1.5 }}>
              <Select
                name="role"
                value={formData.role}
                onChange={handleChange}
                displayEmpty
                sx={{ fontSize: 13 }}
              >
                <MenuItem value="citizen" sx={{ fontSize: 13 }}>Citizen</MenuItem>
                <MenuItem value="government" sx={{ fontSize: 13 }}>Government Official</MenuItem>
                <MenuItem value="ngo" sx={{ fontSize: 13 }}>NGO Representative</MenuItem>
              </Select>
            </FormControl>

            <Typography variant="caption" sx={{ mb: 0.5, fontWeight: 500, display: 'block' }}>
              Create Password
            </Typography>
            <TextField
              fullWidth
              size="small"
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              sx={{ mb: 1.5 }}
              inputProps={{ style: { fontSize: 13 } }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlined sx={{ fontSize: 18, color: '#999' }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      size="small"
                    >
                      {showPassword ? <VisibilityOff sx={{ fontSize: 18 }} /> : <Visibility sx={{ fontSize: 18 }} />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />

            <Typography variant="caption" sx={{ mb: 0.5, fontWeight: 500, display: 'block' }}>
              Confirm Password
            </Typography>
            <TextField
              fullWidth
              size="small"
              name="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              sx={{ mb: 2 }}
              inputProps={{ style: { fontSize: 13 } }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlined sx={{ fontSize: 18, color: '#999' }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      edge="end"
                      size="small"
                    >
                      {showConfirmPassword ? <VisibilityOff sx={{ fontSize: 18 }} /> : <Visibility sx={{ fontSize: 18 }} />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              disabled={loading}
              sx={{ 
                py: 1,
                borderRadius: 2,
                textTransform: 'none',
                fontSize: 14,
                fontWeight: 600,
                bgcolor: '#2563eb',
                '&:hover': {
                  bgcolor: '#1d4ed8',
                },
                boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)',
              }}
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </Button>

            <Box sx={{ mt: 1.5, textAlign: 'center' }}>
              <Typography variant="caption" color="text.secondary">
                Already have an account?{' '}
                <Link to="/login" style={{ color: '#2563eb', textDecoration: 'none', fontWeight: 600, fontSize: 12 }}>
                  Sign In
                </Link>
              </Typography>
            </Box>
          </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

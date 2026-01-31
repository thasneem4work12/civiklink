import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, clearError } from '../../redux/slices/authSlice';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Alert, 
  Checkbox, 
  FormControlLabel,
  IconButton,
  InputAdornment,
  Tabs,
  Tab
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import LanguageIcon from '@mui/icons-material/Language';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import SecurityIcon from '@mui/icons-material/Security';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(login(formData));
    if (result.type === 'auth/login/fulfilled') {
      toast.success('Login successful!');
      navigate('/');
    }
  };

  return (
    <Box
      sx={{
        height: '100vh',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #E0F2F1 0%, #B2DFDB 33%, #80CBC4 66%, #4DB6AC 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      {/* Decorative circles */}
      <Box
        sx={{
          position: 'absolute',
          top: -100,
          right: -100,
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: -150,
          left: -150,
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
        }}
      />

      {/* Main Card */}
      <Box
        sx={{
          width: '100%',
          maxWidth: 900,
          mx: 2,
          background: 'rgba(255, 255, 255, 0.98)',
          borderRadius: '32px',
          boxShadow: '0px 30px 60px rgba(0, 0, 0, 0.2)',
          overflow: 'hidden',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Top Navigation Bar */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 4,
            py: 2.5,
            borderBottom: '1px solid #E5E7EB',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box
              component="img"
              src="/images/logo.png"
              alt="CivikLink SL"
              sx={{ width: 32, height: 32, objectFit: 'contain' }}
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

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton size="small" sx={{ color: '#6B7280' }}>
              <LanguageIcon fontSize="small" />
            </IconButton>
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate('/')}
              size="small"
              sx={{
                color: '#6B7280',
                textTransform: 'none',
                fontSize: 13,
              }}
            >
              Home
            </Button>
          </Box>
        </Box>

        {/* Content Area */}
        <Box sx={{ display: 'flex', minHeight: 480 }}>
          {/* Left Section - Branding */}
          <Box
            sx={{
              flex: 1,
              background: 'linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)',
              p: 5,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
            }}
          >
            {/* Welcome Message */}
            <Box sx={{ mb: 4, textAlign: 'center' }}>
              <Typography
                sx={{
                  fontFamily: 'Inter',
                  fontWeight: 800,
                  fontSize: 28,
                  color: '#1F2937',
                  mb: 1,
                  letterSpacing: '-0.5px',
                }}
              >
                Welcome Back!
              </Typography>
              <Typography
                sx={{
                  fontFamily: 'Inter',
                  fontWeight: 400,
                  fontSize: 14,
                  color: '#6B7280',
                  lineHeight: 1.6,
                }}
              >
                Sign in to access your account and<br />continue making a difference
              </Typography>
            </Box>

            {/* Illustration */}
            <Box
              sx={{
                width: 200,
                height: 200,
                background: 'linear-gradient(135deg, #FF9A56 0%, #FF6B35 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0px 20px 50px rgba(255, 107, 53, 0.35)',
                mb: 4,
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  width: '120%',
                  height: '120%',
                  borderRadius: '50%',
                  border: '2px dashed rgba(255, 154, 86, 0.3)',
                },
              }}
            >
              <LockIcon sx={{ fontSize: 80, color: 'white' }} />
            </Box>

            {/* Stats */}
            <Box sx={{ display: 'flex', gap: 4, mt: 2 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography
                  sx={{
                    fontFamily: 'Inter',
                    fontWeight: 700,
                    fontSize: 24,
                    color: '#2563EB',
                  }}
                >
                  100%
                </Typography>
                <Typography
                  sx={{
                    fontFamily: 'Inter',
                    fontSize: 11,
                    color: '#6B7280',
                  }}
                >
                  Secure
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography
                  sx={{
                    fontFamily: 'Inter',
                    fontWeight: 700,
                    fontSize: 24,
                    color: '#0D9488',
                  }}
                >
                  24/7
                </Typography>
                <Typography
                  sx={{
                    fontFamily: 'Inter',
                    fontSize: 11,
                    color: '#6B7280',
                  }}
                >
                  Available
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography
                  sx={{
                    fontFamily: 'Inter',
                    fontWeight: 700,
                    fontSize: 24,
                    color: '#FF6B35',
                  }}
                >
                  Fast
                </Typography>
                <Typography
                  sx={{
                    fontFamily: 'Inter',
                    fontSize: 11,
                    color: '#6B7280',
                  }}
                >
                  Response
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Right Section - Login Form */}
          <Box
            sx={{
              flex: 1,
              p: 5,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <Box sx={{ maxWidth: 400, mx: 'auto', width: '100%' }}>
              {/* Title */}
              <Typography
                sx={{
                  fontFamily: 'Inter',
                  fontWeight: 700,
                  fontSize: 26,
                  color: '#1F2937',
                  mb: 1,
                }}
              >
                Sign In
              </Typography>
              <Typography
                sx={{
                  fontFamily: 'Inter',
                  fontSize: 14,
                  color: '#6B7280',
                  mb: 3,
                }}
              >
                Enter your credentials to access your account
              </Typography>

              {error && (
                <Alert severity="error" sx={{ mb: 2, borderRadius: 2, fontSize: 13 }}>
                  {error}
                </Alert>
              )}

              <Box component="form" onSubmit={handleSubmit}>
                {/* Email Field */}
                <Typography
                  variant="caption"
                  sx={{
                    fontFamily: 'Inter',
                    fontWeight: 600,
                    fontSize: 13,
                    color: '#374151',
                    mb: 0.5,
                    display: 'block',
                  }}
                >
                  Email Address
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  name="email"
                  type="text"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  sx={{ mb: 2 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon sx={{ color: '#9CA3AF', fontSize: 18 }} />
                      </InputAdornment>
                    ),
                    sx: {
                      fontFamily: 'Inter',
                      fontSize: 13,
                      backgroundColor: '#F9FAFB',
                      borderRadius: 2,
                      '& fieldset': { border: '1.5px solid #E5E7EB' },
                      '&:hover fieldset': { border: '1.5px solid #D1D5DB' },
                      '&.Mui-focused fieldset': { border: '1.5px solid #2563EB' },
                    },
                  }}
                />

                {/* Password Field */}
                <Typography
                  variant="caption"
                  sx={{
                    fontFamily: 'Inter',
                    fontWeight: 600,
                    fontSize: 13,
                    color: '#374151',
                    mb: 0.5,
                    display: 'block',
                  }}
                >
                  Password
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
                  sx={{ mb: 2 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon sx={{ color: '#9CA3AF', fontSize: 18 }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                          size="small"
                        >
                          {showPassword ? (
                            <VisibilityOffIcon sx={{ fontSize: 18 }} />
                          ) : (
                            <VisibilityIcon sx={{ fontSize: 18 }} />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                    sx: {
                      fontFamily: 'Inter',
                      fontSize: 13,
                      backgroundColor: '#F9FAFB',
                      borderRadius: 2,
                      '& fieldset': { border: '1.5px solid #E5E7EB' },
                      '&:hover fieldset': { border: '1.5px solid #D1D5DB' },
                      '&.Mui-focused fieldset': { border: '1.5px solid #2563EB' },
                    },
                  }}
                />

                {/* Remember & Forgot */}
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 3,
                  }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        size="small"
                        sx={{
                          color: '#0D9488',
                          '&.Mui-checked': { color: '#0D9488' },
                        }}
                      />
                    }
                    label={
                      <Typography
                        sx={{
                          fontFamily: 'Inter',
                          fontSize: 13,
                          color: '#6B7280',
                        }}
                      >
                        Remember me
                      </Typography>
                    }
                  />
                  <Link
                    to="/forgot-password"
                    style={{
                      fontFamily: 'Inter',
                      fontSize: 13,
                      color: '#2563EB',
                      textDecoration: 'none',
                      fontWeight: 600,
                    }}
                  >
                    Forgot Password?
                  </Link>
                </Box>

                {/* Login Button */}
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  sx={{
                    height: 44,
                    py: 1.5,
                    background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
                    borderRadius: 2.5,
                    fontFamily: 'Inter',
                    fontWeight: 600,
                    fontSize: 14,
                    textTransform: 'none',
                    mb: 2.5,
                    boxShadow: '0 4px 14px rgba(37, 99, 235, 0.4)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #1D4ED8 0%, #1E40AF 100%)',
                      boxShadow: '0 6px 20px rgba(37, 99, 235, 0.5)',
                    },
                  }}
                >
                  {loading ? 'Signing in...' : 'Sign In'}
                </Button>

                {/* Divider */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2.5 }}>
                  <Box sx={{ flex: 1, height: '1px', bgcolor: '#E5E7EB' }} />
                  <Typography sx={{ px: 2, fontSize: 12, color: '#9CA3AF' }}>
                    OR
                  </Typography>
                  <Box sx={{ flex: 1, height: '1px', bgcolor: '#E5E7EB' }} />
                </Box>

                {/* Register Link */}
                <Box sx={{ textAlign: 'center' }}>
                  <Typography
                    sx={{
                      fontFamily: 'Inter',
                      fontSize: 13,
                      color: '#6B7280',
                    }}
                  >
                    Don't have an account?{' '}
                    <Link
                      to="/register"
                      style={{
                        color: '#2563EB',
                        textDecoration: 'none',
                        fontWeight: 600,
                      }}
                    >
                      Create Account
                    </Link>
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

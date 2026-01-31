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
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #E0F2F1 0%, #B2DFDB 33%, #80CBC4 66%, #4DB6AC 100%)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header */}
      <Box
        sx={{
          height: 60,
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
            startIcon={<LanguageIcon />}
            sx={{
              color: '#374151',
              textTransform: 'none',
              fontWeight: 500,
            }}
          >
            EN
          </Button>
          <Button
            startIcon={<ArrowBackIcon />}
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
          p: 4,
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
              p: 6,
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
                fontSize: 32,
                color: '#1F2937',
                mb: 1,
                textAlign: 'center',
              }}
            >
              Secure Digital Identity
            </Typography>
            <Typography
              sx={{
                fontFamily: 'Inter',
                fontWeight: 400,
                fontSize: 16,
                color: '#4B5563',
                mb: 6,
                textAlign: 'center',
              }}
            >
              Your gateway to government services
            </Typography>

            {/* Phone Illustration Placeholder */}
            <Box
              sx={{
                width: 240,
                height: 320,
                background: 'linear-gradient(135deg, #FF9A56 0%, #FF6B35 100%)',
                borderRadius: '30px',
                position: 'relative',
                mb: 6,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0px 20px 40px rgba(255, 107, 53, 0.3)',
              }}
            >
              <Box
                sx={{
                  width: 200,
                  height: 280,
                  background: 'white',
                  borderRadius: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 2,
                }}
              >
                <SecurityIcon sx={{ fontSize: 80, color: '#0D9488' }} />
                <Typography
                  sx={{
                    fontFamily: 'Inter',
                    fontWeight: 600,
                    fontSize: 14,
                    color: '#374151',
                  }}
                >
                  VERIFIED
                </Typography>
                <Box
                  sx={{
                    width: 120,
                    height: 40,
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
            <Box sx={{ display: 'flex', gap: 4, alignItems: 'center' }}>
              <Box sx={{ textAlign: 'center' }}>
                <Box
                  sx={{
                    width: 64,
                    height: 64,
                    background: 'white',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 1,
                    mx: 'auto',
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <SecurityIcon sx={{ fontSize: 32, color: '#6B7280' }} />
                </Box>
                <Typography
                  sx={{
                    fontFamily: 'Inter',
                    fontWeight: 600,
                    fontSize: 14,
                    color: '#1F2937',
                  }}
                >
                  Secure
                </Typography>
              </Box>

              <Box sx={{ textAlign: 'center' }}>
                <Box
                  sx={{
                    width: 64,
                    height: 64,
                    background: 'white',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 1,
                    mx: 'auto',
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <FlashOnIcon sx={{ fontSize: 32, color: '#0D9488' }} />
                </Box>
                <Typography
                  sx={{
                    fontFamily: 'Inter',
                    fontWeight: 600,
                    fontSize: 14,
                    color: '#1F2937',
                  }}
                >
                  Fast
                </Typography>
              </Box>

              <Box sx={{ textAlign: 'center' }}>
                <Box
                  sx={{
                    width: 64,
                    height: 64,
                    background: 'white',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 1,
                    mx: 'auto',
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <VerifiedUserIcon sx={{ fontSize: 32, color: '#2563EB' }} />
                </Box>
                <Typography
                  sx={{
                    fontFamily: 'Inter',
                    fontWeight: 600,
                    fontSize: 14,
                    color: '#1F2937',
                  }}
                >
                  Verified
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Right Panel - Login Form */}
          <Box
            sx={{
              width: '55%',
              p: 6,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Tabs */}
            <Tabs
              value={activeTab}
              onChange={(e, newValue) => setActiveTab(newValue)}
              sx={{
                mb: 4,
                '& .MuiTab-root': {
                  fontFamily: 'Inter',
                  fontWeight: 600,
                  fontSize: 16,
                  textTransform: 'none',
                  minWidth: 120,
                },
                '& .Mui-selected': {
                  color: '#0D9488',
                },
                '& .MuiTabs-indicator': {
                  backgroundColor: '#0D9488',
                },
              }}
            >
              <Tab label="Login" />
              <Tab label="Register" onClick={() => navigate('/register')} />
            </Tabs>

            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit}>
              {/* Email or Mobile Number */}
              <Typography
                sx={{
                  fontFamily: 'Inter',
                  fontWeight: 500,
                  fontSize: 14,
                  color: '#374151',
                  mb: 1,
                }}
              >
                Email or Mobile Number
              </Typography>
              <TextField
                fullWidth
                name="email"
                type="text"
                placeholder="Enter email or mobile number"
                value={formData.email}
                onChange={handleChange}
                required
                sx={{ mb: 3 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon sx={{ color: '#9CA3AF' }} />
                    </InputAdornment>
                  ),
                  sx: {
                    fontFamily: 'Inter',
                    backgroundColor: '#F9FAFB',
                    '& fieldset': { border: '1px solid #E5E7EB' },
                  },
                }}
              />

              {/* Password */}
              <Typography
                sx={{
                  fontFamily: 'Inter',
                  fontWeight: 500,
                  fontSize: 14,
                  color: '#374151',
                  mb: 1,
                }}
              >
                Password
              </Typography>
              <TextField
                fullWidth
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
                      <LockIcon sx={{ color: '#9CA3AF' }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                  sx: {
                    fontFamily: 'Inter',
                    backgroundColor: '#F9FAFB',
                    '& fieldset': { border: '1px solid #E5E7EB' },
                  },
                }}
              />

              {/* Remember Me & Forgot Password */}
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
                        fontSize: 14,
                        color: '#374151',
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
                    fontSize: 14,
                    color: '#2563EB',
                    textDecoration: 'none',
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
                  height: 48,
                  background: '#2563EB',
                  borderRadius: '8px',
                  fontFamily: 'Inter',
                  fontWeight: 600,
                  fontSize: 16,
                  textTransform: 'none',
                  mb: 3,
                  '&:hover': {
                    background: '#1D4ED8',
                  },
                }}
              >
                {loading ? 'Loading...' : 'Login'}
              </Button>

              {/* Register Link */}
              <Box sx={{ textAlign: 'center' }}>
                <Typography
                  sx={{
                    fontFamily: 'Inter',
                    fontSize: 14,
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
                    Register now →
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

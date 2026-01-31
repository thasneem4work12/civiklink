import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register, clearError } from '../../redux/slices/authSlice';
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  InputAdornment,
  IconButton,
} from '@mui/material';
import {
  Lock,
  Visibility,
  VisibilityOff,
  Person,
  Email,
  Phone,
  Work,
  CheckCircle,
} from '@mui/icons-material';
import toast from 'react-hot-toast';

export default function CompleteProfilePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  // Get contact info from previous page
  const contactInfo = location.state?.contactInfo || '';
  const contactType = location.state?.contactType || 'mobile';

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    email: contactType === 'email' ? contactInfo : '',
    phone: contactType === 'mobile' ? contactInfo : '',
    role: 'citizen',
    password: '',
    confirmPassword: '',
  });

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    // Prepare data for registration
    const registrationData = {
      full_name: formData.full_name,
      email: formData.email,
      phone: formData.phone,
      role: formData.role,
      password: formData.password,
    };

    try {
      await dispatch(register(registrationData)).unwrap();
      toast.success('Account created successfully!');
      navigate('/home');
    } catch (err) {
      toast.error(err || 'Registration failed');
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
          height: '90vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Top Navigation Bar */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 4,
            py: 2,
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
            {/* Progress Steps */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Box sx={{ width: 24, height: 24, borderRadius: '50%', background: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <CheckCircle sx={{ fontSize: 14, color: 'white' }} />
                </Box>
                <Box sx={{ width: 20, height: 2, background: '#10B981' }} />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Box sx={{ width: 24, height: 24, borderRadius: '50%', background: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <CheckCircle sx={{ fontSize: 14, color: 'white' }} />
                </Box>
                <Box sx={{ width: 20, height: 2, background: '#2563EB' }} />
              </Box>
              <Box sx={{ width: 24, height: 24, borderRadius: '50%', background: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: 'white' }}>
                3
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Content Area with Split Layout */}
        <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
          {/* Left Panel - Welcome Message */}
          <Box
            sx={{
              width: '40%',
              background: 'linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)',
              p: 4,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Decorative Elements */}
            <Box
              sx={{
                position: 'absolute',
                top: -30,
                right: -30,
                width: 150,
                height: 150,
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.1)',
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                bottom: -40,
                left: -40,
                width: 180,
                height: 180,
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.08)',
              }}
            />

            {/* Icon */}
            <Box
              sx={{
                width: 100,
                height: 100,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 3,
                boxShadow: '0 12px 30px rgba(37, 99, 235, 0.4)',
                position: 'relative',
                zIndex: 1,
              }}
            >
              <Person sx={{ fontSize: 50, color: 'white' }} />
            </Box>

            {/* Welcome Text */}
            <Typography
              sx={{
                fontFamily: 'Inter',
                fontWeight: 800,
                fontSize: 24,
                color: '#1F2937',
                mb: 1.5,
                textAlign: 'center',
                letterSpacing: '-0.5px',
                position: 'relative',
                zIndex: 1,
              }}
            >
              Almost There!
            </Typography>
            <Typography
              sx={{
                fontFamily: 'Inter',
                fontSize: 13,
                color: '#6B7280',
                textAlign: 'center',
                lineHeight: 1.6,
                mb: 3,
                position: 'relative',
                zIndex: 1,
              }}
            >
              Complete your profile to start reporting issues and making a difference in your community
            </Typography>

            {/* Feature List */}
            <Box sx={{ width: '100%', maxWidth: 280, position: 'relative', zIndex: 1 }}>
              {[
                { text: 'Report civic issues' },
                { text: 'Track your submissions' },
                { text: 'Connect with officials' },
              ].map((item, index) => (
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
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      background: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                    }}
                  >
                    <CheckCircle sx={{ fontSize: 18, color: '#10B981' }} />
                  </Box>
                  <Typography
                    sx={{
                      fontFamily: 'Inter',
                      fontSize: 13,
                      fontWeight: 500,
                      color: '#374151',
                    }}
                  >
                    {item.text}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Right Panel - Form */}
          <Box
            sx={{
              width: '60%',
              p: 2.5,
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              '&::-webkit-scrollbar': {
                width: '6px',
              },
              '&::-webkit-scrollbar-track': {
                background: '#F3F4F6',
              },
              '&::-webkit-scrollbar-thumb': {
                background: '#D1D5DB',
                borderRadius: '3px',
              },
            }}
          >
            {/* Form Title */}
            <Typography
              sx={{
                fontFamily: 'Inter',
                fontWeight: 700,
                fontSize: 17,
                color: '#1F2937',
                mb: 0.25,
              }}
            >
              Your Information
            </Typography>
            <Typography
              sx={{
                fontFamily: 'Inter',
                fontSize: 11,
                color: '#6B7280',
                mb: 1.5,
              }}
            >
              Please fill in your details to complete registration
            </Typography>
            {error && (
              <Alert severity="error" sx={{ mb: 1.5, borderRadius: 2, fontSize: 11, py: 0.5 }}>
                {error}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit}>
              {/* Full Name */}
              <Box sx={{ mb: 1.5 }}>
                <Typography
                  sx={{
                    fontFamily: 'Inter',
                    fontSize: 12,
                    fontWeight: 600,
                    color: '#1F2937',
                    mb: 0.5,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                  }}
                >
                  <Person sx={{ fontSize: 14, color: '#6B7280' }} />
                  Full Name
                </Typography>
                <TextField
                  fullWidth
                  name="full_name"
                  placeholder="eg: Perera Silva"
                value={formData.full_name}
                onChange={handleChange}
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#F9FAFB',
                    borderRadius: 2,
                    '& fieldset': {
                      border: '1.5px solid #E5E7EB',
                    },
                    '&:hover fieldset': {
                      border: '1.5px solid #2563EB',
                    },
                    '&.Mui-focused fieldset': {
                      border: '2px solid #2563EB',
                    },
                  },
                  '& input': {
                    fontFamily: 'Inter',
                    fontSize: 13,
                    py: 1,
                  },
                }}
              />
            </Box>

              {/* Email */}
              <Box sx={{ mb: 1.5 }}>
                <Typography
                  sx={{
                    fontFamily: 'Inter',
                    fontSize: 12,
                    fontWeight: 600,
                    color: '#1F2937',
                    mb: 0.5,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                  }}
                >
                  <Email sx={{ fontSize: 14, color: '#6B7280' }} />
                  Email Address
                </Typography>
                <TextField
                  fullWidth
                  name="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={contactType === 'email'}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: contactType === 'email' ? '#F3F4F6' : '#F9FAFB',
                      borderRadius: 2,
                      '& fieldset': {
                        border: '1.5px solid #E5E7EB',
                      },
                      '&:hover fieldset': {
                        border: contactType === 'email' ? '1.5px solid #E5E7EB' : '1.5px solid #2563EB',
                      },
                      '&.Mui-focused fieldset': {
                        border: '2px solid #2563EB',
                      },
                    },
                    '& input': {
                      fontFamily: 'Inter',
                      fontSize: 13,
                      py: 1,
                      px: 1.5,
                    },
                  }}
                />
              </Box>

              {/* Phone Number */}
              <Box sx={{ mb: 1.5 }}>
                <Typography
                  sx={{
                    fontFamily: 'Inter',
                    fontSize: 12,
                    fontWeight: 600,
                    color: '#1F2937',
                    mb: 0.5,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                  }}
                >
                  <Phone sx={{ fontSize: 14, color: '#6B7280' }} />
                  Phone Number
                </Typography>
              <TextField
                fullWidth
                name="phone"
                type="tel"
                placeholder="+94 77 123 4567"
                value={formData.phone}
                onChange={handleChange}
                required
                disabled={contactType === 'mobile'}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: contactType === 'mobile' ? '#F3F4F6' : '#F9FAFB',
                    borderRadius: 2,
                    '& fieldset': {
                      border: '1.5px solid #E5E7EB',
                    },
                    '&:hover fieldset': {
                      border: contactType === 'mobile' ? '1.5px solid #E5E7EB' : '1.5px solid #2563EB',
                    },
                    '&.Mui-focused fieldset': {
                      border: '2px solid #2563EB',
                    },
                  },
                  '& input': {
                    fontFamily: 'Inter',
                    fontSize: 13,
                    py: 1,
                    px: 1.5,
                  },
                }}
              />
            </Box>

            {/* Role */}
            <Box sx={{ mb: 1.5 }}>
              <Typography
                sx={{
                  fontFamily: 'Inter',
                  fontSize: 12,
                  fontWeight: 600,
                  color: '#1F2937',
                  mb: 0.5,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                }}
              >
                <Work sx={{ fontSize: 14, color: '#6B7280' }} />
                Role
              </Typography>
              <FormControl fullWidth>
                <Select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  displayEmpty
                  sx={{
                    backgroundColor: '#F9FAFB',
                    borderRadius: 2,
                    fontFamily: 'Inter',
                    fontSize: 13,
                    '& .MuiOutlinedInput-notchedOutline': {
                      border: '1.5px solid #E5E7EB',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      border: '1.5px solid #2563EB',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      border: '2px solid #2563EB',
                    },
                    '& .MuiSelect-select': {
                      py: 1,
                    },
                  }}
                >
                  <MenuItem value="citizen">Citizen</MenuItem>
                  <MenuItem value="government">Government Official</MenuItem>
                  <MenuItem value="ngo">NGO Representative</MenuItem>
                </Select>
              </FormControl>
            </Box>

            {/* Create Password */}
            <Box sx={{ mb: 1.5 }}>
              <Typography
                sx={{
                  fontFamily: 'Inter',
                  fontSize: 12,
                  fontWeight: 600,
                  color: '#1F2937',
                  mb: 0.5,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                }}
              >
                <Lock sx={{ fontSize: 14, color: '#6B7280' }} />
                Create Password
              </Typography>
              <TextField
                fullWidth
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        sx={{ color: '#9CA3AF', p: 0.5 }}
                      >
                        {showPassword ? <VisibilityOff sx={{ fontSize: 18 }} /> : <Visibility sx={{ fontSize: 18 }} />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#F9FAFB',
                    borderRadius: 2,
                    '& fieldset': {
                      border: '1.5px solid #E5E7EB',
                    },
                    '&:hover fieldset': {
                      border: '1.5px solid #2563EB',
                    },
                    '&.Mui-focused fieldset': {
                      border: '2px solid #2563EB',
                    },
                  },
                  '& input': {
                    fontFamily: 'Inter',
                    fontSize: 13,
                    py: 1,
                    px: 1.5,
                  },
                }}
              />
            </Box>

            {/* Confirm Password */}
            <Box sx={{ mb: 1.5 }}>
              <Typography
                sx={{
                  fontFamily: 'Inter',
                  fontSize: 12,
                  fontWeight: 600,
                  color: '#1F2937',
                  mb: 0.5,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                }}
              >
                <Lock sx={{ fontSize: 14, color: '#6B7280' }} />
                Confirm Password
              </Typography>
              <TextField
                fullWidth
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Re-enter your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        edge="end"
                        sx={{ color: '#9CA3AF', p: 0.5 }}
                      >
                        {showConfirmPassword ? <VisibilityOff sx={{ fontSize: 18 }} /> : <Visibility sx={{ fontSize: 18 }} />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#F9FAFB',
                    borderRadius: 2,
                    '& fieldset': {
                      border: '1.5px solid #E5E7EB',
                    },
                    '&:hover fieldset': {
                      border: '1.5px solid #2563EB',
                    },
                    '&.Mui-focused fieldset': {
                      border: '2px solid #2563EB',
                    },
                  },
                  '& input': {
                    fontFamily: 'Inter',
                    fontSize: 13,
                    py: 1,
                    px: 1.5,
                  },
                }}
              />
            </Box>

            {/* Create Account Button */}
            <Button
              fullWidth
              type="submit"
              variant="contained"
              disabled={loading}
              sx={{
                height: 42,
                background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
                borderRadius: 2.5,
                fontFamily: 'Inter',
                fontWeight: 600,
                fontSize: 14,
                textTransform: 'none',
                mb: 1.5,
                boxShadow: '0 6px 20px rgba(37, 99, 235, 0.4)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #1D4ED8 0%, #1E40AF 100%)',
                  boxShadow: '0 8px 25px rgba(37, 99, 235, 0.5)',
                  transform: 'translateY(-1px)',
                },
                transition: 'all 0.2s ease-in-out',
              }}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </Button>

            {/* Sign In Link */}
            <Box sx={{ textAlign: 'center' }}>
              <Typography
                sx={{
                  fontFamily: 'Inter',
                  fontSize: 12,
                  color: '#6B7280',
                }}
              >
                Already have an account?{' '}
                <Link
                  to="/login"
                  style={{
                    color: '#2563EB',
                    textDecoration: 'none',
                    fontWeight: 600,
                  }}
                >
                  Sign in
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

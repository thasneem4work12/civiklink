import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register, clearError } from '../../redux/slices/authSlice';
import { 
  Box, TextField, Button, Typography, Alert, IconButton, InputAdornment
} from '@mui/material';
import { 
  Security, Speed, Verified, Phone, Email, Lock
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';

export default function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const { t } = useTranslation();

  const [useEmail, setUseEmail] = useState(false);
  const [formData, setFormData] = useState({
    mobile: '',
    email: '',
  });

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    
    const contactValue = useEmail ? formData.email : formData.mobile;
    if (!contactValue) {
      toast.error('Please enter your contact information');
      return;
    }

    // TODO: Implement actual OTP sending logic
    toast.success('OTP sent successfully!');
    
    // Navigate to OTP verification page
    navigate('/verify-otp', {
      state: {
        contactInfo: contactValue,
        contactType: useEmail ? 'email' : 'mobile',
      },
    });
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
            <Button
              onClick={() => navigate('/')}
              size="small"
              sx={{
                color: '#6B7280',
                textTransform: 'none',
                fontSize: 13,
              }}
            >
              ← Back to Home
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
            {/* Title */}
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
                Secure Digital Identity
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
                Your gateway to government services
              </Typography>
            </Box>

            {/* Phone with ID Card Illustration */}
            <Box
              sx={{
                width: 220,
                height: 280,
                background: 'linear-gradient(135deg, #4FC3F7 0%, #29B6F6 100%)',
                borderRadius: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0px 25px 50px rgba(41, 182, 246, 0.4)',
                mb: 4,
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  width: '90%',
                  height: '95%',
                  background: 'white',
                  borderRadius: '35px',
                  top: '2.5%',
                  left: '5%',
                },
              }}
            >
              {/* Phone Content */}
              <Box
                sx={{
                  position: 'relative',
                  zIndex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 2,
                }}
              >
                {/* Shield Icon */}
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #0D9488 0%, #14B8A6 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 8px 20px rgba(13, 148, 136, 0.3)',
                  }}
                >
                  <Security sx={{ fontSize: 45, color: 'white' }} />
                </Box>

                {/* Verified Text */}
                <Typography
                  sx={{
                    fontFamily: 'Inter',
                    fontWeight: 700,
                    fontSize: 14,
                    color: '#1F2937',
                    letterSpacing: '2px',
                  }}
                >
                  VERIFIED
                </Typography>

                {/* Barcode */}
                <Box
                  sx={{
                    width: 120,
                    height: 40,
                    background: '#000',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mt: 1,
                  }}
                >
                  <Box
                    sx={{
                      width: '80%',
                      height: '60%',
                      background: 'repeating-linear-gradient(90deg, white 0, white 3px, transparent 3px, transparent 6px)',
                    }}
                  />
                </Box>
              </Box>
            </Box>

            {/* Features */}
            <Box sx={{ display: 'flex', gap: 4, mt: 2 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Box
                  sx={{
                    width: 50,
                    height: 50,
                    borderRadius: '50%',
                    background: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 1,
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                  }}
                >
                  <Security sx={{ fontSize: 24, color: '#6B7280' }} />
                </Box>
                <Typography
                  sx={{
                    fontFamily: 'Inter',
                    fontSize: 12,
                    color: '#1F2937',
                    fontWeight: 500,
                  }}
                >
                  Secure
                </Typography>
              </Box>

              <Box sx={{ textAlign: 'center' }}>
                <Box
                  sx={{
                    width: 50,
                    height: 50,
                    borderRadius: '50%',
                    background: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 1,
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                  }}
                >
                  <Speed sx={{ fontSize: 24, color: '#2563EB' }} />
                </Box>
                <Typography
                  sx={{
                    fontFamily: 'Inter',
                    fontSize: 12,
                    color: '#1F2937',
                    fontWeight: 500,
                  }}
                >
                  Fast
                </Typography>
              </Box>

              <Box sx={{ textAlign: 'center' }}>
                <Box
                  sx={{
                    width: 50,
                    height: 50,
                    borderRadius: '50%',
                    background: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 1,
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                  }}
                >
                  <Verified sx={{ fontSize: 24, color: '#0D9488' }} />
                </Box>
                <Typography
                  sx={{
                    fontFamily: 'Inter',
                    fontSize: 12,
                    color: '#1F2937',
                    fontWeight: 500,
                  }}
                >
                  Verified
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Right Section - Registration Form */}
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
                Create Your Account
              </Typography>
              <Typography
                sx={{
                  fontFamily: 'Inter',
                  fontSize: 14,
                  color: '#6B7280',
                  mb: 4,
                }}
              >
                Join thousands of citizens making a difference
              </Typography>

              {error && (
                <Alert severity="error" sx={{ mb: 2, borderRadius: 2, fontSize: 13 }}>
                  {error}
                </Alert>
              )}

              <Box component="form" onSubmit={handleSendOTP}>
                {/* Mobile Number / Email Field */}
                <Typography
                  sx={{
                    fontFamily: 'Inter',
                    fontWeight: 600,
                    fontSize: 13,
                    color: '#374151',
                    mb: 1,
                  }}
                >
                  {useEmail ? 'Email Address' : 'Mobile Number'}
                </Typography>
                <TextField
                  fullWidth
                  size="medium"
                  name={useEmail ? 'email' : 'mobile'}
                  type={useEmail ? 'email' : 'tel'}
                  placeholder={useEmail ? 'you@example.com' : '+94 XX XXX XXXX'}
                  value={useEmail ? formData.email : formData.mobile}
                  onChange={handleChange}
                  required
                  sx={{ mb: 1 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        {useEmail ? (
                          <Email sx={{ color: '#9CA3AF', fontSize: 20 }} />
                        ) : (
                          <Phone sx={{ color: '#9CA3AF', fontSize: 20 }} />
                        )}
                      </InputAdornment>
                    ),
                    sx: {
                      fontFamily: 'Inter',
                      fontSize: 14,
                      backgroundColor: '#F9FAFB',
                      borderRadius: 2,
                      '& fieldset': { border: '1.5px solid #E5E7EB' },
                      '&:hover fieldset': { border: '1.5px solid #D1D5DB' },
                      '&.Mui-focused fieldset': { border: '1.5px solid #2563EB' },
                    },
                  }}
                />

                <Typography
                  sx={{
                    fontFamily: 'Inter',
                    fontSize: 12,
                    color: '#9CA3AF',
                    mb: 3,
                  }}
                >
                  We'll send you a verification code
                </Typography>

                {/* Send OTP Button */}
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  sx={{
                    height: 48,
                    py: 1.5,
                    background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
                    borderRadius: 2.5,
                    fontFamily: 'Inter',
                    fontWeight: 600,
                    fontSize: 15,
                    textTransform: 'none',
                    mb: 2,
                    boxShadow: '0 4px 14px rgba(37, 99, 235, 0.4)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #1D4ED8 0%, #1E40AF 100%)',
                      boxShadow: '0 6px 20px rgba(37, 99, 235, 0.5)',
                    },
                  }}
                >
                  {loading ? 'Sending...' : 'Send OTP'}
                </Button>

                {/* Use Email/Mobile Toggle */}
                <Box sx={{ textAlign: 'center', mb: 3 }}>
                  <Button
                    onClick={() => setUseEmail(!useEmail)}
                    sx={{
                      color: '#2563EB',
                      textTransform: 'none',
                      fontSize: 13,
                      fontWeight: 600,
                      '&:hover': {
                        background: 'transparent',
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    {useEmail ? 'Use Mobile Instead' : 'Use Email Instead'}
                  </Button>
                </Box>

                {/* SL-UDI Button (Disabled) */}
                <Button
                  fullWidth
                  disabled
                  variant="outlined"
                  startIcon={<Lock sx={{ fontSize: 18 }} />}
                  sx={{
                    height: 48,
                    py: 1.5,
                    borderRadius: 2.5,
                    fontFamily: 'Inter',
                    fontWeight: 500,
                    fontSize: 14,
                    textTransform: 'none',
                    mb: 3,
                    color: '#9CA3AF',
                    borderColor: '#E5E7EB',
                    backgroundColor: '#F9FAFB',
                  }}
                >
                  Register with SL-UDI (Coming Soon)
                </Button>

                {/* Terms & Privacy */}
                <Box sx={{ textAlign: 'center' }}>
                  <Typography
                    sx={{
                      fontFamily: 'Inter',
                      fontSize: 12,
                      color: '#9CA3AF',
                      mb: 0.5,
                    }}
                  >
                    By continuing, you agree to our
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                    <Link
                      to="/terms"
                      style={{
                        fontFamily: 'Inter',
                        fontSize: 12,
                        color: '#2563EB',
                        textDecoration: 'none',
                        fontWeight: 600,
                      }}
                    >
                      Terms of Service
                    </Link>
                    <Typography sx={{ fontSize: 12, color: '#9CA3AF' }}>and</Typography>
                    <Link
                      to="/privacy"
                      style={{
                        fontFamily: 'Inter',
                        fontSize: 12,
                        color: '#2563EB',
                        textDecoration: 'none',
                        fontWeight: 600,
                      }}
                    >
                      Privacy Policy
                    </Link>
                  </Box>
                </Box>

                {/* Login Link */}
                <Box sx={{ textAlign: 'center', mt: 3, pt: 3, borderTop: '1px solid #E5E7EB' }}>
                  <Typography
                    sx={{
                      fontFamily: 'Inter',
                      fontSize: 13,
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
                      Sign In
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

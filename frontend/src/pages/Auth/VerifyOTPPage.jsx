import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, TextField, Button, Typography, Alert } from '@mui/material';
import { Security, Speed, Verified } from '@mui/icons-material';
import toast from 'react-hot-toast';

export default function VerifyOTPPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(20);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  // Get phone/email from previous page
  const contactInfo = location.state?.contactInfo || '+94 77 XXX XXXX';
  const contactType = location.state?.contactType || 'mobile';

  // Timer countdown
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  // Auto-focus first input on mount
  useEffect(() => {
    inputRefs[0]?.current?.focus();
  }, []);

  const handleOtpChange = (index, value) => {
    // Only allow digits
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 3) {
      inputRefs[index + 1]?.current?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs[index - 1]?.current?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 4).split('');
    const newOtp = [...otp];
    pastedData.forEach((char, idx) => {
      if (idx < 4 && /^\d$/.test(char)) {
        newOtp[idx] = char;
      }
    });
    setOtp(newOtp);
    
    // Focus last filled input or next empty
    const lastFilledIndex = newOtp.findIndex(val => !val);
    const focusIndex = lastFilledIndex === -1 ? 3 : lastFilledIndex;
    inputRefs[focusIndex]?.current?.focus();
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const otpCode = otp.join('');
    
    if (otpCode.length !== 4) {
      toast.error('Please enter complete OTP');
      return;
    }

    // TODO: Implement actual OTP verification
    toast.success('OTP verified successfully!');
    navigate('/register/complete', { state: { contactInfo, contactType } });
  };

  const handleResend = () => {
    if (!canResend) return;
    
    // TODO: Implement resend OTP logic
    toast.success('OTP resent successfully!');
    setTimer(20);
    setCanResend(false);
    setOtp(['', '', '', '']);
    inputRefs[0]?.current?.focus();
  };

  const handleChangeNumber = () => {
    navigate('/register');
  };

  const formatTimer = () => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const maskContactInfo = (info) => {
    if (contactType === 'mobile') {
      // Mask middle digits: +94 77 XXX XXXX
      const parts = info.split(' ');
      if (parts.length >= 3) {
        return `${parts[0]} ${parts[1]} XXX ${parts[parts.length - 1]}`;
      }
    }
    // For email: mas***@example.com
    if (info.includes('@')) {
      const [local, domain] = info.split('@');
      return `${local.substring(0, 3)}***@${domain}`;
    }
    return info;
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
          {/* Left Section - Branding (Same as Register Page) */}
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

          {/* Right Section - OTP Verification Form */}
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
                Verify Your Number
              </Typography>
              <Typography
                sx={{
                  fontFamily: 'Inter',
                  fontSize: 13,
                  color: '#6B7280',
                  mb: 4,
                }}
              >
                Please enter 4 digit code sent to{' '}
                <strong>{maskContactInfo(contactInfo)}</strong>{' '}
                <Button
                  onClick={handleChangeNumber}
                  sx={{
                    color: '#2563EB',
                    textTransform: 'none',
                    fontSize: 13,
                    fontWeight: 600,
                    minWidth: 'auto',
                    p: 0,
                    '&:hover': {
                      background: 'transparent',
                      textDecoration: 'underline',
                    },
                  }}
                >
                  (Change?)
                </Button>
              </Typography>

              {error && (
                <Alert severity="error" sx={{ mb: 3, borderRadius: 2, fontSize: 13 }}>
                  {error}
                </Alert>
              )}

              <Box component="form" onSubmit={handleVerify}>
                {/* OTP Input Boxes */}
                <Box
                  sx={{
                    display: 'flex',
                    gap: 2,
                    justifyContent: 'center',
                    mb: 4,
                  }}
                >
                  {otp.map((digit, index) => (
                    <TextField
                      key={index}
                      inputRef={inputRefs[index]}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      onPaste={index === 0 ? handlePaste : undefined}
                      inputProps={{
                        maxLength: 1,
                        style: {
                          textAlign: 'center',
                          fontSize: 24,
                          fontWeight: 600,
                          fontFamily: 'Inter',
                        },
                      }}
                      sx={{
                        width: 64,
                        '& .MuiOutlinedInput-root': {
                          height: 64,
                          borderRadius: 2.5,
                          backgroundColor: '#F9FAFB',
                          '& fieldset': {
                            border: '2px solid #E5E7EB',
                          },
                          '&:hover fieldset': {
                            border: '2px solid #D1D5DB',
                          },
                          '&.Mui-focused fieldset': {
                            border: '2px solid #2563EB',
                          },
                        },
                      }}
                    />
                  ))}
                </Box>

                {/* Verify Button */}
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  disabled={loading || otp.some(d => !d)}
                  sx={{
                    height: 48,
                    py: 1.5,
                    background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
                    borderRadius: 2.5,
                    fontFamily: 'Inter',
                    fontWeight: 600,
                    fontSize: 15,
                    textTransform: 'none',
                    mb: 3,
                    boxShadow: '0 4px 14px rgba(37, 99, 235, 0.4)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #1D4ED8 0%, #1E40AF 100%)',
                      boxShadow: '0 6px 20px rgba(37, 99, 235, 0.5)',
                    },
                    '&:disabled': {
                      background: '#E5E7EB',
                      color: '#9CA3AF',
                    },
                  }}
                >
                  {loading ? 'Verifying...' : 'Verify and Proceed'}
                </Button>

                {/* Resend OTP */}
                <Box sx={{ textAlign: 'center' }}>
                  <Typography
                    sx={{
                      fontFamily: 'Inter',
                      fontSize: 13,
                      color: '#6B7280',
                    }}
                  >
                    Didn't receive code?{' '}
                    {canResend ? (
                      <Button
                        onClick={handleResend}
                        sx={{
                          color: '#2563EB',
                          textTransform: 'none',
                          fontSize: 13,
                          fontWeight: 600,
                          minWidth: 'auto',
                          p: 0,
                          '&:hover': {
                            background: 'transparent',
                            textDecoration: 'underline',
                          },
                        }}
                      >
                        Resend
                      </Button>
                    ) : (
                      <span style={{ color: '#9CA3AF', fontWeight: 500 }}>
                        Resend in {formatTimer()}s
                      </span>
                    )}
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

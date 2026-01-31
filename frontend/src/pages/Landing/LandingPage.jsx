import { Box, Container, Typography, Button, Card, CardContent, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import AppleIcon from '@mui/icons-material/Apple';
import AndroidIcon from '@mui/icons-material/Android';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        background: 'linear-gradient(45deg, #E0F2F1 50%, #B2DFDB 67.68%, #80CBC4 85.36%, #4DB6AC 120.71%)',
        position: 'relative',
      }}
    >
      {/* Header */}
      <Box
        component="header"
        sx={{
          position: 'absolute',
          width: '100%',
          height: 62,
          left: 0,
          top: 0,
          background: 'rgba(255, 255, 255, 0.3)',
          border: '1px solid rgba(255, 255, 255, 0.4)',
          backdropFilter: 'blur(10px)',
          zIndex: 10,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%', px: 3 }}>
          {/* Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
            <Box
              component="img"
              src="/images/logo.png"
              alt="CivikLink SL Logo"
              sx={{
                width: 30,
                height: 30,
                objectFit: 'contain',
              }}
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <Box
              sx={{
                width: 30,
                height: 30,
                borderRadius: '6px',
                background: 'linear-gradient(135deg, #26A69A 0%, #66BB6A 100%)',
                display: 'none',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <LocationOnIcon sx={{ color: 'white', fontSize: 18 }} />
            </Box>
            <Typography
              variant="h5"
              sx={{
                fontFamily: 'Inter',
                fontWeight: 700,
                fontSize: 18,
                letterSpacing: '-0.5px',
                color: '#1F2937',
              }}
            >
              CivikLink SL
            </Typography>
          </Box>

          {/* Navigation */}
          <Box component="nav" sx={{ display: { xs: 'none', md: 'flex' }, gap: 4.5 }}>
            <Typography
              sx={{
                fontFamily: 'Inter',
                fontWeight: 500,
                fontSize: 12,
                letterSpacing: '-0.5px',
                color: '#374151',
                cursor: 'pointer',
              }}
            >
              How it Works
            </Typography>
            <Typography
              sx={{
                fontFamily: 'Inter',
                fontWeight: 500,
                fontSize: 12,
                letterSpacing: '-0.5px',
                color: '#374151',
                cursor: 'pointer',
              }}
            >
              Live Feed
            </Typography>
            <Typography
              sx={{
                fontFamily: 'Inter',
                fontWeight: 500,
                fontSize: 12,
                letterSpacing: '-0.5px',
                color: '#374151',
                cursor: 'pointer',
              }}
            >
              Impact
            </Typography>
          </Box>

          {/* CTA Button */}
          <Button
            variant="contained"
            sx={{
              width: 155,
              height: 36,
              background: 'linear-gradient(45deg, #26A69A 50%, #66BB6A 120.71%)',
              boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1), 0px 10px 15px rgba(0, 0, 0, 0.1)',
              borderRadius: '9999px',
              fontFamily: 'Inter',
              fontWeight: 600,
              fontSize: 12,
              letterSpacing: '-0.5px',
              color: '#FFFFFF',
              textTransform: 'none',
              '&:hover': {
                background: 'linear-gradient(45deg, #22948A 50%, #5CAF5A 120.71%)',
              },
            }}
            onClick={() => navigate('/register')}
          >
            Report an Issue Now
          </Button>
        </Box>
      </Box>

      {/* Main Content */}
      <Box component="main" sx={{ position: 'relative', pt: '72px' }}>
        <Container maxWidth="xl" sx={{ position: 'relative' }}>
          {/* Hero Section */}
          <Box sx={{ display: 'flex', gap: 4.5, pt: 4.5, pb: 6, alignItems: 'flex-start' }}>
            {/* Left Column - Text Content */}
            <Box sx={{ width: '40%' }}>
              {/* Living Map Badge */}
              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 1.2,
                  px: 1.5,
                  py: 0.9,
                  background: 'rgba(255, 255, 255, 0.5)',
                  borderRadius: '9999px',
                  mb: 3,
                  mt: 6,
                }}
              >
                <LocationOnIcon sx={{ color: '#0D9488', fontSize: 14 }} />
                <Typography
                  sx={{
                    fontFamily: 'Inter',
                    fontWeight: 600,
                    fontSize: 11,
                    letterSpacing: '-0.5px',
                    color: '#374151',
                  }}
                >
                  Living Map
                </Typography>
              </Box>

              {/* Main Heading */}
              <Typography
                variant="h1"
                sx={{
                  fontFamily: 'Inter',
                  fontWeight: 700,
                  fontSize: 45,
                  lineHeight: '56px',
                  letterSpacing: '-0.5px',
                  color: '#111827',
                  mb: 2.2,
                }}
              >
                Your Voice.<br />
                Real Impact.<br />
                A Better Sri Lanka.
              </Typography>

              {/* Description */}
              <Typography
                sx={{
                  fontFamily: 'Inter',
                  fontWeight: 400,
                  fontSize: 15,
                  lineHeight: '25px',
                  letterSpacing: '-0.5px',
                  color: '#4B5563',
                  mb: 3.8,
                }}
              >
                Join the community-led transparency platform. Report local issues, tag officials, and watch them get solved in real-time.
              </Typography>

              {/* Buttons */}
              <Box sx={{ display: 'flex', gap: 1.5 }}>
                <Button
                  variant="contained"
                  startIcon={<LocationOnIcon />}
                  sx={{
                    width: 175,
                    height: 42,
                    background: 'linear-gradient(45deg, #26A69A 50%, #66BB6A 120.71%)',
                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1), 0px 10px 15px rgba(0, 0, 0, 0.1)',
                    borderRadius: '9999px',
                    fontFamily: 'Inter',
                    fontWeight: 600,
                    fontSize: 12,
                    letterSpacing: '-0.5px',
                    color: '#FFFFFF',
                    textTransform: 'none',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #22948A 50%, #5CAF5A 120.71%)',
                    },
                  }}
                  onClick={() => navigate('/register')}
                >
                  Pinpoint a Problem
                </Button>

                <Button
                  variant="outlined"
                  sx={{
                    width: 150,
                    height: 45,
                    background: 'rgba(255, 255, 255, 0.6)',
                    border: '2px solid #D1D5DB',
                    borderRadius: '9999px',
                    fontFamily: 'Inter',
                    fontWeight: 600,
                    fontSize: 12,
                    letterSpacing: '-0.5px',
                    color: '#1F2937',
                    textTransform: 'none',
                    '&:hover': {
                      background: 'rgba(255, 255, 255, 0.8)',
                      border: '2px solid #D1D5DB',
                    },
                  }}
                  onClick={() => navigate('/home')}
                >
                  See the Live Map
                </Button>
              </Box>
            </Box>

            {/* Center Column - Map Visualization */}
            <Box sx={{ width: '30%', position: 'relative', height: 375, mt: 6 }}>
              <Box
                sx={{
                  width: '100%',
                  height: 328,
                  position: 'relative',
                  borderRadius: '22px',
                  overflow: 'hidden',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
                }}
              >
                <Box
                  component="img"
                  src="/images/sri-lanka-map.png"
                  alt="Sri Lanka Map"
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                  onError={(e) => {
                    e.target.parentElement.style.background = 'linear-gradient(135deg, #A5D6D5 0%, #80CBC4 50%, #4DB6AC 100%)';
                    e.target.style.display = 'none';
                  }}
                />
                {/* Map Markers */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: '20%',
                    left: '30%',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 0.8,
                    px: 1.2,
                    py: 0.8,
                    background: 'rgba(255, 255, 255, 0.9)',
                    boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.1), 0px 8px 12px rgba(0, 0, 0, 0.1)',
                    borderRadius: '9999px',
                  }}
                >
                  <FlashOnIcon sx={{ color: '#EAB308', fontSize: 11 }} />
                  <Typography sx={{ fontFamily: 'Inter', fontWeight: 600, fontSize: 9, color: '#374151' }}>
                    Power
                  </Typography>
                </Box>

                <Box
                  sx={{
                    position: 'absolute',
                    top: '45%',
                    right: '15%',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 0.8,
                    px: 1.2,
                    py: 0.8,
                    background: 'rgba(255, 255, 255, 0.9)',
                    boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.1), 0px 8px 12px rgba(0, 0, 0, 0.1)',
                    borderRadius: '9999px',
                  }}
                >
                  <WaterDropIcon sx={{ color: '#3B82F6', fontSize: 9 }} />
                  <Typography sx={{ fontFamily: 'Inter', fontWeight: 600, fontSize: 9, color: '#374151' }}>
                    Water
                  </Typography>
                </Box>

                <Box
                  sx={{
                    position: 'absolute',
                    bottom: '25%',
                    left: '35%',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 0.8,
                    px: 1.2,
                    py: 0.8,
                    background: 'rgba(255, 255, 255, 0.9)',
                    boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.1), 0px 8px 12px rgba(0, 0, 0, 0.1)',
                    borderRadius: '9999px',
                  }}
                >
                  <DirectionsCarIcon sx={{ color: '#F97316', fontSize: 14 }} />
                  <Typography sx={{ fontFamily: 'Inter', fontWeight: 600, fontSize: 9, color: '#374151' }}>
                    Roads
                  </Typography>
                </Box>

                {/* Dot indicators */}
                <Box sx={{ position: 'absolute', top: '35%', left: '57%', width: 9, height: 9, background: '#FACC15', opacity: 0.96, borderRadius: '50%' }} />
                <Box sx={{ position: 'absolute', top: '55%', left: '45%', width: 9, height: 9, background: '#4ADE80', opacity: 0.97, borderRadius: '50%' }} />
                <Box sx={{ position: 'absolute', top: '58%', right: '33%', width: 9, height: 9, background: '#FB923C', opacity: 0.98, borderRadius: '50%' }} />
              </Box>
            </Box>

            {/* Right Column - Happening Now */}
            <Box
              sx={{
                width: '30%',
                minHeight: 450,
                background: 'rgba(255, 255, 255, 0.3)',
                border: '1px solid rgba(255, 255, 255, 0.4)',
                boxShadow: '0px 6px 8px rgba(0, 0, 0, 0.1), 0px 15px 19px rgba(0, 0, 0, 0.1)',
                borderRadius: '18px',
                p: 2.2,
              }}
            >
              {/* Header */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, mb: 2.2 }}>
                <LocationOnIcon sx={{ color: '#0D9488', fontSize: 15 }} />
                <Typography
                  sx={{
                    fontFamily: 'Inter',
                    fontWeight: 700,
                    fontSize: 15,
                    letterSpacing: '-0.5px',
                    color: '#1F2937',
                  }}
                >
                  Happening Now
                </Typography>
              </Box>

              {/* Issues List */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {[
                  { title: 'Road Damage', location: 'Colombo 07', image: '/images/road-damage.jpg' },
                  { title: 'Street Light Out', location: 'Kandy', image: '/images/street-light.jpg' },
                  { title: 'Water Leak', location: 'Galle', image: '/images/water-leak.jpg' },
                ].map((issue, index) => (
                  <Card
                    key={index}
                    sx={{
                      background: 'rgba(255, 255, 255, 0.7)',
                      borderRadius: '12px',
                      overflow: 'hidden',
                    }}
                  >
                    {/* Image */}
                    <Box
                      component="img"
                      src={issue.image}
                      alt={issue.title}
                      sx={{
                        width: '100%',
                        height: 96,
                        objectFit: 'cover',
                        borderRadius: '9px 9px 0 0',
                      }}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        const placeholder = document.createElement('div');
                        placeholder.style.width = '100%';
                        placeholder.style.height = '96px';
                        placeholder.style.background = '#D1D5DB';
                        placeholder.style.borderRadius = '9px 9px 0 0';
                        e.target.parentElement.insertBefore(placeholder, e.target.parentElement.firstChild);
                      }}
                    />

                    <CardContent sx={{ p: 1.5 }}>
                      <Typography
                        sx={{
                          fontFamily: 'Inter',
                          fontWeight: 600,
                          fontSize: 12,
                          letterSpacing: '-0.5px',
                          color: '#1F2937',
                          mb: 0.8,
                        }}
                      >
                        {issue.title}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.4 }}>
                        <LocationOnIcon sx={{ color: '#EF4444', fontSize: 8 }} />
                        <Typography
                          sx={{
                            fontFamily: 'Inter',
                            fontWeight: 400,
                            fontSize: 11,
                            letterSpacing: '-0.5px',
                            color: '#4B5563',
                          }}
                        >
                          {issue.location}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </Box>
          </Box>

          {/* How It Works Section */}
          <Box sx={{ textAlign: 'center', py: 6 }}>
            <Typography
              variant="h2"
              sx={{
                fontFamily: 'Inter',
                fontWeight: 700,
                fontSize: 45,
                lineHeight: '56px',
                letterSpacing: '-0.5px',
                color: '#111827',
                mb: 4.5,
              }}
            >
              How It Works
            </Typography>

            <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center' }}>
              {[
                {
                  icon: <CameraAltIcon sx={{ fontSize: 24, color: '#FFFFFF' }} />,
                  title: 'Snap & Share',
                  description: 'Snap issues using your smartphone and upload instantly to alert the community and authorities.',
                  gradient: 'linear-gradient(135deg, #2DD4BF 0%, #22D3EE 70.71%)',
                },
                {
                  icon: <HowToVoteIcon sx={{ fontSize: 24, color: '#FFFFFF' }} />,
                  title: 'Community Verification',
                  description: 'Community validates and boosts visibility of critical issues through collective engagement.',
                  gradient: 'linear-gradient(135deg, #4ADE80 0%, #34D399 70.71%)',
                },
                {
                  icon: <AccountBalanceIcon sx={{ fontSize: 24, color: '#FFFFFF' }} />,
                  title: 'Official Resolution',
                  description: 'Authorities respond and resolve issues with full transparency and community tracking.',
                  gradient: 'linear-gradient(135deg, #60A5FA 0%, #818CF8 70.71%)',
                },
              ].map((step, index) => (
                <Box
                  key={index}
                  sx={{
                    width: 332,
                    height: 188,
                    background: 'rgba(255, 255, 255, 0.3)',
                    border: '1px solid rgba(255, 255, 255, 0.4)',
                    boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.1), 0px 8px 12px rgba(0, 0, 0, 0.1)',
                    borderRadius: '18px',
                    p: 3,
                    textAlign: 'left',
                  }}
                >
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      background: step.gradient,
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 2.2,
                    }}
                  >
                    {step.icon}
                  </Box>
                  <Typography
                    sx={{
                      fontFamily: 'Inter',
                      fontWeight: 700,
                      fontSize: 18,
                      letterSpacing: '-0.5px',
                      color: '#1F2937',
                      mb: 1.5,
                    }}
                  >
                    {step.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: 'Inter',
                      fontWeight: 400,
                      fontSize: 12,
                      letterSpacing: '-0.5px',
                      color: '#4B5563',
                    }}
                  >
                    {step.description}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Success Hall of Fame */}
          <Box
            sx={{
              background: 'rgba(255, 255, 255, 0.3)',
              border: '1px solid rgba(255, 255, 255, 0.4)',
              boxShadow: '0px 6px 8px rgba(0, 0, 0, 0.1), 0px 15px 19px rgba(0, 0, 0, 0.1)',
              borderRadius: '18px',
              p: 3.8,
              my: 6,
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4.5 }}>
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                  <EmojiEventsIcon sx={{ fontSize: 26, color: '#EAB308' }} />
                  <Typography
                    sx={{
                      fontFamily: 'Inter',
                      fontWeight: 700,
                      fontSize: 23,
                      letterSpacing: '-0.5px',
                      color: '#1F2937',
                    }}
                  >
                    Success Hall of Fame
                  </Typography>
                </Box>
                <Typography
                  sx={{
                    fontFamily: 'Inter',
                    fontWeight: 400,
                    fontSize: 12,
                    letterSpacing: '-0.5px',
                    color: '#4B5563',
                  }}
                >
                  Real impact, real solutions, real change
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'right' }}>
                <Typography
                  sx={{
                    fontFamily: 'Inter',
                    fontWeight: 700,
                    fontSize: 45,
                    letterSpacing: '-0.5px',
                    color: '#0D9488',
                  }}
                >
                  1,250+
                </Typography>
                <Typography
                  sx={{
                    fontFamily: 'Inter',
                    fontWeight: 600,
                    fontSize: 15,
                    letterSpacing: '-0.5px',
                    color: '#374151',
                  }}
                >
                  Issues Solved
                </Typography>
              </Box>
            </Box>

            {/* Before/After Grid */}
            <Box sx={{ display: 'flex', gap: 2.2, justifyContent: 'center' }}>
              {[
                { label: 'Before', color: '#DC2626', bg: '#FEE2E2', image: '/images/before-road-1.jpg' },
                { label: 'After', color: '#16A34A', bg: '#DCFCE7', image: '/images/after-road-1.jpg' },
                { label: 'Before', color: '#DC2626', bg: '#FEE2E2', image: '/images/before-light-1.jpg' },
                { label: 'After', color: '#16A34A', bg: '#DCFCE7', image: '/images/after-light-1.jpg' },
              ].map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    width: 234,
                    height: 171,
                    background: 'rgba(255, 255, 255, 0.6)',
                    borderRadius: '12px',
                    p: 1.5,
                    position: 'relative',
                  }}
                >
                  <Box
                    component="img"
                    src={item.image}
                    alt={`${item.label} image`}
                    sx={{
                      width: '100%',
                      height: 120,
                      objectFit: 'cover',
                      borderRadius: '9px',
                      mb: 1.5,
                    }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      const placeholder = document.createElement('div');
                      placeholder.style.width = '100%';
                      placeholder.style.height = '120px';
                      placeholder.style.background = '#D1D5DB';
                      placeholder.style.borderRadius = '9px';
                      placeholder.style.marginBottom = '12px';
                      e.target.parentElement.insertBefore(placeholder, e.target.parentElement.firstChild);
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 21,
                      right: 21,
                      px: 1.2,
                      py: 0.4,
                      background: item.bg,
                      borderRadius: '9999px',
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: 'Inter',
                        fontWeight: 600,
                        fontSize: 9,
                        letterSpacing: '-0.5px',
                        color: item.color,
                      }}
                    >
                      {item.label}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          mt: 4.5,
          background: 'rgba(255, 255, 255, 0.3)',
          border: '1px solid rgba(255, 255, 255, 0.4)',
          py: 3,
        }}
      >
        <Container maxWidth="xl">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            {/* Logo */}
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, mb: 0.8 }}>
                <Box
                  component="img"
                  src="/images/logo.png"
                  alt="CivikLink SL Logo"
                  sx={{
                    width: 45,
                    height: 45,
                    objectFit: 'contain',
                  }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <Box
                  sx={{
                    width: 45,
                    height: 45,
                    borderRadius: '9px',
                    background: 'linear-gradient(135deg, #26A69A 0%, #66BB6A 100%)',
                    display: 'none',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <LocationOnIcon sx={{ color: 'white', fontSize: 27 }} />
                </Box>
                <Box>
                  <Typography
                    sx={{
                      fontFamily: 'Inter',
                      fontWeight: 700,
                      fontSize: 18,
                      letterSpacing: '-0.5px',
                      color: '#1F2937',
                    }}
                  >
                    CivikLink SL
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: 'Inter',
                      fontWeight: 400,
                      fontSize: 11,
                      letterSpacing: '-0.5px',
                      color: '#4B5563',
                    }}
                  >
                    Empowering Citizens, Building Trust
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* App Download Buttons */}
            <Box>
              <Typography
                sx={{
                  fontFamily: 'Inter',
                  fontWeight: 600,
                  fontSize: 11,
                  letterSpacing: '-0.5px',
                  color: '#374151',
                  textAlign: 'right',
                  mb: 1.5,
                }}
              >
                Download the App
              </Typography>
              <Box sx={{ display: 'flex', gap: 1.5 }}>
                <Button
                  startIcon={<AppleIcon />}
                  sx={{
                    width: 125,
                    height: 45,
                    background: '#000000',
                    borderRadius: '9px',
                    color: '#FFFFFF',
                    textTransform: 'none',
                    justifyContent: 'flex-start',
                    pl: 2.2,
                    '&:hover': { background: '#1A1A1A' },
                  }}
                >
                  <Box sx={{ textAlign: 'left' }}>
                    <Typography sx={{ fontSize: 9, fontWeight: 400 }}>Download on the</Typography>
                    <Typography sx={{ fontSize: 11, fontWeight: 600 }}>App Store</Typography>
                  </Box>
                </Button>
                <Button
                  startIcon={<AndroidIcon />}
                  sx={{
                    width: 118,
                    height: 45,
                    background: '#000000',
                    borderRadius: '9px',
                    color: '#FFFFFF',
                    textTransform: 'none',
                    justifyContent: 'flex-start',
                    pl: 2.2,
                    '&:hover': { background: '#1A1A1A' },
                  }}
                >
                  <Box sx={{ textAlign: 'left' }}>
                    <Typography sx={{ fontSize: 9, fontWeight: 400 }}>Get it on</Typography>
                    <Typography sx={{ fontSize: 11, fontWeight: 600 }}>Google Play</Typography>
                  </Box>
                </Button>
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              pt: 2.2,
              borderTop: '1px solid rgba(0,0,0,0.1)',
            }}
          >
            <Typography
              sx={{
                fontFamily: 'Inter',
                fontWeight: 400,
                fontSize: 11,
                letterSpacing: '-0.5px',
                color: '#4B5563',
              }}
            >
              © 2024 CivikLink SL. All rights reserved.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2.2 }}>
              <IconButton sx={{ color: '#4B5563' }}>
                <FacebookIcon />
              </IconButton>
              <IconButton sx={{ color: '#4B5563' }}>
                <TwitterIcon />
              </IconButton>
              <IconButton sx={{ color: '#4B5563' }}>
                <InstagramIcon />
              </IconButton>
              <IconButton sx={{ color: '#4B5563' }}>
                <LinkedInIcon />
              </IconButton>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

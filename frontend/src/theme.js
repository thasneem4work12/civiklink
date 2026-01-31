import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1C75FF',
      light: '#4D92FF',
      dark: '#0052CC',
    },
    secondary: {
      main: '#0ABF58',
    },
    success: {
      main: '#0ABF58',
    },
    warning: {
      main: '#ff9800',
    },
    error: {
      main: '#FF3B30',
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
    grey: {
      50: '#E9EDF2',
      100: '#E9EDF2',
      900: '#1A1A1A',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 800,
      fontFamily: '"Inter", sans-serif',
    },
    h2: {
      fontWeight: 800,
      fontFamily: '"Inter", sans-serif',
    },
    h3: {
      fontWeight: 700,
      fontFamily: '"Inter", sans-serif',
    },
    h4: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 600,
    },
    body1: {
      fontWeight: 400,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 50,
          padding: '12px 32px',
          fontSize: '1rem',
          fontWeight: 600,
          boxShadow: '0 4px 14px 0 rgba(28, 117, 255, 0.25)',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 6px 20px 0 rgba(28, 117, 255, 0.35)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 12px 48px rgba(0, 0, 0, 0.12)',
          },
        },
      },
    },
  },
});

export default theme;

import { AppBar, Toolbar, Typography, Button, Box, IconButton, Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import { useTranslation } from 'react-i18next';
import AccountCircle from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useState } from 'react';

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const getDashboardRoute = () => {
    switch (user?.role) {
      case 'government': return '/government';
      case 'ngo': return '/ngo';
      case 'admin': return '/admin';
      default: return '/';
    }
  };

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 0, mr: 4, cursor: 'pointer' }} onClick={() => navigate('/')}>
          CivikLink SL
        </Typography>

        <Box sx={{ flexGrow: 1, display: 'flex', gap: 1 }}>
          <Button color="inherit" startIcon={<HomeIcon />} onClick={() => navigate('/')}>
            {t('home')}
          </Button>
          
          {user?.role === 'citizen' && (
            <>
              <Button color="inherit" startIcon={<AddIcon />} onClick={() => navigate('/post-issue')}>
                {t('postIssue')}
              </Button>
              <Button color="inherit" onClick={() => navigate('/my-issues')}>
                {t('myIssues')}
              </Button>
            </>
          )}

          {['government', 'ngo', 'admin'].includes(user?.role) && (
            <Button color="inherit" startIcon={<DashboardIcon />} onClick={() => navigate(getDashboardRoute())}>
              {t('dashboard')}
            </Button>
          )}
        </Box>

        <Typography variant="body2" sx={{ mr: 2 }}>
          {user?.full_name}
        </Typography>

        <IconButton color="inherit" onClick={handleMenu}>
          <AccountCircle />
        </IconButton>
        
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={() => { handleClose(); navigate('/profile'); }}>
            {t('profile')}
          </MenuItem>
          <MenuItem onClick={() => { handleClose(); handleLogout(); }}>
            {t('logout')}
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

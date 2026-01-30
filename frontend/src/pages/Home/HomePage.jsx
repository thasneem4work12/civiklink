import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchIssues, resetIssues } from '../../redux/slices/issueSlice';
import { 
  Container, Grid, Card, CardContent, CardMedia, Typography, Box, 
  Chip, IconButton, TextField, InputAdornment, CircularProgress,
  FormControl, InputLabel, Select, MenuItem, OutlinedInput
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import VerifiedIcon from '@mui/icons-material/Verified';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const categoryColors = {
  water: '#2196f3',
  electricity: '#ff9800',
  road: '#795548',
  garbage: '#4caf50',
  flood: '#f44336',
  drainage: '#9c27b0',
};

const statusColors = {
  pending: '#ff9800',
  verified: '#2196f3',
  in_progress: '#9c27b0',
  solved: '#4caf50',
  rejected: '#f44336',
};

export default function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items: issues, loading } = useSelector((state) => state.issues);
  const { t } = useTranslation();

  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [statusFilter, setStatusFilter] = useState([]);

  useEffect(() => {
    dispatch(fetchIssues());
  }, [dispatch]);

  const handleSearch = () => {
    dispatch(resetIssues());
    dispatch(fetchIssues({ search, category: categoryFilter.join(','), status: statusFilter.join(',') }));
  };

  const getCategoryColor = (category) => categoryColors[category] || '#gray';
  const getStatusColor = (status) => statusColors[status] || '#gray';

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        {t('home')} - Issue Feed
      </Typography>

      {/* Search and Filters */}
      <Box sx={{ mb: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Search issues..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>{t('category')}</InputLabel>
              <Select
                multiple
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                input={<OutlinedInput label={t('category')} />}
                renderValue={(selected) => selected.join(', ')}
              >
                {['water', 'electricity', 'road', 'garbage', 'flood', 'drainage'].map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {t(cat)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                multiple
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                input={<OutlinedInput label="Status" />}
                renderValue={(selected) => selected.join(', ')}
              >
                {['pending', 'verified', 'in_progress', 'solved', 'rejected'].map((status) => (
                  <MenuItem key={status} value={status}>
                    {t(status)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      {/* Issue List */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {issues.map((issue) => (
            <Grid item xs={12} md={6} lg={4} key={issue._id}>
              <Card 
                sx={{ cursor: 'pointer', '&:hover': { boxShadow: 6 } }}
                onClick={() => navigate(`/issues/${issue._id}`)}
              >
                {issue.photos && issue.photos.length > 0 && (
                  <CardMedia
                    component="img"
                    height="200"
                    image={issue.photos[0]}
                    alt={issue.title}
                  />
                )}
                <CardContent>
                  <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                    <Chip 
                      label={t(issue.category)} 
                      size="small" 
                      sx={{ bgcolor: getCategoryColor(issue.category), color: 'white' }}
                    />
                    <Chip 
                      label={t(issue.status)} 
                      size="small" 
                      sx={{ bgcolor: getStatusColor(issue.status), color: 'white' }}
                    />
                  </Box>

                  <Typography variant="h6" gutterBottom noWrap>
                    {issue.title}
                  </Typography>

                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {issue.description.substring(0, 100)}...
                  </Typography>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <LocationOnIcon fontSize="small" color="action" />
                    <Typography variant="caption" color="text.secondary">
                      {issue.district}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <VerifiedIcon fontSize="small" color="primary" />
                      <Typography variant="caption">
                        {issue.verification_count} verifications
                      </Typography>
                    </Box>
                    <Typography variant="caption" color="text.secondary">
                      {new Date(issue.created_at).toLocaleDateString()}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {!loading && issues.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            No issues found
          </Typography>
        </Box>
      )}
    </Container>
  );
}

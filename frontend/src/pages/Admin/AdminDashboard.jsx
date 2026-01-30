import { Container, Typography, Box } from '@mui/material';

export default function AdminDashboard() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="body1" color="text.secondary">
          Manage users, moderate content, and activate crisis mode.
        </Typography>
      </Box>
    </Container>
  );
}

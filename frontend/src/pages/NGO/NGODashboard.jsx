import { Container, Typography, Box } from '@mui/material';

export default function NGODashboard() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        NGO Dashboard
      </Typography>
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="body1" color="text.secondary">
          Claim issues and provide community support.
        </Typography>
      </Box>
    </Container>
  );
}

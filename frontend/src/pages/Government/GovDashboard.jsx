import { Container, Typography, Box } from '@mui/material';

export default function GovDashboard() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Government Dashboard
      </Typography>
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="body1" color="text.secondary">
          View issues tagged to your ministry and respond to them.
        </Typography>
      </Box>
    </Container>
  );
}

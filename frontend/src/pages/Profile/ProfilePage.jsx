import { Container, Typography, Box } from '@mui/material';

export default function ProfilePage() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Profile
      </Typography>
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="body1" color="text.secondary">
          User profile and settings.
        </Typography>
      </Box>
    </Container>
  );
}

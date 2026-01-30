import { Container, Typography, Box } from '@mui/material';

export default function IssueDetailPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Issue Details
      </Typography>
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="body1" color="text.secondary">
          Detailed issue view with map, images, comments, and verification.
        </Typography>
      </Box>
    </Container>
  );
}

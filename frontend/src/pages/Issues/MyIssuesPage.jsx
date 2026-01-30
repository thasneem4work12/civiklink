import { Container, Typography, Box } from '@mui/material';

export default function MyIssuesPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        My Issues
      </Typography>
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="body1" color="text.secondary">
          This page will show all issues you've reported.
        </Typography>
      </Box>
    </Container>
  );
}

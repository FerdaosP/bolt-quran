import React from 'react';
    import { Typography, Box } from '@mui/material';

    function HomePage() {
      return (
        <Box>
          <Typography variant="h4" gutterBottom>
            Welcome to the Quran App!
          </Typography>
          <Typography variant="body1">
            This app is designed to help you with your Quran reading, training, and memorization.
          </Typography>
        </Box>
      );
    }

    export default HomePage;

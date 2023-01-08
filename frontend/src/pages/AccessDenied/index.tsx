import React from 'react';
import { Typography, Box } from '@mui/material';

const AccessDenied = () => {
  return (
    <Box className="flex items-center justify-center w-full">
      <Typography variant="subtitle1" className="text-center">
        Access Denied
      </Typography>
    </Box>
  );
};

export default AccessDenied;

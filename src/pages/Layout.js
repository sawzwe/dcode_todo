import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Box, useMediaQuery } from '@mui/material';


const Layout = ({ children }) => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <Box sx={{ width: isMobile ? '100%' : '80%' }}>
          <Navbar />
          {children}
        </Box>
      </Box>
    </>
  );
};

export default Layout;


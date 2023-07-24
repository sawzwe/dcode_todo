import React, { useState } from 'react';
import Navbar from '@/components/Navbar';

import { Box, Typography, Button, Drawer, List, ListItem, ListItemText } from '@mui/material';

const Layout = ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <Box sx={{ width: '80%' }}>
          <Navbar />
          {children}
        </Box>
      </Box>
    </>
  );
};

export default Layout;



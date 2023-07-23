import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/SideBar';

import { Box, Typography, Button, Drawer, List, ListItem, ListItemText } from '@mui/material';

const Layout = ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        {/* <Box sx={{ width: '20%' }}>
          <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer}>
            <List>
              <ListItem button>
                <ListItemText primary="Test" />
              </ListItem>
              <ListItem button>
                <ListItemText primary="Completed" />
              </ListItem>
              <ListItem button>
                <ListItemText primary="Completed" />
              </ListItem>
              <ListItem button>
                <ListItemText primary="Completed" />
              </ListItem>
            </List>
          </Drawer>
          <Button fontSize="large" onClick={toggleDrawer}>
            Menu
          </Button>
        </Box> */}

        <Box sx={{ width: '80%' }}>
          <Navbar />
          {children}
        </Box>
      </Box>
    </>
  );
};

export default Layout;


// import React, { useState } from 'react';
// import Navbar from '@/components/Navbar';
// import { Box, Typography, Button, Drawer, List, ListItem, ListItemText, useMediaQuery } from '@mui/material';
// import { useTheme } from '@mui/material/styles';

// const Layout = ({ children }) => {
//   const [isDrawerOpen, setIsDrawerOpen] = useState(false);
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

//   const toggleDrawer = () => {
//     setIsDrawerOpen(!isDrawerOpen);
//   };

//   return (
//     <>
//       <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
//         {isMobile ? (
//           <Box sx={{ width: '100%' }}>
//             {/* Toggle button for mobile */}
//             <Button fontSize="large" onClick={toggleDrawer}>
//               Menu
//             </Button>

//             {/* Drawer for mobile */}
//             <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer}>
//               <List>
//                 <ListItem button>
//                   <ListItemText primary="Testssssssssssssssssssssssssssssssssssssssssssssssssss" />
//                 </ListItem>
//                 <ListItem button>
//                   <ListItemText primary="Completed" />
//                 </ListItem>
//                 <ListItem button>
//                   <ListItemText primary="Completed" />
//                 </ListItem>
//               </List>
//             </Drawer>
//           </Box>
//         ) : (
//           <Box sx={{ width: '20%' }}>
//             {/* Drawer for larger screens */}
//             <Drawer anchor="left" open={true} variant="permanent">
//               <List>
//                 <ListItem button>
//                   <ListItemText primary="Test" />
//                 </ListItem>
//                 <ListItem button>
//                   <ListItemText primary="Completed" />
//                 </ListItem>
//                 <ListItem button>
//                   <ListItemText primary="Completed" />
//                 </ListItem>
//                 <ListItem button>
//                   <ListItemText primary="Completed" />
//                 </ListItem>
//               </List>
//             </Drawer>
//           </Box>
//         )}

//         <Box sx={{ width: '80%' }}>
//           <Navbar />
//           {children}
//         </Box>
//       </Box>
//     </>
//   );
// };

// export default Layout;

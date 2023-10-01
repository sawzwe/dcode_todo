// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Box from '@mui/material/Box';
// import Paper from '@mui/material/Paper';
// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import Typography from '@mui/material/Typography';
// import Checkbox from '@mui/material/Checkbox';
// import { styled } from '@mui/material/styles';
// import { IconButton, Grid } from '@mui/material';
// import { Button } from '@mui/material';
// import Fab from '@mui/material/Fab';
// import AddIcon from '@mui/icons-material/Add';
// import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';
// import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
// import DeleteDialog from './DeleteDialog';
// import UpdateDialog from './UpdateDialog';
// import CreateDialog from './CreateDialog';
// import { useMediaQuery } from '@mui/material';

// // // Define the hover animation CSS class
// // const HoverCard = styled(Card)(({ theme }) => ({
// //   transition: 'transform 0.2s ease-in-out',
// //   '&:hover': {
// //     transform: 'scale(1.04)',
// //   },
// //   display: 'flex',
// //   justifyContent: 'space-between',
// // }));

// const HoverCard = styled(Card)(({ theme }) => ({
//   transition: 'transform 0.2s ease-in-out',
//   '&:hover': {
//     transform: 'scale(1.04)',
//   },
//   display: 'flex',
//   justifyContent: 'space-between',
//   position: 'relative', // Add relative positioning to the HoverCard
// }));


// const TodoList = () => {

//   const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));

//   const [list, setList] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [dialogOpen, setDialogOpen] = useState(false);
//   const [dialogOpenCreate, setDialogOpenCreate] = useState(false);
//   const [dialogOpenUpdate, setDialogOpenUpdate] = useState(false);
//   const [dialogOpenDelete, setDialogOpenDelete] = useState(false);


//   const [taskIdToDelete, setTaskIdToDelete] = useState(null);
//   const [taskIdToUpdate, setTaskIdToUpdate] = useState(null);

//   const handleDeleteClick = (taskId) => {
//     // setDialogOpen(true);
//     setDialogOpenDelete(true);
//     setTaskIdToDelete(taskId);
//     // console.log(taskId);
//   };

//   const handleDeleteDialogClose = () => {
//     // setDialogOpen(false);
//     setDialogOpenDelete(false)
//     setTaskIdToDelete(null);
//   };

//   const handleUpdateClick = (taskId) => {
//     // setDialogOpen(true);
//     setDialogOpenUpdate(true);
//     setTaskIdToUpdate(taskId);
//     // console.log(taskId);
//   };

//   const handleUpdateDialogClose = () => {
//     // setDialogOpen(false);
//     setDialogOpenUpdate(false);
//     setTaskIdToUpdate(null);
//   };

//   const handleCreateClick = () => {
//     // setDialogOpen(true);
//     setDialogOpenCreate(true)
//   };

//   const handleCreateDialogClose = () => {
//     // setDialogOpen(false);
//     setDialogOpenCreate(false)
//   };

//   useEffect(() => {
//     axios
//       .get('/api/todoList')
//       .then((response) => {
//         // Filter completed tasks (where t.completed === false)
//         const completedTasks = response.data.filter((t) => t.completed === false);
//         setList(completedTasks);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error('Error fetching data:', error);
//         setLoading(false);
//       });
//   }, [list]);

//   const handleComplete = (taskId) => {
//     axios
//       .put("/api/todoList", {
//         id: taskId,
//         completed: true, // Set the completed status to true to mark the task as completed
//       })
//       .then((response) => {
//         if (response.data) {
//           // Successful request
//           // Update the list state with the updated task
//           const updatedList = list.map((t) =>
//             t._id === taskId ? { ...t, completed: true } : t
//           );
//           setList(updatedList);
//         } else {
//           throw new Error("Update failed");
//         }
//       })
//       .catch((error) => {
//         console.error("Error updating todo:", error);
//       });
//   };


//   if (loading) {
//     return (
//       // Center the loading gif inside the paper using Grid
//       <Grid
//         container
//         justifyContent="center"
//         alignItems="center"
//         sx={{ width: '100%', height: '85vh' }}
//       >
//         <Grid item>
//           <img src="/loading2.gif" alt="Loading..." />
//         </Grid>
//       </Grid>
//     );
//   }

//   return (
//     <>
//       <Box
//         sx={{
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           width: '100%',
//           height: '100vh',
//         }}
//       >
//         <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
//           <Paper elevation={0} variant="outlined" style={{ width: '100%', height: '100%', paddingTop: '20px' }}>
//             {list && list.length > 0 ? (
//               <>
//                 {list.map((t, index) => (
//                   <React.Fragment key={t._id}>
//                     <HoverCard
//                       key={t._id}
//                       variant="outlined"
//                       sx={{
//                         display: 'flex',
//                         width: '-80%',
//                         justifyContent: 'left',
//                         alignItems: 'center',
//                         my: index === 0 ? 0 : 2, // Adds margin only to cards except the first one
//                         mx: 4,
//                         position: 'relative', // Add relative positioning to the HoverCard
//                       }}
//                     >
//                       <CardActions sx={{ flex: '0 0 5%' }}>
//                       <Checkbox
//                         checked={t.completed}
//                         onChange={() => handleComplete(t._id)} // Complete a task
//                       />
//                     </CardActions>

//                     <CardContent sx={{ flex: '0 0 90%' }}>
//                       <Typography variant="h6" component="div">
//                         {t.title}
//                       </Typography>
//                       <Typography variant="subtitle2" component="div" sx={{ opacity: 0.7 }}>
//                         [Created On] {t.createdAt.split('T')[0]}
//                       </Typography>
//                     </CardContent>

//                     <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', flex: '0 0 5%' }}>
//                       <IconButton
//                         size="large"
//                         color="inherit"
//                         sx={{
//                           opacity: 0.7,
//                           position: 'absolute', // Use absolute positioning for the update and delete icons
//                           top: 0, // Position the icons at the top-right corner of the card
//                           right: 0,
//                         }}
//                         onClick={() => handleUpdateClick(t._id)}
//                       >
//                         <BorderColorRoundedIcon fontSize='small' color="primary" />
//                       </IconButton>

//                       <IconButton
//                         size="large"
//                         color="inherit"
//                         sx={{
//                           opacity: 0.7,
//                           position: 'absolute', // Use absolute positioning for the update and delete icons
//                           bottom: 0, // Position the icons at the bottom-right corner of the card
//                           right: 0,
//                         }}
//                         onClick={() => handleDeleteClick(t._id)}
//                       >
//                         <DeleteOutlineRoundedIcon fontSize='small' color="error" />
//                       </IconButton>
//                     </Box>
//                   </HoverCard>
//                   </React.Fragment>
//                 ))}
//             <Fab
//               variant="contained"
//               onClick={() => handleCreateClick()}
//               sx={{
//                 position: 'relative',
//                 bottom: 'auto',
//                 left: '50%', // Center the button horizontally
//                 transform: 'translate(-50%, 8%)', // Translate both X and Y by half of its width and height
//                 backgroundColor: '#FEFEFE',
//               }}
//             >
//               <AddIcon style={{ color: '#1976d2' }} />
//             </Fab>
//           </>
//           ) : (
//           <Grid
//             container
//             justifyContent="center"
//             alignItems="center"
//             height="85%"
//           >
//             <HoverCard
//               variant="outlined"
//               sx={{
//                 display: 'flex',
//                 flexDirection: 'column',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 width: '50%',
//                 height: '25%',
//               }}
//             >
//               <CardContent>
//                 <Typography variant="h5" component="div" sx={{ opacity: 0.7, padding: '10px' }}>
//                   No Task
//                 </Typography>
//               </CardContent>
//               <Button
//                 variant='outlined'
//                 size='large'
//                 onClick={() => handleCreateClick()}
//               >
//                 Create +
//               </Button>
//             </HoverCard>
//             <Fab
//               variant="contained"
//               onClick={() => handleCreateClick()}
//               sx={{
//                 position: 'absolute', // Use absolute positioning
//                 bottom: '1rem', // Position the button 1rem from the bottom
//                 right: '1rem', // Position the button 1rem from the right
//                 backgroundColor: '#FEFEFE', // Set the background color to #FEFEFE
//               }}
//             >
//               <AddIcon style={{ color: '#1976d2' }} />
//             </Fab>
//           </Grid>
//             )}
//         </Paper>
//       </Box>
//     </Box >

//       { dialogOpenDelete && taskIdToDelete && (
//         <DeleteDialog type={'active'} taskId={taskIdToDelete} onOpen={dialogOpenDelete} onClose={handleDeleteDialogClose} />
//       )
// }

// {
//   dialogOpenUpdate && taskIdToUpdate && (
//     <UpdateDialog taskId={taskIdToUpdate} onOpen={dialogOpenUpdate} onClose={handleUpdateDialogClose} />
//   )
// }

// {
//   dialogOpenCreate && (
//     <CreateDialog type="Create" onOpen={dialogOpenCreate} onClose={handleCreateDialogClose} />
//   )
// }
//     </>
//   );
// };

// export default TodoList;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import { styled } from '@mui/material/styles';
import { IconButton, Grid } from '@mui/material';
import { Button } from '@mui/material';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import DeleteDialog from './DeleteDialog';
import UpdateDialog from './UpdateDialog';
import CreateDialog from './CreateDialog';
import { useMediaQuery } from '@mui/material';
import jwt from 'jsonwebtoken'; // Import the jsonwebtoken library

// // Define the hover animation CSS class
// const HoverCard = styled(Card)(({ theme }) => ({
//   transition: 'transform 0.2s ease-in-out',
//   '&:hover': {
//     transform: 'scale(1.04)',
//   },
//   display: 'flex',
//   justifyContent: 'space-between',
// }));

const HoverCard = styled(Card)(({ theme }) => ({
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'scale(1.04)',
  },
  display: 'flex',
  justifyContent: 'space-between',
  position: 'relative', // Add relative positioning to the HoverCard
}));


const TodoList = () => {

  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogOpenCreate, setDialogOpenCreate] = useState(false);
  const [dialogOpenUpdate, setDialogOpenUpdate] = useState(false);
  const [dialogOpenDelete, setDialogOpenDelete] = useState(false);


  const [taskIdToDelete, setTaskIdToDelete] = useState(null);
  const [taskIdToUpdate, setTaskIdToUpdate] = useState(null);

  const handleDeleteClick = (taskId) => {
    // setDialogOpen(true);
    setDialogOpenDelete(true);
    setTaskIdToDelete(taskId);
    // console.log(taskId);
  };

  const handleDeleteDialogClose = () => {
    // setDialogOpen(false);
    setDialogOpenDelete(false)
    setTaskIdToDelete(null);
  };

  const handleUpdateClick = (taskId) => {
    // setDialogOpen(true);
    setDialogOpenUpdate(true);
    setTaskIdToUpdate(taskId);
    // console.log(taskId);
  };

  const handleUpdateDialogClose = () => {
    // setDialogOpen(false);
    setDialogOpenUpdate(false);
    setTaskIdToUpdate(null);
  };

  const handleCreateClick = () => {
    // setDialogOpen(true);
    setDialogOpenCreate(true)
  };

  const handleCreateDialogClose = () => {
    // setDialogOpen(false);
    setDialogOpenCreate(false)
  };

  const token = 'user'

  // // const jwt = require('jsonwebtoken');

  // // Your token payload
  // const tokenPayload = {
  //   id: '1',
  //   role: 'user'
  // };

  // // Your secret key from the environment variable
  // const secretKey = process.env.SECRET_KEY;


  // // Generate the JWT token
  // const token = jwt.sign(tokenPayload, secretKey, { expiresIn: '1h' });


  useEffect(() => {
    // Modify the headers to include a valid JWT token for a "user"
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Replace with the user token
      },
    };

    axios
      .get('/api/todoList', config) // Include the config in the GET request
      .then((response) => {
        // Filter completed tasks (where t.completed === false)
        const completedTasks = response.data.filter((t) => t.completed === false);
        setList(completedTasks);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, [list]);

  const handleComplete = (taskId) => {
    axios
      .put("/api/todoList", {
        id: taskId,
        completed: true, // Set the completed status to true to mark the task as completed
      })
      .then((response) => {
        if (response.data) {
          // Successful request
          // Update the list state with the updated task
          const updatedList = list.map((t) =>
            t._id === taskId ? { ...t, completed: true } : t
          );
          setList(updatedList);
        } else {
          throw new Error("Update failed");
        }
      })
      .catch((error) => {
        console.error("Error updating todo:", error);
      });
  };


  if (loading) {
    return (
      // Center the loading gif inside the paper using Grid
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ width: '100%', height: '85vh' }}
      >
        <Grid item>
          <img src="/loading2.gif" alt="Loading..." />
        </Grid>
      </Grid>
    );
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100vh',
        }}
      >
        <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
          <Paper elevation={0} variant="outlined" style={{ width: '100%', height: '100%', paddingTop: '20px' }}>
            {list && list.length > 0 ? (
              <>
                {list.map((t, index) => (
                  <React.Fragment key={t._id}>
                    <HoverCard
                      key={t._id}
                      variant="outlined"
                      sx={{
                        display: 'flex',
                        width: '-80%',
                        justifyContent: 'left',
                        alignItems: 'center',
                        my: index === 0 ? 0 : 2, // Adds margin only to cards except the first one
                        mx: 4,
                        position: 'relative', // Add relative positioning to the HoverCard
                      }}
                    >
                      <CardActions sx={{ flex: '0 0 5%' }}>
                        <Checkbox
                          checked={t.completed}
                          onChange={() => handleComplete(t._id)} // Complete a task
                        />
                      </CardActions>

                      <CardContent sx={{ flex: '0 0 90%' }}>
                        <Typography variant="h6" component="div">
                          {t.title}
                        </Typography>
                        <Typography variant="subtitle2" component="div" sx={{ opacity: 0.7 }}>
                          [Created On] {t.createdAt.split('T')[0]}
                        </Typography>
                      </CardContent>

                      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', flex: '0 0 5%' }}>
                        <IconButton
                          size="large"
                          color="inherit"
                          sx={{
                            opacity: 0.7,
                            position: 'absolute', // Use absolute positioning for the update and delete icons
                            top: 0, // Position the icons at the top-right corner of the card
                            right: 0,
                          }}
                          onClick={() => handleUpdateClick(t._id)}
                        >
                          <BorderColorRoundedIcon fontSize='small' color="primary" />
                        </IconButton>

                        <IconButton
                          size="large"
                          color="inherit"
                          sx={{
                            opacity: 0.7,
                            position: 'absolute', // Use absolute positioning for the update and delete icons
                            bottom: 0, // Position the icons at the bottom-right corner of the card
                            right: 0,
                          }}
                          onClick={() => handleDeleteClick(t._id)}
                        >
                          <DeleteOutlineRoundedIcon fontSize='small' color="error" />
                        </IconButton>
                      </Box>
                    </HoverCard>
                  </React.Fragment>
                ))}
                <Fab
                  variant="contained"
                  onClick={() => handleCreateClick()}
                  sx={{
                    position: 'relative',
                    bottom: 'auto',
                    left: '50%', // Center the button horizontally
                    transform: 'translate(-50%, 8%)', // Translate both X and Y by half of its width and height
                    backgroundColor: '#FEFEFE',
                  }}
                >
                  <AddIcon style={{ color: '#1976d2' }} />
                </Fab>
              </>
            ) : (
              <Grid
                container
                justifyContent="center"
                alignItems="center"
                height="85%"
              >
                <HoverCard
                  variant="outlined"
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '50%',
                    height: '25%',
                  }}
                >
                  <CardContent>
                    <Typography variant="h5" component="div" sx={{ opacity: 0.7, padding: '10px' }}>
                      No Task
                    </Typography>
                  </CardContent>
                  <Button
                    variant='outlined'
                    size='large'
                    onClick={() => handleCreateClick()}
                  >
                    Create +
                  </Button>
                </HoverCard>
                <Fab
                  variant="contained"
                  onClick={() => handleCreateClick()}
                  sx={{
                    position: 'absolute', // Use absolute positioning
                    bottom: '1rem', // Position the button 1rem from the bottom
                    right: '1rem', // Position the button 1rem from the right
                    backgroundColor: '#FEFEFE', // Set the background color to #FEFEFE
                  }}
                >
                  <AddIcon style={{ color: '#1976d2' }} />
                </Fab>
              </Grid>
            )}
          </Paper>
        </Box>
      </Box >

      {dialogOpenDelete && taskIdToDelete && (
        <DeleteDialog type={'active'} taskId={taskIdToDelete} onOpen={dialogOpenDelete} onClose={handleDeleteDialogClose} />
      )
      }

      {
        dialogOpenUpdate && taskIdToUpdate && (
          <UpdateDialog taskId={taskIdToUpdate} onOpen={dialogOpenUpdate} onClose={handleUpdateDialogClose} />
        )
      }

      {
        dialogOpenCreate && (
          <CreateDialog type="Create" onOpen={dialogOpenCreate} onClose={handleCreateDialogClose} />
        )
      }
    </>
  );
};

export default TodoList;

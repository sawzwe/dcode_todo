import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useRouter } from 'next/router';
import { useTheme } from '@mui/material/styles';
import { Typography } from '@mui/material';
import axios from 'axios';

export default function RecycleDialog({ taskId, onOpen, onClose }) {

  const [open, setOpen] = useState(onOpen);
  const [currentTaskTitle, setCurrentTaskTitle] = useState('');
  const [error, setError] = useState(false); // State to track the error status
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const router = useRouter();

  // When the "onOpen" prop changes, update the "open" state accordingly
  useEffect(() => {
    setOpen(onOpen);
  }, [onOpen]);

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  // Get current task
  useEffect(() => {
    axios
      .get('/api/todoList')
      .then((response) => {
        // Filter completed tasks (where t.completed === false)
        const current = response.data.filter((t) => t._id === taskId);
        setCurrentTaskTitle(current[0].title);
        // console.log(current[0].title)
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleRecycle = () => {
    // Make sure taskId and currentTaskTitle are defined before updating
    if (!taskId || !currentTaskTitle) {
      setError(true); // Set the error status to true
      return;
    }

    // Send a PUT request to the API with the updated task information
    axios
      .post('/api/todoList', {
        title: currentTaskTitle,
        completed: false,
      })
      .then((response) => {
        handleClose();
        router.push('/');
      })
      .catch((error) => {
        console.error('Error updating todo:', error);
      });
  };

  return (
    <>
      <Dialog fullScreen={fullScreen} open={open} onClose={handleClose}>
        <DialogTitle>Recycle Task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            type="text"
            fullWidth
            required
            value={currentTaskTitle}
            variant ="outlined"
            disabled
            onChange={(e) => {
              setError(false); // Reset the error status when the user starts typing
              setCurrentTaskTitle(e.target.value);
            }}
            error={error} // Show error when input is null
            helperText={error ? 'Invalid Value' : ''} // Show error message if there's an error
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="warning">
            <Typography>Cancel</Typography>
          </Button>
          <Button onClick={handleRecycle} autoFocus>
            <Typography>Recycle</Typography>
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}




// import * as React from 'react';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
// import useMediaQuery from '@mui/material/useMediaQuery';
// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { useTheme } from '@mui/material/styles';
// import axios from 'axios';


// export default function CreateDialog({ onOpen, onClose}) {

//     // console.log(onClose);
//     const [open, setOpen] = useState(onOpen);
//     const theme = useTheme();
//     const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
//     const router = useRouter();

//     const handleClickOpen = () => {
//         setOpen(true);
//     };

//     const handleClose = () => {
//         setOpen(false);
//         onClose();
//     };

//     const handleCreate = () => {
//         // console.log(`Deleting task with ID: ${taskId}`);
//         pass
//       };
    

//     return (
//         <div>
//             <Dialog fullScreen={fullScreen} open={open} onClose={handleClose}>
//                 <DialogTitle>Create Task</DialogTitle>
//                 <DialogContent>
//                     <TextField
//                         autoFocus
//                         margin="dense"
//                         id="name"
//                         label="Update"
//                         type="text"
//                         fullWidth
//                         variant="standard"
//                     />
//                 </DialogContent>
//                 <DialogActions>
//                     <Button autoFocus onClick={handleClose}>
//                         Cancel
//                     </Button>
//                     <Button onClick={handleCreate} autoFocus> 
//                         Update
//                     </Button>
//                 </DialogActions>
//             </Dialog>
//         </div>
//     );
// }


// CreateDialog.js

import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';

export default function CreateDialog({ type, onOpen, onClose }) {
  const [open, setOpen] = useState(onOpen);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const router = useRouter();
  const [title, setTitle] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  const handleCreate = async () => {
    try {
      const response = await axios.post('/api/todoList', {
        title: title,
        completed: false,
      });
      console.log('Created Todo:', response.data);
      handleClose();
      if (type === 'Create') {
        router.refresh();
      } else {
        router.push('/');
      }
    } catch (error) {
      console.error('Error creating todo:', error);
    }
  };
  

  return (
    <div>
      <Dialog fullScreen={fullScreen} open={open} onClose={handleClose}>
        <DialogTitle>Create Task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Add Task"
            type="text"
            fullWidth
            variant="standard"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleCreate} autoFocus>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

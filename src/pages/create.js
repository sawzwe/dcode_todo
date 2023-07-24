import React, { useState } from 'react';
import Layout from './Layout';
import { TextField, Button } from '@mui/material';
import { useRouter } from 'next/router'; // Import from next/router, not next/navigation
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

export default function Create() {
  const [title, setTitle] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false); // State to control Snackbar visibility
  const router = useRouter();

  const handleCreate = async () => {
    try {
      const response = await axios.post('/api/todoList', {
        title: title,
        completed: false,
      });
      console.log('Created Todo:', response);
      if (response.data) {
        
        setSnackbarOpen(true);
        // router.push('/');
      }
    } catch (error) {
      console.error('Error creating todo:', error);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Layout>
      <form onSubmit={handleCreate}>
        <TextField
          placeholder="Enter a task"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          sx={{ paddingTop: '20px', paddingBottom: '10px' }}
        />
        <Button type="submit" variant="outlined" size="large">
          Add Task
        </Button>
      </form>

      {/* Snackbar to show task creation success */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000} 
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        <MuiAlert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: '100%' }}
        >
          Task Created
        </MuiAlert>
      </Snackbar>
    </Layout>
  );
}






// import React, { useState } from 'react';
// import Layout from './Layout';
// import { TextField, Button } from '@mui/material';
// import { useRouter } from 'next/navigation';
// import axios from 'axios';
// import Snackbar from '@mui/material/Snackbar';
// import MuiAlert from '@mui/material/Alert';

// export default function Create() {
//     const [title, setTitle] = useState('');
//     const router = useRouter();

//     const handleCreate = async () => {
//         try {
//             const response = await axios.post('/api/todoList', {
//                 title: title,
//                 completed: false,
//             });
//             console.log('Created Todo:', response.data);
//             if (response.data) {
//                 router.push('/')
//             }


//         } catch (error) {
//             console.error('Error creating todo:', error);
//         }
//     };

//     return (
//         <Layout>


            
//             <form onSubmit={handleCreate}>
//                 <TextField
//                     placeholder='Enter a task'
//                     variant="outlined"
//                     value={title}
//                     onChange={(e) => setTitle(e.target.value)}
//                     fullWidth
//                     sx={{ paddingTop: "20px", paddingBottom: "10px" }}
//                 />
//                 <Button type="submit" variant="outlined" size='large'>
//                     Add Task
//                 </Button>
//             </form>
//         </Layout>
//     );
// }



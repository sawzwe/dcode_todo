import React, { useState } from 'react';
import { TextField, Button, Grid, Card, CardContent, Typography, Box ,Paper} from '@mui/material';
import { useRouter } from 'next/router'; // Import from next/router, not next/navigation
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { styled } from '@mui/material/styles';

const HoverCard = styled(Card)(({ theme }) => ({
    transition: 'transform 0.2s ease-in-out',
    '&:hover': {
        transform: 'scale(1.04)',
    },
    display: 'flex',
    justifyContent: 'space-between',
}));

export default function CreateForm() {
    const [title, setTitle] = useState('');
    const [loading, setLoading] = useState(true);
    const [snackbarOpen, setSnackbarOpen] = useState(false); 
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();

    const handleCreate = async () => {
        if (!title.trim()) { // Check if the input is empty or contains only whitespace characters
            setErrorMessage('Input must have a value');
            return;
        }

        try {
            const response = await axios.post('/api/todoList', {
                title: title,
                completed: false,
            });

            if (response === null) {
                setSnackbarOpen(true);
            } else {
                router.push('/');
                setSnackbarOpen(true);
            }
            console.log('Created Todo:', response);

        } catch (error) {
            console.error('Error creating todo:', error);
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    // if (loading) {
    //     return (
    //         // Center the loading gif inside the paper using Grid
    //         <Grid
    //             container
    //             justifyContent="center"
    //             alignItems="center"
    //             sx={{ width: '100%', height: '85vh' }}
    //         >
    //             <Grid item>
    //                 <img src="/loading2.gif" alt="Loading..." />
    //             </Grid>
    //         </Grid>
    //     );
    // }

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
      <Paper elevation={0} variant="outlined" style={{ width: '100%', height: '100%', paddingTop: '20px' }}>
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
                        <TextField
                            placeholder="Enter a task"
                            variant="outlined"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            fullWidth
                            sx={{ paddingTop: '20px', paddingBottom: '10px' }}
                        />
                        <Button onClick={handleCreate} variant="outlined" size="large">
                            Create Task
                        </Button>
                    </CardContent>
                </HoverCard>
            </Grid>
            </Paper>
            </Box>

            {/* Snackbar to show task creation success */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <MuiAlert
                    onClose={handleSnackbarClose}
                    severity="success"
                    sx={{ width: '100%' }}
                >
                    Task Created
                </MuiAlert>
            </Snackbar>

            {/* Snackbar to show error message */}
            <Snackbar
                open={!!errorMessage} // Convert errorMessage to a boolean to show the Snackbar
                autoHideDuration={3000}
                onClose={() => setErrorMessage('')} // Clear the error message when Snackbar is closed
                anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
            >
                <MuiAlert
                    onClose={() => setErrorMessage('')} // Clear the error message when Snackbar is closed
                    severity="error"
                    sx={{ width: '100%' }}
                >
                    {errorMessage}
                </MuiAlert>
            </Snackbar>
        </>
    );
}




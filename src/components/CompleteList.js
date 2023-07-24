import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import { Button } from '@mui/material';
import RecyclingRoundedIcon from '@mui/icons-material/RecyclingRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';

import CreateDialog from '@/components/CreateDialog';
import DeleteDialog from './DeleteDialog';
import RecycleDialog from './RecycleDialog';

// Define the hover animation CSS class
const HoverCard = styled(Card)(({ theme }) => ({
    transition: 'transform 0.2s ease-in-out',
    '&:hover': {
        transform: 'scale(1.04)',
    },
}));


const CompleteList = () => {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogOpenDelete, setDialogOpenDelete] = useState(false);
    const [dialogOpenRecycle, setDialogOpenRecycle] = useState(false);

    const [taskIdToDelete, setTaskIdToDelete] = useState(null);
    const [taskIdToRecycle, setTaskIdToRecycle] = useState(null);

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

    const handleRecycleClick = (taskId) => {
        // setDialogOpen(true);
        setDialogOpenRecycle(true);
        setTaskIdToRecycle(taskId);
        console.log(taskId);
    };

    const handleRecycleDialogClose = () => {
        // setDialogOpen(false);
        setDialogOpenRecycle(false)
        setTaskIdToRecycle(null);
    };

    const handleCreateClick = () => {
        setDialogOpen(true);
        // console.log(taskId);
    };

    const handleCreateDialogClose = () => {
        setDialogOpen(false);
    };

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
                        t._id === taskId ? { ...t, completed: false } : t
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

    useEffect(() => {
        axios
            .get('/api/todoList')
            .then((response) => {
                // Filter completed tasks (where t.completed === true)
                const completedTasks = response.data.filter((t) => t.completed === true);
                setList(completedTasks);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }, [list]);


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
                        {list && list.length > 0 ? (
                            list.map((t, index) => (
                                (<HoverCard
                                    key={t._id}
                                    variant="outlined"
                                    sx={{
                                        display: 'flex',
                                        width: '-80%',
                                        justifyContent: 'left',
                                        alignItems: 'center',
                                        my: index === 0 ? 0 : 2, // Adds margin only to cards except the first one
                                        mx: 4
                                    }}
                                >
                                    <CardActions>
                                        <Checkbox checked={t.completed} disabled={t.completed} />
                                    </CardActions>
                                    {/* <CardActions sx={{ flex: '0 0 5%' }}>
                                        <Checkbox
                                            checked={t.completed}
                                            onChange={() => handleComplete(t._id)} // Complete a task
                                        />
                                    </CardActions> */}
                                    <CardContent sx={{ flex: '0 0 90%' }}>
                                        <Typography variant="h6" component="div">
                                            {t.title}
                                        </Typography>
                                        <Typography variant="subtitle2" component="div" sx={{ opacity: 0.7 }}>
                                            [Created On] {t.createdAt.split('T')[0]}
                                            <span style={{ color: 'green', marginLeft: '8px' }}> [Completed On] {t.updatedAt.split('T')[0]}</span>
                                        </Typography>
                                    </CardContent>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', flex: '0 0 5%' }}>
                                        <IconButton size="large" color="inherit" sx={{ opacity: 0.7 }} onClick={() => handleRecycleClick(t._id)}>
                                            <RecyclingRoundedIcon fontSize='small' color="primary" />
                                        </IconButton>

                                        <IconButton size="large" color="inherit" sx={{ opacity: 0.7 }} onClick={() => handleDeleteClick(t._id)}>
                                            <DeleteOutlineRoundedIcon fontSize='small' color="error" />
                                        </IconButton>
                                    </Box>
                                </HoverCard>)
                            ))
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
                                            No Task Completed
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
                            </Grid>

                        )}
                    </Paper>

                </Box>
            </>

            {dialogOpen && (
                <CreateDialog onOpen={dialogOpen} onClose={handleCreateDialogClose} />
            )}

            {dialogOpenDelete && taskIdToDelete && (
                <DeleteDialog type={'complete'} taskId={taskIdToDelete} onOpen={dialogOpenDelete} onClose={handleDeleteDialogClose} />
            )}

            {dialogOpenRecycle && taskIdToRecycle && (
                <RecycleDialog taskId={taskIdToRecycle} onOpen={dialogOpenRecycle} onClose={handleRecycleDialogClose} />
            )}
        </>
    );
};

export default CompleteList;

import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';


export default function UpdateDialog({ taskId, onOpen, onClose }) {

    // console.log(onClose);
    // console.log(taskId);
    const [open, setOpen] = useState(onOpen);
    const [currentTaskTitle, setCurrentTaskTitle] = useState("");
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const router = useRouter();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        onClose();
    };

    //Get current task
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

    const handleUpdate = () => {
        // Make sure taskId and currentTaskTitle are defined before updating
        if (!taskId || !currentTaskTitle) {
            return;
        }

        // Send a PUT request to the API with the updated task information
        axios
            .put("/api/todoList", {
                id: taskId,
                title: currentTaskTitle,
            })
            .then((response) => {
                if (response.data) {
                    // Successful request
                    router.refresh(); // Reload the page after updating
                } else {
                    throw new Error("Update failed");
                }
                onClose();
            })
            .catch((error) => {
                console.error("Error updating todo:", error);
            });
    };


    return (
        <>
            <Dialog fullScreen={fullScreen} open={open} onClose={handleClose}>
                <DialogTitle>Update Task</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={currentTaskTitle}
                        onChange={(e) => setCurrentTaskTitle(e.target.value)}
                    />

                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button onClick={handleUpdate} autoFocus>
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

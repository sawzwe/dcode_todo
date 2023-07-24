import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Typography } from '@mui/material';

export default function DeleteDialog({ type, taskId, onOpen, onClose }) {
    // console.log(taskId);
    // console.log(onOpen);


    const [open, setOpen] = useState(onOpen);
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

    const handleDelete = () => {
        // console.log(`Deleting task with ID: ${taskId}`);

        axios
            .delete("/api/todoList", {
                data: { id: taskId },
            })
            .then((response) => {

                if (response.data) {
                    if(type==='complete'){
                        handleClose();
                        router.push('/completed');
                    }else{
                        handleClose();
                        router.push('/');
                    }
                    // Successful request

                } else {
                    throw new Error("Delete Failed failed");
                }
                // console.log(response.data); 
                // onClose();
            })
            .catch((error) => {
                console.error("Error deleting todo:", error);
            });
    };

    return (
        <>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {"Do you want to delete this task?"}
                </DialogTitle>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        <Typography>
                            Cancel
                        </Typography>

                    </Button>
                    <Button onClick={handleDelete} color="error" autoFocus>
                        <Typography>
                            Delete
                        </Typography>
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

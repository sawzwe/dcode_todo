import React from 'react';
import { Box, Grid, Typography, Card, CardContent, CardActions, Button, TextField,Fab } from '@mui/material';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';

export default function Login() {
    return (
        <Grid container justifyContent="center" alignItems="center" minHeight="100vh">
            <Card sx={{ width: { xs: "80%", sm: "50%", md: "30%" }, height: "50vh", borderRadius: 1 }}>
                <CardContent sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flexGrow: 1 }}>
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <img src="/todo-logo.png" alt="Todo" style={{ width: "108px", height: "96px" }} />
                    </Box>
                    <form>
                        <Box my={2}>
                            <TextField label="Username" variant="outlined" fullWidth />
                        </Box>
                        <Box my={2}>
                            <TextField label="Password" variant="outlined" type="password" fullWidth />
                        </Box>
                        <CardActions sx={{ justifyContent: "center" }}>
                            <Button variant="outlined" size="large" sx={{ width: "60%", backgroundColor: "#2196f3" }}>
                                Login
                            </Button>
                        </CardActions>
                    </form>
                    <Typography variant="body2" color="subtitle1" align="center" mt={2}>
                        OR
                    </Typography>
                    {/* <Fab>
                        <FacebookRoundedIcon color='blue'/>
                    </Fab> */}

                    <Typography variant="body2" color="textSecondary" align="center" mt={2}>
                        Don't have an account? <Button color="primary">Sign Up</Button>
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    );
}



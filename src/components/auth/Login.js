// import React from 'react';
// import { Box, Grid, Typography, Card, CardContent, CardActions, Button, TextField,Fab } from '@mui/material';

// export default function Login() {
//     return (
//         <Grid container justifyContent="center" alignItems="center" minHeight="100vh">
//             <Card sx={{ width: { xs: "80%", sm: "50%", md: "30%" }, height: "50vh", borderRadius: 1 }}>
//                 <CardContent sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flexGrow: 1 }}>
//                     <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
//                         <img src="/todo-logo.png" alt="Todo" style={{ width: "108px", height: "96px" }} />
//                     </Box>
//                     <form>
//                         <Box my={2}>
//                             <TextField label="Username" variant="outlined" fullWidth />
//                         </Box>
//                         <Box my={2}>
//                             <TextField label="Password" variant="outlined" type="password" fullWidth />
//                         </Box>
//                         <CardActions sx={{ justifyContent: "center" }}>
//                             <Button variant="outlined" size="large" sx={{ width: "60%" }}>
//                                 Login
//                             </Button>
//                         </CardActions>
//                     </form>
//                     <Typography variant="body2" color="textSecondary" align="center" mt={2}>
//                         Don't have an account? <Button color="primary">Sign Up</Button>
//                     </Typography>
//                 </CardContent>
//             </Card>
//         </Grid>
//     );
// }


import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Grid, Typography, Card, CardContent, CardActions, Button, TextField } from '@mui/material';
import axios from 'axios';

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    try {
      // Make the POST request to the "api/auth/login" endpoint
      const response = await axios.post('/api/auth/login', formData);

      // Handle the response based on the API logic
      if (response.status === 200) {
        // If credentials are correct, store the token in localStorage
        localStorage.setItem('token', response.data.token);

        // Redirect to the root page ("/")
        router.push('/');
      } else {
        // Handle other response statuses or errors
        console.log('Login failed');
      }
    } catch (error) {
      // Handle errors from the API call
      console.error('Error:', error.message);
    }
  };

  return (
    <Grid container justifyContent="center" alignItems="center" minHeight="100vh">
      <Card sx={{ width: { xs: "80%", sm: "50%", md: "30%" }, height: "50vh", borderRadius: 1 }}>
        <CardContent sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flexGrow: 1 }}>
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <img src="/todo-logo.png" alt="Todo" style={{ width: "108px", height: "96px" }} />
          </Box>
          <form>
            <Box my={2}>
              <TextField
                name="username"
                label="Username"
                variant="outlined"
                fullWidth
                value={formData.username}
                onChange={handleInputChange}
              />
            </Box>
            <Box my={2}>
              <TextField
                name="password"
                label="Password"
                variant="outlined"
                type="password"
                fullWidth
                value={formData.password}
                onChange={handleInputChange}
              />
            </Box>
            <CardActions sx={{ justifyContent: "center" }}>
              <Button
                variant="outlined"
                size="large"
                sx={{ width: "60%" }}
                onClick={handleLogin}
              >
                Login
              </Button>
            </CardActions>
          </form>
          <Typography variant="body2" color="textSecondary" align="center" mt={2}>
            Don't have an account? <Button color="primary">Sign Up</Button>
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    background: {
      default: '#FCFBFB', // Set the default background color to gray (#f5f5f5)
      // default: '#1B262C', // Set the default background color to gray (#f5f5f5)
      dark:'#051628',
      light:'#FEFEFE',      
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

export default theme;

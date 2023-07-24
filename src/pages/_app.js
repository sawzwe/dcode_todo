import '@/styles/globals.css'
import Navbar from '@/components/Navbar'
import { Box } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../theme';

export default function App({ Component, pageProps }) {
  return (
    <>
      {/* <Component {...pageProps} /> */}
      <ThemeProvider theme={theme}>
        <CssBaseline />
          <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}


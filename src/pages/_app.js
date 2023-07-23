import '@/styles/globals.css'
import Navbar from '@/components/Navbar'
import { Box } from '@mui/material'

export default function App({ Component, pageProps }) {
  return (
    <>
      {/* <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <Box sx={{ width: '20%' }} />
        <Box sx={{ width: '80%' }}>
          <Navbar />
          <Component {...pageProps} />
        </Box>
      </Box> */}
      <Component {...pageProps} />
    </>
  )
}

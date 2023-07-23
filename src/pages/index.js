import TodoList from "@/components/TodoList";
import Box from '@mui/material/Box';
import Layout from "./Layout";

const IndexPage = () => {
  return (
    // <Layout>
    //   <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
    //     <Box sx={{ width: '20%' }} />
    //     <Box sx={{ width: '80%' }}>
    //       <TodoList />
    //     </Box>
    //   </Box>
    // </Layout>

    <Layout>
      <TodoList />
    </Layout>
  );
};

export default IndexPage;

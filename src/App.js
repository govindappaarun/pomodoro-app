import React from 'react';
import {
  ChakraProvider,
  Box,
  VStack,
  Grid,
  theme,
  Text,
  Button,
  IconButton,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { MdCloudDone } from 'react-icons/md';
import { BsBarChart } from 'react-icons/bs';
import AuthService from './services/AuthService';
function App() {
  const handleLoginWithGoogle = async () => {
    const result = await AuthService.authWithGoogle().catch(e => {
      console.log(e.toString());
    });
    // setUser(result.user);
    // be careful with what you store here
    // only store the necessary For example: user_id, user_photoUrl, user_name
    // for user token I think it is not a good idea to store in localStorage
    // but this is the demo I am going to store all of the info
    // localStorage.setItem("user", JSON.stringify(result.user));
    // navigate("/", { replace: true });
    console.log({ result });
  };
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <Box textAlign="center" fontSize="xl">
            <MdCloudDone />
            <Text>Pomofocus</Text>
            <IconButton icon={<BsBarChart />}>Report</IconButton>
            <IconButton icon={<BsBarChart />}>Settings</IconButton>
            <IconButton icon={<BsBarChart />}>Login</IconButton>
            <ColorModeSwitcher justifySelf="flex-end" />
            <Button onClick={handleLoginWithGoogle}>Google Login</Button>
          </Box>
          <VStack spacing={8}>Hello Pomofocus.in</VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;

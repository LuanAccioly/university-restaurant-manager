import React from 'react';
import {
  ChakraProvider,
  Box,
  Grid,
  extendTheme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Login } from './pages/Login/Login';
import { Register } from './pages/Register/Register';
import theme from './styles/theme.js'
// import { Route, Routes } from "react-router-dom";

const appTheme = extendTheme(theme) 
function App() {
  return (
    <ChakraProvider theme={appTheme}>
      <Box textAlign="center" fontSize="xl">
        <Grid p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
        </Grid>
        <Register />
      </Box>
    </ChakraProvider>
  );
}

export default App;

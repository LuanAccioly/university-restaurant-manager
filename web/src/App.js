import React from 'react';
import {
  ChakraProvider,
  extendTheme,
} from '@chakra-ui/react';
import { Login } from './pages/Login/Login';
import { Register } from './pages/Register/Register';
import theme from './styles/theme.js'
import { Header } from './components/Header/Header';

const appTheme = extendTheme(theme) 
function App() {
  return (
    <ChakraProvider theme={appTheme}>
        <Header/>
        <Login />
    </ChakraProvider>
  );
}

export default App;

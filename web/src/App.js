import React from 'react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { Login } from './pages/Login/Login';
import { Register } from './pages/Register/Register';
import theme from './styles/theme.js';
import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Layout } from './pages/Layout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/login',
        element: <Login />,
      },
    ],
  },
]);

const appTheme = extendTheme(theme);
function App() {
  return (
    <ChakraProvider theme={appTheme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  );
}

export default App;

import { ColorModeScript } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { Login } from './pages/Login/Login';
import { Register } from './pages/Register/Register';
import theme from './styles/theme.js';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import { Layout } from './pages/Layout';
import { AuthProvider } from './contexts/AuthContext';
import { Redirect } from "react-router-dom";
import { Home } from './pages/Home/Home';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

const routes = createBrowserRouter([
  {
    path: '/hub',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'login',
        element: <Login />,
      },
    ],
  },
  {
    path: '/cal',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'login',
        element: <Login />,
      },
    ],
  },
]/* , {
  basename: '/hub'
} */);


const appTheme = extendTheme(theme);

root.render(
  <StrictMode>
    <ColorModeScript />
    <ChakraProvider theme={appTheme}>
      <AuthProvider>
        <RouterProvider router={routes} />
      </AuthProvider>
    </ChakraProvider>
  </StrictMode>
);

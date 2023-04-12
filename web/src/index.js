import { ColorModeScript } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { Login } from './pages/Login/Login';
import { Register } from './pages/Register/Register';
import theme from './styles/theme.js';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from './pages/Layout';
import { ListOfDishes } from './pages/ListOfDishes/ListOfDishes';
import { AuthProvider } from './contexts/AuthContext';
import { Home } from './pages/Home/Home';
import { Menu } from './pages/Menu/Menu';
import { DishRegistration } from './pages/DishRegistration/DishRegistration';
import { DishEdit } from './pages/DishEdit/DishEdit';
import { MenuRegistration } from './pages/MenuRegistration/MenuRegistration';
import { ListOfMenus } from './pages/ListOfMenus/ListOfMenus';
import { ListOfTransactions } from './pages/ListOfTransactions/ListOfTransactions';
import { Payment } from './pages/Payment/Payment';
import { MenuEdit } from './pages/MenuEdit/MenuEdit';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

const routes = createBrowserRouter(
  [
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
        {
          path: 'pay',
          element: <Payment />,
        },
      ],
    },
    {
      path: '/cal',
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        {
          path: 'dish',
          element: <ListOfDishes />,
        },
        {
          path: 'dish/create',
          element: <DishRegistration />,
        },
        {
          path: 'dish/:dishId',
          element: <DishEdit />,
        },
        {
          path: 'menu',
          element: <ListOfMenus />,
        },
        {
          path: 'menu/create',
          element: <MenuRegistration />,
        },
        {
          path: 'menu/:menuDate/:menuTurn',
          element: <MenuEdit />,
        },
        {
          path: 'transactions',
          element: <ListOfTransactions />,
        },
      ],
    },
  ] /* , {
  basename: '/hub'
} */
);

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

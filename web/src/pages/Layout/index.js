import { Flex, Heading, useColorModeValue } from '@chakra-ui/react';
import { ColorModeSwitcher } from '../../ColorModeSwitcher';

import { Outlet } from 'react-router-dom';
import { Header } from '../../components/Header/Header';

export const Layout = () => {
  const outlineColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

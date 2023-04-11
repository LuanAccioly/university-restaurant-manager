import { Center, Flex } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { Menu } from '../Menu/Menu';
import { WeeklyMenu } from '../WeeklyMenu/WeeklyMenu';

export const Home = () => {
  const { isAuthenticated, user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
      <>
      {isAuthenticated ? (
        <WeeklyMenu />
      ) : (
        <WeeklyMenu />
      )}
      </>
  );
};
export default Home;

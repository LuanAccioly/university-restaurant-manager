import {useEffect, useContext} from 'react'
import { Outlet } from 'react-router-dom';
import { useNavigate, useLocation, redirect } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { MobileNav, SidebarWithHeader } from '../../components/SideBarWithHeader/SideBarWithHeader';
import { Center, Flex, Spinner } from '@chakra-ui/react';


export const Layout = () => {
  const {isAuthenticated, user, isHub, isLoading, setIsHub} = useContext(AuthContext)
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if(isLoading) return;

    if(location.pathname.startsWith('/cal') && isHub && isAuthenticated && !isLoading) {
      setIsHub(false)
    }

    if(!isAuthenticated && location.pathname !== '/hub/register' && location.pathname !== '/hub' && !isLoading) {
      navigate("/hub/login");
    }

    if(isAuthenticated && (location.pathname === '/hub/login' || location.pathname === '/hub/register') && !isLoading) {
      navigate("/hub");
    }
  }, [isAuthenticated, location.pathname, isLoading]);

  if(isLoading) {
    return <Center h={'100vh'}>
      <Spinner/>
    </Center>
  }

  return (
    <>
      {!user?.manager ? (
      <>
      {isAuthenticated && <MobileNav/>}
      <Outlet />
      </>
      ) : (
        isHub ? <>
        {isAuthenticated && <MobileNav/>}
        <Outlet />
        </> :
        <SidebarWithHeader>
        <Flex h={isAuthenticated ? '92vh' : '100vh'}>
        <Outlet />
        </Flex>
      </SidebarWithHeader>
      )}
    </>
  );
};

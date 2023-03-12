import {useEffect, useContext} from 'react'
import { Outlet } from 'react-router-dom';
import { useNavigate, useLocation, redirect } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { MobileNav, SidebarWithHeader } from '../../components/SideBarWithHeader/SideBarWithHeader';
import { Center, Spinner } from '@chakra-ui/react';


export const Layout = () => {
  const {isAuthenticated, user, isHub, isLoading} = useContext(AuthContext)
  const navigate = useNavigate();
  const location = useLocation();


  useEffect(() => {
    if(!isAuthenticated && location.pathname !== '/hub/register' && location.pathname !== '/hub') {
      navigate("/hub/login");
    }

    if(isAuthenticated && (location.pathname === '/hub/login' || location.pathname === '/hub/register')) {
      navigate("/hub");
    }
  }, [isAuthenticated, location.pathname]);

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
        <Outlet />
      </SidebarWithHeader>
      )}
    </>
  );
};

import {useEffect, useContext} from 'react'
import { Outlet } from 'react-router-dom';
import { useNavigate, useLocation  } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { Header } from '../../components/Header/Header';
import { MobileNav, SidebarWithHeader } from '../../components/SideBarWithHeader/SideBarWithHeader';


export const Layout = () => {
  const {isAuthenticated, user, isHub} = useContext(AuthContext)
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if(!isAuthenticated && location.pathname !== '/hub/register' && location.pathname !== '/hub') {
      navigate("/hub/login");
    }
  }, []);


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

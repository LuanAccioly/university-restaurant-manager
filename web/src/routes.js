import React from "react";
import { Route, BrowserRouter } from "react-router-dom";

import LoginPage from "./pages/Login/Login.js";
// import Sobre from "./Sobre";
// import Usuario from "./Usuario";

const Routes = () => {
   return(
       <BrowserRouter>
           <Route component = { LoginPage }  path="/" exact />
           {/* <Route component = { Sobre }  path="/sobre" /> */}
           {/* <Route component = { Usuario }  path="/usuario" /> */}
       </BrowserRouter>
   )
}

export default Routes;
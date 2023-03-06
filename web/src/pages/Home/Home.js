import {Center, Flex} from "@chakra-ui/react"
import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export const Home = () => {
    const {isAuthenticated, user} = useContext(AuthContext)

    return(

        <Flex size="100vh" h={"90vh"}>
            {isAuthenticated ? 
            (<Center w={"100%"} bg={"pink.200"}>
                <p>LOGADO {user.name}</p>
            </Center>) : 
            (<Center w={"100%"} bg={"pink.200"}>
                <p>NAO LOGADO</p>
            </Center>)}
        </Flex>
    )
} 
export default Home;
import { Box, Button, Center, Link, VStack} from "@chakra-ui/react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { EmailInput } from "../../components/EmailInput/EmailInput";
import { PasswordInput } from "../../components/PasswordInput/PasswordInput";
import { AuthContext } from "../../contexts/AuthContext";
import {useToast} from '@chakra-ui/react'


export const Login = () => {
    const toast = useToast();
    const navigate = useNavigate();
    const {signIn, isAuthenticated} = useContext(AuthContext)

    async function handleSignIn(){
        try {
            await signIn({email: 'dev@email.com', password: 'zxczxc'})
            navigate('/hub')
        } catch (error) {
            toast({
                title: `${error.response.data.message}`,
                position: 'top-right',
                status: 'error',
                isClosable: true,
              })
        }
    }

    return (
        <Center minH={isAuthenticated ? "92vh" : '100vh'}>
            <Box p={6} maxW="sm" borderWidth="2px" borderRadius="lg" >
                <VStack spacing={4} align='stretch'>
                    <EmailInput/>
                    <PasswordInput marginTop={150}/>
                    <Button w={"100%"} colorScheme='green' onClick={handleSignIn}>Entrar</Button>
                </VStack>
                <Box>
                    <Link href="/hub/register" fontSize={14} color="blue.400">Cadastre-se</Link>
                </Box>
            </Box>

        </Center>
    );
};

export default Login;
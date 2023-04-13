import { Box, Button, Center, Link, VStack} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EmailInput } from "../../components/EmailInput/EmailInput";
import { PasswordInput } from "../../components/PasswordInput/PasswordInput";
import { AuthContext } from "../../contexts/AuthContext";
import {useToast} from '@chakra-ui/react'


export const Login = () => {
    const toast = useToast();
    const navigate = useNavigate();
    const {signIn, isAuthenticated} = useContext(AuthContext)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function handleSignIn(){
        try {
            await signIn({email: email, password: password})
            //await signIn({email: 'dev@email.com', password: 'zxczxc'})
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
                    <EmailInput value={email} onChange={(event) => setEmail(event.target.value)} />
                    <PasswordInput marginTop={150} value={password} onChange={(event) => setPassword(event.target.value)} />
                    <Button w={"100%"} colorScheme='green' onClick={handleSignIn}>Entrar</Button>
                </VStack>
                <Box>
                    <Link onClick={() => navigate('/hub/register')} fontSize={14} color="blue.400">Cadastre-se</Link>
                </Box>
            </Box>

        </Center>
    );
};

export default Login;
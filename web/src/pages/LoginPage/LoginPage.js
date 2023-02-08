import { Box, Button, Center, Link, VStack} from "@chakra-ui/react";
import { EmailInput } from "../../components/EmailInput/EmailInput";
import { PasswordInput } from "../../components/PasswordInput/PasswordInput";

export const LoginPage = () => {
    return (
        <Center minH="90vh">
            <Box p={6} maxW="sm" borderWidth="2px" borderRadius="lg" >
                <VStack spacing={4} align='stretch'>
                    <EmailInput/>
                    <PasswordInput marginTop={150}/>
                    <Button w={"100%"} colorScheme='green'>Entrar</Button>
                </VStack>
                <Box>
                    <Link fontSize={14} color="blue.400">Cadastre-se</Link>
                </Box>
            </Box>

        </Center>
    );
};
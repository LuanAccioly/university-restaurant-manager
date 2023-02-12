import { Box, Center, Checkbox, Flex, Heading, HStack, VStack } from "@chakra-ui/react"
import React from "react";
import { EmailInput } from "../../components/EmailInput/EmailInput"
import NormalInput from "../../components/NormalInput/NormalInput";

export const Register = () => {
    const [registred, setRegistred] = React.useState(true)
    return(

        <Flex size="100vh" h={"90vh"}>
            <Center w={"60%"} bg={"pink.200"}>
                <p>olaola</p>
            </Center>
            <Box flex={1} pt={"20px"} paddingInline={"3%"}>
                <Flex >
                    <Heading>Cadastro</Heading>
                </Flex>

                <VStack  mt={50} spacing={"30px"}>
                    <HStack spacing={3} w={"100%"}>
                        <Box flex={1}>
                            <NormalInput title="Primeiro nome"/>
                        </Box>
                        <Box flex={1}>
                            <NormalInput title="Segundo nome"/>
                        </Box>
                    </HStack>
                    <EmailInput/>
                    <Checkbox 
                        defaultChecked 
                        w={"100%"} 
                        isChecked={registred}
                        onChange={(e) => {setRegistred(e.target.checked)}}>
                        Sou alune matriculade na UFRPE
                    </Checkbox>
                    <HStack spacing={30} w={"100%"}>
                        <Box flex={1}>
                            <NormalInput active={registred? false : true} title="Matrícula"/>
                        </Box>
                        <Box flex={1}>
                            <NormalInput title="Suas lamúrias:"/>
                        </Box>
                    </HStack>
                </VStack>

            </Box>
        </Flex>
    )
} 
export default Register;
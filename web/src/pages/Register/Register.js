import { Box, Center, Checkbox, Flex, FormControl, FormLabel, Heading, HStack, Input, VStack } from "@chakra-ui/react"
import React, { useEffect, useState } from "react";
import { EmailInput } from "../../components/EmailInput/EmailInput"
import NormalInput from "../../components/NormalInput/NormalInput";

export const Register = () => {
    const [registred, setRegistred] = React.useState(true)
    const [matricula, setMatricula] = useState('')

    useEffect(() => {
      if(!registred) {
          setMatricula('');
      }
  }, [registred])
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
                          <FormControl isRequired isDisabled={!registred ? true : false}>
                              <FormLabel>Matrícula </FormLabel>
                              <Input 
                              value={matricula}
                              onChange={e => setMatricula(e.target.value)}
                              placeholder=''/>
                          </FormControl>
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
import { Box, Center, Divider, Flex, FormControl, Heading, HStack, VStack } from "@chakra-ui/react"
import { EmailInput } from "../../components/EmailInput/EmailInput"

export const Register = () => {
    return(

        <Flex size="100vh" h={"90vh"}>
            <Center w={"40%"} bg={"pink.200"}>
                <p>olaola</p>
            </Center>
            <Box flex={1}>
                <Flex ml={"100px"}>
                    <Heading>Cadastro</Heading>
                </Flex>
                <FormControl paddingInline={"100px"} mt={50}>
                    <HStack spacing={30}>
                        <Box w={"100%"}>
                            <EmailInput/>
                        </Box>
                        <Box w={"100%"}>
                            <EmailInput/>
                        </Box>
                    </HStack>
                </FormControl>

            </Box>
        </Flex>
    )
} 
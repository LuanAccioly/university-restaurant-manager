import { Center, Flex, VStack } from "@chakra-ui/react"
import { EmailInput } from "../../components/EmailInput/EmailInput"

export const Register = () => {
    return(

        <Flex size="100vh" h={"90vh"}>
            <Center w={"40%"} bg={"pink.200"}>
                <p>olaola</p>
            </Center>
            <Center flex={1} bg={"yellow"}>
                <VStack spacing={"30px"} w={"100%"} bg={"blue"} p={"50px"}>
                    <Flex bg={"red"}>
                        <EmailInput />
                        <EmailInput />
                    </Flex>
                    <Flex bg={"red"}>
                        <EmailInput />
                        <EmailInput />
                    </Flex>
                    <Flex bg={"red"}>
                        <EmailInput />
                        <EmailInput />
                    </Flex>
                </VStack>
            </Center>
        </Flex>
    )
} 
import { Flex, Heading, useColorModeValue } from "@chakra-ui/react"
import { Outlet, Link } from "react-router-dom";
import { ColorModeSwitcher } from "../../ColorModeSwitcher"

export const Header = () => {
    const outlineColor = useColorModeValue('gray.200', 'gray.700')

    return(
        <Flex
            borderBottom={"2px"}
            borderColor={outlineColor}
            p={3} 
            justifyContent={"space-between"} 
            alignItems={"center"}
            >
            <Heading size='md'>UFRPE - RU</Heading >
            <ColorModeSwitcher/>
        </Flex>

    )
    
}
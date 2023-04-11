import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement } from "@chakra-ui/react"
import React from 'react';

export const PasswordInput= ({...rest}) => {
    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)
  
    return (
        <FormControl>
        <FormLabel>Senha</FormLabel>
        <InputGroup size='md'>
            <Input
            {...rest}
            marginTop={0}
            pr='4.5rem'
            type={show ? 'text' : 'password'}
            placeholder='Enter password'
            />
            <InputRightElement width='4.5rem'>
            <Button h='1.75rem' size='sm' onClick={handleClick}>
                {show ? 'Ocultar' : 'Ver'}
            </Button>
            </InputRightElement>
        </InputGroup>
        </FormControl>
    )
  }
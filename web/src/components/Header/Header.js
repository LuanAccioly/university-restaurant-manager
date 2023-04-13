import { Flex, Heading, useColorModeValue, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { ColorModeSwitcher } from '../../ColorModeSwitcher';
import { AuthContext } from '../../contexts/AuthContext';

export const Header = () => {
  const outlineColor = useColorModeValue('gray.200', 'gray.700');
  const {signOut} = useContext(AuthContext)

  const navigate = useNavigate();

  return (
    <Flex
      borderBottom={'2px'}
      borderColor={outlineColor}
      p={3}
      justifyContent={'space-between'}
      alignItems={'center'}
    >
      <Heading size="md" cursor={'pointer'} onClick={() => navigate('/hub')}>
        UFRPE - RU
      </Heading>
      <Flex>
        <ColorModeSwitcher />
        <Button onClick={() => {
                signOut()
                }}>Sair</Button>
      </Flex>
    </Flex>
  );
};

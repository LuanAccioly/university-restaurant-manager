import { Flex, Heading, useColorModeValue } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { ColorModeSwitcher } from '../../ColorModeSwitcher';

export const Header = () => {
  const outlineColor = useColorModeValue('gray.200', 'gray.700');

  const navigate = useNavigate();

  return (
    <Flex
      borderBottom={'2px'}
      borderColor={outlineColor}
      p={3}
      justifyContent={'space-between'}
      alignItems={'center'}
    >
      <Heading size="md" cursor={'pointer'} onClick={() => navigate('/login')}>
        UFRPE - RU
      </Heading>
      <ColorModeSwitcher />
    </Flex>
  );
};

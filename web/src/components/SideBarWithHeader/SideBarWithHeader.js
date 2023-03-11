import React, { ReactNode, useState } from 'react';
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  Button,
  VStack,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  Menu,
  Heading,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Input,
  DrawerFooter,
} from '@chakra-ui/react';
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
  FiBell,
  FiShoppingCart,
  FiChevronDown,
} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { ColorModeSwitcher } from '../../ColorModeSwitcher';
import { AuthContext } from '../../contexts/AuthContext';

const LinkItems = [
  { name: 'Home', icon: FiHome },
  { name: 'Trending', icon: FiTrendingUp },
  { name: 'Explore', icon: FiCompass },
  { name: 'Favourites', icon: FiStar },
  { name: 'Settings', icon: FiSettings },
];

function DrawerExample() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const [lunch, setLunch] = useState(0);
  const [dinner, setDinner] = useState(0);

  return (
    <>
      <Button ref={btnRef} colorScheme="teal" onClick={onOpen}>
        Comprar
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Compra de fichas</DrawerHeader>
          <Flex w="100%" h="100%" alignItems="center" justifyContent="center">
            <VStack spacing="90px">
              <VStack>
                <HStack spacing="4rem">
                  <Button
                    borderRadius="100%"
                    size="xs"
                    fontWeight="extrabold"
                    isDisabled={lunch == 0 ? true : false}
                    onClick={() => setLunch(lunch - 1)}
                  >
                    -
                  </Button>
                  <Flex w="80px" justifyContent="center">
                    <Heading as="h4" size="md">
                      Almoço
                    </Heading>
                  </Flex>
                  <Button
                    borderRadius="100%"
                    size="xs"
                    fontWeight="extrabold"
                    onClick={() => setLunch(lunch + 1)}
                  >
                    +
                  </Button>
                </HStack>
                <Text fontSize="sm">quantidade: {lunch}</Text>
              </VStack>
              <VStack>
                <HStack spacing="4rem">
                  <Button
                    borderRadius="100%"
                    size="xs"
                    fontWeight="extrabold"
                    isDisabled={dinner == 0 ? true : false}
                    onClick={() => setDinner(dinner - 1)}
                  >
                    -
                  </Button>
                  <Flex w="80px" justifyContent="center">
                    <Heading as="h4" size="md">
                      Jantar
                    </Heading>
                  </Flex>
                  <Button
                    borderRadius="100%"
                    size="xs"
                    fontWeight="extrabold"
                    onClick={() => setDinner(dinner + 1)}
                  >
                    +
                  </Button>
                </HStack>
                <Text fontSize="sm">quantidade: {dinner}</Text>
              </VStack>
            </VStack>
          </Flex>
          <Flex justifyContent="center" fontWeight="bold">
            Total: R${dinner * 3 + lunch * 3.5}
          </Flex>
          <DrawerFooter>
            <Button w="100%" colorScheme="blue">
              Confirmar pagamento
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
export function SidebarWithHeader({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }}>
        {children}
        {console.log(isOpen)}
      </Box>
    </Box>
  );
}

const SidebarContent = ({ onClose, ...rest }) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Logo
        </Text>
        <CloseButton
          display={{ base: 'flex', md: 'none' }}
          onClick={onClose}
          bg="blue"
        />
        <Button bg="blue" onClick={onClose}>
          dsad
        </Button>
      </Flex>
      {LinkItems.map(link => (
        <NavItem key={link.name} icon={link.icon}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

const NavItem = ({ icon, children, ...rest }) => {
  return (
    <Link
      href="#"
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

export const MobileNav = ({ onOpen, ...rest }) => {
  const outlineColor = useColorModeValue('gray.200', 'gray.700');
  const { signOut, user, isHub, setIsHub } = useContext(AuthContext);

  const navigate = useNavigate();

  async function handleSignOut() {
    signOut();
    navigate('/hub');
  }

  return (
    <Flex
      ml={{ base: 0, md: !isHub ? 60 : 0 }}
      px={{ base: 4, md: 4 }}
      height={'8vh'}
      alignItems="center"
      // bg="blue"
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'space-between' }}
      {...rest}
    >
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: 'flex', md: 'none' }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        Logo
      </Text>
      <Heading size="md" cursor={'pointer'} onClick={() => navigate('/hub')}>
        UFRPE - RU
      </Heading>

      <HStack spacing={{ base: '0', md: '6' }}>
        {!user?.manager && (
          <IconButton
            size="lg"
            variant="ghost"
            aria-label="open menu"
            icon={<FiShoppingCart />}
          />
        )}
        <ColorModeSwitcher />
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: 'none' }}
            >
              <HStack>
                <Avatar
                  size={'sm'}
                  src={
                    'https://icon-library.com/images/generic-user-icon/generic-user-icon-19.jpg'
                  }
                />
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">{user?.name}</Text>
                  <Text fontSize="xs" color="gray.600">
                    {user?.manager ? 'Admin' : 'Usuário'}
                  </Text>
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue('white', 'gray.900')}
              borderColor={useColorModeValue('gray.200', 'gray.700')}
            >
              {user?.manager && (
                <MenuItem
                  onClick={() => {
                    navigate(isHub ? '/cal' : '/hub');
                    setIsHub(isHub ? false : true);
                  }}
                >
                  {isHub ? 'Gestão' : 'Visualização'}
                </MenuItem>
              )}
              <MenuItem>Perfil</MenuItem>
              <MenuDivider />
              <MenuItem onClick={handleSignOut}>Sair</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
        <DrawerExample />
      </HStack>
    </Flex>
  );
};

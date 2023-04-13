import React, { useEffect, useState } from 'react';
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
  Image,
  MenuGroup,
  MenuOptionGroup,
  MenuItemOption,
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
import { BiDish, BiFoodMenu , BiTransfer} from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { ColorModeSwitcher } from '../../ColorModeSwitcher';
import { AuthContext } from '../../contexts/AuthContext';

const LinkItems = [
  { name: 'Home', icon: FiHome, ref: '/' },
  { name: 'Pratos', icon: BiDish, ref: '/dish' },
  { name: 'Cardápios', icon: BiFoodMenu, ref: '/menu' },
  { name: 'Transações', icon: BiTransfer, ref: '/transactions' },
];

function SideBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const { lunch, dinner, setDinner, setLunch } = useContext(AuthContext);
  const [totalTickets, setTotalTickets] = useState(lunch * 3.5 + dinner * 3);
  const navigate = useNavigate();

  useEffect(() => {
    setTotalTickets(lunch * 3.5 + dinner * 3);
  }, [lunch, dinner]);

  return (
    <>
      <Button ref={btnRef} colorScheme="green" onClick={onOpen} leftIcon={<FiShoppingCart />}>
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
                    isDisabled={Number(lunch) == 0 ? true : false}
                    onClick={() => setLunch(Number(lunch) - 1)}
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
                    onClick={() => setLunch(Number(lunch) + 1)}
                  >
                    +
                  </Button>
                </HStack>
                <Text fontSize="sm">quantidade: {Number(lunch)}</Text>
              </VStack>
              <VStack>
                <HStack spacing="4rem">
                  <Button
                    borderRadius="100%"
                    size="xs"
                    fontWeight="extrabold"
                    isDisabled={Number(dinner) == 0 ? true : false}
                    onClick={() => setDinner(Number(dinner) - 1)}
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
                    onClick={() => setDinner(Number(dinner) + 1)}
                  >
                    +
                  </Button>
                </HStack>
                <Text fontSize="sm">quantidade: {Number(dinner)}</Text>
              </VStack>
            </VStack>
          </Flex>
          <Flex justifyContent="center" fontWeight="bold">
            Total: R${Number(totalTickets)}
          </Flex>
          <DrawerFooter>
            <Button
              onClick={() => {
                onClose();
                navigate('/hub/pay')
              }}
              w="100%"
              colorScheme="blue"
              isDisabled={
                Number(lunch) === 0 && Number(dinner) === 0 ? true : false
              }
            >
              Ir para o carrinho
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

function NotAuthButtons() {
  const navigate = useNavigate();
  return (
    <HStack>
      <Button colorScheme="blue" onClick={() => navigate('/hub/register')}>
        Registre-se
      </Button>
      <Button colorScheme="green" onClick={() => navigate('/hub/login')}>
        Login
      </Button>
    </HStack>
  );
}
export function SidebarWithHeader({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" bg={useColorModeValue('white', 'gray.900')}>
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
      </Box>
    </Box>
  );
}

const SidebarContent = ({ onClose, ...rest }) => {
  return (
    <Box
      bg={useColorModeValue('gray.200', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          RU - Gestão
        </Text>
        
        <CloseButton
          display={{ base: 'flex', md: 'none' }}
          onClick={onClose}
          bg="blue"
        />
      </Flex>
      {LinkItems.map(link => (
        <NavItem key={link.name} icon={link.icon} refLink={link.ref}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

const NavItem = ({ icon, children, refLink, ...rest }) => {
  const navigate = useNavigate();

  return (
    <Link
      //href={window.location.href+refLink}
      onClick={() => navigate('/cal' + refLink)}
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
  const { signOut, user, isHub, setIsHub } =
    useContext(AuthContext);

  const navigate = useNavigate();

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

      {/* <Text
        display={{ base: 'flex', md: 'none' }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        Logo
      </Text> */}
      
      <Heading size="md" cursor={'pointer'} onClick={() => window.location.replace('http://localhost:3000/hub')} fontFamily={'sans-serif'}>
        UFRPE - RU
      </Heading>

      <HStack spacing={{ base: '0', md: '6' }}>
        {/* <Flex>
          <Text>ALMOÇOS: </Text>
          <Text fontWeight="bold" ml="5px">
            3
          </Text>
        </Flex>
        <Flex>
          <Text>JANTAS: </Text>
          <Text fontWeight="bold" ml="5px">
            3
          </Text>
        </Flex> */}

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
                    setIsHub(!isHub);
                  }}
                >
                  {isHub ? 'Gestão' : 'Visualização'}
                </MenuItem>
              )}
              <MenuDivider />
              <MenuOptionGroup title='Fichas restantes'>
              <MenuItemOption cursor={'default'} _hover={{}} pointerEvents="none">
                <VStack w="100%">
                  <Flex w="100%" justifyContent="space-between">
                    <Text >Almoços: </Text>
                    <Text fontWeight="bold">{user.bought.morning}</Text>
                  </Flex>
                  <Flex w="100%" justifyContent="space-between">
                    <Text >Jantas: </Text>
                    <Text fontWeight="bold">{user.bought.night}</Text>
                  </Flex>
                </VStack>
              </MenuItemOption >
              </MenuOptionGroup>
              <MenuDivider />
              <MenuItem onClick={() => {
                signOut()
                }}>Sair</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
        <SideBar />
      </HStack>
    </Flex>
  );
};

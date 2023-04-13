import {
  Box,
  Button,
  Center,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Image,
  Input,
  useColorMode,
  useToast,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState, useContext } from 'react';
import { EmailInput } from '../../components/EmailInput/EmailInput';
import NormalInput from '../../components/NormalInput/NormalInput';
import { AuthContext } from '../../contexts/AuthContext';
import { userApi } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import Diamond from '../../assets/images/dish.png';

export const Register = () => {
  const toast = useToast();
  const navigate = useNavigate();

  const [isSaving, setIsSaving] = useState(false);

  const [registred, setRegistred] = React.useState(true);
  const [matricula, setMatricula] = useState('');
  const [firstName, setFirstName] = useState('');
  const [secondName, setSecondName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { signIn, isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    if (!registred) {
      setMatricula('');
    }
  }, [registred]);

  const handleSubmit = async () => {
    //setIsSaving(true)

    if (!firstName || !secondName || !email || !password || !confirmPassword) {
      toast({
        title: `Preencha todos os campos`,
        position: 'top-right',
        status: 'error',
        isClosable: true,
      });

      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: `Senhas não batem`,
        position: 'top-right',
        status: 'error',
        isClosable: true,
      });

      return;
    }

    const user = {
      name: firstName.concat(' ', secondName),
      email: email,
      password: password,
      registration: matricula || undefined,
      manager: false,
    };

    try {
      const { data } = await userApi.post('/user/', user);

      toast({
        title: `Usuário registrado com sucesso!`,
        position: 'top-right',
        status: 'success',
        isClosable: true,
      });

      setTimeout(() => {
        navigate('/hub/');
      }, 1000);
      // handle successful response
    } catch (error) {
      console.error(error);
      toast({
        title: `Erro ao registrar usuário`,
        position: 'top-right',
        status: 'error',
        isClosable: true,
      });
    } finally {
      //setIsSaving(false)
    }
  };

  const { colorMode } = useColorMode();
  const imageStyle = {
    filter: colorMode === 'dark' ? 'brightness(0.7)' : 'brightness(1)',
  };

  return (
    <Flex size="100vh" h={isAuthenticated ? '92vh' : '100vh'}>
      <Box w={'60%'} position="relative">
        <Image
          borderRadius="40px"
          padding="20px"
          style={imageStyle}
          src={Diamond}
          boxSize="100%"
          size="contain"
          objectFit="cover"
          objectPosition="center"
        />
      </Box>
      <Box flex={1} pt={'20px'} paddingRight="20px">
        <Flex>
          <Heading>Cadastro</Heading>
        </Flex>

        <VStack mt={50} spacing={'30px'}>
          <HStack spacing={3} w={'100%'}>
            <Box flex={1}>
              <NormalInput
                title="Primeiro nome"
                value={firstName}
                onChange={event => setFirstName(event.target.value)}
              />
            </Box>
            <Box flex={1}>
              <NormalInput
                title="Segundo nome"
                value={secondName}
                onChange={event => setSecondName(event.target.value)}
              />
            </Box>
          </HStack>
          <EmailInput
            value={email}
            onChange={event => setEmail(event.target.value)}
          />
          <Flex gap="30px" w={'100%'}>
            <FormControl isRequired isDisabled={!registred ? true : false}>
              <FormLabel>Matrícula</FormLabel>
              <Input
                value={matricula}
                onChange={e => setMatricula(e.target.value)}
                placeholder=""
              />
            </FormControl>
            <Checkbox
              marginTop="15px"
              defaultChecked
              w={'100%'}
              isChecked={registred}
              onChange={e => {
                setRegistred(e.target.checked);
              }}
            >
              Sou aluno matriculado na UFRPE
            </Checkbox>
          </Flex>
          <HStack w="100%" spacing={3}>
            <Box flex={1}>
              <NormalInput
                title="Senha"
                value={password}
                onChange={event => setPassword(event.target.value)}
                type={'password'}
              />
            </Box>
            <Box flex={1}>
              <NormalInput
                title="Confirmar senha"
                value={confirmPassword}
                onChange={event => setConfirmPassword(event.target.value)}
                type={'password'}
              />
            </Box>
          </HStack>
          <Flex w="100%" justify="end">
            <Button colorScheme="orange" onClick={() => handleSubmit()}>
              Registrar
            </Button>
          </Flex>
        </VStack>
      </Box>
    </Flex>
  );
};
export default Register;

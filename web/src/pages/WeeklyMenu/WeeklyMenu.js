import {
  Box,
  Button,
  Center,
  color,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Image,
  Input,
  Spinner,
  Text,
  useColorMode,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { Menu } from '../Menu/Menu';
import SwitchSelector from 'react-switch-selector';
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { cozinhaApi } from '../../services/api';
import { ColorModeSwitcher } from '../../ColorModeSwitcher';
import NutriTable from '../../components/NutriTable/NutriTable';

export const WeeklyMenu = () => {
  const colorMode = useColorMode();
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTurn, setSelectedTurn] = useState('Almoço');
  const [dayOfWeek, setDayOfWeek] = useState('');

  useEffect(() => {
    const dateStr = new Date().toLocaleDateString();
    const parts = dateStr.split("/");
    const yyyyMMdd = parts[2] + "-" + parts[1].padStart(2, "0") + "-" + parts[0].padStart(2, "0");

    setSelectedDate(yyyyMMdd);
  }, []);


  useEffect(() => {
    function getDayOfWeek() {
      const daysOfWeek = [
        'Domingo',
        'Segunda',
        'Terça',
        'Quarta',
        'Quinta',
        'Sexta',
        'Sábado',
      ];
      const date = selectedDate ? new Date(selectedDate) : new Date();

      const dayOfWeek = daysOfWeek[date.getUTCDay()];
      return dayOfWeek;
    }
    setDayOfWeek(getDayOfWeek());
  }, [selectedDate]);

  function handleSelectedDate(event) {
    setSelectedDate(event.target.value);
  }

  const options = [
    {
      label: <Text>Almoço</Text>,
      value: "Almoço",
      selectedBackgroundColor: '#90CDF4',
    },
    {
      label: <Text>Jantar</Text>,
      value: 'Janta',
      selectedBackgroundColor: '#90CDF4',
    },
  ];
  const initialSelectedIndex = options.findIndex(
    ({ value }) => value === 'Almoço'
  );

  const { isAuthenticated, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [menu, setMenu] = useState()
  const [loading, setIsLoading] = useState(true)


  useEffect(() => {
   async function getDishes() {
      const { data } = await cozinhaApi.get("/cardapio/"+selectedDate+"/"+selectedTurn)
      if(data) {
        setMenu(data)
      } else {
        setMenu(null)
      }
      setIsLoading(false)
    }

    if(selectedDate && selectedTurn) {
      getDishes();
    }

  }, [selectedDate, selectedTurn])


  if(loading) {
    return <Center h={'100vh'} w={'100%'}>
      <Spinner/>
    </Center>
  }

  return (
    <Flex w="100%" h={isAuthenticated ? '92vh' : '100vh'}>
      <VStack w="100%" h={'100%'}>
        <Flex mt="10px" alignItems="center" justify="space-between" w="98%">
          <Input
            w="150px"
            placeholder="Select Date and Time"
            size="md"
            type="date"
            value={selectedDate}
            onChange={handleSelectedDate}
          />
          <Heading as="h4" size="md">
            {dayOfWeek}
          </Heading>
          <Flex alignItems="center" gap="20px" minW="160px" h="30px" zIndex={'base'}>
            {!isAuthenticated && <>
              <Button w="200px" onClick={() => navigate('/hub/register')}>Cadastre-se</Button>
            <Button w="100px" onClick={() => navigate('/hub/login')}>Login</Button>
            </>}
            <SwitchSelector
              options={options}
              initialSelectedIndex={initialSelectedIndex}
              onChange={(newValue) => setSelectedTurn(newValue)}
              backgroundColor="transparent"
              border="5"
              fontColor={'#f5f6fa'}
            />
            {!isAuthenticated && <ColorModeSwitcher />}
          </Flex>
        </Flex>
        {!menu ? 
        <Center h={"75vh"} overflow={'hidden'}>
        <Image
         src="https://i.pinimg.com/originals/ff/c3/d3/ffc3d3f7e25c28ea2d3fe42231736f00.png"
              boxSize="80%"
              size="sm"
              objectFit="contain"
              objectPosition="center"
         />
        <Heading  fontSize='6xl' fontFamily={'sans-serif'}>Nenhum cardápio para hoje</Heading >
        </Center> : (
          <>
            <Menu data={menu} loading={loading} />
                <Heading>Tabelas Nutricionais</Heading>
                <Flex flexWrap={'wrap'} justifyContent={'center'} pt={'4'} gap={20}>
                    <NutriTable dish={menu.pp_1} />
                    <NutriTable dish={menu.pp_2} />
                    <NutriTable dish={menu.fast} />
                    <NutriTable dish={menu.grelha} />
                    <NutriTable dish={menu.guarnicao} />
                    <NutriTable dish={menu.salad_cr} />
                    <NutriTable dish={menu.salad_cuz} />
                    <NutriTable dish={menu.sobremesa} />
                    <NutriTable dish={menu.suco} />
                    <NutriTable dish={menu.veg} />
                </Flex>
          </>
        )}
        
      </VStack>
    </Flex>
  );
};

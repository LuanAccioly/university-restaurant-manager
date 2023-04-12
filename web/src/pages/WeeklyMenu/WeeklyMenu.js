import {
  Box,
  Button,
  Center,
  color,
  Flex,
  Heading,
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

export const WeeklyMenu = () => {
  const colorMode = useColorMode();
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTurn, setSelectedTurn] = useState('Almoço');
  const [dayOfWeek, setDayOfWeek] = useState('');

  console.log(selectedDate);

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
      }
    }

    if(selectedDate && selectedTurn) {
      getDishes();
      setIsLoading(false)
    }

  }, [selectedDate, selectedTurn])

  if(loading) {
    return <Center h={'100vh'}>
      <Spinner/>
    </Center>
  }


  return (
    <Flex w="100%">
      <VStack w="100%">
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
          </Flex>
        </Flex>
        <Menu data={menu} />
      </VStack>
    </Flex>
  );
};

import {
  Button,
  Center,
  Checkbox,
  Flex,
  Heading,
  HStack,
  Input,
  Select,
  Stack,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { cozinhaApi } from '../../services/api';
import { useNavigate } from 'react-router-dom';

export const MenuRegistration = () => {
  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState(new Date().toLocaleDateString('en-US'));
  const [dayOfWeek, setDayOfWeek] = useState('');
  const [pp1, setPp1] = useState();
  const [pp2, setPp2] = useState();
  const [fast, setFast] = useState();
  const [grelha, setGrelha] = useState();
  const [veg, setVeg] = useState();
  const [guarnicao, setGuarnicao] = useState();
  const [saladCr, setSaladCr] = useState();
  const [saladCuz, setSaladCuz] = useState();
  const [sobremesa, setSobremesa] = useState();
  const [suco, setSuco] = useState();
  const [lunchCheckbox, setLunchCheckbox] = useState(false);
  const [dinnerCheckbox, setDinnerCheckbox] = useState(false);

  useEffect(() => {
    const dateStr = new Date().toLocaleDateString();
    const parts = dateStr.split("/");
    const yyyyMMdd = parts[2] + "-" + parts[1].padStart(2, "0") + "-" + parts[0].padStart(2, "0");

    setSelectedDate(yyyyMMdd);
  }, []);

  const [dishes, setDishes] = useState([])

  useEffect(() => {
   async function getDishes() {
      const { data } = await cozinhaApi.get("/pratos/index")
      setDishes(data)
    }

    getDishes();

  }, [])

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


  const handleLunchChange = event => {
    setLunchCheckbox(event.target.checked);
    setDinnerCheckbox(false);
  };

  const handleDinnerChange = event => {
    setDinnerCheckbox(event.target.checked);
    setLunchCheckbox(false);
  };

  function handleSelectedDate(event) {
    setSelectedDate(event.target.value);
  }

  const toast = useToast();


  const handleSubmit = async () => {
    if(!selectedDate || !pp1 || !pp2 || !fast || !grelha || !veg || !guarnicao || !saladCr || !saladCuz || !sobremesa || !sobremesa || (!dinnerCheckbox && !lunchCheckbox)) {
      toast({
        title: `Preencha todos os campos`,
        position: 'top-right',
        status: 'error',
        isClosable: true,
      })

      return;
    }
  
    try {
      const { data } = await cozinhaApi.post("/cardapio/create", {
        pp_1: pp1,
        pp_2: pp2,
        fast: fast,
        grelha: grelha,
        veg: veg,
        guarnicao: guarnicao,
        salad_cr: saladCr,
        salad_cuz: saladCuz,
        sobremesa: sobremesa,
        suco: suco,
        turn: dinnerCheckbox ? 'Janta' : 'Almoço',
        menu_date: selectedDate
      })

      toast({
        title: `Cardapio cadastrado com sucesso!`,
        position: 'top-right',
        status: 'success',
        isClosable: true,
      })

      setTimeout(() => {
        navigate('/cal/menu')
      }, 1000);
      // handle successful response
    } catch (error) {
      console.error(error);
      toast({
        title: error.response.data.message,
        position: 'top-right',
        status: 'error',
        isClosable: true,
      })
      
    }
  }
  return (
    <Flex w="100%">
      <Flex w="20%" padding="10px">
        <Flex
          gap="20px"
          flex="1"
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <Heading size="md">{dayOfWeek}</Heading>
          <Input
            w="150px"
            placeholder="Select Date and Time"
            size="md"
            type="date"
            value={selectedDate}
            onChange={handleSelectedDate}
          />
        </Flex>
      </Flex>
      <Flex flex="1" mt="20px" direction="column">
        <Heading>Cadastro de cardápio</Heading>
        <VStack w="98%" gap="40px" mt="50px">
          <HStack gap="20px" w="100%">
            <Stack w="100%">
              <Heading as="h6" size="xs">
                Prato Principal 1
              </Heading>
              <Select value={pp1} onChange={(event) => setPp1(event.target.value)}>
              <option value="">Selecione</option>
                {dishes.filter(dish => dish.type === 'comum').map((dish, index) => (
                  <option key={index} value={dish._id}>{dish.name}</option>
                ))}
              </Select>
            </Stack>
            <Stack w="100%">
              <Heading as="h6" size="xs">
                Prato Principal 2
              </Heading>
              <Select  value={pp2} onChange={(event) => setPp2(event.target.value)}>
              <option value="">Selecione</option>
              {dishes.filter(dish => dish.type === 'comum').map((dish, index) => (
                  <option key={index} value={dish._id}>{dish.name}</option>
                ))}
              </Select>
            </Stack>
          </HStack>

          <HStack gap="20px" w="100%">
            <Stack w="100%">
              <Heading as="h6" size="xs">
                Fast Grill
              </Heading>
              <Select value={fast} onChange={(event) => setFast(event.target.value)}>
              <option value="">Selecione</option>
              {dishes.filter(dish => dish.type === 'comum').map((dish, index) => (
                  <option key={index} value={dish._id}>{dish.name}</option>
                ))}
              </Select>
            </Stack>
            <Stack w="100%">
              <Heading as="h6" size="xs">
                Na Grelha
              </Heading>
              <Select placeholder="" value={grelha} onChange={(event) => setGrelha(event.target.value)}>
              <option value="">Selecione</option>
              {dishes.filter(dish => dish.type === 'comum').map((dish, index) => (
                  <option key={index} value={dish._id}>{dish.name}</option>
                ))}
              </Select>
            </Stack>
          </HStack>

          <HStack gap="20px" w="100%">
            <Stack w="100%">
              <Heading as="h6" size="xs">
                Vegetariano
              </Heading>
              <Select value={veg} onChange={(event) => setVeg(event.target.value)}>
              <option value="">Selecione</option>
              {dishes.filter(dish => dish.type === 'vegetariana').map((dish, index) => (
                  <option key={index} value={dish._id}>{dish.name}</option>
                ))}
              </Select>
            </Stack>
            <Stack w="100%">
              <Heading as="h6" size="xs">
                Guarnição
              </Heading>
              <Select placeholder="" value={guarnicao} onChange={(event) => setGuarnicao(event.target.value)}>
              <option value="">Selecione</option>
              {dishes.filter(dish => dish.type === 'guarnicao').map((dish, index) => (
                  <option key={index} value={dish._id}>{dish.name}</option>
                ))}
              </Select>
            </Stack>
          </HStack>

          <HStack gap="20px" w="100%">
            <Stack w="100%">
              <Heading as="h6" size="xs">
                Salada crua
              </Heading>
              <Select value={saladCr} onChange={(event) => setSaladCr(event.target.value)}>
              <option value="">Selecione</option>
              {dishes.filter(dish => dish.type === 'sal_crua').map((dish, index) => (
                  <option key={index} value={dish._id}>{dish.name}</option>
                ))}
              </Select>
            </Stack>
            <Stack w="100%">
              <Heading as="h6" size="xs">
                Salada cozida
              </Heading>
              <Select placeholder="" value={saladCuz} onChange={(event) => setSaladCuz(event.target.value)}>
              <option value="">Selecione</option>
              {dishes.filter(dish => dish.type === 'sal_coz').map((dish, index) => (
                  <option key={index} value={dish._id}>{dish.name}</option>
                ))}
              </Select>
            </Stack>
          </HStack>

          <HStack gap="20px" w="100%">
            <Stack w="100%">
              <Heading as="h6" size="xs">
                Sobremesa
              </Heading>
              <Select value={sobremesa} onChange={(event) => setSobremesa(event.target.value)}>
              <option value="">Selecione</option>
              {dishes.filter(dish => dish.type === 'sobremesa').map((dish, index) => (
                  <option key={index} value={dish._id}>{dish.name}</option>
                ))}
              </Select>
            </Stack>
            <Stack w="100%">
              <Heading as="h6" size="xs">
                Suco
              </Heading>
              <Select placeholder="" value={suco} onChange={(event) => setSuco(event.target.value)}>
              <option value="">Selecione</option>
              {dishes.filter(dish => dish.type === 'bebida').map((dish, index) => (
                  <option key={index} value={dish._id}>{dish.name}</option>
                ))}
              </Select>
            </Stack>
          </HStack>
          <Flex w="100%" justifyContent="space-between">
            <Flex w="12rem" gap="2rem">
              <Checkbox isChecked={lunchCheckbox} onChange={handleLunchChange}>
                Almoço
              </Checkbox>
              <Checkbox
                isChecked={dinnerCheckbox}
                onChange={handleDinnerChange}
              >
                Jantar
              </Checkbox>
            </Flex>
            <Button colorScheme="blue" onClick={()=> handleSubmit()}>Cadastrar</Button>
          </Flex>
        </VStack>
      </Flex>
    </Flex>
  );
};

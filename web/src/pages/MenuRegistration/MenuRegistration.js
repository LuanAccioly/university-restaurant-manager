import {
  Button,
  Center,
  Flex,
  Heading,
  HStack,
  Input,
  Select,
  Stack,
  VStack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

export const MenuRegistration = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [dayOfWeek, setDayOfWeek] = useState('');

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
              <Select>
                <option value="nenhum">Nenhum</option>
              </Select>
            </Stack>
            <Stack w="100%">
              <Heading as="h6" size="xs">
                Prato Principal 2
              </Heading>
              <Select placeholder="">
                <option value="nenhum">Nenhum</option>
              </Select>
            </Stack>
          </HStack>

          <HStack gap="20px" w="100%">
            <Stack w="100%">
              <Heading as="h6" size="xs">
                Fast Grill
              </Heading>
              <Select>
                <option value="nenhum">Nenhum</option>
              </Select>
            </Stack>
            <Stack w="100%">
              <Heading as="h6" size="xs">
                Na Grelha
              </Heading>
              <Select placeholder="">
                <option value="nenhum">Nenhum</option>
              </Select>
            </Stack>
          </HStack>

          <HStack gap="20px" w="100%">
            <Stack w="100%">
              <Heading as="h6" size="xs">
                Vegetariano
              </Heading>
              <Select>
                <option value="nenhum">Nenhum</option>
              </Select>
            </Stack>
            <Stack w="100%">
              <Heading as="h6" size="xs">
                Guarnição
              </Heading>
              <Select placeholder="">
                <option value="nenhum">Nenhum</option>
              </Select>
            </Stack>
          </HStack>

          <HStack gap="20px" w="100%">
            <Stack w="100%">
              <Heading as="h6" size="xs">
                Salada crua
              </Heading>
              <Select>
                <option value="nenhum">Nenhum</option>
              </Select>
            </Stack>
            <Stack w="100%">
              <Heading as="h6" size="xs">
                Salada cozida
              </Heading>
              <Select placeholder="">
                <option value="nenhum">Nenhum</option>
              </Select>
            </Stack>
          </HStack>

          <HStack gap="20px" w="100%">
            <Stack w="100%">
              <Heading as="h6" size="xs">
                Sobremesa
              </Heading>
              <Select>
                <option value="nenhum">Nenhum</option>
              </Select>
            </Stack>
            <Stack w="100%">
              <Heading as="h6" size="xs">
                Suco
              </Heading>
              <Select placeholder="">
                <option value="nenhum">Nenhum</option>
              </Select>
            </Stack>
          </HStack>
          <Flex w="100%" justifyContent="end">
            <Button colorScheme="blue">Cadastrar</Button>
          </Flex>
        </VStack>
      </Flex>
    </Flex>
  );
};

import {
  Box,
  color,
  Flex,
  Heading,
  Input,
  Text,
  useColorMode,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { Menu } from '../Menu/Menu';
import SwitchSelector from 'react-switch-selector';
import { useState } from 'react';

export const WeeklyMenu = () => {
  const colorMode = useColorMode();
  const [selectedDate, setSelectedDate] = useState('');
  const dayOfMonth = selectedDate;

  function handleSelectedDate(event) {
    setSelectedDate(event.target.value);
  }

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

    const dayOfWeek = daysOfWeek[date.getDay()];
    console.log(
      `dayofWeek: ${dayOfWeek} | data + 1: ${
        date.getDate() + 1
      } | hora: ${date.getHours()} `
    );
    return dayOfWeek;
  }

  const options = [
    {
      label: <Text>Almoço</Text>,
      value: {
        foo: true,
      },
      selectedBackgroundColor: '#90CDF4',
    },
    {
      label: <Text>Jantar</Text>,
      value: 'bar',
      selectedBackgroundColor: '#90CDF4',
    },
  ];
  const initialSelectedIndex = options.findIndex(
    ({ value }) => value === 'bar'
  );
  console.log(colorMode);

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
            {getDayOfWeek()}
          </Heading>
          <Box w="auto" minW="160px" h="30px">
            <SwitchSelector
              options={options}
              initialSelectedIndex={initialSelectedIndex}
              backgroundColor="transparent"
              border="5"
              fontColor={'#f5f6fa'}
            />
          </Box>
        </Flex>
        <Menu />
      </VStack>
    </Flex>
  );
};

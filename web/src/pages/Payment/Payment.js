import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from '@chakra-ui/react';
import { BsFillCreditCardFill, BsGrid3X3GapFill } from 'react-icons/bs';
import { MdPerson } from 'react-icons/md';
import { BiMoneyWithdraw } from 'react-icons/bi';
import { AuthContext } from '../../contexts/AuthContext';
import { useContext, useEffect, useState } from 'react';
import { pagamentoApi } from '../../services/api';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';

export const Payment = () => {
  const { lunch, dinner } = useContext(AuthContext);
  const [totalTickets, setTotalTickets] = useState(lunch * 3.5 + dinner * 3);
  const [ccDate, setCCDate] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  const [form, setForm] = useState({
    name: '',
    number: '',
    cvc: '',
    ccDate: '',
    focus: '',
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  }

  const handleInputFocus = e => {
    setForm({ ...form, focus: e.target.name });
  };

  useEffect(() => {
    setTotalTickets(lunch * 3.5 + dinner * 3);
  }, [lunch, dinner]);

  const handleYear = event => {
    setYear(event.target.value);
  };
  const handleMonth = event => {
    setMonth(event.target.value);
  };
  useEffect(() => {
    setCCDate(`${month}/${year}`);
  }, [month, year]);

  function createPostData(form, lunch, dinner, totalTickets) {
    return {
      name: form.name,
      lunch_amount: lunch,
      dinner_amount: dinner,
      total_value: totalTickets,
      payment_method: 'credit',
      credit_card_number: form.number,
      credit_name: form.name,
      credit_cvc: form.cvc,
      credit_expiration_date: ccDate,
    };
  }

  const handleSubmit = event => {
    event.preventDefault(); // Evita o comportamento padrão de enviar o formulário

    const postData = createPostData(form, lunch, dinner, totalTickets);

    pagamentoApi
      .post('/payment/pay', postData)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.error(error);
      });
  };
  return (
    <Flex w="100%">
      <Flex w="50%" p="30px" direction="column">
        <Heading>RuralPay</Heading>
        <Flex mt="40px" w="100%">
          <Tabs variant="enclosed" size="lg">
            <TabList>
              <Tab>Cartão de Crédito</Tab>
              <Tab>Pix</Tab>
            </TabList>
            <TabPanels mt="30px" w="100%">
              <TabPanel>
                <Flex direction="column" gap="40px">
                  <Box>
                    <Heading as="h4" size="md">
                      Nome completo
                    </Heading>
                    <InputGroup w="100%" mt="25px" size="lg">
                      <InputLeftElement
                        pointerEvents="none"
                        children={<MdPerson />}
                      />
                      <Input
                        name="name"
                        onFocus={handleInputFocus}
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Luís Inácio..."
                        isRequired
                      />
                    </InputGroup>
                  </Box>
                  <HStack w="100%">
                    <Box w="50%">
                      <Heading as="h4" size="md">
                        Número do cartão
                      </Heading>
                      <Text mt="15px" color="gray.500">
                        Digite os 16 números do cartão de crédito
                      </Text>
                    </Box>
                    <InputGroup w="50%" mt="25px" size="lg">
                      <InputRightElement
                        pointerEvents="none"
                        children={<BsFillCreditCardFill />}
                      />
                      <Input
                        name="number"
                        value={form.number}
                        onFocus={handleInputFocus}
                        onChange={handleChange}
                        textAlign="center"
                        type="tel"
                        inputMode="numeric"
                        autoComplete="cc-number"
                        pattern="[\d| ]{16,22}"
                        maxLength="19"
                        placeholder="0000 0000 0000 0000"
                        isRequired
                      />
                    </InputGroup>
                  </HStack>
                  <HStack w="100%">
                    <Box w="50%">
                      <Heading as="h4" size="md">
                        cvc
                      </Heading>
                      <Text mt="15px" color="gray.500">
                        Digite os 3 ou 4 dígitos atrás do cartão
                      </Text>
                    </Box>
                    <InputGroup w="50%" mt="25px" size="lg">
                      <InputRightElement
                        pointerEvents="none"
                        children={<BsGrid3X3GapFill />}
                      />
                      <Input
                        name="cvc"
                        value={form.cvc}
                        onChange={handleChange}
                        onFocus={handleInputFocus}
                        textAlign="center"
                        type="tel"
                        inputMode="numeric"
                        pattern="[\d| ]{16,22}"
                        maxLength="4"
                        placeholder="123"
                        isRequired
                      />
                    </InputGroup>
                  </HStack>
                  <HStack w="100%">
                    <Box w="50%">
                      <Heading as="h4" size="md">
                        Data de expiração
                      </Heading>
                      <Text mt="15px" color="gray.500">
                        Digite a data de expiração do cartão
                      </Text>
                    </Box>
                    <HStack w="50%">
                      <Input
                        value={month}
                        onChange={handleMonth}
                        textAlign="center"
                        size="lg"
                        w="100%"
                        maxLength="2"
                        placeholder="XX"
                        isRequired
                      />
                      <Heading size="md">/</Heading>
                      <Input
                        value={year}
                        onChange={handleYear}
                        textAlign="center"
                        w="100%"
                        size="lg"
                        maxLength="2"
                        placeholder="XX"
                        isRequired
                      />
                    </HStack>
                  </HStack>
                  <Button
                    onClick={handleSubmit}
                    fontSize="xl"
                    h="4rem"
                    colorScheme="blue"
                  >
                    Finalizar compra
                  </Button>
                </Flex>
              </TabPanel>
              <TabPanel>
                <p>two!</p>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Flex>
      </Flex>
      <Flex flex="1" justifyContent="center" alignItems="center">
        <Box
          h="70%"
          minH="450px"
          w="40%"
          minW="400px"
          maxW="400px"
          bgColor="gray.200"
          borderRadius="25px"
          boxShadow="0px 20px 50px rgba(0, 0, 0, 0.2)"
        >
          <Flex
            alignItems="end"
            justifyContent="center"
            h="70%"
            direction="column"
            paddingBottom="40px"
          >
            <Box mb="40px" w="100%">
              <Cards
                locale={{ valid: 'Validade' }}
                placeholders={{ name: 'Seu nome aqui' }}
                cvc={form.cvc}
                expiry={ccDate}
                focused={form.focus}
                name={form.name}
                number={form.number}
              />
            </Box>
            <VStack w="100%">
              <Flex justifyContent="space-between" w="75%">
                <Text>Qt. almoços: </Text>
                <Text fontWeight="bold">{lunch}</Text>
              </Flex>
              <Flex paddingBottom="20px" justifyContent="space-between" w="75%">
                <Text>Total almoços: </Text>
                <Text fontWeight="bold">R${lunch * 3.5}</Text>
              </Flex>
              <Flex justifyContent="space-between" w="75%">
                <Text>Qt. jantas: </Text>
                <Text fontWeight="bold">{dinner}</Text>
              </Flex>
              <Flex justifyContent="space-between" w="75%">
                <Text>Total jantas: </Text>
                <Text fontWeight="bold">R${dinner * 3}</Text>
              </Flex>
            </VStack>
          </Flex>

          <Flex
            alignItems="center"
            justifyContent="space-between"
            p="40px"
            borderTop="2px dashed gray"
            h="30%"
          >
            <Flex direction="column">
              <Text>Total a pagar:</Text>
              <Heading>R${Number(totalTickets)}</Heading>
            </Flex>
            <BiMoneyWithdraw size="50px" />
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
};

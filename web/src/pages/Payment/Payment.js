import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Spacer,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Menu } from '../Menu/Menu';
import { BsFillCreditCardFill, BsGrid3X3GapFill } from 'react-icons/bs';
import { MdPerson } from 'react-icons/md';
import { BiMoneyWithdraw } from 'react-icons/bi';

export const Payment = () => {
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
                      <Input placeholder="Luís Inácio..." isRequired />
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
                        textAlign="center"
                        type="tel"
                        inputMode="numeric"
                        autoComplete="cc-number"
                        pattern="[\d| ]{16,22}"
                        maxlength="19"
                        placeholder="0000 0000 0000 0000"
                        isRequired
                      />
                    </InputGroup>
                  </HStack>
                  <HStack w="100%">
                    <Box w="50%">
                      <Heading as="h4" size="md">
                        CVV
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
                        textAlign="center"
                        type="tel"
                        inputMode="numeric"
                        pattern="[\d| ]{16,22}"
                        maxlength="4"
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
                        textAlign="center"
                        size="lg"
                        w="100%"
                        type="tel"
                        inputMode="numeric"
                        pattern="[\d| ]{16,22}"
                        maxlength="2"
                        placeholder="XX"
                        isRequired
                      />
                      <Heading size="md">/</Heading>
                      <Input
                        textAlign="center"
                        w="100%"
                        size="lg"
                        type="tel"
                        inputMode="numeric"
                        pattern="[\d| ]{16,22}"
                        maxlength="2"
                        placeholder="XX"
                        isRequired
                      />
                    </HStack>
                  </HStack>
                  <Button fontSize="xl" h="4rem" colorScheme="blue">
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
          h="45%"
          w="40%"
          bgColor="gray.200"
          borderRadius="25px"
          boxShadow="0px 20px 50px rgba(0, 0, 0, 0.2)"
        >
          <Flex
            alignItems="end"
            justifyContent="center"
            h="70%"
            paddingBottom="40px"
          >
            <VStack w="100%">
              <Flex justifyContent="space-between" w="75%">
                <Text>Qt. almoços: </Text>
                <Text fontWeight="bold">5</Text>
              </Flex>
              <Flex paddingBottom="20px" justifyContent="space-between" w="75%">
                <Text>Total almoços: </Text>
                <Text fontWeight="bold">R$17.50</Text>
              </Flex>
              <Flex justifyContent="space-between" w="75%">
                <Text>Qt. jantas: </Text>
                <Text fontWeight="bold">4</Text>
              </Flex>
              <Flex justifyContent="space-between" w="75%">
                <Text>Total jantas: </Text>
                <Text fontWeight="bold">R$12.00</Text>
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
              <Heading>R$29.50</Heading>
            </Flex>
            <BiMoneyWithdraw size="50px" />
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
};

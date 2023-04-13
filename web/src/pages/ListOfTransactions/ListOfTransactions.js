import {
  Button,
  Center,
  Flex,
  Heading,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Icon,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { pagamentoApi } from '../../services/api';
import { FcHighPriority, FcOk } from 'react-icons/fc';

export const ListOfTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getTransactions() {
      const { data } = await pagamentoApi.get('/payment/list');
      setTransactions(data);
      setIsLoading(false);
    }
    getTransactions();
  }, []);

  if (loading) {
    return (
      <Center h={'100vh'} w={'100%'}>
        <Spinner />
      </Center>
    );
  }
  return (
    <Flex direction="column" w="100%" p="20px" h="-webkit-fit-content">
      <Flex w="100%" alignItems="center" justifyContent="space-between">
        <Heading>Visualizar transações</Heading>
      </Flex>
      <TableContainer pt="30px">
        <Table variant="striped">
          <Thead>
            <Tr>
              <Th>Nome</Th>
              <Th>Data | Hora</Th>
              <Th textAlign="center">Qt. Almoços</Th>
              <Th textAlign="center">Qt. jantas</Th>
              <Th>R$ Total</Th>
              <Th textAlign="center">Método de pagamento</Th>
              <Th textAlign="center">Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {transactions?.map((transaction, index) => {
              return (
                <Tr key={index}>
                  <Td>{transaction.name}</Td>
                  <Td>{transaction.date}</Td>
                  <Td textAlign="center">{transaction.lunch_amount}</Td>
                  <Td textAlign="center">{transaction.dinner_amount}</Td>
                  <Td>R${transaction.total_value}</Td>
                  <Td textAlign="center">
                    {transaction.payment_method === 'credit'
                      ? 'crédito'
                      : 'pix'}
                  </Td>
                  <Td textAlign="center" verticalAlign="middle">
                    {transaction.payment_status === 'Pagamento aprovado' ? (
                      <Icon as={FcOk} />
                    ) : (
                      <Icon as={FcHighPriority} />
                    )}
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  );
};

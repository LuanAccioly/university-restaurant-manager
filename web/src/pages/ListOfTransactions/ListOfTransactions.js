import {
  Button,
  Flex,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { AiOutlinePlus } from 'react-icons/ai';

export const ListOfTransactions = () => {
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
              <Th>Data</Th>
              <Th>Qt. Almoços</Th>
              <Th>Qt. jantas</Th>
              <Th>R$ Total</Th>
              <Th>Método de pagamento</Th>
              <Th>Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>Juao Freire</Td>
              <Td>10/04/23</Td>
              <Td>3</Td>
              <Td>3</Td>
              <Td>R$19.5</Td>
              <Td>PIX</Td>
              <Td>Falha</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  );
};

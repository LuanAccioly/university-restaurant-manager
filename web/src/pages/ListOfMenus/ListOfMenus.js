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

export const ListOfMenus = () => {
  return (
    <Flex direction="column" w="100%" p="20px">
      <Flex w="100%" alignItems="center" justifyContent="space-between">
        <Heading>Visualizar cardápios</Heading>
        <Button leftIcon={<AiOutlinePlus />} w="12rem" colorScheme="orange">
          Cadastrar cardápio
        </Button>
      </Flex>
      <TableContainer pt="30px">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Data</Th>
              <Th>Turno</Th>
              <Th textAlign="end"> </Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>10/14/22</Td>
              <Td>Almoço</Td>
              <Td>
                <Button>Editar</Button>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  );
};

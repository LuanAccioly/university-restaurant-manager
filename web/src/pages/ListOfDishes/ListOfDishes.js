import {
  Button,
  Flex,
  Heading,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';

export const ListOfDishes = () => {
  return (
    <Flex direction="column" w="100%" p="20px">
      <Heading>Visualizar pratos</Heading>
      <TableContainer pt="30px">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Nome do prato</Th>
              <Th>Descrição</Th>
              <Th>Tipo</Th>
              <Th textAlign="end">Edição</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>Feijoada</Td>
              <Td
                style={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: '300px',
                }}
              >
                Consiste num guisado de feijões-pretos com vários tipos de carne
                de porco e de boiConsiste num guisado de feijões-pretos com
                vários tipos de carne de porco e de boiConsiste num guisado de
                feijões-pretos com vários tipos de carne de porco e de
                boiConsiste num guisado de feijões-pretos com vários tipos de
                carne de porco e de boiConsiste num guisado de feijões-pretos
                com vários tipos de carne de porco e de boiConsiste num guisado
                de feijões-pretos com vários tipos de carne de porco e de boi
              </Td>
              <Td>Comida</Td>
              <Td textAlign="end">
                <Button>Editar</Button>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  );
};

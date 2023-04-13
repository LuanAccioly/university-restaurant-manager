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
  VStack,
} from '@chakra-ui/react';
import { AiOutlinePlus } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import { Center, Spinner } from '@chakra-ui/react';
import { cozinhaApi } from '../../services/api';
import { useNavigate } from 'react-router';

export const ListOfDishes = () => {
  const navigate = useNavigate();

  const [dishes, setDishes] = useState([]);
  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getDishes() {
      const { data } = await cozinhaApi.get('/pratos/index');
      console.log(data);
      setDishes(data);
      setIsLoading(false);
    }

    getDishes();
  }, []);

  if (loading) {
    return (
      <Center h={'100vh'}>
        <Spinner />
      </Center>
    );
  }

  return (
    <Flex direction="column" w="100%" p="20px" h="-webkit-fit-content">
      <Flex w="100%" alignItems="center" justifyContent="space-between">
        <Heading>Visualizar pratos</Heading>
        <Button
          leftIcon={<AiOutlinePlus />}
          w="11rem"
          colorScheme="orange"
          onClick={() => navigate('/cal/dish/create')}
        >
          Cadastrar prato
        </Button>
      </Flex>
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
          {dishes?.map((dish, index) => (
            <Tbody key={index}>
              <Tr>
                <Td>{dish.name}</Td>
                <Td
                  style={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    maxWidth: '300px',
                  }}
                >
                  {dish.description}
                </Td>
                <Td>{dish.type}</Td>
                <Td textAlign="end">
                  <Button onClick={() => navigate('/cal/dish/' + dish._id)}>
                    Editar
                  </Button>
                </Td>
              </Tr>
            </Tbody>
          ))}
        </Table>
      </TableContainer>
    </Flex>
  );
};

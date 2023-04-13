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
  useToast,
} from '@chakra-ui/react';
import { AiOutlinePlus, AiFillEdit } from 'react-icons/ai';
import { FaTrashAlt } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { Center, Spinner } from '@chakra-ui/react';
import { cozinhaApi } from '../../services/api';
import { useNavigate } from 'react-router';

export const ListOfDishes = () => {
  const navigate = useNavigate();
  const toast = useToast();


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
      <Center h={'100vh'} w={'100%'}>
        <Spinner />
      </Center>
    );
  }

  const handleDelete = async (id) => {

    try {
      await cozinhaApi.delete("/pratos/"+id)

      toast({
        title: `Prato excluido com sucesso!`,
        position: 'top-right',
        status: 'success',
        isClosable: true,
      })

      setTimeout(() => {
        window.location.reload();
      }, 1000);
      // handle successful response
    } catch (error) {
      console.error(error);
      toast({
        title: 'Erro ao deletar prato',
        position: 'top-right',
        status: 'error',
        isClosable: true,
      })
      
    }
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
              <Th textAlign="end">Excluir</Th>
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
                  <Button
                    size="sm"
                    onClick={() => navigate('/cal/dish/' + dish._id)}
                  >
                    <AiFillEdit />
                  </Button>
                </Td>
                <Td textAlign="end">
                  <Button size="sm" colorScheme="red" onClick={() => {
                    const confirmed = window.confirm('Tem certeza que deseja excluir este prato ?');
                    if (confirmed) {
                      handleDelete(dish._id)
                    } else {
                      
                    }
                  }}>
                    <FaTrashAlt />
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

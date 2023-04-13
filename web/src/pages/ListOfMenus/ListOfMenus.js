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
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { cozinhaApi } from '../../services/api';
import { useEffect, useState } from 'react';
import { AiOutlinePlus, AiFillEdit } from 'react-icons/ai';
import { FaTrashAlt } from 'react-icons/fa';

export const ListOfMenus = () => {
  const navigate = useNavigate();

  const [menus, setMenus] = useState([]);
  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getDishes() {
      const { data } = await cozinhaApi.get('/cardapio/index');
      console.log(data);
      setMenus(data);
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

  return (
    <Flex direction="column" w="100%" p="20px" h="-webkit-fit-content">
      <Flex w="100%" alignItems="center" justifyContent="space-between">
        <Heading>Visualizar cardápios</Heading>
        <Button
          leftIcon={<AiOutlinePlus />}
          w="12rem"
          colorScheme="orange"
          onClick={() => navigate('/cal/menu/create')}
        >
          Cadastrar cardápio
        </Button>
      </Flex>
      <TableContainer pt="30px">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Data</Th>
              <Th>Turno</Th>
              <Th textAlign="end">Edição</Th>
              <Th textAlign="end">Excluir</Th>
            </Tr>
          </Thead>
          {menus.map((menu, index) => (
            <Tbody key={index}>
              <Tr>
                <Td>
                  {menu.menu_date.split('-')[2]}/{menu.menu_date.split('-')[1]}/
                  {menu.menu_date.split('-')[0]}
                </Td>
                <Td>{menu.turn}</Td>
                <Td>
                  <Button
                    size="sm"
                    onClick={() =>
                      navigate('/cal/menu/' + menu.menu_date + '/' + menu.turn)
                    }
                  >
                    <AiFillEdit />
                  </Button>
                </Td>
                <Td textAlign="end">
                  <Button size="sm" colorScheme="red">
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

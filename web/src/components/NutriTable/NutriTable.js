import {
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
} from '@chakra-ui/react';

function NutriTable({ dish }) {

  return (
    <Flex flexDirection={'column'} border={'2px solid #E2E8F0'} p={'4'} borderRadius={'10'}>
            <Heading fontSize={'2xl'} mb={4}>{dish.name}</Heading>
            <FormControl>
              <FormLabel>Porção</FormLabel>
              <Input isReadOnly defaultValue={dish.nutri_table.porcao || 'Não cadastrado'} />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Valor Energético</FormLabel>
              <Input isReadOnly defaultValue={dish.nutri_table.valor_ener || 'Não cadastrado'} />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Carboidratos</FormLabel>
              <HStack>
                <Input isReadOnly defaultValue={dish.nutri_table.carbos.value || 'Não cadastrado'} />
                <Input isReadOnly defaultValue={dish.nutri_table.carbos.percent || 'Não cadastrado'} />
              </HStack>
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Proteínas</FormLabel>
              <HStack>
                <Input isReadOnly defaultValue={dish.nutri_table.proteins.value || 'Não cadastrado'} />
                <Input isReadOnly defaultValue={dish.nutri_table.proteins.percent || 'Não cadastrado'} />
              </HStack>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Gorduras Totais</FormLabel>
              <HStack>
                <Input isReadOnly defaultValue={dish.nutri_table.total_gordura.value || 'Não cadastrado'} />
                <Input isReadOnly defaultValue={dish.nutri_table.total_gordura.percent || 'Não cadastrado'} />
              </HStack>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Gorduras Saturadas</FormLabel>
              <HStack>
                <Input isReadOnly defaultValue={dish.nutri_table.total_saturada.value || 'Não cadastrado'} />
                <Input isReadOnly defaultValue={dish.nutri_table.total_saturada.percent || 'Não cadastrado'} />
              </HStack>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Gorduras Trans</FormLabel>
              <HStack>
                <Input isReadOnly defaultValue={dish.nutri_table.total_trans.value || 'Não cadastrado'} />
                <Input isReadOnly defaultValue={dish.nutri_table.total_trans.percent || 'Não cadastrado'} />
              </HStack>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Fibra Alimentar</FormLabel>
              <HStack>
                <Input isReadOnly defaultValue={dish.nutri_table.fibra_ali.value || 'Não cadastrado'} />
                <Input isReadOnly defaultValue={dish.nutri_table.fibra_ali.percent || 'Não cadastrado'} />
              </HStack>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Sódio</FormLabel>
              <HStack>
                <Input isReadOnly defaultValue={dish.nutri_table.sodio.value || 'Não cadastrado'} />
                <Input isReadOnly defaultValue={dish.nutri_table.sodio.percent || 'Não cadastrado'} />
              </HStack>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Açúcares</FormLabel>
              <HStack>
                <Input isReadOnly defaultValue={dish.nutri_table.acucar.value || 'Não cadastrado'} />
                <Input isReadOnly defaultValue={dish.nutri_table.acucar.percent || 'Não cadastrado'} />
              </HStack>
            </FormControl>
            </Flex>
  );
}
export default NutriTable;

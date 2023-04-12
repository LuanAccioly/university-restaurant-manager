import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Spinner,
  Text,
  Textarea,
  useColorMode,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import NormalInput from '../../components/NormalInput/NormalInput';
import Diamond from '../../assets/images/dish.png';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { BsTable } from 'react-icons/bs';
import React, { useEffect, useRef, useState } from 'react';
import Dish from '../../components/Dish/Dish';
import NewDishPreview from '../../components/NewDishPreview/NewDishPreview';
import { cozinhaApi } from '../../services/api';
import {useToast} from '@chakra-ui/react'
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';



export const DishEdit = ({ image }) => {
  const { dishId } = useParams();

  console.log(dishId, 'aaaa')

  const [imageUp, setImageUp] = useState(null);
  const [preview, setPreview] = useState(null);
  const toast = useToast();
  const [loading, setIsLoading] = useState(true)
  const [dishName, setDishName] = useState('');
  const [dishDescription, setDishDescription] = useState('');
  const [dishType, setDishType] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [nutriTable, setNutriTable] = useState({
    porcao: '',
    valor_ener: '',
    carbos: {
      value: '',
      percent: ''
    },
    proteins: {
      value: '',
      percent: ''
    },
    total_gordura: {
      value: '',
      percent: ''
    },
    total_saturada: {
      value: '',
      percent: ''
    },
    total_trans: {
      value: '',
      percent: ''
    },
    fibra_ali: {
      value: '',
      percent: ''
    },
    sodio: {
      value: '',
      percent: ''
    },
    acucar: {
      value: '',
      percent: ''
    },
  });

  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function getDishes() {
       const { data } = await cozinhaApi.get("/pratos/"+dishId)
       console.log(data)
       setDishName(data.name)
       setDishDescription(data.description)
       setDishType(data.type)
       setImgUrl("http://localhost:3002/"+data.picture)
       setNutriTable(data.nutri_table)
       setIsLoading(false)
     }
 
     getDishes();
 
   }, [])


  function FileInputButton() {
    const fileInputRef = useRef(null);
  
    const handleButtonClick = () => {
      fileInputRef.current.click();
    };
  
    const handleFileInputChange = event => {
      const selectedImage = event.target.files[0];
      setImageUp(selectedImage);
      setPreview(URL.createObjectURL(selectedImage));
      // Faça algo com o arquivo selecionado aqui, por exemplo, carregue-o em uma tag <img> ou envie-o para um servidor.
    };
  
    return (
      <>
        <Button
          leftIcon={<AiOutlineCloudUpload />}
          onClick={handleButtonClick}
          colorScheme="orange"
        >
          Imagem
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileInputChange}
          style={{ display: 'none' }}
        />
      </>
    );
  }

  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const { isPreviewOpen, onPreviewOpen, onPreviewClose } = useDisclosure();
  const initialPreviewRef = React.useRef(null);
  const finalPreviewRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const { colorMode } = useColorMode();
  const imageStyle = {
    filter: colorMode === 'dark' ? 'brightness(0.7)' : 'brightness(1)',
  };

  const navigate = useNavigate();


  const handleSubmit = async () => {
    setIsSaving(true)

    if(!dishName || !dishDescription || !dishType) {
      toast({
        title: `Preencha todos os campos`,
        position: 'top-right',
        status: 'error',
        isClosable: true,
      })

      return;
    }
  
    const prato = new FormData();
    prato.append('name', dishName);
    prato.append('description', dishDescription);
    prato.append('nutri_table', JSON.stringify(nutriTable));
    if(imageUp) {
      prato.append('image', imageUp);
    }
    prato.append('type', dishType);
  
    try {
      const { data } = await cozinhaApi.put("/pratos/update/"+dishId, prato, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      toast({
        title: `Prato Atualizado com sucesso!`,
        position: 'top-right',
        status: 'success',
        isClosable: true,
      })

      setTimeout(() => {
        navigate('/cal/dish')
      }, 1000);
      // handle successful response
    } catch (error) {
      console.error(error);
      toast({
        title: `Erro ao atualizar prato`,
        position: 'top-right',
        status: 'error',
        isClosable: true,
      })
      
    } finally {
      setIsSaving(false)
    }
  }

  if(loading) {
    return <Center h={'100vh'}>
      <Spinner/>
    </Center>
  }

  function changeNutriTable(value, key, keyOpt){
    let nutriTableCopy = {...nutriTable}
    if(key === 'porcao' || key === 'valor_ener') {
      nutriTableCopy[key] = value;
      setNutriTable(nutriTableCopy)
    } else {
      nutriTableCopy[key][keyOpt] = value;
      setNutriTable(nutriTableCopy)
    }
  }

  return (
    <Flex w="100%">
      <Box w="50%" position="relative">
        <Image
          borderRadius="40px"
          padding="20px"
          style={imageStyle}
          src={Diamond}
          boxSize="100%"
          size="contain"
          objectFit="cover"
          objectPosition="center"
        />
      </Box>
      <Box flex={1} mt="20px">
        <Heading>Edição de Prato</Heading>
        <VStack w="98%" gap="40px" mt="50px">
          <NormalInput title="Nome" onChange={(event) => setDishName(event.target.value)} value={dishName} />
          <HStack w="100%">
            <FileInputButton />

            <Select placeholder="Tipo" variant="filled" value={dishType} onChange={(event) => setDishType(event.target.value)}>
              <option value="comum">Comum</option>
              <option value="bebida">Bebida</option>
              <option value="sobremesa">Sobremesa</option>
              <option value="vegetariana">Vegetariana</option>
            </Select>
          </HStack>
          <Textarea
            placeholder="Descrição do prato"
            value={dishDescription}
            onChange={(event) => setDishDescription(event.target.value)}
          />
          <Flex w="100%" justifyContent="end" gap="15px">
            <NewDishPreview
              title="Fast Grill"
              dish={dishName}
              description={dishDescription}
              image={imgUrl}
            />
            <Button
              onClick={onOpen}
              leftIcon={<BsTable />}
              colorScheme={'orange'}
            >
              Tabela Nutricional
            </Button>
          </Flex>
          <Modal
            initialFocusRef={initialRef}
            finalFocusRef={finalRef}
            isOpen={isOpen}
            onClose={onClose}
            scrollBehavior={'inside'}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Tabela Nutricional</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl>
                  <FormLabel>Porção</FormLabel>
                  <Input placeholder="Ex: 200g (2 pedaços)" value={nutriTable.porcao} onChange={(event) => changeNutriTable(event.target.value, 'porcao')} />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Valor Energético</FormLabel>
                  <Input placeholder="Ex: 150 Kcal" value={nutriTable.valor_ener} onChange={(event) => changeNutriTable(event.target.value, 'valor_ener')} />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Carboidratos</FormLabel>
                  <HStack>
                    <Input placeholder="Ex: 10g" value={nutriTable.carbos.value} onChange={(event) => changeNutriTable(event.target.value, 'carbos', 'value')} />
                    <Input placeholder="%VD(*)" value={nutriTable.carbos.percent} onChange={(event) => changeNutriTable(event.target.value, 'carbos', 'percent')} />
                  </HStack>
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Proteínas</FormLabel>
                  <HStack>
                    <Input placeholder="Ex: 13g" value={nutriTable.proteins.value} onChange={(event) => changeNutriTable(event.target.value, 'proteins', 'value')} />
                    <Input placeholder="%VD(*)" value={nutriTable.proteins.percent} onChange={(event) => changeNutriTable(event.target.value, 'proteins', 'percent')} />
                  </HStack>
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Gorduras Totais</FormLabel>
                  <HStack>
                    <Input placeholder="Ex: 1,3g" value={nutriTable.total_gordura.value} onChange={(event) => changeNutriTable(event.target.value, 'total_gordura', 'value')} />
                    <Input placeholder="%VD(*)" value={nutriTable.total_gordura.percent} onChange={(event) => changeNutriTable(event.target.value, 'total_gordura', 'percent')} />
                  </HStack>
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Gorduras Saturadas</FormLabel>
                  <HStack>
                    <Input value={nutriTable.total_saturada.value} onChange={(event) => changeNutriTable(event.target.value, 'total_saturada', 'value')} />
                    <Input placeholder="%VD(*)" value={nutriTable.total_saturada.percent} onChange={(event) => changeNutriTable(event.target.value, 'total_saturada', 'percent')} />
                  </HStack>
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Gorduras Trans</FormLabel>
                  <HStack>
                    <Input value={nutriTable.total_trans.value} onChange={(event) => changeNutriTable(event.target.value, 'total_trans', 'value')} />
                    <Input placeholder="%VD(*)" value={nutriTable.total_trans.percent} onChange={(event) => changeNutriTable(event.target.value, 'total_trans', 'percent')} />
                  </HStack>
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Fibra Alimentar</FormLabel>
                  <HStack>
                    <Input value={nutriTable.fibra_ali.value} onChange={(event) => changeNutriTable(event.target.value, 'fibra_ali', 'value')} />
                    <Input value={nutriTable.fibra_ali.percent} placeholder="%VD(*)" onChange={(event) => changeNutriTable(event.target.value, 'fibra_ali', 'percent')} />
                  </HStack>
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Sódio</FormLabel>
                  <HStack>
                    <Input value={nutriTable.sodio.value} onChange={(event) => changeNutriTable(event.target.value, 'sodio', 'value')} />
                    <Input placeholder="%VD(*)" value={nutriTable.sodio.percent} onChange={(event) => changeNutriTable(event.target.value, 'sodio', 'percent')} />
                  </HStack>
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Açúcares</FormLabel>
                  <HStack>
                    <Input value={nutriTable.acucar.value} onChange={(event) => changeNutriTable(event.target.value, 'acucar', 'value')} />
                    <Input value={nutriTable.acucar.percent} placeholder="%VD(*)" onChange={(event) => changeNutriTable(event.target.value, 'acucar', 'percent')} />
                  </HStack>
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3}>
                  Salvar
                </Button>
                <Button onClick={onClose}>Cancelar</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </VStack>
        <Box mt="5%" textAlign="right" w="98%">
          <Button colorScheme="green" onClick={() => handleSubmit()} disabled={isSaving}>Atualizar prato</Button>
        </Box>
      </Box>
    </Flex>
  );
};

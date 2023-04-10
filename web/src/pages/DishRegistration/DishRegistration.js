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
import React, { useRef, useState } from 'react';
import Dish from '../../components/Dish/Dish';
import NewDishPreview from '../../components/NewDishPreview/NewDishPreview';

function FileInputButton() {
  const fileInputRef = useRef(null);
  const [image, setImage] = useState(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileInputChange = event => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);
    console.log(URL.createObjectURL(selectedImage));
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

export const DishRegistration = ({ image }) => {
  const [dishName, setDishName] = useState('');
  const handleNameChange = event => {
    setDishName(event.target.value);
  };
  const [dishDescription, setDishDescription] = useState('');
  const handleDescriptionChange = event => {
    setDishDescription(event.target.value);
  };

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
        <Heading>Cadastro de Prato</Heading>
        <VStack w="98%" gap="40px" mt="50px">
          <NormalInput title="Nome" onChange={handleNameChange} />
          <HStack w="100%">
            <FileInputButton />

            <Select placeholder="Tipo" variant="filled">
              <option value="comum">Comum</option>
              <option value="bebida">Bebida</option>
              <option value="sobremesa">Sobremesa</option>
              <option value="vegetariana">Vegetariana</option>
            </Select>
          </HStack>
          <Textarea
            placeholder="Descrição do prato"
            onChange={handleDescriptionChange}
          />
          <Flex w="100%" justifyContent="end" gap="15px">
            <NewDishPreview
              title="Fast Grill"
              dish={dishName}
              description={dishDescription}
              image="https://soubh.uai.com.br/uploads/post/image/5883/main_211902_shutterstock_421827745.jpg"
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
                  <Input ref={initialRef} placeholder="Ex: 200g (2 pedaços)" />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Valor Energético</FormLabel>
                  <Input placeholder="Ex: 150 Kcal" />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Carboidratos</FormLabel>
                  <HStack>
                    <Input placeholder="Ex: 10g" />
                    <Input placeholder="%VD(*)" />
                  </HStack>
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Proteínas</FormLabel>
                  <HStack>
                    <Input placeholder="Ex: 13g" />
                    <Input placeholder="%VD(*)" />
                  </HStack>
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Gorduras Totais</FormLabel>
                  <HStack>
                    <Input placeholder="Ex: 1,3g" />
                    <Input placeholder="%VD(*)" />
                  </HStack>
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Gorduras Saturadas</FormLabel>
                  <HStack>
                    <Input />
                    <Input placeholder="%VD(*)" />
                  </HStack>
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Gorduras Trans</FormLabel>
                  <HStack>
                    <Input />
                    <Input placeholder="%VD(*)" />
                  </HStack>
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Fibra Alimentar</FormLabel>
                  <HStack>
                    <Input />
                    <Input placeholder="%VD(*)" />
                  </HStack>
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Sódio</FormLabel>
                  <HStack>
                    <Input />
                    <Input placeholder="%VD(*)" />
                  </HStack>
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Açúcares</FormLabel>
                  <HStack>
                    <Input />
                    <Input placeholder="%VD(*)" />
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
          <Button colorScheme="green">Cadastrar prato</Button>
        </Box>
      </Box>
    </Flex>
  );
};

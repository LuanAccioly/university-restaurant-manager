import {
  Box,
  Button,
  Center,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorMode,
  useDisclosure,
} from '@chakra-ui/react';
import { BsLayoutThreeColumns } from 'react-icons/bs';
import { AiFillEye } from 'react-icons/ai';
import Dish from '../Dish/Dish';

function NewDishPreview({ image, title, dish, description }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode } = useColorMode();
  const imageStyle = {
    filter: colorMode === 'dark' ? 'brightness(0.7)' : 'brightness(1)',
  };
  return (
    <>
      <Button leftIcon={<AiFillEye />} onClick={onOpen}>
        Preview
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          p="15px"
          w="400px"
          gap="10px"
          h="500px"
          borderRadius="20px"
        >
          <Box
            w="100%"
            h={['auto', '95%']}
            borderWidth="2px"
            borderRadius="20px"
            overflow="hidden"
          >
            <Box
              bgImage={`url('${image}')`}
              bgPosition="center"
              bgSize="cover"
              h={['200px', '250px']}
              width="100%"
              flex="1"
              style={imageStyle}
              // borderRadius="lg"
            />
            <Box p="5">
              <Heading as="h4" size="md">
                {dish}
              </Heading>

              <Text as="h6" size="xs" mt="3px">
                {title}
              </Text>
              <Text fontSize="xs" mt="3px" noOfLines={3}>
                {description}
              </Text>
            </Box>
          </Box>
          <Button
            w="5vw"
            colorScheme="blue"
            margin="15px 15px"
            onClick={onClose}
          >
            Fechar
          </Button>
        </ModalContent>
      </Modal>
    </>
  );
}
export default NewDishPreview;

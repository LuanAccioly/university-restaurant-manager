import { Image } from '@chakra-ui/image';
import { Box, Flex, Heading, HStack, Text } from '@chakra-ui/layout';
import { useColorMode } from '@chakra-ui/react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
} from '@chakra-ui/react';

function Dish({ image, title, dish, description, table }) {
  const { colorMode } = useColorMode();
  const imageStyle = {
    filter: colorMode === 'dark' ? 'brightness(0.7)' : 'brightness(1)',
  };

  return (
    <Popover>
      <PopoverTrigger>
        <Box
          cursor="pointer"
          w={['70%', '85%']}
          h={['auto', '95%']}
          borderWidth="2px"
          borderRadius="15px"
          overflow="hidden"
          maxW="330px"
        >
          <Box
            bgImage={`url('${image}')`}
            bgPosition="center"
            bgSize="cover"
            h={['150px', '200px']}
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
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Tabela Nutricional</PopoverHeader>
        <PopoverBody>
          <Flex
            direction="column"
            alignItems="center"
            justifyContent="center"
            w="100%"
            gap="10px"
          >
            <Text fontSize="12px">Porção de exemplo: 200g</Text>
            <Flex justifyContent="space-between" w="100%">
              <Text>Valor Energético:</Text>
              <Text fontWeight="bold">200g</Text>
            </Flex>
            <Flex justifyContent="space-between" w="100%">
              <Text>Carboidratos:</Text>
              <Flex gap="20px">
                <Text fontWeight="bold">200g</Text>
                <Text> 0%</Text>
              </Flex>
            </Flex>
            <Flex justifyContent="space-between" w="100%">
              <Text>Gorduras Totais:</Text>
              <Flex gap="20px">
                <Text fontWeight="bold">200g</Text>
                <Text> 0%</Text>
              </Flex>
            </Flex>
            <Flex justifyContent="space-between" w="100%">
              <Text>Gorduras Saturadas:</Text>
              <Flex gap="20px">
                <Text fontWeight="bold">200g</Text>
                <Text> 0%</Text>
              </Flex>
            </Flex>
            <Flex justifyContent="space-between" w="100%">
              <Text>Gorduras Trans:</Text>
              <Flex gap="20px">
                <Text fontWeight="bold">200g</Text>
                <Text> 0%</Text>
              </Flex>
            </Flex>
            <Flex justifyContent="space-between" w="100%">
              <Text>Fibras:</Text>
              <Flex gap="20px">
                <Text fontWeight="bold">200g</Text>
                <Text> 0%</Text>
              </Flex>
            </Flex>
            <Flex justifyContent="space-between" w="100%">
              <Text>Sódio:</Text>
              <Flex gap="20px">
                <Text fontWeight="bold">200g</Text>
                <Text> 0%</Text>
              </Flex>
            </Flex>
            <Flex justifyContent="space-between" w="100%">
              <Text>Açúcares:</Text>
              <Flex gap="20px">
                <Text fontWeight="bold">200g</Text>
                <Text> 0%</Text>
              </Flex>
            </Flex>
          </Flex>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
export default Dish;

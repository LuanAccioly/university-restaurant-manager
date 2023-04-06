import { Image } from '@chakra-ui/image';
import { Box, Heading, Text } from '@chakra-ui/layout';
import { useColorMode } from '@chakra-ui/react';

function Dish({ image, title, dish, description }) {
  const { colorMode } = useColorMode();
  const imageStyle = {
    filter: colorMode === 'dark' ? 'brightness(0.7)' : 'brightness(1)',
  };
  return (
    <Box
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
  );
}
export default Dish;

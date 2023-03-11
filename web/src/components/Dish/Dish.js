import { Image } from '@chakra-ui/image';
import { Box, Heading, Text } from '@chakra-ui/layout';

function Dish({ image, title, dish, description }) {
  return (
    <Box
      w={['100%', '85%']}
      h={['auto', '95%']}
      borderWidth="2px"
      borderRadius="lg"
      overflow="hidden"
      maxW="100%"
      mx="auto"
      my="2%"
    >
      <Box
        bgImage={`url('${image}')`}
        bgPosition="center"
        bgSize="cover"
        h={['150px', '200px']}
        width="100%"
        flex="1"
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

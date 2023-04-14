import { Image } from '@chakra-ui/image';
import {
  Box,
  Center,
  Flex,
  Heading,
  HStack,
  Text,
  VStack,
} from '@chakra-ui/layout';
import Dish from '../../components/Dish/Dish';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './menu.css';
import { Spinner, useColorMode } from '@chakra-ui/react';

export const Menu = ({ data, loading }) => {
  const { colorMode } = useColorMode();
  const imageStyle = {
    filter: colorMode === 'dark' ? 'brightness(0.7)' : 'brightness(1)',
  };
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  if (!data) {
    return (
      <Center h={'75vh'} overflow={'hidden'}>
        <Image
          src="https://i.pinimg.com/originals/ff/c3/d3/ffc3d3f7e25c28ea2d3fe42231736f00.png"
          boxSize="80%"
          size="sm"
          objectFit="contain"
          objectPosition="center"
        />
        <Heading fontSize="6xl" fontFamily={'sans-serif'}>
          Nenhum cardápio para hoje
        </Heading>
      </Center>
    );
  }

  return (
    <Flex w="100%" justifyContent="center" mt="30px">
      <VStack gap="20px" w="100%">
        <Flex w="98.5%" gap="30px">
          <Box
            bgImage={`url('http://localhost:3002/${data.pp_1.picture}')`}
            style={imageStyle}
            bgPosition="center"
            bgSize="cover"
            h="380px"
            flex="1"
            borderRadius="15px"
          >
            <Box
              borderRadius="15px"
              boxSize="100%"
              bgGradient="linear(90deg, rgba(0,0,0,0.6867121848739496) 0%, rgba(0,0,0,0.5158438375350141) 49%, rgba(0,0,0,0) 100%)"
              justifyItems="bottom"
              style={{ filter: 'brightness(1)' }}
            >
              <Flex h="100%" alignItems="flex-end" padding="40px">
                <Box color="white">
                  <Heading color="white" as="h2" size="xl">
                    {data.pp_1.name}
                  </Heading>
                  <Heading as="h4" size="md">
                    Prato Principal 1
                  </Heading>
                  <Text fontSize="xs" mt="3px" noOfLines={3}></Text>
                </Box>
              </Flex>
            </Box>
          </Box>
          <Box
            cursor="pointer"
            w={['70%', '85%']}
            h={['auto', '95%']}
            borderWidth="2px"
            borderRadius="15px"
            overflow="hidden"
            maxW="330px"
            zIndex={'base'}
          >
            <Box
              bgImage={`url('http://localhost:3002/${data.suco.picture}')`}
              bgPosition="center"
              bgSize="cover"
              h={['150px', '200px']}
              width="100%"
              flex="1"
              style={imageStyle}
              // borderRadius="lg"
            />
            <Box p="5">
              <Heading as="h2" size="xl">
                Suco do dia:
              </Heading>
              <Heading as="h4" size="md">
                {data.suco.name}
              </Heading>
            </Box>
          </Box>
          {/* <Box bg="green.100" w="300px" borderRadius="15px" p="30px">
            <Image
              src={`http://localhost:3002/${data.suco.picture}`}
              boxSize="120px"
              marginBottom="30px"
            />
            <Flex h="50%" alignItems="flex-end">
              <Box>
                <Heading as="h2" size="xl">
                  Suco do dia:
                </Heading>
                <Heading as="h4" size="md">
                  {data.suco.name}
                </Heading>
              </Box>
            </Flex>
          </Box> */}
        </Flex>

        <Flex w={'100%'}>
          <Carousel
            responsive={responsive}
            containerClass="carousel-container"
            swipeable={false}
            centerMode={true}
            infinite
            autoPlay
            autoPlaySpeed={2500}
          >
            <Dish
              table={data.nutri_table}
              title="Prato Principal 2"
              dish={data.pp_2.name}
              description={data.pp_2.description}
              image={`http://localhost:3002/${data.pp_2.picture}`}
            />
            <Dish
              table={data.nutri_table}
              title="Fast Grill"
              dish={data.fast.name}
              description={data.fast.description}
              image={`http://localhost:3002/${data.fast.picture}`}
            />
            <Dish
              table={data.nutri_table}
              title="Na Grelha"
              dish={data.grelha.name}
              description={data.grelha.description}
              image={`http://localhost:3002/${data.grelha.picture}`}
            />
            <Dish
              table={data.nutri_table}
              title="Vegetariano"
              dish={data.veg.name}
              description={data.veg.description}
              image={`http://localhost:3002/${data.veg.picture}`}
            />
            <Dish
              table={data.nutri_table}
              title="Guarnição"
              dish={data.guarnicao.name}
              description={data.guarnicao.description}
              image={`http://localhost:3002/${data.guarnicao.picture}`}
            />
            <Dish
              table={data.nutri_table}
              title="Salada Crua"
              dish={data.salad_cr.name}
              description={data.salad_cr.description}
              image={`http://localhost:3002/${data.salad_cr.picture}`}
            />
            <Dish
              table={data.nutri_table}
              title="Salada Cozida"
              dish={data.salad_cuz.name}
              description={data.salad_cuz.description}
              image={`http://localhost:3002/${data.salad_cuz.picture}`}
            />
            <Dish
              table={data.nutri_table}
              title="Sobremesa"
              dish={data.sobremesa.name}
              description={data.sobremesa.description}
              image={`http://localhost:3002/${data.sobremesa.picture}`}
            />
          </Carousel>
        </Flex>
      </VStack>
    </Flex>
  );
};

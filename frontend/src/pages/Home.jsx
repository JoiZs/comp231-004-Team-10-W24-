import { Container } from "@chakra-ui/react";
import { IconButton } from "@chakra-ui/react";
import { Icon } from "@chakra-ui/react";
import {
  RiNumber1,
  RiNumber2,
  RiNumber3,
  RiNumber4,
  RiNumber5,
  RiStarFill,
} from "react-icons/ri";
import { Button, ButtonGroup, useBoolean } from "@chakra-ui/react";
import { Flex, VStack } from "@chakra-ui/react";
import { ChevronRightIcon, ChevronLeftIcon } from "@chakra-ui/icons";
import Sitter from "../component/Sitter";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthCtx } from "../context";
import { Box, Card, CardBody, Grid, Image, Text } from "@chakra-ui/react";


function SitterCard({ sitter }) {
  return (
    <Card overflow="hidden" variant="outline" bg="transparent">
      <CardBody>
        <Flex direction={{ base: "column", sm: "row" }} align="center">
          <Image
            src={sitter.Img}
            alt={`${sitter.Name}`}
            boxSize={{ base: "100%", sm: "150px" }}
            objectFit="cover"
          />
          <VStack align="start" pl={{ sm: 4 }}>
            <Text>{`Name: ${sitter.Name} - Availability: ${sitter.Ava}`}</Text>
            <Text>{`Pet type: ${sitter.PetType} - Distance: ${sitter.Distance}`}</Text>
          </VStack>
        </Flex>
      </CardBody>
    </Card>
  );
}

export default function Home() {
  const [nearby, setNearby] = useBoolean(false);
  const [ratingState, setRatingState] = useState(4);
  const [pageNum, setPageNum] = useState(1);
  const [ramainSitter, setRamainSitter] = useState(0);
  const [sitters, setSitters] = useState([]);
  const { isAuth } = useContext(AuthCtx);

  useEffect(() => {
    const getSitters = async () => {
      await axios
        .post(
          "http://localhost:4000/profile/sitters",
          {
            sortByRating: ratingState,
            sortByLocation: isAuth && nearby,
            pageNum: pageNum,
          },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          if (res.data) {
            setRamainSitter(res.data?.remaining);
            setSitters(res.data.data.sitters);
          }
        })
        .catch((err) => console.log(err));
    };
    getSitters();
  }, [ratingState, nearby, pageNum]);

  return (
    <Container mt={5} maxW="full" p={0} color="black" h="100vh" centerContent overflow="hidden" position="relative">
      <Flex alignItems={"center"} padding={2} flexWrap={"wrap"}>
        <div className="flex items-center justify-center">
          <RiStarFill fontSize={18} color="blue" />
        </div>
        <ButtonGroup flex={1}>
          <IconButton
            onClick={() => setRatingState(1)}
            variant={ratingState == 1 ? "solid" : "outline"}
            size={"xs"}
            colorScheme="blue"
            aria-label="rating-1"
            icon={<Icon as={RiNumber1} />}
            m={1}
          />
          <IconButton
            onClick={() => setRatingState(2)}
            variant={ratingState == 2 ? "solid" : "outline"}
            size={"xs"}
            colorScheme="blue"
            aria-label="rating-2"
            icon={<Icon as={RiNumber2} />}
            m={1}
          />
          <IconButton
            onClick={() => setRatingState(3)}
            variant={ratingState == 3 ? "solid" : "outline"}
            size={"xs"}
            colorScheme="blue"
            aria-label="rating-3"
            icon={<Icon as={RiNumber3} />}
            m={1}
          />
          <IconButton
            onClick={() => setRatingState(4)}
            variant={ratingState == 4 ? "solid" : "outline"}
            size={"xs"}
            colorScheme="blue"
            aria-label="rating-4"
            icon={<Icon as={RiNumber4} />}
            m={1}
          />
          <IconButton
            onClick={() => setRatingState(5)}
            variant={ratingState == 5 ? "solid" : "outline"}
            size={"xs"}
            colorScheme="blue"
            aria-label="rating-5"
            icon={<Icon as={RiNumber5} />}
            m={1}
          />
        </ButtonGroup>

        <ButtonGroup size={"sm"} m={"auto"}>
          <Button
            variant={!nearby ? "solid" : "ghost"}
            onClick={setNearby.toggle}
            colorScheme="blue"
          >
            Nearby
          </Button>
          <IconButton
            onClick={() => pageNum > 1 && setPageNum(pageNum - 1)}
            colorScheme="blue"
            variant={"outline"}
            icon={<ChevronLeftIcon />}
          />
          <IconButton
            onClick={() => ramainSitter >= 1 && setPageNum(pageNum + 1)}
            colorScheme="blue"
            variant={"outline"}
            icon={<ChevronRightIcon />}
          />
        </ButtonGroup>
      </Flex>
      <VStack w={"full"}>
        {sitters.map((el) => {
          return (
            <Sitter
              key={el.userId}
              uid={el.userId}
              Name={el.firstname + " " + el.lastname}
              Ava={el.Profile.availabilitySlot}
              PetType={el.Profile.petType}
              Rating={el.avg.rating}
              Distance={el.distance}
              Img={el.Profile.img}
            />
          );
        })}
        {sitters.length <= 0 && (
          <span className="text-gray-400">No sitter found.</span>
        )}
      </VStack>

      {/*background */}
      <Box
        h="150vh" w="full"
        bgImage="url('https://www.bls.gov/opub/btn/volume-2/images/2-16-image.jpg')"
        bgPos="center 77%"
        bgSize="cover"
      >
        <Text color="white" fontWeight="700" lineHeight="1.2" fontSize="4xl" textAlign="center" pt={20}>
          Find Your Perfect Pet Sitters Today
        </Text>
      </Box>

      {/*preview sitter cards */}
      <VStack spacing={4} w="full" p={4}>
        <Grid templateColumns={{ sm: "repeat(1, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(5, 1fr)" }} gap={6}  >
          <SitterCard
            sitter={{
              Name: "Sitter One",
              Img: "https://media.istockphoto.com/id/1464498740/photo/laughing-couple-playing-with-their-dog-on-their-living-room-sofa.webp?b=1&s=612x612&w=0&k=20&c=1k-ajU17T_bjcvi8m_0UkdJ5sIOgJB5robasBVzP_oU=",
              Ava: "Available",
              PetType: "Cats",
              Rating: "5 stars",
              Distance: "2 miles"
            }}
          />
          <SitterCard
            sitter={{
              Name: "Sitter Two",
              Img: "https://media.istockphoto.com/id/1464498740/photo/laughing-couple-playing-with-their-dog-on-their-living-room-sofa.webp?b=1&s=612x612&w=0&k=20&c=1k-ajU17T_bjcvi8m_0UkdJ5sIOgJB5robasBVzP_oU=",
              Ava: "Weekends",
              PetType: "Dogs",
              Rating: "4.5 stars",
              Distance: "5 miles"
            }}
          />
          <SitterCard
            sitter={{
              Name: "Sitter Three",
              Img: "https://media.istockphoto.com/id/1464498740/photo/laughing-couple-playing-with-their-dog-on-their-living-room-sofa.webp?b=1&s=612x612&w=0&k=20&c=1k-ajU17T_bjcvi8m_0UkdJ5sIOgJB5robasBVzP_oU=",
              Ava: "Weekdays",
              PetType: "Dogs and Cats",
              Rating: "4 stars",
              Distance: "3 miles"
            }}
          />
          <SitterCard
            sitter={{
              Name: "Sitter Four",
              Img: "https://media.istockphoto.com/id/1464498740/photo/laughing-couple-playing-with-their-dog-on-their-living-room-sofa.webp?b=1&s=612x612&w=0&k=20&c=1k-ajU17T_bjcvi8m_0UkdJ5sIOgJB5robasBVzP_oU=",
              Ava: "Evenings",
              PetType: "Small Pets",
              Rating: "5 stars",
              Distance: "1 mile"
            }}
          />
          <SitterCard
            sitter={{
              Name: "Sitter Five",
              Img: "https://media.istockphoto.com/id/1464498740/photo/laughing-couple-playing-with-their-dog-on-their-living-room-sofa.webp?b=1&s=612x612&w=0&k=20&c=1k-ajU17T_bjcvi8m_0UkdJ5sIOgJB5robasBVzP_oU=",
              Ava: "On Call",
              PetType: "Exotic Pets",
              Rating: "4.8 stars",
              Distance: "10 miles"
            }}
          />
        </Grid>
      </VStack>

      <ButtonGroup variant="solid" spacing={4}>
        <Button bg="blue.400" color="white" _hover={{ bg: 'blue.500' }}>
          Show more
        </Button>
      </ButtonGroup>
    </Container>

  ); //end of return()
} // end of Home(){ }

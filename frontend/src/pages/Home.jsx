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
import Sitter from "../components/Sitter";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthCtx } from "../context";

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
    <Container mt={5} maxW="container.md" color="black" rounded={10}>
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
    </Container>
  ); //end of return()
} // end of Home(){}

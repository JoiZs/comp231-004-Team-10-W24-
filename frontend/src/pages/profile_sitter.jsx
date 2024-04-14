import { useContext, useLayoutEffect, useState } from "react";
import {
  Box,
  Text,
  Heading,
  Badge,
  Avatar,
  HStack,
  VStack,
  Card,
  CardHeader,
  CardBody,
  SimpleGrid,
  Tooltip,
  useToast,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthCtx } from "../context";
import Book from "./Book";

const Profile_Sitter = () => {
  const [sitterInfo, setSitterInfo] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { uid } = useParams();
  const { isAuth } = useContext(AuthCtx);
  const toast = useToast();

  useLayoutEffect(() => {
    const reqSiiterFn = async () => {
      await axios
<<<<<<< HEAD
        .get(`http://localhost:4000/profile/${uid}`)
=======
        .get(`${import.meta.env.VITE_SERV_URL}/profile/${uid}`)
>>>>>>> b2d7069 (build(docker): dockerize the app)
        .then((res) => {
          if (res.data) setSitterInfo(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    reqSiiterFn();
  }, [uid]);

  const BookHandler = async () => {
    if (!isAuth) {
      toast({
        title: "Reservation",
        duration: 3000,
        status: "error",
        description: "You must login to make a reservation.",
      });
    } else {
      onOpen();
    }
  };

  return (
    <Box maxWidth={"lg"} w={"full"} p={5}>
      <Box
        w={"full"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Avatar
          size={"lg"}
          src={sitterInfo?.Profile?.img}
          name={sitterInfo?.firstname + " " + sitterInfo?.lastname}
        />
      </Box>
      <Modal
        onClose={onClose}
        // finalFocusRef={btnRef}
        isOpen={isOpen}
        scrollBehavior={"inside"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Make a reservation</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Book sitterId={sitterInfo?.userId} />
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <HStack py={4} justifyContent={"space-between"} alignItems={"center"}>
        <Heading as="h2" size="lg">
          {sitterInfo?.firstname + " " + sitterInfo?.lastname}
        </Heading>
        {isAuth?.Profile?.profileType === "Owner" && (
          <Button
            colorScheme="blue"
            size={"sm"}
            variant={"outline"}
            onClick={BookHandler}
          >
            Book
          </Button>
        )}
      </HStack>
      <VStack alignItems={"flex-start"} py={2}>
        <Badge>Address</Badge>
        <Text>{`${sitterInfo?.address?.street}, ${sitterInfo?.address?.suburb}, ${sitterInfo?.address?.city} ${sitterInfo?.address?.postalCode}, ${sitterInfo?.address?.province}`}</Text>
      </VStack>

      <Badge>Availablility</Badge>
      <SimpleGrid dir="horizontal" spacing={4} templateColumns="1fr 1fr 1fr">
        <Card>
          <CardHeader fontSize={"sm"} color={"GrayText"}>
            Count
          </CardHeader>
          <CardBody fontSize={40} display={"flex"} alignSelf={"flex-end"}>
            {sitterInfo?.Profile?.availabilitySlot}
          </CardBody>
        </Card>
        <Card>
          <CardHeader fontSize={"sm"} color={"GrayText"}>
            Start Date
          </CardHeader>
          <CardBody display={"flex"} alignSelf={"flex-end"}>
            {new Date(sitterInfo?.Profile?.availabilityStart).toDateString()}
          </CardBody>
        </Card>
        <Card>
          <CardHeader fontSize={"sm"} color={"GrayText"}>
            End Date
          </CardHeader>
          <CardBody display={"flex"} alignSelf={"flex-end"}>
            {new Date(sitterInfo?.Profile?.availabilityEnd).toDateString()}
          </CardBody>
        </Card>
      </SimpleGrid>

      <Box py={2}>
        <Badge>Followers &#40; {sitterInfo?.followedBy.length} &#41;</Badge>
      </Box>

      <Box py={2}>
        <Badge>Reviews &#40; {sitterInfo?._count?.reviewReceived} &#41;</Badge>
        <VStack maxH={"300px"}>
          {sitterInfo?.reviewReceived?.map((el, idx) => {
            return (
              <HStack justifyContent={"flex-start"} p={2} key={idx} w={"full"}>
                <Avatar size={"xs"} name={el.givenBy?.firstname} />
                <VStack alignItems={"flex-start"}>
                  <Heading size={"xs"}>
                    {Number(el.rating).toFixed(1)} by{" "}
                    {el.givenBy?.firstname + " " + el.givenBy?.lastname}
                  </Heading>
                  <Tooltip label={el.comment}>
                    <Text
                      overflow={"hidden"}
                      textOverflow={"ellipsis"}
                      whiteSpace={"nowrap"}
                      maxW={"sm"}
                      size={"xs"}
                      color={"GrayText"}
                    >
                      {el.comment}
                    </Text>
                  </Tooltip>
                </VStack>
              </HStack>
            );
          })}
        </VStack>
      </Box>
    </Box>
  );
};

export default Profile_Sitter;

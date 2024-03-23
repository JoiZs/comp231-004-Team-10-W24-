import {
  Card,
  Image,
  Stack,
  CardBody,
  CardFooter,
  Button,
  Heading,
  Text,
  HStack,
  Badge,
  Avatar,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import React from "react";

const Sitter = ({ Name, Ava, PetType, Rating, Distance, Img }) => {
  return (
    <Card
      w={"full"}
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="outline"
      size={"sm"}
    >
      {Img ? (
        <Image
          objectFit="cover"
          maxW={{ base: "100%", sm: "150px" }}
          src={Img}
          alt="sitter-image"
          borderRadius={"md"}
        />
      ) : (
        <HStack justifyContent={"center"} alignItems={"center"} p={4}>
          <Avatar size={"lg"} name={Name} />
        </HStack>
      )}
      <Stack flex={1}>
        <CardBody gap={2}>
          <HStack justifyContent={"space-between"}>
            <Heading size="md">{Name}</Heading>
            <HStack gap={0}>
              <StarIcon fontSize={"10"} />
              <Text>{Number(Rating).toFixed(1)}</Text>
            </HStack>
          </HStack>
          <Text color={"GrayText"} py="1" fontSize={"small"}>
            Availability: {Ava}
          </Text>
          {Distance && (
            <Text color={"GrayText"} py="1" fontSize={"small"}>
              Distance: {Math.floor(Distance * 10) / 10} km
            </Text>
          )}
          <HStack color={"GrayText"}>
            {PetType.map((el, idx) => {
              return <Badge key={idx}>{el}</Badge>;
            })}
          </HStack>
        </CardBody>
        <CardFooter justifyContent={"flex-end"}>
          <Button size={"sm"} variant="solid" colorScheme="blue">
            See Profile
          </Button>
        </CardFooter>
      </Stack>
    </Card>
  );
};

export default Sitter;

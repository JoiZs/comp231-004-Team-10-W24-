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
import { Link } from "react-router-dom";

const Sitter = ({ Name, Ava, PetType, Rating, Distance, Img, uid }) => {
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
            <HStack fontSize={"14"} color={"GrayText"} gap={0}>
              <StarIcon />
              <Text padding={2}>{Number(Rating).toFixed(1)}</Text>
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
          <Button
            to={`/profile_sitter/${uid}`}
            as={Link}
            size={"sm"}
            variant="solid"
            colorScheme="blue"
          >
            See Profile
          </Button>
        </CardFooter>
      </Stack>
    </Card>
  );
};

export default Sitter;

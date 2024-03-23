import { useContext, useState } from "react";
import axios from "axios";
import { RegisterCtx } from "../context";
import { HStack, Button, Badge, Divider, useToast } from "@chakra-ui/react";
function Registration3() {
  const { registerPl, setRegisterPl } = useContext(RegisterCtx);

  const toast = useToast();

  const submitHandler = async () => {
    await axios
      .post("http://localhost:4000/auth/register", registerPl)
      .then((res) => {
        toast({
          status: res.data.type,
          duration: 4000,
          title: "Registration",
          isClosable: true,
          description: res.data.message,
        });
      })
      .catch((err) => {
        toast({
          title: "Registration",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      });
  };

  return (
    <HStack flex={1} flexWrap={"wrap"} paddingY={"10px"}>
      <Badge colorScheme="teal">Location</Badge>
      <span>{registerPl.locDisplay}</span>
      <Divider />
      <Badge colorScheme="teal">Full Name</Badge>
      <span>{registerPl.firstname + " " + registerPl.lastname}</span>
      <Divider />
      <Badge colorScheme="teal">Email</Badge>
      <span>{registerPl.email}</span>
      <Divider />
      <Badge colorScheme="teal">User Type</Badge>
      <span>{registerPl.userType}</span>
      <Divider />
      <Button colorScheme="blue" onClick={submitHandler} w={"full"}>
        Submit
      </Button>
    </HStack>
  );
}

export default Registration3;

import { useContext, useRef, useState } from "react";
import { HStack, Input, RadioGroup, Radio, Button } from "@chakra-ui/react";
import { RegisterCtx } from "../context";

function Registration2({ setPgNum }) {
  const { registerPl, setRegisterPl } = useContext(RegisterCtx);
  const [uType, setUType] = useState("Owner");
  const firstnameRef = useRef();
  const lastnameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const infoHandler = () => {
    const fname = firstnameRef.current.value;
    const lname = lastnameRef.current.value;
    const email = emailRef.current.value;
    const pw = passwordRef.current.value;

    setRegisterPl((prev) => ({
      ...prev,
      firstname: fname,
      lastname: lname,
      email: email,
      password: pw,
      userType: uType,
    }));

    setPgNum(3);
  };

  return (
    <HStack flex={1} flexWrap={"wrap"}>
      <Input
        defaultValue={registerPl.firstname}
        aria-autocomplete="none"
        ref={firstnameRef}
        placeholder="Firstname"
      />
      <Input
        defaultValue={registerPl.lastname}
        aria-autocomplete="none"
        ref={lastnameRef}
        placeholder="Lastname"
      />
      <Input
        defaultValue={registerPl.email}
        aria-autocomplete="none"
        inputMode="email"
        type="email"
        ref={emailRef}
        placeholder="Email"
      />
      <Input
        defaultValue={registerPl.password}
        type="password"
        ref={passwordRef}
        placeholder="Password"
      />
      <RadioGroup
        w={"full"}
        border="1px"
        borderRadius={"4px"}
        padding={"4px"}
        borderColor={"inherit"}
        onChange={setUType}
        defaultValue={registerPl.userType || uType}
      >
        <HStack justifyContent={"space-around"}>
          <Radio value="Owner">Owner</Radio>
          <Radio value="Sitter">Sitter</Radio>
        </HStack>
      </RadioGroup>
      <Button colorScheme="teal" onClick={infoHandler} w={"full"}>
        Next
      </Button>
    </HStack>
  );
}

export default Registration2;

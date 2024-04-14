import { useContext, useRef, useState } from "react";
import { RegisterCtx } from "../context";
import {
  VStack,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  Tooltip,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import axios from "axios";
import { locationIQtk } from "../consts";
import { Text } from '@chakra-ui/react'

function Registration1({ setPgNum }) {
  const { _registerPl, setRegisterPl } = useContext(RegisterCtx);
  const [loc, setLoc] = useState([]);
  const SearchRef = useRef(null);

  const addressHandler = async () => {
    const searchKw = SearchRef.current.value;
    await axios
      .get(
        `https://api.locationiq.com/v1/autocomplete?key=${locationIQtk}&limit=3&q=${searchKw}`
      )
      .then((res) => {
        setLoc(res.data);
      })
      .catch((err) => {
        alert("Location Error.");
      });
  };

  const addressStoreHandler = (address) => {
    setRegisterPl((prev) => ({
      ...prev,
      street: address.road || address.name,
      city: address.city,
      province: address.state,
      postal: address.postcode,
      suburb: address.suburb || address.neighbourhood,
      lat: parseFloat(address.lat),
      long: parseFloat(address.lon),
      locDisplay: address.dname,
    }));

    setPgNum(2);
  };

  return (
    <VStack w={"full"} flex={1}>
      <InputGroup>
        <Input ref={SearchRef} placeholder="Search Location" />
        <InputRightElement>
          <IconButton
            colorScheme="blue"
            onClick={addressHandler}
            icon={<SearchIcon />}
          />
        </InputRightElement>
      </InputGroup>      
      {loc.map((el) => (
        <Tooltip label={el.display_name} key={el.place_id}>
          <Input
            onClick={() =>
              addressStoreHandler({
                ...el.address,
                lat: el.lat,
                lon: el.lon,
                dname: el.display_name,
              })
            }
            _hover={{ background: "gray", color: "white" }}
            cursor={"pointer"}
            type="button"
            value={el.display_name}
            textAlign={"left"}
            maxW={"full"}
            w={"full"}
            textOverflow={"ellipsis"}
            whiteSpace={"nowrap"}
            overflow={"hidden"}
          />
<<<<<<< HEAD

=======
>>>>>>> b2d7069 (build(docker): dockerize the app)
        </Tooltip>        
      ))}
      <Text fontSize='sm'>For best result, use this format: house number, street, neighbourhood, city, state, country, postcode</Text>
    </VStack>
<<<<<<< HEAD

=======
    
>>>>>>> b2d7069 (build(docker): dockerize the app)
  );
}

export default Registration1;

import { useState, useRef, useContext } from "react";
import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  Tooltip,
  IconButton,
  InputRightElement,
  Checkbox,
  VStack,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { locationIQtk } from "../consts";
import axios from "axios";
import { AuthCtx } from "../context";

const EditProfile = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure(); // useDisclosure hook for overlay (chakraUI)
  const SearchRef = useRef(null);
  const [loc, setLoc] = useState([]);
  const [formData, setFormData] = useState({
    address: {},
    fname: "",
    lname: "",
    pType: [],
    petSlot: 0,
  });
  const { isAuth } = useContext(AuthCtx);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "pType") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: [value],
      }));
    } else if (name === "petSlot") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: parseInt(value),
      }));
    } else if (name === "avaDateEnd" || name === "avaDateStart") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: new Date(value),
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

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
        console.error(
          "Location Error:",
          err.response ? err.response.data : err.message
        );
      });
  };

  const addressStoreHandler = (address) => {
    setFormData((prevData) => ({
      ...prevData,
      address: {
        street: address.road || address.name, //follow field names provided by API
        city: address.city,
        province: address.state,
        postalCode: address.postcode,
        suburb: address.suburb || address.neighbourhood,
        latitude: parseFloat(address.lat),
        longitude: parseFloat(address.lon),
      },
    }));

    setLoc([]);
  };
  const handleCheckboxChange = (e, pet) => {
    if (e.target.checked) {
      setFormData((prevData) => {
        const updatedPType = [...prevData.pType, pet];

        return {
          ...prevData,
          pType: updatedPType,
        };
      });
    } else {
      setFormData((prevData) => {
        const updatedPType = prevData.pType.filter((type) => type !== pet);

        return {
          ...prevData,
          pType: updatedPType,
        };
      });
    }
  };
  const submitHandler = async (e) => {
    e.preventDefault();

    const requestBody = {
      ...formData,
    };

    try {
      const response = await axios.patch(
        "http://localhost:4000/profile/update",
        requestBody,
        { withCredentials: true }
      );

      onClose();
      if (props.onUpdate) {
        props.onUpdate();
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <>
      <Button mt={4} colorScheme="blue" onClick={onOpen}>
        Edit Profile
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>First Name:</FormLabel>
              <Input type="text" name="fname" onChange={handleChange} />
              <FormLabel>Last Name:</FormLabel>
              <Input type="text" name="lname" onChange={handleChange} />
              {isAuth?.Profile?.profileType === "Sitter" && (
                <>
                  <FormLabel>Pet Slot:</FormLabel>
                  <Input type="number" name="petSlot" onChange={handleChange} />
                  <FormLabel>Availability Start:</FormLabel>
                  <Input
                    type="date"
                    name="avaDateStart"
                    onChange={handleChange}
                  />
                  <FormLabel>Availability End:</FormLabel>
                  <Input
                    type="date"
                    name="avaDateEnd"
                    onChange={handleChange}
                  />
                </>
              )}

              <FormLabel>Address</FormLabel>
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
              {loc.map((el) => {
                return (
                  <Tooltip label={el.display_name} key={el.place_id}>
                    <Input
                      onClick={() =>
                        addressStoreHandler({
                          //response fields from API
                          ...el.address, //address is returned as an object by the API
                          lat: el.lat,
                          lon: el.lon,
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
                  </Tooltip>
                );
              })}
              <FormLabel>Pet Type</FormLabel>
              <VStack alignItems="flex-start">
                {["dog", "cat", "bird", "fish", "reptile"].map((pet) => (
                  <Checkbox
                    key={pet}
                    value={pet}
                    isChecked={formData.pType.includes(pet)}
                    onChange={(e) => handleCheckboxChange(e, pet)}
                  >
                    {pet.charAt(0).toUpperCase() + pet.slice(1)}
                  </Checkbox>
                ))}
              </VStack>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button type="submit" colorScheme="green" onClick={submitHandler}>
              Save Changes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditProfile;

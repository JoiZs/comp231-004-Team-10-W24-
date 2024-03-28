import { useState, useRef } from "react";
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
    InputRightElement
  } from "@chakra-ui/react";
import {SearchIcon} from "@chakra-ui/icons";
import { locationIQtk } from "../consts";
import axios from "axios";

const EditProfile = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();  // useDisclosure hook for overlay
    const SearchRef = useRef(null);
    const [loc, setLoc] = useState([]);
    const [formData, setFormData] = useState({
        address: {},
        fname: "",
        lname: "",
        pType: ""
      });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value
        }));
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
        });
    };

    const addressStoreHandler = (address) => {
        setFormData(prevData => ({
          ...prevData,
          address: {
            street: address.road,
            city: address.city,
            province: address.state,
            postalCode: address.postcode,
            suburb: address.suburb || address.neighbourhood,
            latitude: parseFloat(address.lat),
            longitude: parseFloat(address.lon),
          }
       }));
  
       setLoc([]);
       };

       const submitHandler = async(e) => {
        e.preventDefault();
       
      const requestBody = {
        ...formData
    };
    
        try {
          const response = await axios.patch(
            "http://localhost:4000/profile/update",
            requestBody,
          { withCredentials: true }
          );
        console.log(response.data);
        onClose();
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
                <Input
                  type="text"
                  name="fname"
                  onChange={handleChange}
                />
                <FormLabel>Last Name:</FormLabel>
                <Input
                  type="text"
                  name="lname"                  
                  onChange={handleChange}
                />
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
                {loc.map((el) => (
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
                ))}
                {/* <FormLabel>Pet Type</FormLabel>
                <Select defaultValue={"Dog"}>
                  <option value="Dog">Dog</option>
                  <option value="Cat">Cat</option>
                  <option value="Rabbit">Rabbit</option>
                </Select> */}
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
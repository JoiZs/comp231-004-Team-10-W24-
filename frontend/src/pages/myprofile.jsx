import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { addressHandler } from "../component/addressUtils";
import {
  Box,
  Text,
  Heading,
  Badge,
  Avatar,
  VStack,
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
  Select,
  InputGroup,
  Tooltip,
  IconButton,
  InputRightElement
} from "@chakra-ui/react";
import {SearchIcon} from "@chakra-ui/icons";

export default function Profile() {
  // for modal
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    address: "",
    fname: "",
    lname: "",
    pType: ""
  });

    // State for storing address search results
    const [loc, setLoc] = useState([]);    
    const SearchRef = useRef(null);
    // state for selectedAddress
    const [selectedAddress, setSelectedAddress] = useState(null);

    const handleSearchClick = async () => {
      const searchKw = SearchRef.current.value;
      const results = await addressHandler(searchKw);
      setLoc(results);
     };

     const addressStoreHandler = (address) => {
      setSelectedAddress(address); // Update selectedAddress state

      setFormData(prevData => ({
        ...prevData,
        address: {
          street: address.road || address.name,
          city: address.city,
          province: address.state,
          postal: address.postcode,
          suburb: address.suburb || address.neighbourhood,
          lat: parseFloat(address.lat),
          long: parseFloat(address.lon),
          locDisplay: address.dname,
        }
     }));

     setLoc([]);
     };

  // Fetch profile data
  useEffect(() => {    
    const fetchProfileData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/profile/me", {
          withCredentials: true
        });
        setProfileData(response.data.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    // const dataToSend = {
    //   ...formData,
    //   address: {
    //     street: selectedAddress.road || selectedAddress.name,
    //     city: selectedAddress.city,
    //     province: selectedAddress.state,
    //     postal: selectedAddress.postcode,
    //     suburb: selectedAddress.suburb || selectedAddress.neighbourhood,
    //     lat: parseFloat(selectedAddress.lat),
    //     long: parseFloat(selectedAddress.lon),
    //     locDisplay: selectedAddress.dname,
    //   },
    //   userid: profileData.userid,    
    // };

     // Ensure the address object is structured correctly
    const addressData = selectedAddress ? {
      city: selectedAddress.city,
      street: selectedAddress.road || selectedAddress.name,
      postalCode: selectedAddress.postcode,
      province: selectedAddress.state,
      suburb: selectedAddress.suburb || selectedAddress.neighbourhood,
      latitude: parseFloat(selectedAddress.lat),
      longitude: parseFloat(selectedAddress.lon),
   } : {};

    const dataToSend = {
      ...formData,
      address: addressData, // Include the structured address data
      userid: profileData.userid, // Ensure this matches the backend's expected field
   };

    try {
      const response = await axios.patch(
        "http://localhost:4000/profile/update",
      dataToSend,
      { withCredentials: true }
      );
    console.log(response.data);
    onClose();
  } catch (error) {
    console.error("Error updating profile:", error);
  }
};

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!profileData) {
    return <div>Error: Unable to fetch profile data</div>;
  }

  return (
    <div>
      <Heading as="h2" size="lg" mb={5}>
        My Profile
      </Heading>
      <Avatar
        size={"lg"}
        src={profileData?.Profile?.img}
        name={profileData?.firstname + " " + profileData?.lastname}
      />
      <VStack alignItems={"flex-start"} py={2}>
        <Badge>Fristname</Badge>
        <Text>{profileData.firstname}</Text>
        <Badge>Lastname</Badge>
        <Text>{profileData.lastname}</Text>
        <Badge>Email</Badge>
        <Text>{profileData.email}</Text>
        <Badge>Address</Badge>
        <Text>{`${profileData?.address?.street}, 
        ${profileData?.address?.suburb}, 
        ${profileData?.address?.city} 
        ${profileData?.address?.postalCode}, 
        ${profileData?.address?.province}`}</Text>
      </VStack>
      <Button mt={4} colorScheme="blue" onClick={onOpen}>
        Edit Profile
      </Button>

      {/* Overlay Edit Profile */}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Profile</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit}>
            <ModalBody>
              {/* Include your form for editing profile details here */}
              <FormControl>
                <FormLabel>First Name:</FormLabel>
                <Input
                  type="text"
                  name="firstname"                  
                  onChange={handleChange}
                />
                <FormLabel>Last Name:</FormLabel>
                <Input
                  type="text"
                  name="lastname"                  
                  onChange={handleChange}
                />
                <FormLabel>Address</FormLabel>
                <InputGroup>
                <Input ref={SearchRef} placeholder="Search Location" />
                <InputRightElement>
                  <IconButton
                    colorScheme="blue"
                    onClick={handleSearchClick}
                    icon={<SearchIcon />}
                  />
                </InputRightElement>
                </InputGroup>
                {loc.map((el) => (
            <Tooltip label={el.display_name} key={el.place_id}>
              <Input
                onClick={() =>
                  addressStoreHandler({
                    road: el.road || el.name,
                    city: el.city,
                    state: el.state,
                    postcode: el.postcode,
                    suburb: el.suburb || el.neighbourhood,
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
              <Button type="submit" colorScheme="green">
                Save Changes
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </div>
  );
}
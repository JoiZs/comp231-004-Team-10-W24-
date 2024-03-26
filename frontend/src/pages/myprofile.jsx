import React, { useState, useEffect } from "react";
import axios from "axios";

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
  FormControl, FormLabel, Input
} from "@chakra-ui/react";

const ProfilePage = () => {
  // for modal
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    address: "",
    fname: "",
    lname: "",
    pType: "",
  });

  useEffect(() => {
    // Fetch profile data when the component mounts
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSaveChanges = async () => {
    try {
      await axios.patch(
        "http://localhost:4000/profile/update",
        formData,
        {
          withCredentials: true,
        }
      );
      // Optionally, update local state or trigger any necessary actions upon successful update
      onClose();
    } catch (error) {
      console.error("Error updating profile data:", error);
      // Handle error as needed (e.g., display an error message)
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
        ${profileData?.address?.province}`}
      </Text>
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
          <ModalBody>
            {/* Include your form for editing profile details here */}            
            <FormControl>
            <FormLabel>First Name:</FormLabel>
            <Input           
              type="text"
              name="firstname"
              placeholder="First Name"
              value={formData.firstname}
              onChange={handleInputChange}
            />
            <FormLabel>Last Name:</FormLabel>
            <Input
              type="text"              
              name="lastname"
              placeholder="Last Name"
              value={formData.lastname}
              onChange={handleInputChange}
            />
            <FormLabel>Address</FormLabel>
            <Input
              type="text"         
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleInputChange}
            />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="green" onClick={handleSaveChanges}>
              Save Changes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ProfilePage;
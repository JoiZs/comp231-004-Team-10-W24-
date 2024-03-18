import React from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  HStack,
  Image,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
  Heading,
  Flex
} from '@chakra-ui/react';

const Profile_Sitter = () => {
  // Form state management here (e.g., useForm hook or useState)
  // ...

  // Modal disclosure for more pictures
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box className="sitter-container" p={5}>
      <Heading as="h2" size="lg" mb={5}>Pet Sitter Registration</Heading>
      <Flex direction={{ base: 'column', md: 'row' }} alignItems="start"justifyContent="space-between">
        {/* Personal Information Section */}
        <VStack align="start" spacing={4}>
        <FormControl id="fname" display="flex" alignItems="left">
        <FormLabel>First Name:</FormLabel>
              <Input type="text" placeholder="Enter your first name" />
            </FormControl>
            <FormControl id="lname" display="flex" alignItems="left">
              <FormLabel>Last Name:</FormLabel>
              <Input type="text" placeholder="Enter your last name" />
            </FormControl>
            <FormControl id="street"display="flex" alignItems="left">
              <FormLabel>Street:</FormLabel>
              <Input type="text" placeholder="Enter your address" />
            </FormControl>
            <FormControl id="city"display="flex" alignItems="left">
              <FormLabel>City:</FormLabel>
              <Input type="text" placeholder="Enter your city" />
            </FormControl>
            <FormControl id="postal"display="flex" alignItems="left">
              <FormLabel>Postal Code:</FormLabel>
              <Input type="text" placeholder="Enter your postal code" />
            </FormControl>
            <FormControl id="province"display="flex" alignItems="left">
              <FormLabel>Province:</FormLabel>
              <Input type="text" placeholder="Enter your Province" />
            </FormControl>
            <FormControl id="country"display="flex" alignItems="left">
              <FormLabel>Country:</FormLabel>
              <Input type="text" placeholder="Enter your Country" />
            </FormControl>
            <FormControl id="country"display="flex" alignItems="left">
              <FormLabel>Country:</FormLabel>
              <Input type="text" placeholder="Enter your Country" />
            </FormControl>
            <FormControl id="pet1"display="flex" alignItems="left">
              <FormLabel>Pet1:</FormLabel>
              <Input type="text" placeholder="Enter your Pet's type" />
            </FormControl>
            <FormControl id="Pet2"display="flex" alignItems="left">
              <FormLabel>Pet2:</FormLabel>
              <Input type="text" placeholder="Enter your Pet's type" />
            </FormControl>
            <FormControl id="Pet3"display="flex" alignItems="left">
              <FormLabel>Pet3:</FormLabel>
              <Input type="text" placeholder="Enter your Pet's type" />
            </FormControl>
            <FormControl id="Pet4"display="flex" alignItems="left">
              <FormLabel>Pet4:</FormLabel>
              <Input type="text" placeholder="Enter your Pet's type" />
            </FormControl>
            <FormControl id="Remarks"display="flex" alignItems="left">
              <FormLabel>Remarks:</FormLabel>
              <Input type="text" placeholder="Remarks" />
            </FormControl>
            <HStack spacing={4}>
              <Button colorScheme="blue">Save</Button>
              <Button variant="outline">Clear</Button>
            </HStack>
          </VStack>
   
        
        {/* Profile Picture Section */}
        <Box borderWidth="1px" borderRadius="lg" p={4} m={4} boxShadow="lg" width="full">
          <VStack spacing={4} align="center">
            <Image
              borderRadius="full"
              boxSize="450px"
              src="path-to-your-uploaded-image"
              alt="Profile Image"
            />
            <Button onClick={onOpen} size="sm">
              More pictures
            </Button>
          </VStack>
          {/* Modal for adding more pictures */}
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>User Profile Pictures</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Text>Upload additional pictures here.</Text>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>
      </Flex>
    </Box>
  );
};

export default Profile_Sitter;

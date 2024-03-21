import React, { useState } from 'react';
import {
  ChakraProvider,
  extendTheme,
  Input,
  Button,
  Radio,
  RadioGroup,
  Stack,
  Box,
  FormControl,
  FormLabel,
  Heading,
} from '@chakra-ui/react';

// Optional: Customize the theme
const theme = extendTheme({
  components: {
    // Customize your theme here
  },
});

const Registration = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log({ username, password, role });
  };

  const handleLoginRedirect = () => {
    console.log("Redirect to login");
  };

  return (
    <ChakraProvider theme={theme}>
      <Box className="registration-container" p={5}>
        <Heading as="h2" size="lg" mb={5}>Account Registration</Heading>
        <form onSubmit={handleSubmit}>
          <FormControl isRequired>
            <FormLabel>Username</FormLabel>
            <Input 
              type="email" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormControl>
          <FormControl isRequired mt={4}>
            <FormLabel>Password</FormLabel>
            <Input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <RadioGroup onChange={setRole} value={role} mt={4}>
            <Stack direction="row">
              <Radio value="pet-sitter">Pet Sitter</Radio>
              <Radio value="pet-owner">Pet Owner (Customer)</Radio>
            </Stack>
          </RadioGroup>
          <Stack direction="row" spacing={4} align="center" justify="center" mt={4}>
            <Button type="submit" colorScheme="blue">Create Account</Button>
            <Button onClick={handleLoginRedirect} colorScheme="teal">Login</Button>
          </Stack>
        </form>
      </Box>
    </ChakraProvider>
  );
};

export default Registration;

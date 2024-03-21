import { useState } from 'react';
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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('');
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');

  //send data to backend
  const handleRegistration = async (event) => {
    event.preventDefault();
    
    try {
      const response = await fetch('/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          userType,
          firstname,
          lastname
          // Include any other required fields here
        }),
      });
      const data = await response.json();
      if (data.type === 'success') {
        // Handle successful registration, e.g., redirect to login or profile page
        console.log("Registration Successful!")
      } else {
        // Handle error, e.g., show error message
        console.log("Sorry, Registration Unsuccessful!")
      }
   } catch (error) {
      console.error('Registration failed:', error);
      // Handle error, e.g., show error message
   }
  };

  const handleLoginRedirect = () => {
    console.log("Redirect to login");
  };

  return (
    <ChakraProvider theme={theme}>
      <Box className="registration-container" p={5}>
        <Heading as="h2" size="lg" mb={5}>Account Registration</Heading>
        <form onSubmit={handleRegistration}>
          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          <FormControl isRequired mt={4}>
            <FormLabel>First Name</FormLabel>
            <Input
              type="firstname"
              value={firstname}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </FormControl>
          <FormControl isRequired mt={4}>
            <FormLabel>Last Name</FormLabel>
            <Input
              type="lastname"
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
            />
          </FormControl>
          <RadioGroup onChange={setUserType} value={userType} mt={4}>
            <Stack direction="row">
              <Radio value="sitter">Pet Sitter</Radio>
              <Radio value="owner">Pet Owner</Radio>
            </Stack>
          </RadioGroup>
          <Stack direction="row" spacing={4} align="center" justify="center" mt={4}>
            <Button onClick={handleRegistration} type="submit" colorScheme="blue">Create Account</Button>
            <Button onClick={handleLoginRedirect} colorScheme="teal">Login</Button>
          </Stack>
        </form>
      </Box>
    </ChakraProvider>
  );
};

export default Registration;

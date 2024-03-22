import { Component } from "react";
import axios from 'axios';
import {
  ChakraProvider,
  //extendTheme,
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

export default class Registration extends Component {
  constructor(props) {
    super(props);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeUserType = this.onChangeUserType.bind(this);
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangeStreet = this.onChangeStreet.bind(this);
    this.onChangeCity = this.onChangeCity.bind(this);
    this.onChangeProvince = this.onChangeProvince.bind(this);
    this.onChangePostal = this.onChangePostal.bind(this);
    this.onChangeSuburb = this.onChangeSuburb.bind(this);
    this.onChangeLat = this.onChangeLat.bind(this);
    this.onChangeLong = this.onChangeLong.bind(this);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      email: "",
      password: "",
      userType: "",
      firstname: "",
      lastname: "",
      street: "",
      city: "",
      province: "",
      postal: "",
      suburb: "",
      lat:"",
      long:""
    };
  }
  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }
  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }
  onChangeUserType(value) {
    this.setState({
      userType: value,
    });
  }
  onChangeFirstName(e) {
    this.setState({
      firstname: e.target.value,
    });
  }
  onChangeLastName(e) {
    this.setState({
      lastname: e.target.value,
    });
  }
  onChangeStreet(e) {
    this.setState({
      street: e.target.value,
    });
  }
  onChangeCity(e) {
    this.setState({
      city: e.target.value,
    });
  }
  onChangeProvince(e) {
    this.setState({
      province: e.target.value,
    });
  }
  onChangePostal(e) {
    this.setState({
      postal: e.target.value,
    });
  }
  onChangeSuburb(e) {
    this.setState({
      suburb: e.target.value,
    });
  }
  onChangeLat(e) {
    this.setState({
      lat: e.target.value,
    });
  }
  onChangeLong(e) {
    this.setState({
      long: e.target.value,
    });
  }

  async onSubmit(e) {
    e.preventDefault();

    console.log(this.state.email);
    console.log(this.state.password);
    console.log(this.state.userType);
    console.log(this.state.firstname);
    console.log(this.state.lastname);
    console.log(this.state.street);
    console.log(this.state.city);
    console.log(this.state.province);
    console.log(this.state.postal);
    console.log(this.state.suburb);
    console.log(this.state.lat);
    console.log(this.state.long);

    //JSON object
    const newClient = {
      userType: this.state.userType,
      email: this.state.email,
      password: this.state.password,      
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      street: this.state.street,
      city: this.state.city,      
      province: this.state.province,
      postal: this.state.postal,
      suburb: this.state.suburb,
      lat: parseFloat(this.state.lat),
      long: parseFloat(this.state.long),
    };

    await axios
    .post("http://localhost:4000/auth/register", newClient, {withCredentials:true})
    .then((res) => {
      console.log(res.data)
    })
    .catch((err) => {
      console.log(err)
    });

    this.setState ({
      email: "",
      password: "",
      userType: "",
      firstname: "",
      lastname: "",
      street: "",
      city: "",
      province: "",
      postal: "",
      suburb: "",
      lat: "",
      long: ""   
    });
  
  }

render(){
  return (
    <ChakraProvider>
      <Box className="registration-container" p={5}>
        <Heading as="h2" size="lg" mb={5}>Account Registration</Heading>
        <form onSubmit={this.onSubmit}>
          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input 
              type="email"
              value={this.state.email}
              onChange={this.onChangeEmail}
            />
          </FormControl>
          <FormControl isRequired mt={4}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={this.state.password}
              onChange={this.onChangePassword}
            />
          </FormControl>
          <FormControl isRequired mt={4}>
            <FormLabel>First Name</FormLabel>
            <Input
              type="firstname"
              value={this.state.firstname}
              onChange={this.onChangeFirstName}
            />
          </FormControl>
          <FormControl isRequired mt={4}>
            <FormLabel>Last Name</FormLabel>
            <Input
              type="lastname"
              value={this.state.lastname}
              onChange={this.onChangeLastName}
            />
          </FormControl>
          <FormControl isRequired mt={4}>
            <FormLabel>Street Name</FormLabel>
            <Input
                type="street"
                value={this.state.street}
                onChange={this.onChangeStreet}
              />
          </FormControl>
          <FormControl isRequired mt={4}>
            <FormLabel>City</FormLabel>
            <Input
                type="city"
                value={this.state.city}
                onChange={this.onChangeCity}
              />
          </FormControl>
          <FormControl isRequired mt={4}>
            <FormLabel>Province</FormLabel>
            <Input
                type="province"
                value={this.state.province}
                onChange={this.onChangeProvince}
              />
          </FormControl>
          <FormControl isRequired mt={4}>
            <FormLabel>Postal Code</FormLabel>
            <Input
                type="postal"
                value={this.state.postal}
                onChange={this.onChangePostal}
              />
          </FormControl>
          <FormControl isRequired mt={4}>
            <FormLabel>Suburb</FormLabel>
            <Input
                type="suburb"
                value={this.state.suburb}
                onChange={this.onChangeSuburb}
              />
          </FormControl>
          <FormControl isRequired mt={4}>
            <FormLabel>Lat</FormLabel>
            <Input
                type="lat"
                value={this.state.lat}
                onChange={this.onChangeLat}
              />
          </FormControl>
          <FormControl isRequired mt={4}>
            <FormLabel>Long</FormLabel>
            <Input
                type="long"
                value={this.state.long}
                onChange={this.onChangeLong}
              />
          </FormControl>
          <RadioGroup onChange={this.onChangeUserType} value={this.state.userType} mt={4}>
            <Stack direction="row">
              <Radio value="Sitter">Pet Sitter</Radio>
              <Radio value="Owner">Pet Owner</Radio>
            </Stack>
          </RadioGroup>
          <Stack direction="row" spacing={4} align="center" justify="center" mt={4}>
            <Button type="submit" colorScheme="blue">Create Account</Button>
            <Button colorScheme="teal">Login</Button>
          </Stack>
        </form>
      </Box>
    </ChakraProvider>
  );
}
}
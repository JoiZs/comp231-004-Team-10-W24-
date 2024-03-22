// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { Text, Heading, Image, Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
// import { Stack, HStack, VStack } from '@chakra-ui/react'
// import { Button, ButtonGroup } from '@chakra-ui/react'

// const Sitter = ({ sitter }) => {
//   const navigate = useNavigate();

//   const navigateToProfile = () => {
//     navigate(`/profile/${profile._stid}`);
//   };

//   return (    
//     <Card
//           direction={{ base: 'column', sm: 'row' }}
//           overflow='hidden'
//           variant='outline'          
//         >
//           <Image
//             objectFit='cover'
//             maxW={{ base: '100%', sm: '150px' }}
//             src='src/assets/cat.jpg'
//             alt='sitter-image'
//           />
//           <Stack>
//             <CardBody>
//               <Heading size='md'>Name</Heading>
//               <Text py='2'>Location</Text>
//               <Text py='2'>Pet Type</Text>
//             </CardBody>
//             <CardFooter>
//               <Button variant='solid' colorScheme='blue' onClick={navigateToProfile}>
//                 See Profile
//               </Button>
//             </CardFooter>
//           </Stack>
//       </Card>    
//   );
// };

// export default Sitter;
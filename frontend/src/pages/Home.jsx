import { Stack, HStack, VStack } from '@chakra-ui/react'
import { Container } from '@chakra-ui/react'
import { IconButton } from '@chakra-ui/react'
import { Icon } from '@chakra-ui/react'
import { RiNumber1 } from "react-icons/ri";
import { RiNumber2 } from "react-icons/ri";
import { RiNumber3 } from "react-icons/ri";
import { RiNumber4 } from "react-icons/ri";
import { RiNumber5 } from "react-icons/ri";
import { Box } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import { Flex, Spacer } from '@chakra-ui/react'
import { Text, Heading, Image, Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
//import SitterList from './SitterList';

export default function Home() {
  return (
    <div>
        <Container mt={5} maxW='container.md' bg='gray.100' color='black'>
          <Flex>
          Choose Rating:<br/>
          <ButtonGroup>
          <IconButton
          colorScheme='blue'
          aria-label='rating-1'
          icon={<Icon as={RiNumber1} />}
          m={1}
          />
          <IconButton
          colorScheme='blue'
          aria-label='rating-2'
          icon={<Icon as={RiNumber2} />}
          m={1}
          />
          <IconButton
          colorScheme='blue'
          aria-label='rating-3'
          icon={<Icon as={RiNumber3} />}
          m={1}
          />
          <IconButton
          colorScheme='blue'
          aria-label='rating-4'
          icon={<Icon as={RiNumber4} />}
          m={1}
          />
          <IconButton
          colorScheme='blue'
          aria-label='rating-5'
          icon={<Icon as={RiNumber5} />}
          m={1}
          />
          </ButtonGroup>
          <Spacer />
          <ButtonGroup>
            <Button>
              Nearby
            </Button>
            <Button>
              Apply
            </Button>
          </ButtonGroup>
        </Flex>

        {/* <div>
          <sitterList/>
        </div> */}

        <Card
          direction={{ base: 'column', sm: 'row' }}
          overflow='hidden'
          variant='outline'
          m={2}
        >
          <Image
            objectFit='cover'
            maxW={{ base: '100%', sm: '150px' }}
            src='src/assets/cat.jpg'
            alt='sitter-image'
          />
          <Stack>
            <CardBody>
              <Heading size='md'>Name</Heading>
              <Text py='2'>Location</Text>
              <Text py='2'>Pet Type</Text>
            </CardBody>
            <CardFooter>
              <Button variant='solid' colorScheme='blue' onClick="">
                See Profile
              </Button>
            </CardFooter>
          </Stack>
        </Card>

        <Card
          direction={{ base: 'column', sm: 'row' }}
          overflow='hidden'
          variant='outline'
          m={2}
        >
          <Image
            objectFit='cover'
            maxW={{ base: '100%', sm: '150px' }}
            src='src/assets/cat.jpg'
            alt='sitter-image'
          />
          <Stack>
            <CardBody>
              <Heading size='md'>Name</Heading>
              <Text py='2'>Location</Text>
              <Text py='2'>Pet Type</Text>
            </CardBody>
            <CardFooter>
              <Button variant='solid' colorScheme='blue' onClick="">
                See Profile
              </Button>
            </CardFooter>
          </Stack>
        </Card>

        <Card
          direction={{ base: 'column', sm: 'row' }}
          overflow='hidden'
          variant='outline'
          m={2}
        >
          <Image
            objectFit='cover'
            maxW={{ base: '100%', sm: '150px' }}
            src='src/assets/cat.jpg'
            alt='sitter-image'
          />
          <Stack>
            <CardBody>
              <Heading size='md'>Name</Heading>
              <Text py='2'>Location</Text>
              <Text py='2'>Pet Type</Text>
            </CardBody>
            <CardFooter>
              <Button variant='solid' colorScheme='blue' onClick="">
                See Profile
              </Button>
            </CardFooter>
          </Stack>
        </Card>

        <Card
          direction={{ base: 'column', sm: 'row' }}
          overflow='hidden'
          variant='outline'
          m={2}
        >
          <Image
            objectFit='cover'
            maxW={{ base: '100%', sm: '150px' }}
            src='src/assets/cat.jpg'
            alt='sitter-image'
          />
          <Stack>
            <CardBody>
              <Heading size='md'>Name</Heading>
              <Text py='2'>Location</Text>
              <Text py='2'>Pet Type</Text>
            </CardBody>
            <CardFooter>
              <Button variant='solid' colorScheme='blue' onClick="">
                See Profile
              </Button>
            </CardFooter>
          </Stack>
        </Card>

        <Card
          direction={{ base: 'column', sm: 'row' }}
          overflow='hidden'
          variant='outline'
          m={2}
        >
          <Image
            objectFit='cover'
            maxW={{ base: '100%', sm: '150px' }}
            src='src/assets/cat.jpg'
            alt='sitter-image'
          />
          <Stack>
            <CardBody>
              <Heading size='md'>Name</Heading>
              <Text py='2'>Location</Text>
              <Text py='2'>Pet Type</Text>
            </CardBody>
            <CardFooter>
              <Button variant='solid' colorScheme='blue' onClick="">
                See Profile
              </Button>
            </CardFooter>
          </Stack>
        </Card>

        </Container>
    </div>
  ); //end of return()
} // end of Home(){}
import React from "react";
import { Link } from "react-router-dom";
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

export default function Home() {
  return (
    <div>
        <Container p={5} maxW='container.md' bg='gray.100' color='black'>
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
        </Container>      
    </div>
  ); //end of return()
} // end of Home(){}
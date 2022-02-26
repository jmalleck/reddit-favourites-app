import { Flex, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";

const Navbar = () => {
  return (
    <Flex
      align="center"
      justify="flex-start"
      backgroundColor="red.400"
      w="100%"
      h="8rem"
      mb="2rem"
    >
      <Text fontSize="3xl" fontWeight="bold" color="white" mx="3rem">
        Reddit Favourites
      </Text>
      <NextLink href="/" passHref>
        <Link color="white" mx="1rem">
          <Text color="white" fontSize="xl" fontWeight="light">
            Home
          </Text>
        </Link>
      </NextLink>
      <NextLink href="/favourites" passHref>
        <Link color="white" mx="1rem">
          <Text color="white" fontSize="xl" fontWeight="light">
            Favourites
          </Text>
        </Link>
      </NextLink>
    </Flex>
  );
};

export default Navbar;

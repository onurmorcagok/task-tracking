import { Center, Heading } from "@chakra-ui/react";

const Navbar = () => {
  return (
    <>
      <Center bg="tomato" w="100%" p={4} color="white" padding="20px">
        <Heading>Task Tracking</Heading>
      </Center>
    </>
  );
};

export default Navbar;

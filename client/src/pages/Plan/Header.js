import React from "react";
import { Flex, Text } from "@chakra-ui/core";

const Header = ({ name, programme }) => {
    return (
        <Flex direction="row" p={4} justifyContent="space-around">
            <Flex direction="column">
                <Flex align="center" justify="center">
                    <Text color="#1F487A" fontSize="xl">
                        Student
                    </Text>
                </Flex>
                <Flex
                    minWidth="100%"
                    height="50px"
                    backgroundColor="#1F487A"
                    borderRadius="10px"
                    align="center"
                    justify="center"
                    p={5}
                    marginTop={2}
                >
                    <Text textAlign="center" color="white" fontSize="xl">
                        {name}
                    </Text>
                </Flex>
            </Flex>

            <Flex align="center" justify="center">
                <Text color="#1F487A" fontSize="5xl" fontWeight="bold">
                    Plan
                </Text>
            </Flex>

            <Flex direction="column">
                <Flex align="center" justify="center">
                    <Text color="#1F487A" fontSize="xl">
                        Student
                    </Text>
                </Flex>
                <Flex
                    minWidth="100%"
                    height="50px"
                    backgroundColor="#1F487A"
                    borderRadius="10px"
                    align="center"
                    justify="center"
                    p={5}
                    marginTop={2}
                >
                    <Text textAlign="center" color="white" fontSize="xl">
                        {name}
                    </Text>
                </Flex>
            </Flex>
        </Flex>
    );
};

export default Header;

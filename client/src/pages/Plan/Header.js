import React from "react";
import { Flex, Text } from "@chakra-ui/core";
import { colors as c } from "../../colors";
import { InlineEdit } from "../../components";

const Header = ({ name, programme, planName, setPlanName }) => {
    return (
        <Flex direction="row" p={4} justifyContent="space-around">
            <Flex direction="column">
                <Flex align="center" justify="center">
                    <Text color={c.uoaBlue} fontSize="xl">
                        Student
                    </Text>
                </Flex>
                <Flex
                    minWidth="100%"
                    height="50px"
                    backgroundColor={c.uoaBlue}
                    borderRadius="10px"
                    align="center"
                    justify="center"
                    p={5}
                    marginTop={2}
                >
                    <Text textAlign="center" color={c.white} fontSize="xl">
                        {name}
                    </Text>
                </Flex>
            </Flex>

            <Flex align="center" justify="center">
                <InlineEdit title="Plan name" value={planName} onChange={(e) => setPlanName(e)} />
            </Flex>

            <Flex direction="column">
                <Flex align="center" justify="center">
                    <Text color={c.uoaBlue} fontSize="xl">
                        Program
                    </Text>
                </Flex>
                <Flex
                    minWidth="100%"
                    height="50px"
                    backgroundColor={c.uoaBlue}
                    borderRadius="10px"
                    align="center"
                    justify="center"
                    p={5}
                    marginTop={2}
                >
                    <Text textAlign="center" color={c.white} fontSize="xl">
                        {programme}
                    </Text>
                </Flex>
            </Flex>
        </Flex>
    );
};

export default Header;

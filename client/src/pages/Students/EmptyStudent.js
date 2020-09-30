import React from "react";
import { Flex, Text } from "@chakra-ui/core";
import { colors as c } from "../../colors";

const EmptyStudent = () => {
    return (
        <Flex width="100%" height="100vh" align="center" justify="center">
            <Text textAlign="center" fontSize="md" color={c.grey}>
                Create or select a Student to view its information here
            </Text>
        </Flex>
    );
};

export default EmptyStudent;

import React from "react";
import { Flex, Text } from "@chakra-ui/core";
import { colors as c } from "../../colors";

const EmptyCourse = () => {
    return (
        <Flex width="100%" height="100vh" align="center" justify="center">
            <Text textAlign="center" fontSize="md" color={c.grey} as="i">
                Create or select a Course to view its information here.
            </Text>
        </Flex>
    );
};

export default EmptyCourse;

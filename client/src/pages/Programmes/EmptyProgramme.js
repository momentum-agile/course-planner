import React from "react";
import { Flex, Text } from "@chakra-ui/core";
import { colors as c } from "../../colors";

const EmptyProgramme = () => {
    return (
        <Flex width="100%" height="100%" justify="center">
            <Flex align="center" justify="center">
                <Text textAlign="center" fontSize="md" color={c.grey} as="i">
                    Create or Select a Programme to view its information here.
                </Text>
            </Flex>
        </Flex>
    );
};

export default EmptyProgramme;

import React from "react";
import { Flex, Text } from "@chakra-ui/core";

const EmptyProgramme = () => {
    return (
        <Flex width="100%" height="100%" justify="center">
            <Flex align="center" justify="center">
                <Text textAlign="center" fontSize="md" color="#C4C4C4" as="i">
                    Create or Select a Programme to view its information here.
                </Text>
            </Flex>
        </Flex>
    );
};

export default EmptyProgramme;

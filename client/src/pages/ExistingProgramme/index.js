import React from "react";
import { Flex, Text, Box, IconButton } from "@chakra-ui/core";
import { OutlineButton } from "../../components";

const ExistingProgramme = ({ id }) => {
    return (
        <Flex width="100%" direction="column">
            <Flex align="center" justify="center">
                <Flex left="1px" justify="flex-start">
                    {/* TODO: add delete functionality */}
                    <IconButton icon="delete" variantColor="red" right="40px" size="lg" />
                </Flex>
                <Text textAlign="center" fontSize="4xl" color="#0F487E">
                    Programme Requirements
                </Text>
                <Flex right="1px" justify="flex-start">
                    {/* TODO: add edit functionality */}
                    <IconButton icon="edit" variantColor="blue" left="40px" size="lg" />
                </Flex>
            </Flex>
            <Flex align="center" justify="center" marginTop="10px">
                <Text textAlign="center" fontSize="md" color="#000000" as="i">
                    Programme Name
                </Text>
            </Flex>
            <Flex align="center" justify="center" marginTop="10px">
                <Text textAlign="center" fontSize="30px" color="#000000" as="b">
                    {/* TODO: dynamically fetch programme name */}
                    BE (Hons) SE
                </Text>
            </Flex>

            <Flex align="center" justify="center" marginTop="50px">
                <Text textAlign="center" fontSize="md" color="#000000" as="i">
                    Requirements
                </Text>
                <Box as="span" ml="2" color="gray.600" bg="gray" />
            </Flex>

            <Flex direction="column" align="center" justify="center" height="100%"></Flex>

            <Flex justify="center" width="100%">
                <OutlineButton text="Define Template" to={`/programmes/${id}/create-template`} height="60px" />
            </Flex>
        </Flex>
    );
};

export default ExistingProgramme;

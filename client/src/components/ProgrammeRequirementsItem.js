import React from "react";
import { Flex, Box, Text, Stack } from "@chakra-ui/core";
import { AiOutlineMinusCircle } from "react-icons/ai";

const ProgrammeRequirementsItem = () => {
    return (
        <Flex
            height="60px"
            width="90%"
            bg="#303030"
            borderRadius="5px"
            direction="row"
            alignItems="center"
            textAlign="center"
            justify="space-around"
            marginTop="10px"
            color="#ffffff"
        >
            <Text textAlign="left" width="5%">
                1.
            </Text>
            <Text textAlign="left" width="15%">
                Exactly
            </Text>
            <Text textAlign="left" width="15%">
                15 pts
            </Text>
            <Text textAlign="left" width="10%">
                FROM
            </Text>
            <Stack className="programmeRequirements" textAlign="left" isInline overflowX="scroll" width="35%">
                <Text
                    height="60%"
                    border="solid"
                    borderColor="white"
                    borderRadius="20px"
                    borderWidth="1px"
                    fontSize="12px"
                    padding="3px"
                    margin="2px"
                >
                    SE306
                </Text>
                <Text
                    height="60%"
                    border="solid"
                    borderColor="white"
                    borderRadius="20px"
                    borderWidth="1px"
                    fontSize="12px"
                    padding="3px"
                    margin="2px"
                >
                    SE325
                </Text>
                <Text
                    height="60%"
                    border="solid"
                    borderColor="white"
                    borderRadius="20px"
                    borderWidth="1px"
                    fontSize="12px"
                    padding="3px"
                    margin="2px"
                >
                    SE350
                </Text>
                <Text
                    height="60%"
                    border="solid"
                    borderColor="white"
                    borderRadius="20px"
                    borderWidth="1px"
                    fontSize="12px"
                    padding="3px"
                    margin="2px"
                >
                    SE351
                </Text>
                <Text
                    height="60%"
                    border="solid"
                    borderColor="white"
                    borderRadius="20px"
                    borderWidth="1px"
                    fontSize="12px"
                    padding="3px"
                    margin="2px"
                >
                    SE351
                </Text>
                <Text
                    height="60%"
                    border="solid"
                    borderColor="white"
                    borderRadius="20px"
                    borderWidth="1px"
                    fontSize="12px"
                    padding="3px"
                    margin="2px"
                >
                    SE351
                </Text>
            </Stack>
            {/* Button to be refactored  */}
            <Box textAlign="left" as={AiOutlineMinusCircle} size="32px" color="red.400" width="10%" cursor="pointer" />
        </Flex>
    );
};

export default ProgrammeRequirementsItem;

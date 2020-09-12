import React from "react";
import {
    Flex,
    Text,
    Box,
    Select,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Stack,
} from "@chakra-ui/core";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";

const EditRequirementsBox = ({ closeEdit }) => {
    return (
        <Flex
            alignItems="center"
            alignSelf="center"
            direction="column"
            textAlign="flex-start"
            marginTop="20px"
            height="150px"
            width="85%"
            color="white"
            bg="#e2e2e2"
            padding="5px"
        >
            <Text textAlign="center" fontSize="md" color="#000000" as="i">
                Create new requirements
            </Text>
            <Flex justify="space-evenly">
                <Flex width="20%">
                    <Select defaultValue="exactly" width="100%" bg="#303030">
                        <option value="exactly">Exactly</option>
                        <option value="atleast">At Least</option>
                        <option value="upto">Up to</option>
                    </Select>
                </Flex>
                <NumberInput step={15} defaultValue={15} height="50%" width="15%" bg="#303030">
                    <NumberInputField bg="#303030" />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
                <Text color="black">From</Text>
                <Flex direction="column" width="35%" align="center">
                    <Select placeholder="Select course" bg="#303030" width="80%">
                        <option value="course1">course 1</option>
                        <option value="course2">course 2</option>
                    </Select>
                    <Stack bg="#565656" height="100%" width="100%" shouldWrapChildren overFlowY="scroll" isInline padding="5px">
                        <Text
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
                    </Stack>
                </Flex>
                {/* Buttons to be refactored */}
                <Box as={AiOutlineCloseCircle} size="32px" color="red.400" onClick={closeEdit} bottom="5px" cursor="pointer" />
                <Box as={AiOutlineCheckCircle} size="32px" color="green.400" onClick={closeEdit} bottom="5px" cursor="pointer" />
            </Flex>
        </Flex>
    );
};

export default EditRequirementsBox;

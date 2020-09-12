import React, { useState } from "react";
import { Flex, Text, Box, IconButton, Stack } from "@chakra-ui/core";
import EditRequirementsBox from "./EditRequirementsBox";
import { OutlineButton, ProgrammeRequirementsItem } from "../../components";

const ExistingProgramme = ({ id }) => {
    const [createNewRequirements, setCreateNewRequirements] = useState(false);
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

            <Flex align="center" justify="center" direction="column">
                <Text textAlign="center" fontSize="md" color="#000000" as="i">
                    Requirements
                </Text>
                <Box bg="#e2e2e2" width="75%" textAlign="center" padding="5px" marginTop="10px">
                    <IconButton width="90%" icon="add" bg="#616161" color="white" onClick={() => setCreateNewRequirements(true)} />
                    <Stack direction="column" height="150px" width="100%" overflowY="scroll" align="center">
                        <ProgrammeRequirementsItem onClick={() => setCreateNewRequirements(true)} />
                        <ProgrammeRequirementsItem onClick={() => setCreateNewRequirements(true)} />
                        <ProgrammeRequirementsItem onClick={() => setCreateNewRequirements(true)} />
                        <ProgrammeRequirementsItem onClick={() => setCreateNewRequirements(true)} />
                        <ProgrammeRequirementsItem onClick={() => setCreateNewRequirements(true)} />
                    </Stack>
                </Box>
            </Flex>
            {createNewRequirements && <EditRequirementsBox closeEdit={() => setCreateNewRequirements(false)} />}
            <Flex justify="center" width="100%">
                <OutlineButton text="Define Template" to={`/programmes/${id}/create-template`} height="60px" />
            </Flex>
        </Flex>
    );
};

export default ExistingProgramme;

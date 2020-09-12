import React, { useEffect, useState } from "react";
import { Flex, Text, Box, IconButton, Stack } from "@chakra-ui/core";
import { OutlineButton, ProgrammeRequirementsItem } from "../../components";
import EditRequirementsBox from "./EditRequirementsBox";
import { useHistory } from "react-router-dom";
import ConfirmationDialog from "../../components/ConfirmationDialog";
import useProgrammmes from "./useProgrammes";

const ExistingProgramme = ({ id, notifyUpdate }) => {
    const history = useHistory();
    const { deleteProgramme, getProgramme } = useProgrammmes();
    const [programmeDegreeInfo, setProgrammeDegreeInfo] = useState({});
    const [createNewRequirements, setCreateNewRequirements] = useState(false);
    const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);

    useEffect(() => getProgramme(id, setProgrammeDegreeInfo), [id, getProgramme]);

    const confirmDelete = () => {
        setOpenConfirmationDialog(false);
        deleteProgramme(programmeDegreeInfo._id, history, notifyUpdate);
    };

    return (
        <Flex width="100%" direction="column">
            <Flex align="center" justify="center">
                <Flex left="1px" justify="flex-start">
                    {/* Deleting the Programme*/}
                    <IconButton icon="delete" variantColor="red" right="40px" size="lg" onClick={() => setOpenConfirmationDialog(true)} />
                    <ConfirmationDialog
                        itemName={programmeDegreeInfo.name}
                        itemType={"Programme"}
                        action={"Delete"}
                        isOpen={openConfirmationDialog}
                        onClose={() => setOpenConfirmationDialog(false)}
                        confirm={confirmDelete}
                    />
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
                    {programmeDegreeInfo.name}
                </Text>
            </Flex>

            <Flex align="center" justify="center" direction="column">
                <Text textAlign="center" fontSize="md" color="#000000" as="i">
                    Requirements
                    {/* Add regulations here */}
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
                {/* TODO: redefine routing for template plans because they interefere with GET requests with URL */}
                {programmeDegreeInfo.defaultPlan ? (
                    <OutlineButton text="View Template" to={`/programmes/${id}/template`} height="60px" />
                ) : (
                    <OutlineButton text="Define Template" to={`/programmes/${id}/create-template`} height="60px" />
                )}
            </Flex>
        </Flex>
    );
};

export default ExistingProgramme;

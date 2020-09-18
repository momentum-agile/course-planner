import React, { useEffect, useState } from "react";
import { Flex, Text, Box, IconButton, Stack, Input } from "@chakra-ui/core";
import { OutlineButton, ProgrammeRequirementsItem } from "../../components";
import EditRequirementsBox from "./EditRequirementsBox";
import { useHistory } from "react-router-dom";
import { AlertButton } from "../../components/";
import useProgrammmes from "./useProgrammes";
import useCourses from "../Courses/useCourses";

const ExistingProgramme = ({ programme, notifyUpdate }) => {
    const history = useHistory();
    const { deleteProgramme, updateProgramme } = useProgrammmes();
    const { data } = useCourses();
    const [programmeDegreeInfo, setProgrammeDegreeInfo] = useState({});
    const [createNewRequirements, setCreateNewRequirements] = useState(false);
    const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
    const [editRequirementsHeading, setEditRequirementsHeading] = useState("");
    const [openConfirmationDeleteRegulation, setOpenConfirmationDeleteRegulation] = useState(false);
    const [regulationInEdit, setRegulationInEdit] = useState(null);
    const [isEdited, setIsEdited] = useState(false);
    const [name, setName] = useState("");

    useEffect(() => {
        setProgrammeDegreeInfo(programme);
        setName(programme.name);
    }, [isEdited, programme]);

    const cancelEditProgramme = () => {
        setIsEdited(false);
        setName(programmeDegreeInfo.name);
    };

    const saveEditProgramme = () => {
        const editedProgramme = {
            ...programmeDegreeInfo,
            name: name,
        };

        // TODO: show popup success message
        setIsEdited(false);

        // Update the programme and refresh
        updateProgramme(editedProgramme, notifyUpdate);
    };

    const confirmDelete = () => {
        setOpenConfirmationDialog(false);
        deleteProgramme(programmeDegreeInfo._id, history, notifyUpdate);
    };

    const deleteRegulation = (regulation) => {
        const updatedRegulations = programme.regulations.filter((r) => r._id !== regulation._id);
        const updatedProgramme = { ...programme, regulations: updatedRegulations };
        updateProgramme(updatedProgramme, notifyUpdate);
        setOpenConfirmationDeleteRegulation(false);
        setCreateNewRequirements(false);
    };

    return (
        <Flex width="100%" direction="column">
            <Flex align="center" justify="center">
                <Flex left="1px" justify="flex-start">
                    {/* Deleting the Programme*/}
                    <AlertButton
                        itemName={programmeDegreeInfo.name}
                        itemType={"Programme"}
                        action={"Delete"}
                        isOpen={openConfirmationDialog}
                        confirmFn={() => confirmDelete()}
                    />
                </Flex>
                <Text textAlign="center" fontSize="4xl" color="#0F487E">
                    Programme Requirements
                </Text>
                <Flex right="1px" justify="flex-start">
                    {!isEdited ? (
                        <IconButton icon="edit" variantColor="blue" left="40px" size="lg" onClick={() => setIsEdited(true)} />
                    ) : (
                        ""
                    )}
                </Flex>
            </Flex>
            <Flex align="center" justify="center" marginTop="10px">
                <Text textAlign="center" fontSize="md" color="#000000" as="i">
                    Programme Name
                </Text>
            </Flex>
            <Flex align="center" justify="center" marginTop="10px">
                {isEdited ? (
                    <Input
                        variant="flushed"
                        placeholder="Enter Programme Name"
                        textAlign="center"
                        width="50%"
                        size="lg"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                ) : (
                    <Text textAlign="center" fontSize="30px" color="#000000" as="b">
                        {programmeDegreeInfo.name}
                    </Text>
                )}
            </Flex>

            <Flex align="center" justify="center" direction="column">
                <Text textAlign="center" fontSize="md" color="#000000" as="i">
                    Requirements
                </Text>
                <Box bg="#e2e2e2" width="75%" textAlign="center" padding="5px" marginTop="10px">
                    <IconButton
                        width="90%"
                        icon="add"
                        bg="#616161"
                        color="white"
                        onClick={() => {
                            setCreateNewRequirements(true);
                            setRegulationInEdit(null);
                            setEditRequirementsHeading("Creating new requirement");
                        }}
                    />
                    <Stack direction="column" height="150px" width="100%" overflowY="scroll" align="center">
                        {programme.regulations.map((regulation, index) => (
                            <ProgrammeRequirementsItem
                                key={index}
                                itemNumber={`${index + 1}.`}
                                onEdit={() => {
                                    setCreateNewRequirements(true);
                                    setRegulationInEdit(regulation);
                                    setEditRequirementsHeading(`Editing requirement ${index + 1}`);
                                }}
                                pointRequirement={regulation.pointRequirement}
                                points={regulation.points}
                                courseList={data.filter((course) => regulation.courses.includes(course._id))}
                                deleteButton={
                                    <AlertButton
                                        itemName={`regulation ${index + 1}`}
                                        itemType={"Programme Regulation"}
                                        action={"Delete"}
                                        isOpen={openConfirmationDeleteRegulation}
                                        onClose={() => setOpenConfirmationDeleteRegulation(false)}
                                        confirmFn={() => deleteRegulation(regulation)}
                                    />
                                }
                            />
                        ))}
                    </Stack>
                </Box>
            </Flex>
            {createNewRequirements && (
                <EditRequirementsBox
                    heading={editRequirementsHeading}
                    closeEdit={() => setCreateNewRequirements(false)}
                    programme={programme}
                    notifyUpdate={notifyUpdate}
                    regulation={regulationInEdit}
                />
            )}
            <Flex justify="center" width="100%">
                {/* TODO: redefine routing for template plans because they interefere with GET requests with URL */}
                {programmeDegreeInfo.defaultPlan ? (
                    <OutlineButton text="View Template" to={`/programmes/${programmeDegreeInfo._id}/template`} height="60px" />
                ) : (
                    <OutlineButton text="Define Template" to={`/programmes/${programmeDegreeInfo._id}/create-template`} height="60px" />
                )}
            </Flex>

            {/* Save and Close Buttons for Editing */}
            {isEdited ? (
                <Flex justifyContent="space-evenly" width="100%" align="center">
                    <OutlineButton text="Cancel" height="60px" width="200px" onClick={cancelEditProgramme} />
                    <OutlineButton text="Save" height="60px" width="200px" onClick={saveEditProgramme} />
                </Flex>
            ) : (
                ""
            )}
        </Flex>
    );
};

export default ExistingProgramme;

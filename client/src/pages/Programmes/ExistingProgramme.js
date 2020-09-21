import React, { useEffect, useState } from "react";
import { Flex, Text, Box, IconButton, Stack, Input, Button, Icon } from "@chakra-ui/core";
import { OutlineButton, ProgrammeRequirementsItem, ConfirmationDialog } from "../../components";
import EditRequirementsBox from "./EditRequirementsBox";
import { useHistory } from "react-router-dom";
import useProgrammmes from "./useProgrammes";
import useCourses from "../Courses/useCourses";
import OptionsMenu from "../../components/OptionsMenu";
import { colors as c } from "../../colors";

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
            <Flex align="center" justify="center" direction="row">
                <Text textAlign="center" fontSize="4xl" color={c.uoaBlue}>
                    Programme Requirements
                </Text>
                <Flex justify="flex-end" align="flex-end" right="50px" position="absolute">
                    {/* Dropdown menu to edit and delete */}
                    <OptionsMenu
                        item={programmeDegreeInfo}
                        itemType="Programme"
                        setOpenConfirmationDialog={setOpenConfirmationDialog}
                        openConfirmationDialog={openConfirmationDialog}
                        confirm={confirmDelete}
                        hasEdit={!isEdited}
                        onEdit={() => setIsEdited(true)}
                    />
                </Flex>
            </Flex>
            <Flex align="center" justify="center" marginTop="10px">
                <Text textAlign="center" fontSize="md" color={c.black} as="i">
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
                    <Text textAlign="center" fontSize="30px" color={c.black} as="b">
                        {programmeDegreeInfo.name}
                    </Text>
                )}
            </Flex>

            <Flex align="center" justify="center" direction="column">
                <Text textAlign="center" fontSize="md" color={c.black} as="i" mt={5}>
                    Requirements
                </Text>
                <Box bg={c.lightGrey} width="75%" textAlign="center" padding="5px" marginTop="10px">
                    <IconButton
                        mt={2}
                        width="90%"
                        icon="add"
                        bg={c.darkGrey}
                        color={c.white}
                        onClick={() => {
                            setCreateNewRequirements(true);
                            setRegulationInEdit(null);
                            setEditRequirementsHeading("Creating new requirement");
                        }}
                    />
                    <Stack direction="column" height="150px" width="100%" overflowY="auto" align="center">
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
                                    <Button
                                        _hover={{ transform: "scale(1.2, 1.2)" }}
                                        _active="none"
                                        bg="none"
                                        align="flex-reverse"
                                        justify="flex-end"
                                        onClick={() => setOpenConfirmationDeleteRegulation(true)}
                                    >
                                        <Icon name="small-close" />
                                        <ConfirmationDialog
                                            item={regulation}
                                            itemType={"Regulation"}
                                            action={"Delete"}
                                            isOpen={openConfirmationDeleteRegulation}
                                            onClose={() => setOpenConfirmationDeleteRegulation(false)}
                                            confirm={deleteRegulation}
                                        />
                                    </Button>
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

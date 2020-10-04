import React, { useEffect, useState } from "react";
import { Box, Button, Flex, Icon, IconButton, Input, Stack, Text } from "@chakra-ui/core";
import { ConfirmationDialog, MenuWrapper, OutlineButton, ProgrammeRequirementsItem, SaveCancelButtonSet } from "../../components";
import { useHistory } from "react-router-dom";
import useProgrammmes from "./useProgrammes";
import useCourses from "../Courses/useCourses";
import { colors as c } from "../../colors";
import InlineRegulations from "./InlineRegulations";

const ExistingProgramme = ({ programme, notifyUpdate }) => {
    const history = useHistory();
    const { deleteProgramme, updateProgramme, createProgrammeDegreePlan } = useProgrammmes();
    const { data } = useCourses();
    const [programmeDegreeInfo, setProgrammeDegreeInfo] = useState({});
    const [createNewRequirements, setCreateNewRequirements] = useState(false);
    const [editRequirements, setEditRequirements] = useState(-1);
    const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
    const [openConfirmationDeleteRegulation, setOpenConfirmationDeleteRegulation] = useState(false);
    const [regulationtoDelete, setRegulationToDelete] = useState({});
    const [regulationInEdit, setRegulationInEdit] = useState(undefined);
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
        setRegulationToDelete(regulation);
        setOpenConfirmationDeleteRegulation(true);
    };

    const confirmDeleteRegulation = (regulation) => {
        const updatedRegulations = programme.regulations.filter((r) => r._id !== regulation._id);
        const updatedProgramme = { ...programme, regulations: updatedRegulations };
        updateProgramme(updatedProgramme, notifyUpdate);
        setOpenConfirmationDeleteRegulation(false);
        setCreateNewRequirements(false);
        setEditRequirements(-1);
    };

    return (
        <Flex width="100%" direction="column">
            <Flex align="center" justify="center" direction="row">
                <Flex align="center" justify="center" marginTop="10px">
                    {isEdited ? (
                        <Input
                            variant="flushed"
                            placeholder="Programme Name"
                            textAlign="center"
                            width="100%"
                            size="lg"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />
                    ) : (
                        <Text textAlign="center" fontSize="5xl" color={c.nightBlue} as="b">
                            {programmeDegreeInfo.name}
                        </Text>
                    )}
                </Flex>

                <Flex justify="flex-end" align="flex-end" right="50px" position="absolute">
                    {/* Dropdown menu to edit and delete */}
                    <MenuWrapper
                        item={programmeDegreeInfo}
                        itemType="Programme"
                        setOpenConfirmationDialog={setOpenConfirmationDialog}
                        openConfirmationDialog={openConfirmationDialog}
                        confirm={confirmDelete}
                        onEdit={!isEdited ? () => setIsEdited(true) : undefined}
                    />
                </Flex>
            </Flex>

            {/* Save and Close Buttons for Editing */}
            {isEdited ? (
                <Flex justifyContent="space-evenly" width="100%" align="center" mt={8} mb={3}>
                    <SaveCancelButtonSet isActive={name !== ""} onCancel={cancelEditProgramme} onSave={saveEditProgramme} />
                </Flex>
            ) : (
                ""
            )}

            {/* PROGRAMME REGULATIONS */}
            <Flex align="center" justify="center" direction="column">
                <Text textAlign="center" fontSize="md" color={c.nightBlue} mt={5}>
                    Regulations
                </Text>
                <Box bg={c.whiteGrey} width="75%" textAlign="center" padding="5px" marginTop="10px" className="regulationsBox">
                    {/* Add Regulations Button to activate Component via createNewRequirements */}
                    {!createNewRequirements ? (
                        <IconButton
                            mt={2}
                            mb={2}
                            width="100%"
                            icon="add"
                            bg={c.midnightBlue}
                            color={c.white}
                            _hover={{
                                bg: c.nightBlue,
                            }}
                            onClick={() => {
                                setCreateNewRequirements(true);
                                setRegulationInEdit(undefined);
                            }}
                        />
                    ) : (
                        <InlineRegulations
                            closeEdit={() => setCreateNewRequirements(false)}
                            programme={programme}
                            notifyUpdate={notifyUpdate}
                        />
                    )}
                    <Stack direction="column" height="500px" width="100%" overflowY="auto" align="center">
                        {programme.regulations.map((regulation, index) =>
                            editRequirements !== index ? (
                                <ProgrammeRequirementsItem
                                    key={index}
                                    itemNumber={`${index + 1}.`}
                                    onEdit={() => {
                                        setEditRequirements(index);
                                        setRegulationInEdit(regulation);
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
                                            onClick={() => deleteRegulation(regulation)}
                                        >
                                            <Icon name="small-close" />
                                        </Button>
                                    }
                                />
                            ) : (
                                <InlineRegulations
                                    closeEdit={() => setEditRequirements(-1)}
                                    programme={programme}
                                    notifyUpdate={notifyUpdate}
                                    regulation={regulationInEdit}
                                />
                            ),
                        )}
                    </Stack>
                    <ConfirmationDialog
                        item={regulationtoDelete}
                        itemType={"Regulation"}
                        action={"Delete"}
                        isOpen={openConfirmationDeleteRegulation}
                        onClose={() => setOpenConfirmationDeleteRegulation(false)}
                        confirm={confirmDeleteRegulation}
                    />
                </Box>
            </Flex>

            <Flex align="center" justify="center" width="100%">
                {programmeDegreeInfo.defaultPlan ? (
                    <OutlineButton text="View Template" to={`/plan/${programmeDegreeInfo.defaultPlan}`} height="60px" />
                ) : (
                    <OutlineButton
                        text="Define Template"
                        onClick={() => createProgrammeDegreePlan(programme).then((res) => history.push(`/plan/${res._id}`))}
                        height="60px"
                    />
                )}
            </Flex>
        </Flex>
    );
};

export default ExistingProgramme;

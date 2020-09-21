import React, { useState } from "react";
import { Flex, Stack, Text, Button, useDisclosure, IconButton, Box } from "@chakra-ui/core";
import RegulationModal from "./RegulationModal";

const RegulationTable = ({ name, updateCourse, course, regulationType }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [regulation, setRegulation] = useState([]);

    // delete bugged with edit
    const handleRegTableDeleteClick = () => {
        switch (name) {
            case "Prerequisites":
                updateCourse({
                    ...course,
                    prerequisites: [],
                });
                break;
            case "InformalEquivalents":
                updateCourse({
                    ...course,
                    informalEquivalents: [],
                });
                break;
            case "Corequisites":
                updateCourse({
                    ...course,
                    corequisites: [],
                });
                break;
            case "Restrictions":
                updateCourse({
                    ...course,
                    restrictions: [],
                });
                break;
            default:
                break;
        }
    };

    //open modal, with
    const handleRegTableEditClick = (reg) => {
        setRegulation(reg);
        switch (name) {
            case "Prerequisites":
                onOpen();
                break;
            case "informalEquivalents":
                onOpen();
                break;
            case "Corequisites":
                onOpen();
                break;
            case "Restrictions":
                onOpen();
                break;
            default:
                break;
        }
    };

    const handleOpen = () => {
        setRegulation([]);
        onOpen();
    };

    return (
        <Flex width="80vh" direction="row" paddingTop="3">
            <RegulationModal
                isOpen={isOpen}
                onClose={onClose}
                title={name}
                updateCourse={updateCourse}
                course={course}
                editReg={regulation}
            ></RegulationModal>
            <Stack w="100%">
                <Button
                    variantColor="blue"
                    backgroundColor="#162971"
                    onClick={handleOpen}
                    isDisabled={regulationType && regulationType.length > 0 ? true : false}
                >
                    <Text textAlign="center" color="white">
                        Add {name}
                    </Text>
                </Button>
                {regulationType && regulationType.length > 0 ? (
                    <Flex p={1} shadow="md" borderWidth="1px" flex="1" rounded="md" justify="space-between" direction="row">
                        <Text>{regulationType.map((reg) => `${reg} `)}</Text>
                        <Box>
                            <IconButton icon="edit" size="sm" onClick={() => handleRegTableEditClick(regulationType)} />
                            <IconButton icon="delete" size="sm" onClick={() => handleRegTableDeleteClick(regulationType)} />
                        </Box>
                    </Flex>
                ) : (
                    <></>
                )}
            </Stack>
        </Flex>
    );
};

export default RegulationTable;

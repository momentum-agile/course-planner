import React, { useState } from "react";
import { Flex, Stack, Text, Button, useDisclosure, Tag, TagLabel, Tooltip } from "@chakra-ui/core";
import { OptionsMenu } from "../../../components";
import RegulationModal from "./RegulationModal";
import { colors as c } from "../../../colors";

const regMap = {
    Prerequisites: {
        button: "Prerequisites",
        tooltip: "Requirements or courses that must be completed prior to taking this one",
    },
    Corequisites: {
        button: "Corequisites",
        tooltip: "Requirements or courses that must be completed prior to or at the same time as this one",
    },
    Restrictions: {
        button: "Restricted Courses",
        tooltip: "Courses that cannot be started if this one is taken, and vice versa",
    },
    InformalEquivalents: {
        button: "Equivalent Courses",
        tooltip: "Courses that, if taken, are essentially 'equivalent' to taking this one",
    },
};

const RegulationTable = ({ name, updateCourse, course, regulationList }) => {
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
            case "InformalEquivalents":
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

    const splitRegulation = (reg) => {
        // const validCourseCodeRegex = /^([A-Za-z])*(\s?)([1-9][0-9][0-9])([A-Za-z]{0,3})$/;
        // TODO: Change this to make each course code a separate bubble?
        // Could use validCourseCodeRegex (defined above)
        return [reg];
    };

    return (
        <Flex width="100%" direction="row" pt="1" pb="1">
            <RegulationModal
                isOpen={isOpen}
                onClose={onClose}
                title={name}
                updateCourse={updateCourse}
                course={course}
                editReg={regulation}
            />

            <Stack w="100%">
                {regulationList && regulationList.length > 0 ? (
                    <Flex direction="column" bg={c.whiteGrey} p={1} shadow="md" flex="1" rounded="md">
                        <Flex direction="row" pb="2px">
                            <Tooltip hasArrow label={regMap[name].tooltip} placement="bottom" bg={c.whiteGrey} color={c.midnightBlue}>
                                <Text width="96.5%" textAlign="center" fontWeight="bold" color={c.midnightBlue}>
                                    {regMap[name].button}
                                </Text>
                            </Tooltip>
                            <Flex>
                                <OptionsMenu
                                    onEdit={() => handleRegTableEditClick(regulationList)}
                                    onDelete={() => handleRegTableDeleteClick(regulationList)}
                                />
                            </Flex>
                        </Flex>

                        <Flex direction="row" pb="5px" pl="5px">
                            {regulationList.map((reg) =>
                                splitRegulation(reg).map((item, idx) =>
                                    item.toLowerCase() === "and" || item.toLowerCase() === "or" ? (
                                        <Tag size="sm" key={idx} rounded="full" variant="solid" variantColor="gray" mr={1}>
                                            {item}
                                        </Tag>
                                    ) : (
                                        <Tag size="sm" key={idx} rounded="full" variant="solid" variantColor="cyan" mr={1}>
                                            <TagLabel>{item}</TagLabel>
                                        </Tag>
                                    ),
                                ),
                            )}
                        </Flex>
                    </Flex>
                ) : (
                    <Tooltip hasArrow label={regMap[name].tooltip} placement="bottom" bg={c.whiteGrey} color={c.midnightBlue}>
                        <Button variantColor="blue" backgroundColor={c.midnightBlue} onClick={handleOpen} _hover={{ bg: c.lightBlue }}>
                            + Add {regMap[name].button}
                        </Button>
                    </Tooltip>
                )}
            </Stack>
        </Flex>
    );
};

export default RegulationTable;
export { regMap };

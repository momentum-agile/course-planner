import React, { useEffect, useState } from "react";
import { Flex, Text, Stack, Checkbox, Tag } from "@chakra-ui/core";
import { colors as c } from "../../../colors";

const semMapping = ["S1", "S2", "SS"];

const SemesterField = ({ value, isEditing, onChange }) => {
    const [checkedSems, setCheckedSems] = useState([]);

    useEffect(() => {
        setCheckedSems([value.includes("S1"), value.includes("S2"), value.includes("SS")]);
    }, [value]);

    const updateSem = (i) => {
        const sems = checkedSems;
        sems[i] = !sems[i]; // Check/uncheck the semester

        const semesters = [];

        // Determine which semester strings are checked
        sems.forEach((sem, idx) => sem && semesters.push(semMapping[idx]));

        onChange("sem", semesters);
    };

    return (
        <Flex direction="column">
            <Text textAlign="center" color={c.darkBlue} fontWeight="bold">
                Semester(s)
            </Text>

            {!isEditing ? (
                <Flex justify="center">
                    {value.map((sem, idx) => (
                        <Tag size="md" key={idx} rounded="full" variant="solid" variantColor="cyan" mr={1}>
                            {sem}
                        </Tag>
                    ))}
                </Flex>
            ) : (
                <Stack spacing={10} isInline pt="10px">
                    {semMapping.map((sem, idx) => (
                        <Checkbox key={idx} borderColor={c.lightBlue} isChecked={checkedSems[idx]} onChange={() => updateSem(idx)}>
                            {sem}
                        </Checkbox>
                    ))}
                </Stack>
            )}
        </Flex>
    );
};

export default SemesterField;

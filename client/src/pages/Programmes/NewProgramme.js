import React, { useState, useEffect } from "react";
import { Flex, Text, Input, Box } from "@chakra-ui/core";
import { OutlineButton } from "../../components";
import useProgrammmes from "./useProgrammes";

const NewProgramme = ({ notifyAddition }) => {
    const { createProgramme } = useProgrammmes();
    const [programmeName, setProgrammeName] = useState();
    const [newProgramme, setNewProgramme] = useState({
        name: "",
        regulations: [
            {
                points: 0,
                pointRequirement: "UPTO",
                courses: [],
            },
        ],
        defaultPlan: null,
    });

    useEffect(() => {
        setNewProgramme({
            name: programmeName,
            regulations: [
                {
                    // TODO: add and change regulations here
                    points: 0,
                    pointRequirement: "UPTO",
                    courses: [],
                },
            ],
            // TODO: add default plan here
            defaultPlan: null,
        });
    }, [programmeName]);

    const saveProgramme = () => {
        createProgramme(newProgramme, notifyAddition);
    };

    const cancelProgramme = () => {
        // TODO: discard changes here
        console.log("Discarded");
    };

    // TODO: generate ID here
    const id = 0;

    return (
        <Flex width="100%" direction="column">
            <Flex align="center" justify="center">
                <Text textAlign="center" fontSize="4xl" color="#0F487E">
                    Create Programme Requirements
                </Text>
            </Flex>
            <Flex align="center" justify="center" marginTop="10px">
                <Text textAlign="center" fontSize="md" color="#000000" as="i">
                    Programme Name
                </Text>
            </Flex>
            <Flex align="center" justify="center" marginTop="10px">
                <Input
                    variant="flushed"
                    placeholder="Enter Programme Name"
                    textAlign="center"
                    width="50%"
                    size="lg"
                    onChange={(event) => setProgrammeName(event.target.value)}
                />
            </Flex>

            <Flex align="center" justify="center" marginTop="50px">
                <Text textAlign="center" fontSize="md" color="#000000" as="i">
                    Requirements
                </Text>
                <Box as="span" ml="2" color="gray.600" bg="gray" />
            </Flex>

            <Flex direction="column" align="center" justify="center" height="100%"></Flex>

            <Flex justify="center" width="100%">
                <OutlineButton text="Define Template" to={`/programmes/${id}/create-template`} height="60px" />
            </Flex>
            <Flex justifyContent="space-evenly" width="100%" align="center">
                <OutlineButton text="Cancel" height="60px" width="200px" onClick={cancelProgramme} to={`/programmes/`} />
                <OutlineButton text="Save" height="60px" width="200px" onClick={saveProgramme} to={`/programmes/`} />
            </Flex>
        </Flex>
    );
};

export default NewProgramme;

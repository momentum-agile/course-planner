import React, { useState } from "react";
import { Flex, Text, Box, Select, Button, useToast } from "@chakra-ui/core";
import { InlineEdit } from "../../components";

const AddStudent = ({ addStudent }) => {
    const [editName, setEditName] = useState("");
    const [editUpi, setEditUpi] = useState("");
    const [editId, setEditId] = useState("");
    const [editYearLevel, setEditYearLevel] = useState(1);
    const [confirmed, setConfirmed] = useState(false);
    const toast = useToast();

    const addStudentHandler = () => {
        const toastBase = {
            title: "Error when trying to create student",
            status: "error",
            duration: 9000,
            isClosable: true,
        };

        if (editName.length === 0) {
            toast({ ...toastBase, description: "Student Name is too short" });
            return;
        }

        // Regex from: https://www.kb.sit.auckland.ac.nz/2014/02/21/upi/
        const upiRegex = /[a-zA-Z]{1,4}[0-9]{3}$/;

        // The student ID can be 7 to 10 digits long
        const idRegex = /(\d{7}|\d{8}|\d{9}|\d{10})$/;

        if (!upiRegex.test(editUpi)) {
            toast({ ...toastBase, description: "Student UPI is in an incorrect format" });
            return;
        }

        if (!idRegex.test(editId)) {
            toast({ ...toastBase, description: "Student ID is either too long or short. Should be 7-10 digits" });
            return;
        }

        const student = {
            name: editName,
            id: editId,
            upi: editUpi,
            yearLevel: editYearLevel,
            plans: [],
        };

        addStudent(student);
        setConfirmed(true);
    };

    const reset = () => {
        setEditName("");
        setEditId("");
        setEditUpi("");
        setEditYearLevel(1);
        setConfirmed(false);
    };

    return (
        <Flex width="100%" align="center" justify="center" marginTop="20px" p={4}>
            <Flex height="100%" width="50%" direction="column">
                <Text textAlign="center" fontStyle="bold" fontSize="5xl" color="#113F73">
                    Creating New Student
                </Text>

                <Flex mt={12} flexDirection="column">
                    <InlineEdit title="Name" value={String(editName)} onChange={(e) => setEditName(e)} isDisabled={confirmed} />
                    <InlineEdit title="UPI" value={String(editUpi)} onChange={(e) => setEditUpi(e)} isDisabled={confirmed} />
                    <InlineEdit title="ID" value={String(editId)} onChange={(e) => setEditId(e)} isDisabled={confirmed} />

                    <Flex
                        textAlign="center"
                        fontSize="2xl"
                        display="flex"
                        flexDirection="row"
                        justifyContent="center"
                        alignContent="center"
                        marginTop="8px"
                    >
                        <Box>
                            <Text> Year Level: </Text>
                        </Box>
                        <Select
                            isDisabled={confirmed}
                            value={editYearLevel}
                            width="30%"
                            ml={5}
                            onChange={(e) => setEditYearLevel(Number(e.target.value))}
                        >
                            <option value={1}>Part 1</option>
                            <option value={2}>Part 2</option>
                            <option value={3}>Part 3</option>
                            <option value={4}>Part 4</option>
                            <option value={5}>Part 5</option>
                        </Select>
                    </Flex>
                </Flex>
                <Flex mt={12} justify="center" align="center">
                    {confirmed ? (
                        <Button variantColor="blue" onClick={() => reset()}>
                            Create Another Student?
                        </Button>
                    ) : (
                        <Button variantColor="green" onClick={() => addStudentHandler()}>
                            Confirm Creation
                        </Button>
                    )}
                </Flex>
            </Flex>
        </Flex>
    );
};

export default AddStudent;

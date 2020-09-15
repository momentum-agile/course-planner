import React, { useState, useEffect } from "react";
import { Flex, Text, Box, Select, Button } from "@chakra-ui/core";
import AlertButton from "./AlertBox";
import InlineEdit from "./InlineEdit";
import ProgrammeTable from "./ProgrammeTable";
import { Link } from "react-router-dom";

const programmeTableColumns = [
    {
        Header: "Name",
        accessor: "name",
    },
    {
        Header: "Programme",
        accessor: "programmeName",
    },
    {
        Header: "Start Year",
        accessor: "startYear",
    },

    {
        Header: "End Year",
        accessor: "endYear",
    },
];

const data = [
    {
        name: "Plan1",
        programmeName: "BE (Hons) SE",
        startYear: 2018,
        endYear: 2020,
    },
    {
        name: "Plan2",
        programmeName: "BE (Hone) SE",
        startYear: 2018,
        endYear: 2020,
    },
];

const ViewStudent = ({ student, editStudent, deleteStudent }) => {
    const { name, upi, id, yearLevel } = student;
    const [editName, setEditName] = useState(name);
    const [editUpi, setEditUpi] = useState(upi);
    const [editId, setEditId] = useState(id);
    const [editYearLevel, setEditYearLevel] = useState(yearLevel);

    useEffect(() => {
        setEditName(name);
        setEditUpi(upi);
        setEditId(id);
        setEditYearLevel(yearLevel);
    }, [name, upi, id, yearLevel]);

    const handleConfirmEdit = (id) => (e) => {
        const newStudent = {
            ...student,
            [id]: e,
        };

        editStudent(newStudent);
    };

    return (
        <Flex width="100%" align="center" justify="center" marginTop="20px" p={4}>
            <Flex height="100%" width="50%" direction="column">
                <Text textAlign="center" fontStyle="bold" fontSize="5xl" color="#113F73">
                    Selected Student
                </Text>

                <Flex mt={12} flexDirection="column">
                    <InlineEdit
                        title="Name"
                        value={String(editName)}
                        onSubmit={(e) => handleConfirmEdit("name")(editName)}
                        onChange={(e) => setEditName(e)}
                    />

                    <InlineEdit
                        title="UPI"
                        value={String(editUpi)}
                        onSubmit={(e) => handleConfirmEdit("upi")(editUpi)}
                        onChange={(e) => setEditUpi(e)}
                    />

                    <InlineEdit
                        title="ID"
                        value={String(editId)}
                        onSubmit={(e) => handleConfirmEdit("id")(editId)}
                        onChange={(e) => setEditId(e)}
                    />
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
                            value={editYearLevel}
                            width="30%"
                            ml={5}
                            onChange={(e) => {
                                setEditYearLevel(Number(e.target.value));
                                handleConfirmEdit("yearLevel")(Number(e.target.value));
                            }}
                        >
                            <option value={1}>Part 1</option>
                            <option value={2}>Part 2</option>
                            <option value={3}>Part 3</option>
                            <option value={4}>Part 4</option>
                            <option value={5}>Part 5</option>
                        </Select>
                    </Flex>
                </Flex>

                <Flex p={4} flexDirection="column" marginTop="42px">
                    <Flex flexDirection="row" align="center" justify="center">
                        <Text textAlign="center" fontSize="2xl">
                            Plans
                        </Text>
                        <Link to={`plan/${upi}/${data.length + 1}`}>
                            <Button variantColor="blue" backgroundColor="#162971" marginLeft="20px">
                                <Text textAlign="center" color="white">
                                    Create Plan
                                </Text>
                            </Button>
                        </Link>
                    </Flex>
                    <ProgrammeTable columns={programmeTableColumns} data={data} />
                </Flex>

                <Flex mt={12} justify="center" align="center">
                    <AlertButton btnText={"Delete Student"} confirmFn={() => deleteStudent(upi)} />
                </Flex>
            </Flex>
        </Flex>
    );
};

export default ViewStudent;

import React, { useState, useEffect } from "react";
import { Flex, Text, Button } from "@chakra-ui/core";
import { InlineEdit } from "../../components";
import PlanTable from "./PlanTable";
import { Link } from "react-router-dom";
import OptionsMenu from "../../components/OptionsMenu";
import { colors as c } from "../../colors";

const PlanTableColumns = [
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
    const { name, upi, id } = student;
    const [editName, setEditName] = useState(name);
    const [editUpi, setEditUpi] = useState(upi);
    const [editId, setEditId] = useState(id);
    const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);

    useEffect(() => {
        setEditName(name);
        setEditUpi(upi);
        setEditId(id);
    }, [name, upi, id]);

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
                <Flex direction="row">
                    <Flex justify="flex-start" align="flex-start" position="absolute" right="50px">
                        <OptionsMenu
                            item={student}
                            itemType="Student"
                            setOpenConfirmationDialog={setOpenConfirmationDialog}
                            openConfirmationDialog={openConfirmationDialog}
                            confirm={deleteStudent}
                        />
                    </Flex>
                    <Text textAlign="center" fontStyle="bold" fontSize="5xl" color={c.uoaBlue}>
                        Selected Student
                    </Text>
                </Flex>

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
                </Flex>

                <Flex p={4} flexDirection="column" marginTop="50px">
                    <Flex flexDirection="row" align="center" justify="center">
                        <Text textAlign="center" fontSize="2xl">
                            Plans
                        </Text>
                        <Link to={`plan/${upi}/DefacedC0ffeeBabeB0b0001`}>
                            <Button variantColor="blue" backgroundColor={c.uoaBlue} marginLeft="20px">
                                <Text textAlign="center" color={c.white}>
                                    Create Plan
                                </Text>
                            </Button>
                        </Link>
                    </Flex>
                    <PlanTable columns={PlanTableColumns} data={data} />
                </Flex>
            </Flex>
        </Flex>
    );
};

export default ViewStudent;

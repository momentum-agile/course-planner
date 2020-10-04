import React, { useEffect, useState } from "react";
import { Button, Flex, Heading, useToast } from "@chakra-ui/core";
import { SearchBar, Table } from "../../components";
import useStudents from "./useStudents";
import StudentView from "./StudentView";
import { colors as c } from "../../colors";
import { useHistory, useParams } from "react-router-dom";
import EmptyStudent from "./EmptyStudent";
import HomeButton from "../../components/HomeButton";

const Students = () => {
    const history = useHistory();
    const { upi } = useParams();
    const toast = useToast();

    const [currRow, setCurrRow] = useState("0");
    const [prevRow, setPrevRow] = useState("0");
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedStudent, setSelectedStudent] = useState({});
    const [isCreatingStudent, setIsCreatingStudent] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const { data, columns, updateStudent, deleteStudent, createStudent, programmes, plans } = useStudents();

    useEffect(() => {
        setSelectedStudent(isCreatingStudent ? {} : data[currRow] || {});
        setIsEditing(false);
    }, [data, currRow, isCreatingStudent]);

    useEffect(() => {
        const rowId = data.findIndex((student) => student.upi === upi);
        setCurrRow(rowId.toString());
        setIsCreatingStudent(upi === "new");
    }, [data, upi]);

    /**
     * Cancel editing or creating
     */
    const cancelStudent = () => {
        setIsEditing(false);
        setSelectedStudent(selectedStudent === {} ? data[currRow] : { ...selectedStudent });
        setIsCreatingStudent(false);
        history.push(`/students/${data.length > 1 ? data[prevRow].upi : ""}`);
    };

    const saveStudent = (toSave) => {
        const duplicate = checkDuplicate(toSave);

        if (duplicate) {
            toast({
                isClosable: true,
                duration: 9000,
                title: `Could Not ${isCreatingStudent ? "Create" : "Update"} Student`,
                description: `Student${duplicate.length > 1 ? "(s)" : ""} with ${duplicate.join(" and ")} already exist${
                    duplicate.length === 1 ? "s" : "(s)"
                }`,
                status: "error",
            });
            return;
        }

        if (isCreatingStudent) {
            createStudent(toSave).then(() => history.push(`/students/${toSave.upi}`));
            setIsCreatingStudent(false);
            setCurrRow(data.length.toString());
            setSelectedStudent(toSave);
        } else {
            updateStudent(toSave);
        }

        toast({
            isClosable: true,
            duration: 9000,
            description: `Student '${toSave.name}' (${toSave.upi}) has been successfully saved`,
            status: "success",
        });

        setSearchTerm("");
    };

    /**
     * Returns an array of error messages if the student is a duplicate (existing UPI or ID),
     * or false otherwise
     *
     * @param {object} toSave The student object to save
     */
    const checkDuplicate = (toSave) => {
        const existingUpi = data.find((s) => s.upi === toSave.upi);
        const existingId = data.find((s) => s.id === toSave.id);

        const msgs = [];

        existingUpi &&
            (isCreatingStudent || (!isCreatingStudent && existingUpi._id !== toSave._id)) &&
            msgs.push(`UPI: '${existingUpi.upi}'`);

        existingId && (isCreatingStudent || existingId._id !== toSave._id) && msgs.push(`ID: '${existingId.id}'`);

        return msgs.length > 0 && msgs;
    };

    const onDelete = (upi) => {
        deleteStudent(upi);
        setSearchTerm("");
        history.push("/students");
    };

    return (
        <Flex backgroundColor={c.midnightBlue}>
            {/* Left side of page */}
            <Flex width="50%" direction="column">
                <Flex left="1px" justify="flex-start">
                    <HomeButton />
                </Flex>

                <Flex align="center" justify="center">
                    <Heading textAlign="center" color={c.white} fontWeight="bold">
                        Students
                    </Heading>
                </Flex>

                <Flex justify="flex-end" direction="row" p={2} mr="4%">
                    <Button
                        color={c.white}
                        bg={c.midnightBlue}
                        border="1px"
                        borderColor={c.white}
                        _hover={{ bg: c.lightBlue, borderColor: c.lightBlue }}
                        onClick={() => {
                            setSelectedStudent({});
                            setIsCreatingStudent(true);
                            history.push("/students/new");
                        }}
                    >
                        + Create
                    </Button>
                </Flex>

                <SearchBar searchCategory="Students" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />

                <Flex p={4}>
                    <Table
                        columns={columns}
                        data={data}
                        getRowProps={(row) => ({
                            onClick: () => {
                                setIsCreatingStudent(false);
                                setCurrRow(row.id);
                                setPrevRow(row.id);
                                history.push(`/students/${row.original.upi}`);
                            },
                            style: {
                                cursor: "pointer",
                                background: row.id === currRow ? c.lightGrey : null,
                                color: row.id === currRow ? c.darkBlue : c.white,
                            },
                        })}
                        rowHover={{ bg: c.lightMidnightBlue }}
                        currRow={currRow}
                        searchInput={searchTerm}
                    />
                </Flex>
            </Flex>

            {/* Right side of page */}
            <Flex height="100%" width="50%" direction="column">
                {upi === "new" || data.find((student) => student.upi === upi) ? (
                    <StudentView
                        student={selectedStudent}
                        programmes={programmes}
                        allPlans={plans}
                        isNew={isCreatingStudent}
                        isEditing={isEditing || isCreatingStudent}
                        onEdit={() => setIsEditing(!isEditing)}
                        onDelete={onDelete}
                        onCancel={cancelStudent}
                        onSave={saveStudent}
                    />
                ) : (
                    <EmptyStudent />
                )}
            </Flex>
        </Flex>
    );
};

export default Students;

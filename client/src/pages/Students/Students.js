import React, { useEffect, useState } from "react";
import { Button, Divider, Flex, Text } from "@chakra-ui/core";
import { NavigationMenu, SearchBar, Table } from "../../components";
import useStudents from "./useStudents";
import ViewStudent from "./ViewStudent";
import AddStudent from "./AddStudent";
import { colors as c } from "../../colors";

const Students = () => {
    const [currRow, setCurrRow] = useState("0");
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedStudent, setSelectedStudent] = useState({});
    const [addingStudent, setAddingStudent] = useState(false);
    const { data, columns, editStudent, deleteStudent, addStudent, programmes, plans } = useStudents();

    useEffect(() => {
        setSelectedStudent(data[currRow] || {});
    }, [data, currRow]);

    return (
        <Flex height="100vh" width="100%" direction="row" backgroundColor={c.whiteGrey}>
            <Flex height="100%" width="50%" direction="column">
                <Flex left="1px" justify="flex-start">
                    <NavigationMenu />
                </Flex>
                <Flex width="100%" justify="center" marginTop="20px">
                    <Text textAlign="center" fontSize="5xl" color={c.uoaBlue}>
                        Students
                    </Text>
                </Flex>

                <Flex width="100%" align="center" justify="center" direction="row">
                    <SearchBar searchCategory="Students" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    <Flex p={2} marginLeft={2}>
                        <Button
                            variantColor="blue"
                            backgroundColor={c.uoaBlue}
                            onClick={() => {
                                setCurrRow();
                                setAddingStudent(true);
                            }}
                        >
                            <Text textAlign="center" color={c.white}>
                                Add Student
                            </Text>
                        </Button>
                    </Flex>
                </Flex>

                <Flex p={4}>
                    <Table
                        columns={columns}
                        data={data}
                        getRowProps={(row) => ({
                            onClick: () => {
                                setAddingStudent(false);
                                setCurrRow(row.id);
                            },
                            style: {
                                cursor: "pointer",
                                background: row.id === currRow ? c.uoaBlue : null,
                            },
                        })}
                        currRow={currRow}
                        searchInput={searchTerm}
                    />
                </Flex>
            </Flex>
            <Divider orientation="vertical" backgroundColor={c.iceBlue} width="2px" />
            <Flex height="100%" width="50%" direction="column">
                {addingStudent ? (
                    <AddStudent addStudent={addStudent} />
                ) : (
                    <ViewStudent
                        student={selectedStudent}
                        programmes={programmes}
                        editStudent={editStudent}
                        deleteStudent={deleteStudent}
                        plans={plans}
                    />
                )}
            </Flex>
        </Flex>
    );
};

export default Students;

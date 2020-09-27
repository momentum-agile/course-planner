import React, { useEffect, useState } from "react";
import { Button, Flex, Select, Text } from "@chakra-ui/core";
import { InlineEdit, MenuWrapper } from "../../components";
import PlanTable from "./PlanTable";
import { colors as c } from "../../colors";
import CoursePlannerClient from "../../common/PlansClient";
import { useHistory } from "react-router-dom";

const ViewStudent = ({ student, editStudent, deleteStudent, programmes, plans }) => {
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
            accessor: (d) => d.startYear + d.numYears - 1,
        },
    ];
    const history = useHistory();
    const { name, upi, id } = student;
    const [editName, setEditName] = useState(name);
    const [editUpi, setEditUpi] = useState(upi);
    const [editId, setEditId] = useState(id);
    const [programmeID, setProgrammeID] = useState("");
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
    const studentPlans = () =>
        student && student.plans && plans.length
            ? student.plans
                  .map((id) => plans && plans.find((plan) => plan._id === id))
                  .map((plan) => ({
                      ...plan,
                      programmeName:
                          programmes.find((programme) => programme._id === plan.programmeDegree) &&
                          programmes.find((programme) => programme._id === plan.programmeDegree).name,
                  }))
            : [];
    return (
        <Flex width="100%" align="center" justify="center" marginTop="20px" p={4}>
            <Flex height="100%" width="50%" direction="column">
                <Flex direction="row">
                    <Flex justify="flex-start" align="flex-start" position="absolute" right="50px">
                        <MenuWrapper
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
                    <Text textAlign="center" fontSize="2xl">
                        Plans
                    </Text>
                    <Flex flexDirection="row" align="center" marginTop="10px" justify="center">
                        <Select value={programmeID} ml={5} onChange={(e) => setProgrammeID(e.target.value)}>
                            <option value={""}>Select a program..</option>
                            {programmes.map((programme, idx) => (
                                <option key={idx} value={programme._id}>
                                    {programme.name}
                                </option>
                            ))}
                        </Select>
                        <Button
                            variantColor="blue"
                            backgroundColor={c.uoaBlue}
                            marginLeft="20px"
                            paddingLeft="30px"
                            paddingRight="30px"
                            isDisabled={!programmeID}
                            onClick={() =>
                                CoursePlannerClient.createStudentPlan(editUpi, {
                                    name: `${name}'s ${programmes.find((programme) => programme._id === programmeID).name} plan`,
                                    student: student._id,
                                    programmeDegree: programmeID,
                                    startYear: new Date().getFullYear() + 1,
                                    numYears: 1,
                                    completed: false,
                                }).then((res) => history.push(`/plan/${res._id}`))
                            }
                        >
                            <Text textAlign="center" color={c.white}>
                                Create Plan
                            </Text>
                        </Button>
                    </Flex>
                    <PlanTable columns={PlanTableColumns} data={studentPlans()} />
                </Flex>
            </Flex>
        </Flex>
    );
};

export default ViewStudent;

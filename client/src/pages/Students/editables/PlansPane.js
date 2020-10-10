import React, { useEffect, useRef, useState } from "react";
import {
    Box,
    Flex,
    Stack,
    Text,
    Icon,
    PseudoBox,
    Tag,
    TagLabel,
    Divider,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
    Input,
    Button,
    useDisclosure,
    Select,
} from "@chakra-ui/core";
import { colors as c } from "../../../colors";
import { useHistory } from "react-router-dom";
import useStudents from "../useStudents";

const PlanesPane = ({ student, programmes, plans }) => {
    const history = useHistory();

    const { createPlanForStudent } = useStudents();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const createPlan = (name, programme) => {
        createPlanForStudent(student, name, programme).then((res) => history.push(`/plan/${res._id}`));
    };

    return (
        <Flex
            width="100%"
            direction="column"
            align="center"
            justify="center"
            ml="5px"
            mr="5px"
            p="10px"
            borderRadius="5px"
            bg={c.whiteGrey}
            boxShadow="md"
        >
            <Flex justify="center">
                <Text justify="center" fontWeight="bold" color={c.midnightBlue}>
                    Plans
                </Text>
            </Flex>

            <Divider borderColor={c.medGrey} width="100px" />

            {/* Plans table */}
            <Box width="80%" textAlign="center" p="5px" mt="10px">
                <Flex fontWeight="bold" pl="5px">
                    <Text textAlign="left" width="40%" mr="3px">
                        Plan Name
                    </Text>
                    <Text textAlign="center" width="30%" mr="3px">
                        Programme
                    </Text>
                    <Text textAlign="center" width="15%" mr="3px">
                        Start Year
                    </Text>
                    <Text textAlign="center" width="15%" mr="3px">
                        End Year
                    </Text>
                </Flex>

                {/* Table rows  */}
                <Stack className="studentPlansBox" direction="column" maxHeight="470px" overflowY="auto" align="center">
                    {plans.map((plan, idx) => {
                        const prog = programmes.find((p) => p._id === plan.programmeDegree);
                        return <PlansTableItem key={idx} plan={plan} programme={prog} />;
                    })}
                </Stack>

                {/* Create plan button */}
                <PseudoBox
                    width="100%"
                    pl="10px"
                    pr="10px"
                    pt="10px"
                    pb="10px"
                    bg={c.whiteGrey}
                    borderRadius="2px"
                    borderBottom={`solid 1px ${c.lightGrey}`}
                    flex-direction="row"
                    alignItems="center"
                    textAlign="center"
                    justify="space-around"
                    color={c.medGrey}
                    _hover={{
                        color: c.lightBlue,
                        bg: c.greyBlue,
                        cursor: "pointer",
                    }}
                    onClick={onOpen}
                    boxShadow="md"
                >
                    <Text>+ Create</Text>
                </PseudoBox>
            </Box>

            {/* Plan creation modal */}
            <PlanCreationModal isOpen={isOpen} onClose={onClose} programmes={programmes} onCreate={createPlan} />
        </Flex>
    );
};

const PlansTableItem = ({ plan: { _id, name, numYears, startYear }, programme }) => {
    const history = useHistory();

    return (
        <PseudoBox
            width="100%"
            pl="8px"
            pr="8px"
            pt="8px"
            pb="8px"
            bg={c.white}
            borderRadius="2px"
            borderBottom={`solid 1px ${c.lightGrey}`}
            flex-direction="row"
            alignItems="center"
            textAlign="center"
            justify="space-around"
            _hover={{
                bg: c.greyBlue,
                cursor: "pointer",
            }}
            onClick={() => history.push("/plan/" + _id)}
            boxShadow="md"
        >
            <Flex justify="center" align="center">
                <Text textAlign="left" width="40%" mr="3px" overflow={true}>
                    {name}
                </Text>
                <Flex justify="center" align="center" width="30%" mr="3px">
                    <Tag
                        color={programme ? c.lightBlue : c.red}
                        rounded="10px"
                        onClick={(e) => {
                            programme && e.stopPropagation();
                            programme && window.open(`/programmes/${programme._id}`, "_blank");
                        }}
                        _hover={programme && { bg: c.lightBlue, color: c.white }}
                    >
                        <TagLabel>{programme ? programme.name : "Not Found"}</TagLabel>
                        {programme && <Icon name="external-link" pl="4px" />}
                    </Tag>
                </Flex>
                <Text textAlign="center" width="15%" mr="3px">
                    {startYear}
                </Text>
                <Text textAlign="center" width="15%" mr="3px">
                    {startYear + numYears}
                </Text>
            </Flex>
        </PseudoBox>
    );
};

const PlanCreationModal = ({ isOpen, onClose, programmes, onCreate }) => {
    const initialRef = useRef();
    const [planName, setPlanName] = useState("");
    const [selectedProgId, setSelectedProgId] = useState("");

    useEffect(() => {
        setSelectedProgId((!programmes || programmes.length) === 0 ? "" : programmes[0]._id);
    }, [programmes]);

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Create a new Plan</ModalHeader>
                <ModalCloseButton />

                <ModalBody pb={6}>
                    <FormControl isRequired>
                        <FormLabel>Plan name</FormLabel>
                        <Input ref={initialRef} value={planName} placeholder="e.g. Plan 1" onChange={(e) => setPlanName(e.target.value)} />
                    </FormControl>

                    <FormControl isRequired mt={4}>
                        <FormLabel>Programme</FormLabel>
                        <Select
                            value={selectedProgId}
                            onChange={(e) => setSelectedProgId(e.target.value)}
                            placeholder={!programmes || programmes.length === 0 ? "No Programmes Available" : null}
                            fontStyle={!programmes || programmes.length === 0 ? "italic" : null}
                        >
                            {programmes.map((prog, idx) => (
                                <option key={idx} value={prog._id}>
                                    {prog.name}
                                </option>
                            ))}
                        </Select>
                    </FormControl>
                </ModalBody>

                <ModalFooter>
                    <Button onClick={onClose} mr={3}>
                        Cancel
                    </Button>
                    <Button
                        isDisabled={!planName || !selectedProgId}
                        onClick={() => {
                            onCreate(
                                planName,
                                programmes.find((p) => p._id === selectedProgId),
                            );
                            onClose();
                        }}
                    >
                        Create
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default PlanesPane;

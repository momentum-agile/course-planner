import React, { useState } from "react";
import { Flex, Stack, Text, CloseButton, Button, useDisclosure } from "@chakra-ui/core";
import RegulationModal from "./RegulationModal";

const RegulationTable = ({ name }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [allRegsArray, setAllRegsArray] = useState([]);

    const updateRegs = (value) => {
        setAllRegsArray([...allRegsArray, value]);
    };

    const handleRegTableCloseClick = (reg) => {
        setAllRegsArray(allRegsArray.filter((i) => i === reg));
    };

    return (
        <Flex width="80vh" justify="center" borderWidth="5px">
            <RegulationModal isOpen={isOpen} onClose={onClose} updateRegs={updateRegs} title={name}></RegulationModal>
            <Stack w="100%">
                <Button variantColor="blue" backgroundColor="#162971" onClick={onOpen}>
                    <Text textAlign="center" color="white">
                        Add {name}
                    </Text>
                </Button>
                {allRegsArray.map((reg) => (
                    <Flex p={1} shadow="md" borderWidth="1px" flex="1" rounded="md" justify="space-between" direction="row">
                        <Text>
                            {reg.map((value, i) => (
                                <>{i !== reg.length - 1 ? `${value} or ` : ` ${value}`}</>
                            ))}
                        </Text>
                        <CloseButton onClick={(reg) => handleRegTableCloseClick(reg)} />
                    </Flex>
                ))}
            </Stack>
        </Flex>
    );
};

export default RegulationTable;

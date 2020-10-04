import React, { useState, useEffect } from "react";
import {
    Input,
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogBody,
    AlertDialogFooter,
    useToast,
    Button,
} from "@chakra-ui/core";
import useProgrammmes from "./useProgrammes";
import { useHistory } from "react-router-dom";
import { colors as c } from "../../colors";

const NewProgrammeModal = ({ notifyAddition, isOpen, onClose }) => {
    const history = useHistory();
    const { createProgramme } = useProgrammmes();
    const [programmeName, setProgrammeName] = useState("");
    const [newProgramme, setNewProgramme] = useState({
        name: "",
        regulations: [],
        defaultPlan: null,
    });

    const cancelRef = React.useRef();
    const toast = useToast();

    useEffect(() => {
        setNewProgramme({
            name: programmeName,
            regulations: [],
            defaultPlan: null,
        });
    }, [programmeName]);

    const saveProgramme = async () => {
        await createProgramme(newProgramme, notifyAddition).then((res) => history.push(`/programmes/${res._id}`));
        onClose();

        toast({
            title: `Programme Created `,
            description: `Programme ${programmeName} has been successfully created 🎉`,
            status: "success",
            duration: 5000,
            isClosable: true,
        });
        setProgrammeName("");
    };

    return (
        <>
            <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
                <AlertDialogOverlay />
                <AlertDialogContent>
                    <AlertDialogHeader fontSize="2xl" fontWeight="bold" width="100%">
                        Create New Programme
                    </AlertDialogHeader>

                    <AlertDialogBody>
                        <Input
                            variant="filled"
                            placeholder="Enter New Programme Name"
                            textAlign="left"
                            value={programmeName}
                            onChange={(event) => setProgrammeName(event.target.value)}
                        />
                    </AlertDialogBody>

                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose} color={c.darkGrey}>
                            Cancel
                        </Button>
                        <Button variantColor="blue" isDisabled={programmeName === ""} onClick={saveProgramme} ml={3}>
                            Create
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};

export default NewProgrammeModal;

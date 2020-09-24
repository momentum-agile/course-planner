import React, { useState } from "react";
import {
    Button,
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogBody,
    AlertDialogFooter,
    Checkbox,
    FormControl,
    Select,
    Text,
    useToast,
} from "@chakra-ui/core";

const PopulateAPIModal = ({ isOpen, onClose, confirm, navigateTo }) => {
    const cancelRef = React.useRef();
    const [subject, setSubject] = useState("");
    const [overwrite, setOverwrite] = useState(false);
    const toast = useToast();

    return (
        <>
            <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
                <AlertDialogOverlay />
                <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        Populate Courses
                    </AlertDialogHeader>

                    <AlertDialogBody>
                        <Text paddingBottom="10px" fontSize="xl">
                            Select degree to populate courses
                        </Text>
                        <FormControl>
                            <Select id="subject" placeholder="Select Subject" onChange={(e) => setSubject(e.target.value)}>
                                <option value="SOFTENG">SOFTENG</option>
                                <option value="COMPSCI">COMPSCI</option>
                                <option value="ENGGEN">ENGGEN</option>
                                <option value="ENGSCI">ENGSCI</option>
                                <option value="ELECTENG">ELECTENG</option>
                                <option value="COMPSYS">COMPSYS</option>
                                <option value="MECHENG">MECHENG</option>
                            </Select>
                        </FormControl>
                        <Checkbox paddingTop={"10px"} defaultIsChecked={false} onChange={(e) => setOverwrite(e.target.checked)}>
                            Overwrite courses with the same course code?
                        </Checkbox>
                    </AlertDialogBody>

                    <AlertDialogFooter>
                        <Button
                            ref={cancelRef}
                            onClick={() => {
                                onClose();
                                setSubject("");
                                setOverwrite(false);
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            isDisabled={subject === ""}
                            variantColor="blue"
                            onClick={() => {
                                confirm(subject, overwrite);
                                toast({
                                    title: "Courses Added",
                                    description: `${subject} courses successfully imported from the University Courses API`,
                                    status: "success",
                                    duration: 5000,
                                    isClosable: true,
                                });
                                onClose();
                                setSubject("");
                                setOverwrite(false);
                            }}
                            ml={3}
                        >
                            Populate
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};

export default PopulateAPIModal;

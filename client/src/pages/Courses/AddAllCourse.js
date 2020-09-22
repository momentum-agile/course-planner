import React, { useState } from "react";
import {
    Button,
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogBody,
    AlertDialogFooter,
    FormControl,
    Select,
} from "@chakra-ui/core";

const AddAllCourse = ({ isOpen, onClose, confirm, navigateTo }) => {
    const cancelRef = React.useRef();
    const [subject, setSubject] = useState("");
    return (
        <>
            <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
                <AlertDialogOverlay />
                <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        Populate Courses
                    </AlertDialogHeader>

                    <AlertDialogBody>
                        Select degree to populate courses
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
                    </AlertDialogBody>

                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button
                            variantColor="blue"
                            onClick={() => {
                                confirm(subject);
                                onClose();
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

export default AddAllCourse;

import React, { useState } from "react";
import {
    FormControl,
    Input,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Stack,
    TagLabel,
    Tag,
    TagCloseButton,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Flex,
    IconButton,
    Text,
    Switch,
    FormLabel,
} from "@chakra-ui/core";

const RegulationModal = ({ isOpen, onClose, updateRegs, title }) => {
    /** ----- REGULATIONS LIST ----- */
    const [regArray, setRegArray] = useState([]);

    // Regulation tags
    const handleRegTagCloseClick = (reg) => {
        setRegArray(regArray.filter((i) => i === reg));
    };

    /** ----- COURSES LIST ----- */
    const [coursesArray, setCoursesArray] = useState([]);
    const [coursePointsValue, setCoursePointsValue] = useState(15);
    const [courseTextValue, setCourseTextValue] = useState("");

    const handlePointsChange = (value) => setCoursePointsValue(value);
    const handleCourseChange = (event) => setCourseTextValue(event.target.value);

    const handleCourseClick = () => {
        setCoursesArray([...coursesArray, courseTextValue]);
        setCourseTextValue("");
    };

    const handleCoursesListClick = () => {
        setRegArray([...regArray, `${coursePointsValue} points from ${coursesArray}`]);
        setCoursesArray([]);
    };

    // Course tags
    const handleCourseTagCloseClick = (course) => {
        setCoursesArray(coursesArray.filter((i) => i === course));
    };

    /** ----- NOTE TEXTFIELD ----- */
    const [textValue, setTextValue] = useState("");
    const handleTextChange = (event) => setTextValue(event.target.value);

    const handleTextClick = () => {
        setRegArray([...regArray, textValue]);
        setTextValue("");
    };

    const handleConfirm = () => {
        updateRegs(regArray);
        handleClose();
    };

    const handleClose = () => {
        onClose();
        setRegArray([]);
        setTextValue("");
        setCourseTextValue("");
        setCoursesArray([]);
    };

    /** */
    const [toggleInput, setToggleInput] = useState(true);

    return (
        <>
            <Modal id="regulation-modal" isOpen={isOpen} onClose={onClose} size="full">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add {title}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl as="fieldset">
                            <Flex align="center">
                                <Switch
                                    id="course-note-switch"
                                    m="2"
                                    onChange={() => setToggleInput(!toggleInput)}
                                    isChecked={toggleInput}
                                />
                                <FormLabel m="2">{toggleInput ? "Add course regulation" : "Add note"}</FormLabel>
                            </Flex>
                            {toggleInput ? (
                                <>
                                    <Flex m="2">
                                        <Input id="courses" placeholder="Courses" onChange={handleCourseChange} value={courseTextValue} />
                                        <IconButton aria-label="Add input" icon="arrow-down" onClick={handleCourseClick} />
                                    </Flex>
                                    <Flex m="2">
                                        <NumberInput
                                            size="lg"
                                            defaultValue={15}
                                            min={10}
                                            onChange={handlePointsChange}
                                            value={coursePointsValue}
                                        >
                                            <NumberInputField />
                                            <NumberInputStepper>
                                                <NumberIncrementStepper />
                                                <NumberDecrementStepper />
                                            </NumberInputStepper>
                                        </NumberInput>
                                        <Text mx="1">points from</Text>
                                        <Stack
                                            id="courses-stack"
                                            spacing={4}
                                            isInline
                                            borderWidth="2px"
                                            p={2}
                                            h="48px"
                                            w="100%"
                                            bg={coursesArray.length > 0 ? "white" : "gray.100"}
                                        >
                                            {coursesArray.map((course) => (
                                                <Tag size="sm" key={course} rounded="full" variant="solid" variantColor="cyan">
                                                    <TagLabel>{course}</TagLabel>
                                                    <TagCloseButton onClick={(course) => handleCourseTagCloseClick(course)} />
                                                </Tag>
                                            ))}
                                        </Stack>
                                        <IconButton
                                            aria-label="Add input"
                                            icon="add"
                                            isDisabled={coursesArray.length > 0 ? false : true}
                                            onClick={handleCoursesListClick}
                                        />
                                    </Flex>
                                </>
                            ) : (
                                <Flex m="2">
                                    <Input id="text" placeholder="Note" value={textValue} onChange={handleTextChange} />
                                    <IconButton aria-label="Add input" icon="add" onClick={handleTextClick} />
                                </Flex>
                            )}
                        </FormControl>
                    </ModalBody>

                    <Stack id="reg-stack" spacing={4} isInline borderWidth="2px" p={2} h="48px" m="2" bg="#f2f2f2">
                        {regArray.map((reg) => (
                            <Tag size="sm" key={reg} rounded="full" variant="solid">
                                <TagLabel>{reg}</TagLabel>
                                <TagCloseButton onClick={(reg) => handleRegTagCloseClick(reg)} />
                            </Tag>
                        ))}
                    </Stack>

                    <ModalFooter>
                        <Button variantColor="blue" mr={3} onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="ghost" onClick={handleConfirm}>
                            Confirm
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default RegulationModal;

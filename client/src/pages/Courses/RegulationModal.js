import React, { useState, useEffect } from "react";
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
    ButtonGroup,
} from "@chakra-ui/core";
import ReactTooltip from "react-tooltip";
import { colors as c } from "../../colors";

const defaultReg = {
    type: "POINTS",
    points: 15,
    courses: [],
};

const RegulationModal = ({ isOpen, onClose, title, updateCourse, course, editReg }) => {
    const [currentReg, setCurrentReg] = useState(defaultReg);
    // Text fields
    const [courseTextValue, setCourseTextValue] = useState("");
    const [noteValue, setNoteValue] = useState("");

    const [outputRegulation, setOutputRegulation] = useState([]);

    const addToolTip = "Please add an AND or OR statement before adding another course";

    useEffect(() => {
        if (editReg) {
            setOutputRegulation(editReg);
        }
    }, [editReg, isOpen]);

    // plus button
    const handleAddToRegArrayClick = (type) => {
        if (type === "POINTS") {
            setOutputRegulation([...outputRegulation, `${currentReg.points} points from ${currentReg.courses.join(", ")}`]);
        } else if (noteValue.length > 0 && type === "NOTE") {
            setOutputRegulation([...outputRegulation, currentReg.courses.join(", ")]);
            setNoteValue("");
        }
        setCurrentReg(defaultReg);
    };

    // Removes a regulation from the regulations array
    const handleRegTagCloseClick = (reg) => {
        setOutputRegulation(outputRegulation.filter((i) => i !== reg));
    };

    // updates current regulation
    const updateReg = (field) => (value, type) => {
        const newReg = {
            ...currentReg,
            type: type,
            [field]: value,
        };
        setCurrentReg(newReg);
    };

    const handleCourseChange = (event) => setCourseTextValue(event.target.value);
    const handleNoteChange = (event) => setNoteValue(event.target.value);

    // Adds course to the current regulation (down button)
    const handleCourseClick = () => {
        if (!courseTextValue) {
            return;
        }

        console.log(courseTextValue);
        updateReg("courses")([...currentReg.courses, courseTextValue], "POINTS");
        setCourseTextValue("");
    };

    // Removes a course tag
    const handleCourseTagCloseClick = (course) => {
        const currentRegsArray = currentReg.courses.filter((i) => i !== course);
        updateReg("courses")(currentRegsArray, "POINTS");
    };

    /** Toggle input between adding courses and a note
     * true: courses
     * false: notes
     */
    const [toggleInput, setToggleInput] = useState(true);
    const handleToggleChange = () => {
        setToggleInput(!toggleInput);
    };

    const handleAnd = () => {
        setOutputRegulation([...outputRegulation, "AND"]);
    };

    const handleOr = () => {
        setOutputRegulation([...outputRegulation, "OR"]);
    };

    const handleConfirm = () => {
        switch (title) {
            case "Prerequisites":
                updateCourse({
                    ...course,
                    prerequisites: outputRegulation,
                });
                break;
            case "InformalEquivalents":
                updateCourse({
                    ...course,
                    informalEquivalents: outputRegulation,
                });
                break;
            case "Corequisites":
                updateCourse({
                    ...course,
                    corequisites: outputRegulation,
                });
                break;
            case "Restrictions":
                updateCourse({
                    ...course,
                    restrictions: outputRegulation,
                });
                break;
            default:
                break;
        }
        handleClose();
    };

    const handleClose = () => {
        onClose();
        setCurrentReg(defaultReg);
        setNoteValue("");
        setCourseTextValue("");
    };

    const isAddDisabled =
        currentReg.courses.length === 0
            ? true
            : outputRegulation.length > 0 &&
              outputRegulation[outputRegulation.length - 1] !== "OR" &&
              outputRegulation[outputRegulation.length - 1] !== "AND";
    return (
        <>
            <Modal id="regulation-modal" isOpen={isOpen} onClose={handleClose} size="full">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add {title}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl as="fieldset">
                            <Flex align="center">
                                <Switch id="course-note-switch" m="2" onChange={handleToggleChange} isChecked={toggleInput} />
                                <FormLabel m="2">{toggleInput ? "Add course regulation" : "Add note"}</FormLabel>
                            </Flex>
                            {toggleInput ? (
                                <>
                                    <Flex m="2">
                                        <Input
                                            id="courses"
                                            placeholder="Courses"
                                            onChange={handleCourseChange}
                                            value={courseTextValue}
                                            onKeyPress={(ev) => {
                                                if (ev.key === "Enter") {
                                                    handleCourseClick();
                                                }
                                            }}
                                        />
                                        <IconButton
                                            aria-label="Add input"
                                            icon="arrow-down"
                                            onClick={handleCourseClick}
                                            isDisabled={!courseTextValue}
                                        />
                                    </Flex>
                                    <Flex m="2">
                                        <NumberInput
                                            size="lg"
                                            defaultValue={15}
                                            min={10}
                                            onChange={(value) => updateReg("points")(value, "POINTS")}
                                            value={currentReg.points}
                                            step={5}
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
                                            bg={currentReg.courses.length > 0 ? c.white : "gray.100"}
                                        >
                                            {currentReg.courses.map((course, idx) => (
                                                <Tag size="sm" key={idx} rounded="full" variant="solid" variantColor="cyan">
                                                    <TagLabel>{course}</TagLabel>
                                                    <TagCloseButton onClick={() => handleCourseTagCloseClick(course)} />
                                                </Tag>
                                            ))}
                                        </Stack>
                                        <IconButton
                                            aria-label="Add input"
                                            icon="add"
                                            isDisabled={isAddDisabled}
                                            data-tip
                                            data-for="addTooltip"
                                            onClick={() => handleAddToRegArrayClick("POINTS")}
                                        />
                                        <ReactTooltip id="addTooltip" place="top" effect="solid" disable={!isAddDisabled}>
                                            {addToolTip}
                                        </ReactTooltip>
                                    </Flex>
                                </>
                            ) : (
                                <Flex m="2">
                                    <Input
                                        id="text"
                                        placeholder="Note"
                                        value={noteValue}
                                        onChange={handleNoteChange}
                                        onKeyPress={(ev) => {
                                            const isD =
                                                !noteValue ||
                                                (outputRegulation.length > 0 &&
                                                    outputRegulation[outputRegulation.length - 1] !== "OR" &&
                                                    outputRegulation[outputRegulation.length - 1] !== "AND");
                                            if (ev.key === "Enter" && !isD) {
                                                handleAddToRegArrayClick("NOTE");
                                            }
                                        }}
                                    />
                                    <IconButton
                                        aria-label="Add input"
                                        icon="add"
                                        onClick={() => {
                                            handleAddToRegArrayClick("NOTE");
                                        }}
                                        isDisabled={
                                            !noteValue ||
                                            (outputRegulation.length > 0 &&
                                                outputRegulation[outputRegulation.length - 1] !== "OR" &&
                                                outputRegulation[outputRegulation.length - 1] !== "AND")
                                        }
                                    />
                                </Flex>
                            )}
                        </FormControl>

                        <ButtonGroup m="2" spacing={4}>
                            <Button
                                variantColor="teal"
                                variant="solid"
                                onClick={handleAnd}
                                isDisabled={
                                    outputRegulation.length <= 0 ||
                                    outputRegulation[outputRegulation.length - 1] === "OR" ||
                                    outputRegulation[outputRegulation.length - 1] === "AND"
                                }
                            >
                                AND
                            </Button>
                            <Button
                                variantColor="teal"
                                variant="solid"
                                onClick={handleOr}
                                isDisabled={
                                    outputRegulation.length <= 0 ||
                                    outputRegulation[outputRegulation.length - 1] === "OR" ||
                                    outputRegulation[outputRegulation.length - 1] === "AND"
                                }
                            >
                                OR
                            </Button>
                        </ButtonGroup>
                        <Stack
                            id="reg-stack"
                            spacing={4}
                            isInlineborderWidth="2px"
                            p={2}
                            h="60px"
                            m="2"
                            bg={c.whiteGrey}
                            overflowX="scroll"
                            flexWrap="wrap"
                        >
                            <Flex>
                                {outputRegulation.map((reg, i) => (
                                    <>
                                        <Tag size="sm" key={i} rounded="full" variant="solid">
                                            <TagLabel>{reg}</TagLabel>
                                            <TagCloseButton onClick={() => handleRegTagCloseClick(reg)} />
                                        </Tag>
                                    </>
                                ))}
                            </Flex>
                        </Stack>
                    </ModalBody>

                    <ModalFooter>
                        <Button variantColor="red" mr={3} onClick={handleClose}>
                            Close
                        </Button>
                        <Button variantColor="green" onClick={handleConfirm} isDisabled={outputRegulation.length <= 0}>
                            Confirm
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default RegulationModal;

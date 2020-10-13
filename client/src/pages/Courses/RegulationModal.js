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
import CreatableSelect from "react-select/creatable";
import ReactTooltip from "react-tooltip";
import { colors as c } from "../../colors";
import useCourses from "../Courses/useCourses";

const defaultReg = {
    type: "POINTS",
    points: 15,
    courses: [],
};

const customStyles = {
    option: (provided) => ({
        ...provided,
        backgroundColor: c.white,
        "&:hover": {
            backgroundColor: c.uoaBlue,
            color: c.white,
        },
        flex: 1,
    }),
    control: (provided) => ({
        width: "100%",
        backgroundColor: c.white,
        '[type="text"]': {
            color: c.black,
        },
        flex: 1,
        ...provided,
    }),
    container: (provided) => ({
        ...provided,
        flex: 1,
    }),
};

const RegulationModal = ({ isOpen, onClose, title, updateCourse, course, editReg }) => {
    const [currentReg, setCurrentReg] = useState(defaultReg);
    const [outputRegulation, setOutputRegulation] = useState([]);
    const [selectValue,setSelectValue] = useState([])

    // Text field
    const [noteValue, setNoteValue] = useState("");

    const addToolTip = "Please add an AND or OR statement before adding another course";

    const { data } = useCourses();

    useEffect(() => {
        if (editReg) {
            setOutputRegulation(editReg);
        }
    }, [editReg, isOpen]);

    // plus button
    const handleAddToRegArrayClick = (type) => {
        if (type === "POINTS") {
            setOutputRegulation([...outputRegulation, `${currentReg.points} points from ${currentReg.courses.join(", ")}`]);
            setSelectValue([])
        } else if (noteValue.length > 0 && type === "NOTE") {
            setOutputRegulation([...outputRegulation, currentReg.courses[0]]);
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

    const handleNoteChange = (event) => {
        setNoteValue(event.target.value);
        updateReg("courses")([event.target.value], "NOTE");
    };

    const handleSelectChange = (newValue, actionMeta) => {
        if (actionMeta.action === "select-option" || actionMeta.action === "create-option") { 
            const latestCourses = newValue.map((x) => x.label);
            setSelectValue(newValue)
            handleCourseSelect(latestCourses);
        }

        if (actionMeta.action === "pop-value" || actionMeta.action === "remove-value" || actionMeta.action === "clear") {
            if (newValue === null) {
                updateReg("courses")([], "POINTS");
                setSelectValue(newValue)
            } else {
                const latestCourses = newValue.map((x) => x.label);
                setSelectValue(newValue)
                handleCourseSelect(latestCourses);
            }
        }
    };

    // // Adds course to the current regulation (down button)
    const handleCourseSelect = (latestCourses) => {
        updateReg("courses")(latestCourses, "POINTS");
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
                        {/* Course/Note toggle */}
                        <FormControl as="fieldset">
                            <Flex align="center">
                                <FormLabel m="2" textAlign="center" px="0">
                                    Note
                                </FormLabel>
                                <Switch id="course-note-switch" color="#CBD5E0" onChange={handleToggleChange} isChecked={toggleInput} />
                                <FormLabel m="2" textAlign="center" px="0">
                                    Courses
                                </FormLabel>
                            </Flex>

                            {toggleInput ? (
                                <>
                                    {/* Courses input */}
                                    <Flex m="2" flex="1">
                                        <NumberInput
                                            size="md"
                                            defaultValue={15}
                                            min={10}
                                            height="40px"
                                            width="13%"
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
                                        <CreatableSelect
                                            isMulti
                                            onChange={handleSelectChange}
                                            options={data.map((course) => ({ value: course, label: course.courseCode }))}
                                            placeholder="Courses"
                                            formatCreateLabel={(userInput) => `Add Ghost Course: ${userInput}`}
                                            styles={customStyles}
                                            autoSize={true}
                                            value={selectValue}
                                        />
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
                                // Notes input
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

                        {/* AND/OR buttons */}
                        <Flex justify="flex-end">
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
                        </Flex>

                        {/* Final list of regulations */}
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

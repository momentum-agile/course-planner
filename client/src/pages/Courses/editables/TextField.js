import React from "react";
import { Flex, Box, Text, FormControl, FormLabel, Input, Textarea, Divider, Button, useToast, Tooltip, Icon } from "@chakra-ui/core";
import { colors as c } from "../../../colors";

const placeholders = {
    code: "e.g. SOFTENG 281",
    name: "e.g. Fundamentals of Software Engineering 1",
    description: "A longer description of the course",
};

const validCourseCodeRegex = /^([A-Za-z])*(\s?)([1-9][0-9][0-9])([A-Za-z]{0,3})$/;
const autoGenerateToolTip = "Enter a valid course code, e.g. SOFTENG 281, and click to get course data from the UoA API";

const TextField = ({ isRequired = false, name, title, value, isEditing, onChange, prefillCourse, setPrefill }) => {
    const toast = useToast();

    const isValidCourseCode = validCourseCodeRegex.test(value);

    const handlePrefill = () => {
        const courseCodeArr = value.split(/(\d+)/).filter((e) => e !== "");
        const subject = courseCodeArr[0];
        const courseCode = courseCodeArr.length === 2 ? courseCodeArr[1] : `${courseCodeArr[1]}${courseCodeArr[2]}`;

        const toastBase = {
            title: `Error 404 Course Code Not Found`,
            status: "error",
            duration: 9000,
            isClosable: true,
        };

        prefillCourse(subject.trim(), courseCode.trim())
            .then((res) => setPrefill(res))
            .then(() =>
                toast({
                    isClosable: true,
                    title: "Course Auto-Filled",
                    description: `Successfully auto-filled info for ${value}`,
                    status: "success",
                }),
            )
            .catch(() => toast({ ...toastBase, description: `Course Code: ${value} could not be found on the UoA API` }));
    };

    return !isEditing ? (
        <Box>
            {name === "code" ? (
                <Flex justify="center" pt="10px" pb="3px">
                    <Text fontSize="25px" color={c.white} bg={c.teal} p="8px" borderRadius="20px">
                        {value}
                    </Text>
                </Flex>
            ) : (
                <Box>
                    <Text color={c.darkBlue} fontWeight="bold">
                        {title[0].toUpperCase() + title.substring(1)}
                    </Text>
                    <Text p="8px">{value}</Text>
                </Box>
            )}

            <Divider borderColor={c.grey} />
        </Box>
    ) : (
        <FormControl isRequired={isRequired} pt="4px">
            <FormLabel color={c.darkBlue} fontWeight="bold">
                {title[0].toUpperCase() + title.substring(1)}
            </FormLabel>

            <Flex>
                {name === "desc" ? (
                    <Textarea
                        overflowWrap="break-word"
                        placeholder={placeholders[title]}
                        value={value}
                        onChange={(e) => onChange(name, e.target.value)}
                        maxWidth={name === "code" ? "50%" : null}
                    />
                ) : (
                    <Input
                        overflowWrap="break-word"
                        placeholder={placeholders[title]}
                        value={value}
                        onChange={(e) => onChange(name, e.target.value)}
                        maxWidth={name === "code" ? "50%" : null}
                    />
                )}

                {name === "code" && (
                    <Flex>
                        <Button
                            isDisabled={!value || !isValidCourseCode}
                            onClick={handlePrefill}
                            ml="10px"
                            bg={c.midnightBlue}
                            color={c.whiteGrey}
                            _hover={{ bg: !value || !isValidCourseCode ? null : c.lightBlue }}
                        >
                            Update from UoA API
                        </Button>
                        <Flex ml="4px">
                            <Tooltip hasArrow label={autoGenerateToolTip} bg={c.lightGrey} color={c.midnightBlue} placement="bottom">
                                <Icon name="question-outline" color={c.midnightBlue} />
                            </Tooltip>
                        </Flex>
                    </Flex>
                )}
            </Flex>
        </FormControl>
    );
};

export default TextField;

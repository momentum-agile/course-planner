import React from "react";
import { useDrag } from "react-dnd";
import { Box, Flex, Text } from "@chakra-ui/core";
import { ItemTypes } from "./ItemTypes";
import { colors as c } from "../../colors";

const CoursePill = ({ courseName, isPlaceholder }) => {
    const [{ isDragging }, drag] = useDrag({
        item: { isPlaceholder, courseName, type: ItemTypes.COURSE_PILL },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const opacity = isDragging ? 0.4 : 1;

    return (
        <Box flex="0 0 100%" borderRadius="10px" borderRight="solid white" maxWidth="50%" marginTop="10px" style={{ opacity }}>
            <Flex
                p={2}
                cursor="pointer"
                width="90%"
                backgroundColor={isPlaceholder ? c.uoaBlue : c.midnightBlue}
                borderRadius="8px"
                ref={drag}
            >
                <Text flex="1" textAlign="center" fontSize="xs" color={c.greyBlue} as="b">
                    {courseName}
                </Text>
            </Flex>
        </Box>
    );
};

export default CoursePill;

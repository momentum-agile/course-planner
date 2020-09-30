import React from "react";
import { useDrag } from "react-dnd";
import { Box, Flex, Text } from "@chakra-ui/core";
import { ItemTypes } from "./ItemTypes";
import { colors as c } from "../../colors";

const CoursePill = ({ courseName }) => {
    const [{ isDragging }, drag] = useDrag({
        item: { courseName, type: ItemTypes.COURSE_PILL },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const opacity = isDragging ? 0.4 : 1;

    return (
        <Box flex="0 0 100%" borderRadius="10px" borderRight="solid white" maxWidth="33%" marginTop="10px" style={{ opacity }}>
            <Flex p={2} cursor="pointer" width="90%" backgroundColor={c.midnightBlue} borderRadius="8px" ref={drag}>
                <Text flex="1" textAlign="center" fontSize="xs" color={c.greyBlue} as="b">
                    {!isNaN(courseName) ? "Placeholder" : courseName}
                </Text>
            </Flex>
        </Box>
    );
};

export default CoursePill;

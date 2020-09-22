import React from "react";
import { useDrag } from "react-dnd";
import { Box, Text } from "@chakra-ui/core";
import { ItemTypes } from "./ItemTypes";

const CoursePill = ({ courseName }) => {
    const [{ isDragging }, drag] = useDrag({
        item: { courseName, type: ItemTypes.COURSE_PILL },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const opacity = isDragging ? 0.4 : 1;

    return (
        <Box
            flex="1 1 25%"
            height="100%"
            background="gray"
            borderRadius="10px"
            borderRight="solid white"
            maxWidth="25%"
            marginTop="10px"
            ref={drag}
            style={{ opacity }}
            cursor="pointer"
        >
            <Text textAlign="center" color="white">
                {courseName}
            </Text>
        </Box>
    );
};

export default CoursePill;

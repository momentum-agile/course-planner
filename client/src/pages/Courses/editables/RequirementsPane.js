import React from "react";
import { Flex } from "@chakra-ui/core";
import { colors as c } from "../../../colors";
import RegulationTable from "./RegulationTable";

const RequirementsPane = ({ course, updateCourse }) => {
    return (
        <Flex width="100%" direction="column" margin="5px" padding="10px" borderRadius="5px" bg={c.lightGrey} boxShadow="md">
            <RegulationTable name="Prerequisites" updateCourse={updateCourse} course={course} regulationType={course.prerequisites} />
            <RegulationTable name="Corequisites" updateCourse={updateCourse} course={course} regulationType={course.corequisites} />
            <RegulationTable name="Restrictions" updateCourse={updateCourse} course={course} regulationType={course.restrictions} />
            <RegulationTable
                name="InformalEquivalents"
                updateCourse={updateCourse}
                course={course}
                regulationType={course.informalEquivalents}
            />
        </Flex>
    )
}

export default RequirementsPane;
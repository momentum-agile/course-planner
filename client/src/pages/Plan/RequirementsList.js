import React from 'react';
import { Flex } from '@chakra-ui/core';
import RequirementsListItem from './RequirementListItem'

const RequirementsList = ({ programme }) => {
    // const regulations = programme.regulations;

    // TODO: Add requirement 'cards' similar to the programmes page

    return (
        <Flex
            direction="column"
            width="80%"
            padding="0 0 10px 10px"
            background="#FFF"
            marginTop="20px"
            maxHeight="200px"
            overflowY="scroll"
        >
            {programme.regulations.map((reg, i) => (
                <RequirementsListItem
                    key={i}
                    index={i}
                    prefix={reg.pointRequirement}
                    points={reg.points}
                    courses={reg.courses}
                    isSatisfied={reg.isSatisfied} />
            ))}
        </Flex>
    );

}

export default RequirementsList;
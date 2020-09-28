import React, { useEffect, useState } from "react";
import { Flex, Text } from "@chakra-ui/core";
import { colors as c } from "../../colors";
import { InlineEdit } from "../../components";
import formatDistance from "date-fns/formatDistance";

const Header = ({ name, programme, lastSaveDate, planName, setPlanName }) => {
    const [editPlanName, setEditPlanName] = useState(planName);
    const [timeNow, setTimeNow] = useState(new Date());

    useEffect(() => {
        setEditPlanName(planName);
        const interval = setInterval(() => {
            setTimeNow(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, [planName]);

    return (
        <Flex direction="row" p={4} justifyContent="space-around">
            {name && (
                <Flex direction="column">
                    <Flex align="center" justify="center">
                        <Text color={c.uoaBlue} fontSize="xl">
                            Student
                        </Text>
                    </Flex>
                    <Flex
                        minWidth="100%"
                        height="50px"
                        backgroundColor={c.uoaBlue}
                        borderRadius="10px"
                        align="center"
                        justify="center"
                        p={5}
                        marginTop={2}
                    >
                        <Text textAlign="center" color={c.white} fontSize="xl">
                            {name}
                        </Text>
                    </Flex>
                </Flex>
            )}

            {name && (
                <Flex align="center" justify="center" direction={"column"}>
                    <InlineEdit
                        title="Plan name"
                        value={editPlanName}
                        onSubmit={() => setPlanName(editPlanName)}
                        onChange={(e) => setEditPlanName(e)}
                    />
                    <Text>
                        {" "}
                        Last saved{" "}
                        {formatDistance(lastSaveDate, timeNow, {
                            addSuffix: true,
                            includeSeconds: true,
                        })}
                    </Text>
                </Flex>
            )}

            <Flex direction="column">
                <Flex align="center" justify="center">
                    <Text color={c.uoaBlue} fontSize="xl">
                        Program
                    </Text>
                </Flex>
                <Flex
                    minWidth="100%"
                    height="50px"
                    backgroundColor={c.uoaBlue}
                    borderRadius="10px"
                    align="center"
                    justify="center"
                    p={5}
                    marginTop={2}
                >
                    <Text textAlign="center" color={c.white} fontSize="xl">
                        {programme}
                    </Text>
                </Flex>
            </Flex>
            {!name && (
                <Text color={c.uoaBlue} fontSize="5xl" fontWeight="bold">
                    Default Plan
                </Text>
            )}
        </Flex>
    );
};

export default Header;

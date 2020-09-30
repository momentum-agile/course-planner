import React, { useEffect, useState } from "react";
import { Flex, IconButton, Input, Text } from "@chakra-ui/core";
import { colors as c } from "../../colors";
import formatDistance from "date-fns/formatDistance";

const Header = ({ name, programme, lastSaveDate, planName, setPlanName, optionsMenu, isEdited, setIsEdited, exportMenu }) => {
    const [editPlanName, setEditPlanName] = useState(planName);
    const [timeNow, setTimeNow] = useState(new Date());

    useEffect(() => {
        setEditPlanName(planName);
        const interval = setInterval(() => {
            setTimeNow(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, [planName]);

    const cancelEdit = () => {
        setEditPlanName(name);
        setIsEdited(false);
    };

    const saveEdit = () => {
        setPlanName(editPlanName);
        setIsEdited(false);
    };

    return (
        <Flex direction="row" p={4}>
            {name && (
                <Flex align="center" justify="center" direction={"column"} width="100%">
                    {isEdited ? (
                        <Flex width="100%" direction="row" justify="center" align="center" mb={1}>
                            <Input
                                variant="flushed"
                                placeholder="Plan Name"
                                textAlign="center"
                                width="70%"
                                size="lg"
                                value={editPlanName}
                                onChange={(event) => setEditPlanName(event.target.value)}
                                mb={2}
                            />
                            <Flex direction="column" ml={5}>
                                <IconButton icon="check" size="xs" mb={1} onClick={saveEdit} zIndex="2" />
                                <IconButton icon="close" size="xs" onClick={cancelEdit} zIndex="2" />
                            </Flex>
                        </Flex>
                    ) : (
                        <Text fontSize="lg" color={c.lightMidnightBlue} as="b">
                            {planName}
                        </Text>
                    )}

                    {/* Student & Programme Tags */}
                    <Flex direction="row" width="80%" justify="center">
                        {name && (
                            <Flex direction="column">
                                <Flex
                                    height="50px"
                                    backgroundColor={c.lightBlue}
                                    borderRadius="10px"
                                    align="center"
                                    justify="center"
                                    p={5}
                                    mt={2}
                                    mr={10}
                                >
                                    <Text textAlign="center" color={c.white} fontSize="xl">
                                        {name}
                                    </Text>
                                </Flex>
                            </Flex>
                        )}

                        <Flex height="50px" backgroundColor={c.lightBlue} borderRadius="10px" align="center" justify="center" p={5} mt={2}>
                            <Text textAlign="center" color={c.white} fontSize="xl">
                                {programme}
                            </Text>
                        </Flex>
                    </Flex>
                </Flex>
            )}

            <Flex direction="column" justify="space-between" height="100%" width="15%" align="flex-end" position="fixed" right={5}>
                <Flex direction="row" justify="center">
                    <Flex mr={1}>{exportMenu}</Flex>
                    {optionsMenu}
                </Flex>

                <Text justify="center" height="100%" textAlign="right" mt={20} color={c.grey} fontSize="sm">
                    {" "}
                    Last saved{" "}
                    {formatDistance(lastSaveDate, timeNow, {
                        addSuffix: true,
                        includeSeconds: true,
                    })}
                    .
                </Text>
            </Flex>

            {!name && (
                <Flex align="center" justify="center" direction={"column"} width="100%">
                    <Text fontSize="lg" color={c.lightMidnightBlue} as="b">
                        Default Plan Template
                    </Text>
                    <Flex height="50px" backgroundColor={c.lightBlue} borderRadius="10px" align="center" justify="center" p={5} mt={2}>
                        <Text textAlign="center" color={c.white} fontSize="xl">
                            {programme}
                        </Text>
                    </Flex>
                </Flex>
            )}
        </Flex>
    );
};

export default Header;

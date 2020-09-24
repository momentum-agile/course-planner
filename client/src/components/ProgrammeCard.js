import React from "react";
import { Text, Button, Icon } from "@chakra-ui/core";
import { Link } from "react-router-dom";
import { colors as c } from "../colors";

const ProgrammeCard = ({ currentID, programme, to }) => {
    return (
        <Link to={`/programmes/${to}`} style={{ textDecoration: "none" }}>
            {programme ? (
                <Button
                    backgroundColor={programme._id !== currentID ? c.white : c.lightBlue}
                    border="none"
                    rounded="20px"
                    width="300px"
                    height="150px"
                    marginTop="20px"
                    _hover={{ bg: c.whiteGrey, transform: "scale(1.05, 1.05)" }}
                    _active={{}}
                    _focus={{ bg: c.lightBlue }}
                >
                    <Text textAlign="center" fontSize="2xl" color={programme._id !== currentID ? c.black : c.white}>
                        {programme.name}
                    </Text>
                </Button>
            ) : (
                <Button
                    backgroundColor={(!programme && c.nightBlue) || c.lightBlue}
                    border="none"
                    rounded="20px"
                    width="300px"
                    height="150px"
                    marginTop="20px"
                    // TODO (Dins & Vee): change highlight color
                    _hover={{ transform: "scale(1.05, 1.05)" }}
                    _active={{}}
                    _focus={{ bg: c.lightBlue }}
                >
                    <Text textAlign="center" fontSize="2xl" color={c.white}>
                        <Icon name="add" color={c.white} />
                    </Text>
                </Button>
            )}
        </Link>
    );
};

export default ProgrammeCard;

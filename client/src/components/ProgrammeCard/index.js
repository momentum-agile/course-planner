import React from "react";
import { Text, Button, Icon } from "@chakra-ui/core";
import { Link } from "react-router-dom";

const ProgrammeCard = ({ programme, to }) => {
    return (
        <Link to={`/programmes/${to}`} style={{ textDecoration: "none" }}>
            {programme ? (
                <Button
                    backgroundColor="#FFFFFF"
                    border="none"
                    rounded="20px"
                    width="300px"
                    height="150px"
                    marginTop="20px"
                    _hover={{ bg: "#E2E2E2" }}
                    _active={{}}
                    _focus={{ bg: "#0F487E", color: "#F2F2F2" }}
                >
                    <Text textAlign="center" fontSize="2xl" color="#000000">
                        {programme.name}
                    </Text>
                </Button>
            ) : (
                <Button
                    backgroundColor="#404040"
                    border="none"
                    rounded="20px"
                    width="300px"
                    height="150px"
                    marginTop="20px"
                    _hover={{ bg: "#555555" }}
                    _active={{}}
                >
                    <Text textAlign="center" fontSize="2xl" color="#FFFFFF">
                        <Icon name="add" color="gray.300" />
                    </Text>
                </Button>
            )}
        </Link>
    );
};

export default ProgrammeCard;

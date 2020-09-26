import React from "react";
import { Text, Button, Flex } from "@chakra-ui/core";
import { Link, useLocation } from "react-router-dom";
import { colors as c } from "../colors";

const OutlineButton = ({ text, to, width, height, onClick }) => {
    const location = useLocation();

    return (
        <Link to={to || location.pathname}>
            <Button
                backgroundColor={c.white}
                borderLeft={`2px solid ${c.greyBlue}`}
                rounded="0px"
                width={width}
                height={height || "60px"}
                marginTop="50px"
                onClick={onClick}
                color={c.uoaBlue}
                _hover={{
                    borderLeft: `5px solid ${c.gold}`,
                }}
            >
                <Flex justify="center" align="center">
                    <Text textAlign="center" fontSize="3xl">
                        {text}
                    </Text>
                </Flex>
            </Button>
        </Link>
    );
};

export default OutlineButton;

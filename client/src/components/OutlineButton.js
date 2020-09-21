import React from "react";
import { Text, Button } from "@chakra-ui/core";
import { Link, useLocation } from "react-router-dom";
import { colors as c } from "../colors";

const OutlineButton = ({ text, to, width, height, onClick }) => {
    const location = useLocation();

    return (
        <Link to={to || location.pathname}>
            <Button
                backgroundColor={c.whiteGrey}
                border={`2px solid ${c.uoaBlue}`}
                rounded="35px"
                width={width || "320px"}
                height={height || "90px"}
                marginTop="50px"
                onClick={onClick}
            >
                <Text textAlign="center" fontSize="2xl" color={c.uoaBlue}>
                    {text}
                </Text>
            </Button>
        </Link>
    );
};

export default OutlineButton;

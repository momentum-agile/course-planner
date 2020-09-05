import React from "react";
import { Text, Button } from "@chakra-ui/core";
import { Link, useLocation } from "react-router-dom";

const OutlineButton = ({ text, to, width, height, onClick }) => {
    const location = useLocation();

    return (
        <Link to={to || location.pathname}>
            <Button
                backgroundColor="#F0F0F0"
                border="2px solid #122776"
                rounded="35px"
                width={width || "320px"}
                height={height || "90px"}
                marginTop="50px"
                onClick={onClick}
            >
                <Text textAlign="center" fontSize="2xl" color="#113F73">
                    {text}
                </Text>
            </Button>
        </Link>
    );
};

export default OutlineButton;

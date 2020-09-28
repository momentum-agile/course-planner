import React from "react";
import { Flex, Input, InputGroup, InputLeftElement, Icon } from "@chakra-ui/core";
import { colors as c } from "../colors";

const placeholders = {
    Courses: "Search by Course Code, Name, Semester or Points",
    Students: "Search for Students",
    Populate: "Search by Course Code",
};

const SearchBar = ({ searchCategory, onChange, value, width }) => {
    // If no searchCategory is provided, placeholder will just say "Search"
    const placeholderText = placeholders[searchCategory] || "";

    return (
        <Flex height="40px" width="100%" direction="row" justify="center" marginTop="10px">
            <Flex width={width || "90%"} backgroundColor={c.lightGrey} align="center" rounded="md">
                <Flex width="100%" justify="center" align="center">
                    <InputGroup zIndex={0} width="100%">
                        <InputLeftElement children={<Icon name="search" color="gray.300" />} />
                        <Input type="search" placeholder={placeholderText} onChange={onChange} value={value} />
                    </InputGroup>
                </Flex>
            </Flex>
        </Flex>
    );
};

export default SearchBar;

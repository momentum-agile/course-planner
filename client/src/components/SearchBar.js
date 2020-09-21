import React from "react";
import { Flex, Input, InputGroup, InputLeftElement, Icon } from "@chakra-ui/core";
import { colors as c } from "../colors";

const SearchBar = ({ searchCategory, onChange, value }) => {
    // If no searchCategory is provided, placeholder will just say "Search"
    const placeholderText = `Search ${searchCategory || ""}`;

    return (
        <Flex height="40px" width="100%" direction="row" justify="center" marginTop="10px">
            <Flex width="80%" backgroundColor={c.lightGrey} align="center">
                <Flex width="100%" justify="center" align="center">
                    <InputGroup width="100%">
                        <InputLeftElement children={<Icon name="search" color="gray.300" />} />
                        <Input type="search" placeholder={placeholderText} onChange={onChange} value={value} />
                    </InputGroup>
                </Flex>
            </Flex>
        </Flex>
    );
};

export default SearchBar;

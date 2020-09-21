import React, { useState, useEffect } from "react";
import { Flex, Input, Select } from "@chakra-ui/core";
import { colors as c } from "../colors";

const SearchSelect = ({ data, onChange }) => {
    const [values, setValues] = useState([]);
    const handleChangeInput = (value) => {
        setValues(data.filter((obj) => obj.courseCode.includes(value)));
    };

    useEffect(() => {
        setValues(data);
    }, [data]);

    return (
        <Flex height="40px" width="200px">
            <Select
                position="absolute"
                height="40px"
                placeholder="select courses"
                bg={c.darkGrey}
                width="200px"
                onChange={(e) => onChange(e)}
                borderColor={c.darkGrey}
            >
                {values.map((obj, index) => (
                    <option key={index} value={obj._id}>
                        {obj.courseCode}
                    </option>
                ))}
            </Select>
            <Input
                bg={c.darkGrey}
                height="40px"
                width="165px"
                type="search"
                position="relative"
                borderColor={c.darkGrey}
                onChange={(e) => handleChangeInput(e.target.value)}
                placeholder="Add courses"
                zIndex={1}
            />
        </Flex>
    );
};

export default SearchSelect;

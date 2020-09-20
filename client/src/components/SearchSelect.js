import React, { useState, useEffect } from "react";
import { Flex, Input, Select } from "@chakra-ui/core";

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
                bg="#303030"
                width="200px"
                onChange={(e) => onChange(e)}
                borderColor="#303030"
            >
                {values.map((obj, index) => (
                    <option key={index} value={obj._id}>
                        {obj.courseCode}
                    </option>
                ))}
            </Select>
            <Input
                bg="#303030"
                height="40px"
                width="165px"
                type="search"
                position="relative"
                borderColor="#303030"
                onChange={(e) => handleChangeInput(e.target.value)}
                placeholder="Add courses"
                zIndex={1}
            />
        </Flex>
    );
};

export default SearchSelect;

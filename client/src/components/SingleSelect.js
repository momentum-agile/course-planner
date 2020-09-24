import React, { useState } from "react";
import Select from "react-select";
import { colors as c } from "../colors";

const customStyles = {
    option: (provided) => ({
        ...provided,
        backgroundColor: c.white,
        "&:hover": {
            backgroundColor: c.uoaBlue,
            color: c.white,
        },
    }),
    control: (provided) => ({
        width: "100px",
        backgroundColor: c.white,
        '[type="text"]': {
            color: c.black,
        },
        ...provided,
    }),
    input: (provided) => ({
        ...provided,
        color: c.black,
    }),
    menuList: (provided) => ({
        ...provided,
        width: "150px",
        textAlign: "left",
        paddingTop: 0,
        paddingBottom: 0,
    }),
};

const SingleSelect = ({ onChange, data, placeholder }) => {
    const [selectValue, setSelectValue] = useState("");
    return (
        <Select
            styles={customStyles}
            placeholder={placeholder}
            onChange={(option) => {
                onChange(option.value);
                setSelectValue("");
            }}
            value={selectValue}
            options={data}
            width="20%"
            minHeight="20px"
        />
    );
};

export default SingleSelect;

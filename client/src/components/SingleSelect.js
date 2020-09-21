import React, { useState } from "react";
import Select from "react-select";
import { colors as c } from "../colors";

const customStyles = {
    option: (provided) => ({
        ...provided,
        backgroundColor: c.darkGrey,
        "&:hover": {
            backgroundColor: c.uoaBlue,
        },
    }),
    control: (provided) => ({
        ...provided,
        height: "40px",
        width: "200px",
        backgroundColor: c.darkGrey,
        '[type="text"]': {
            color: c.white,
        },
    }),
    input: (provided) => ({
        ...provided,
        color: c.white,
    }),
    menuList: (provided) => ({
        ...provided,
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
        />
    );
};

export default SingleSelect;

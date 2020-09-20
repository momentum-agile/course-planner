import React, { useState } from "react";
import Select from "react-select";

const customStyles = {
    option: (provided) => ({
        ...provided,
        backgroundColor: "#303030",
        "&:hover": {
            backgroundColor: "#434343",
        },
    }),
    control: (provided) => ({
        ...provided,
        height: "40px",
        width: "200px",
        backgroundColor: "#303030",
        '[type="text"]': {
            color: "white",
        },
    }),
    input: (provided) => ({
        ...provided,
        color: "white",
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

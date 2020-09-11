import React from "react";
import { useTable } from "react-table";
import { Box, Text } from "@chakra-ui/core";

const ProgrammeTable = ({ columns, data }) => {
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
        columns,
        data,
    });

    if (rows.length === 0) {
        return (
            // Make a nice error component :(
            <p> No Courses Found</p>
        );
    }

    return (
        <Box maxHeight="80vh" overflowY="scroll" width="100%" marginTop="20px">
            <Box as="table" border={1} width="100%" borderStyle="solid" borderSpacing="0 20px" {...getTableProps()}>
                <Box as="thead">
                    {headerGroups.map((headerGroup) => (
                        <Box as="tr" {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <Box
                                    as="th"
                                    m={0}
                                    p="0.5rem"
                                    borderBottomColor="#122776"
                                    borderBottom={1}
                                    borderBottomStyle="solid"
                                    {...column.getHeaderProps()}
                                >
                                    <Text textAlign="center" fontSize="m" color="black">
                                        {column.render("Header")}
                                    </Text>
                                </Box>
                            ))}
                        </Box>
                    ))}
                </Box>
                <Box as="tbody" {...getTableBodyProps()}>
                    {rows.map((row, i) => {
                        prepareRow(row);
                        return (
                            <Box as="tr" {...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                    return (
                                        <Box
                                            as="td"
                                            m={0}
                                            p="0.5rem"
                                            borderBottomColor="#122776"
                                            borderBottom={1}
                                            borderBottomStyle="solid"
                                            backgroundColor="#2A2A2A"
                                            {...cell.getCellProps()}
                                        >
                                            <Text textAlign="center" fontSize="l" color={"white"}>
                                                {cell.render("Cell")}
                                            </Text>
                                        </Box>
                                    );
                                })}
                            </Box>
                        );
                    })}
                </Box>
            </Box>
        </Box>
    );
};

export default ProgrammeTable;

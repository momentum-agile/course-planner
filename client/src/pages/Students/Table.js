import React, { useEffect } from "react";
import { useTable, useGlobalFilter } from "react-table";
import { Box, Text } from "@chakra-ui/core";

const Table = ({ columns, data, getRowProps = () => ({}), currRow, searchInput }) => {
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, setGlobalFilter } = useTable(
        {
            columns,
            data,
        },
        useGlobalFilter,
    );

    useEffect(() => {
        setGlobalFilter(searchInput);
    }, [searchInput, setGlobalFilter]);

    if (rows.length === 0) {
        return (
            // Make a nice error component :(
            <p> No Courses Found</p>
        );
    }

    return (
        <Box maxHeight="80vh" overflowY="scroll" width="100%">
            <Box as="table" border={1} width="100%" borderStyle="solid" borderSpacing={0} {...getTableProps()}>
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
                                    <Text textAlign="center" fontSize="m" color="#9F9F9F">
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
                            <Box as="tr" {...row.getRowProps(getRowProps(row))}>
                                {row.cells.map((cell) => {
                                    return (
                                        <Box
                                            as="td"
                                            m={0}
                                            p="0.5rem"
                                            borderBottomColor="#122776"
                                            borderBottom={1}
                                            borderBottomStyle="solid"
                                            {...cell.getCellProps()}
                                        >
                                            <Text textAlign="center" fontSize="2xl" color={row.id !== currRow ? "#113F73" : "white"}>
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

export default Table;

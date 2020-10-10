import React, { useEffect, useRef, useState } from "react";
import { useTable, useGlobalFilter, useSortBy } from "react-table";
import { PseudoBox, Box, Text } from "@chakra-ui/core";
import { colors as c } from "../colors";

const Table = ({ columns, data, getRowProps = () => ({}), currRow, searchInput, rowHover }) => {
    const [dataLength, setDataLength] = useState(null);
    const endRef = useRef(null);

    useEffect(() => {
        endRef && endRef.current && endRef.current.scrollIntoView({ behavior: "smooth" });
        setDataLength(data.length);
    }, [data, dataLength]);

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, setGlobalFilter } = useTable(
        {
            columns,
            data,
        },
        useGlobalFilter,
        useSortBy,
    );

    useEffect(() => {
        setGlobalFilter(searchInput);
    }, [searchInput, setGlobalFilter]);

    return (
        <Box height="75vh" overflowY="scroll" width="100%" className="table">
            <Box as="table" width="100%" {...getTableProps()}>
                <Box as="thead">
                    {headerGroups.map((headerGroup, idx) => (
                        <TableHeader key={idx} headerGroup={headerGroup} />
                    ))}
                </Box>

                <Box as="tbody" {...getTableBodyProps()}>
                    {rows.map((row, idx) => {
                        prepareRow(row);
                        return (
                            <TableRow
                                ref={row.id === currRow ? endRef : null}
                                key={idx}
                                row={row}
                                currRow={currRow}
                                getRowProps={getRowProps}
                                rowHover={rowHover}
                            />
                        );
                    })}
                </Box>
            </Box>

            {rows.length === 0 && (
                <Box align="center" justify="center" width="100%" mt="20%">
                    <Text fontStyle="italic" color={c.white} textAlign="center">
                        No data found
                    </Text>
                </Box>
            )}
        </Box>
    );
};

const TableHeader = ({ headerGroup }) => {
    return (
        <Box as="tr" {...headerGroup.getHeaderGroupProps()} color={c.lightBlue}>
            {headerGroup.headers.map((column) => (
                <Box as="th" m={0} p="0.5rem" {...column.getHeaderProps(column.getSortByToggleProps())}>
                    <Text textAlign="left">
                        {`${column.render("Header")} ${column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}`}
                    </Text>
                </Box>
            ))}
        </Box>
    );
};
const TableRow = React.forwardRef(({ row, getRowProps, rowHover }, ref) => (
    <PseudoBox as="tr" ref={ref} {...row.getRowProps(getRowProps(row))} _hover={rowHover}>
        {row.cells.map((cell) => {
            return (
                <Box as="td" m={0} p="0.5rem" {...cell.getCellProps()}>
                    <Text>{cell.render("Cell")}</Text>
                </Box>
            );
        })}
    </PseudoBox>
));

export default Table;

import {
    chakra,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
} from '@chakra-ui/react';
import { TriangleDownIcon, TriangleUpIcon, UpDownIcon } from '@chakra-ui/icons';
import {
    Cell,
    Column,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    Header,
    Row,
    SortingState,
    useReactTable,
} from '@tanstack/react-table';
import React from 'react';

const defaultPropGetter = () => ({});

export function SortableTable({
    columns,
    data,
    getHeaderProps = defaultPropGetter,
    getColumnProps = defaultPropGetter,
    getRowProps = defaultPropGetter,
    getCellProps = defaultPropGetter,
}: {
    columns: any;
    data: any;
    getHeaderProps?: (header: Header<any, any>) => any;
    getColumnProps?: (column: Column<any>) => any;
    getRowProps?: (row: Row<any>) => any;
    getCellProps?: (cell: Cell<any, any>) => any;
}) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const table = useReactTable({
        columns,
        data,
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        state: {
            sorting,
        },
    });

    return (
        <TableContainer>
            <Table>
                <Thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <Tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                const meta: any = header.column.columnDef.meta;
                                return (
                                    <Th
                                        key={header.id}
                                        onClick={header.column.getToggleSortingHandler()}
                                        isNumeric={meta?.isNumeric}
                                        {...getHeaderProps(header)}
                                        role={'button'}
                                    >
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}

                                        <chakra.span pl='4'>
                                            {header.column.getIsSorted() ? (
                                                header.column.getIsSorted() ===
                                                'desc' ? (
                                                    <TriangleDownIcon aria-label='sorted descending' />
                                                ) : (
                                                    <TriangleUpIcon aria-label='sorted ascending' />
                                                )
                                            ) : (
                                                <UpDownIcon />
                                            )}
                                        </chakra.span>
                                    </Th>
                                );
                            })}
                        </Tr>
                    ))}
                </Thead>
                <Tbody>
                    {table.getRowModel().rows.map((row) => (
                        <Tr
                            key={row.id}
                            {...getRowProps(row)}
                            role={
                                getRowProps(row).onClick !== undefined
                                    ? 'button'
                                    : undefined
                            }
                        >
                            {row.getVisibleCells().map((cell) => {
                                const meta: any = cell.column.columnDef.meta;
                                return (
                                    <Td
                                        key={cell.id}
                                        isNumeric={meta?.isNumeric}
                                        {...getCellProps(cell)}
                                        {...getColumnProps(cell.column)}
                                    >
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </Td>
                                );
                            })}
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
    );
}

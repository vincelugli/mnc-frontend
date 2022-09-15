import { useQuery } from "@tanstack/react-query";
import React from "react"
import { useSortBy, useTable } from "react-table";
import { fetchPlayers, fetchStats } from "../services/dataService";
import { Player } from "../types/domain/Player";
import { MmrData } from "../types/service/MmrData";

function Table({ columns, data }: {columns: any, data: any}) {
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
    } = useTable(
      {
        columns,
        data,
      },
      useSortBy
    )
  
    // We don't want to render all 2000 rows for this example, so cap
    // it at 20 for this use case
    const firstPageRows = rows; //.slice(0, 20)
  
    return (
      <>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {
                  // https://github.com/TanStack/table/issues/1481
                }
                {headerGroup.headers.map((column:any) => (
                  // Add the sorting props to control sorting. For this example
                  // we can add them into the header props
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render('Header')}
                    {/* Add a sort direction indicator */}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? ' 🔽'
                          : ' 🔼'
                        : ''}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {firstPageRows.map(
              (row, i) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map(cell => {
                      return (
                        <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                      )
                    })}
                  </tr>
                )}
            )}
          </tbody>
        </table>
        <br />
        <div>Showing the first 20 results of {rows.length} rows</div>
      </>
    )
  }

export const PlayerOverview = React.memo(function PlayerOverview() {
  const columns = React.useMemo(() => [{Header: 'Name', accessor: 'name'}, {Header: 'MMR', accessor: "mmr"}],[]);
      const { isLoading, error, data } = useQuery<MmrData, Error, Player[]>(
        ["mmr"],
        fetchPlayers,
        {
          select: (data) => {
            const players = Object.entries(data.mmr).map(
              (kvPair) =>
                ({
                  name: kvPair[0],
                  mmr: kvPair[1],
                } as Player)
            );
            return players;
          },
        }
      );

    return <div style={{marginTop: 100, marginLeft: 100}}><Table columns={columns} data={data} /></div>;

});
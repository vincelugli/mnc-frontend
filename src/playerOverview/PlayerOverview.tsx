import React, { useCallback, useState } from "react"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSortBy, useTable } from "react-table";
import { statsSelector } from "../redux/statsSelectors";
import { Player } from "../types/domain/Player";

import "./PlayerOverview.css";

const defaultPropGetter = () => ({})

function Table({
    columns,
    data,
    getHeaderProps = defaultPropGetter,
    getColumnProps = defaultPropGetter,
    getRowProps = defaultPropGetter,
    getCellProps = defaultPropGetter,
  } : {
    columns: any,
    data: any,
    getHeaderProps?: any,
    getColumnProps?: any,
    getRowProps?: any,
    getCellProps: any;
  }) {
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
                  <th

                    {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      //justifyContent: "space-between",
                      marginRight: "8px",
                      marginLeft: "8px",
                      }}>
                    {column.render('Header')}
                    {/* Add a sort direction indicator */}
                    <span style={{marginLeft: "8px"}}>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? ' 🔽'
                          : ' 🔼'
                        : ' 🟦'}
                    </span>
                    </div>

                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map(
              (row, i) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps(getRowProps(row))}>
                    {row.cells.map(cell => {
                      return (
                        <td {...cell.getCellProps([
                          getColumnProps(cell.column),
                          getCellProps(cell)
                        ])}>{cell.render('Cell')}</td>
                      )
                    })}
                  </tr>
                )}
            )}
          </tbody>
        </table>
        <br />
      </>
    )
  }

function processData(data: Player[] | undefined) {
  return data ? (data.map((player) => {
    const wins = player.wins ?? 0;
    const losses = player.losses ?? 0;
    const totalGames = wins + losses;
    return {
      ...player,
      winPercentage: Math.round(wins / totalGames * 100) + "%",
      totalGames: totalGames,
      mmr: Math.round(player.mmr ?? 0)
    }
  })) : [];
}

export const PlayerOverview = React.memo(function PlayerOverview() {
  const columns = React.useMemo(() => [
    {Header: 'Name', accessor: 'name'},
    {Header: 'Wins', accessor: "wins"},
    {Header: 'Win Percentage', accessor: "winPercentage"},
    {Header: 'Losses', accessor: "losses"},
    {Header: 'Total Games', accessor: "totalGames"},
    {Header: 'MMR', accessor: "mmr"},
  ],[]);

  const data = useSelector(statsSelector.getPlayers);
  const processedData = processData(data);

  const navigate = useNavigate();

  return <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
    <h1>Player Overview</h1>
    {
      <Table
        columns={columns}
        data={processedData}
        getRowProps={(row:any) => {
          return {          
          onClick: () => {
            navigate(row.values.name);
          },
        }}}
        getCellProps={(cellInfo: any) => {
          if (cellInfo.column.id === "mmr") {
            const mmrColor = cellInfo.value > 0 ? `hsl(${120 * ((1800 - cellInfo.value) / 1800) * 4 * -1 + 120}, 100%, 67%)`: "transparent";
            return {
              style: {
                backgroundColor: mmrColor,
              },
            }
          } else {
            return {};
          }
        }}
      />
    }
  </div>;
});
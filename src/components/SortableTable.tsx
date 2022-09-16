import { useSortBy, useTable } from "react-table";

const defaultPropGetter = () => ({})

export function SortableTable({
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
              <tr {...headerGroup.getHeaderGroupProps(getHeaderProps(headerGroup))}>
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
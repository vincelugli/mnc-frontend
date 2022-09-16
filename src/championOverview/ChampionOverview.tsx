import React from "react"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SortableTable } from "../components/SortableTable";
import { processChampions, processPlayers } from "../logic/statsProcessors";
import { statsSelector } from "../redux/statsSelectors";

export const ChampionOverview = React.memo(function ChampionOverview() {
  const columns = React.useMemo(() => [
    {Header: 'Name', accessor: 'name'},
    {Header: 'Wins', accessor: "wins"},
    {Header: 'Win Percentage', accessor: "winPercentage"},
    {Header: 'Losses', accessor: "losses"},
    {Header: 'Total Games', accessor: "totalGames"},
  ],[]);

  const data = useSelector(statsSelector.getPlayers);
  const processedChampionMap = processChampions(data);
  const processedChampionArray = Array.from(Object.values(processedChampionMap));

  const navigate = useNavigate();

  return <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
    <h1>Champion Overview</h1>
    {
      <SortableTable
        columns={columns}
        data={processedChampionArray}
        getRowProps={(row:any) => {
          return {          
          onClick: () => {
            navigate(row.values.name);
          },
        }}}
        // getCellProps={(cellInfo: any) => {
        //   if (cellInfo.column.id === "winPercentage") {
        //     const mmrColor = cellInfo.value > 0 ? `hsl(${120 * ((1800 - cellInfo.value) / 1800) * 4 * -1 + 120}, 100%, 67%)`: "transparent";
        //     return {
        //       style: {
        //         backgroundColor: mmrColor,
        //       },
        //     }
        //   } else {
        //     return {};
        //   }
        // }}
      />
    }
  </div>;
});
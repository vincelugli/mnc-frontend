import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SortableTable } from "../components/SortableTable";
import { processChampions } from "../logic/statsProcessors";
import { statsSelector } from "../redux/statsSelectors";
import { Champion } from "../types/domain/Champion";

const columnHelper = createColumnHelper<Champion>();

const columns: ColumnDef<Champion, any>[] = [
  columnHelper.accessor((row) => row.name, {
    id: "name",
    cell: (info) => info.getValue(),
    header: () => <span>Name</span>,
  }),
  columnHelper.accessor((row) => row.wins, {
    id: "wins",
    cell: (info) => info.getValue(),
    header: () => <span>Wins</span>,
    meta: {
      isNumeric: true,
    },
  }),
  columnHelper.accessor((row) => row.winPercentage, {
    id: "winPercentage",
    cell: (info) => info.getValue(),
    header: () => <span>Win Percentage</span>,
    meta: {
      isNumeric: true,
    },
  }),
  columnHelper.accessor((row) => row.losses, {
    id: "losses",
    cell: (info) => info.getValue(),
    header: () => <span>Losses</span>,
    meta: {
      isNumeric: true,
    },
  }),
  columnHelper.accessor((row) => row.totalGames, {
    id: "totalGames",
    cell: (info) => info.getValue(),
    header: () => <span>Total Games</span>,
    meta: {
      isNumeric: true,
    },
  }),
];

export const ChampionOverview = React.memo(function ChampionOverview() {
  const navigate = useNavigate();
  const data = useSelector(statsSelector.getPlayers);
  const processedChampionMap = processChampions(data);
  const processedChampionArray = Array.from(
    Object.values(processedChampionMap)
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>Champion Overview</h1>
      {
        <SortableTable
          columns={columns}
          data={processedChampionArray}
          getRowProps={(row: any) => {
            return {
              onClick: () => {
                navigate(row.getValue("name"));
              },
            };
          }}
        />
      }
    </div>
  );
});

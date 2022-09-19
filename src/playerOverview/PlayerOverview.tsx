import { chakra } from "@chakra-ui/react";
import { ColumnDef, createColumnHelper, Row } from "@tanstack/react-table";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SortableTable } from "../components/SortableTable2";
import { processChampions, processPlayers } from "../logic/statsProcessors";
import { statsSelector } from "../redux/statsSelectors";
import { PlayerTableData } from "../types/domain/Player";
import "./PlayerOverview.css";

const columnHelper = createColumnHelper<PlayerTableData>();

const columns: ColumnDef<PlayerTableData, any>[] = [
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
  columnHelper.accessor((row) => row.mmr, {
    id: "mmr",
    cell: (info) => info.getValue(),
    header: () => <span>MMR</span>,
    meta: {
      isNumeric: true,
    },
  }),
];

export const PlayerOverview = React.memo(function PlayerOverview() {
  const navigate = useNavigate();
  const data = useSelector(statsSelector.getPlayers);
  const processedData = processPlayers(data);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <chakra.h1>Player Overview</chakra.h1>
      {
        <SortableTable
          columns={columns}
          data={processedData}
          getRowProps={(row: Row<any>) => {
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

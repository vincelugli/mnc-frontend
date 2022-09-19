import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import React from "react";
import { useSelector } from "react-redux";
import { useLoaderData, useNavigate } from "react-router-dom";
import { SortableTable } from "../components/SortableTable";
import { AppState } from "../redux/rootReducer";
import { statsSelector } from "../redux/statsSelectors";
import { Player, PlayerChampionData } from "../types/domain/Player";

export async function loader(data: { params: any }) {
  return data.params.playerId;
}

/**
 * Given a player, map to a an array of PlayerChampionData that has stats centered around that player's champion
 * @param data
 */
const processPlayerChampions = (data: Player): PlayerChampionData[] => {
  return data.champions ? Array.from(Object.values(data.champions)) : [];
};

const columnHelper = createColumnHelper<PlayerChampionData>();

const columns: ColumnDef<PlayerChampionData, any>[] = [
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

export const PlayerScreen = React.memo(function PlayerScreen() {
  const navigate = useNavigate();
  const playerId = useLoaderData() as string;
  const player: Player | undefined = useSelector((state: AppState) =>
    statsSelector.getPlayer(state, playerId ?? "")
  );

  if (player === undefined) {
    return (
      <div
        style={{
          display: "flex",
          minHeight: "100vh",
          backgroundColor: "#282c34",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1 style={{ color: "white" }}>Player not found</h1>
      </div>
    );
  }

  const playerChampionData: PlayerChampionData[] =
    processPlayerChampions(player);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ marginBottom: 32 }}>
        <h1>{player.name}</h1>
        <h1>{"Wins: " + player.wins}</h1>
        <h1>{"Losses: " + player.losses}</h1>
        <h1>{"MMR: " + player.mmr}</h1>
      </div>
      {
        <SortableTable
          columns={columns}
          data={playerChampionData}
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

import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SortableTable } from "../components/SortableTable";
import { statsSelector } from "../redux/statsSelectors";
import { Champion } from "../types/domain/Champion";
import { Player } from "../types/domain/Player";

/**
 * Given a collection of players, map to a key value pair of championName to champion that has stats centered around that champion
 * @param data
 */
const processChampions = (
  data: Player[] | undefined
): {
  [key: string]: Champion;
} => {
  const championMap: { [key: string]: Champion } = {};
  if (data) {
    for (const player of data) {
      // iterate through the player's champions to aggregate champion info
      if (player.champions) {
        for (const [key, value] of Object.entries(player.champions)) {
          if (championMap[key] === undefined) {
            // champion does not exist in our collection, so we can add it
            championMap[key] = {
              name: key,
              losses: value.losses,
              wins: value.wins,
              totalGames: value.losses + value.wins,
              winPercentage: value.winPercentage,
            };
          } else {
            const wins = championMap[key].wins + value.wins;
            const losses = championMap[key].losses + value.losses;
            championMap[key] = {
              name: key,
              losses,
              wins,
              winPercentage: Math.round((wins / (wins + losses)) * 100),
              totalGames:
                championMap[key].totalGames + value.losses + value.wins,
            };
          }
        }
      }
    }
  }
  return championMap;
};

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

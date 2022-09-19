export type PlayerChampionData = {
  name: string;
  totalGames: number;
  wins: number;
  losses: number;
  winPercentage: number;
};

export type Player = {
  name: string;
  wins?: number;
  losses?: number;
  mmr?: number;
  champions?: {
    [key: string]: PlayerChampionData;
  };
};

export type PlayerTableData = {
  name: string;
  wins?: number | undefined;
  winPercentage: string;
  losses?: number;
  totalGames: number;
  mmr?: number;
};

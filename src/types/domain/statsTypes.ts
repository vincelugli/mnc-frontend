export type Champion = {
  name: string;
  wins: number;
  losses: number;
  winPercentage: number;
  totalGames: number;
};

export type Player = {
  name: string;
  wins?: number;
  losses?: number;
  mmr?: number;
  champions?: {
    [key: string]: Champion;
  };
};

export type MatchHistoryChampion = {
    name: string;
};

export type MatchHistoryPlayer = {
    name: string;
    champion: MatchHistoryChampion;
};

export type Team = {
    players: MatchHistoryPlayer[];
    bans: MatchHistoryChampion[];
};

export type Match = {
    id: string;
    date: Date;
    team1: Team;
    team2: Team;
    winner: 'Team 1' | 'Team 2';
};

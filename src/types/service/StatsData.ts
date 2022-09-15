export type StatsObject = {
    games: number;
    win: number;
    loss: number;
    win_rate: number;
}

export type StatsData = {
    [key: string]: {
        champion: {
            [key:string] : StatsObject;
        }
        oppponent: {
            [key:string] : StatsObject;
        }
        teammate: {
            [key:string] : StatsObject;
        }            
    }
}
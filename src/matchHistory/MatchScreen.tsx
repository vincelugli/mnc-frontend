import { Button, Flex, Image, Text } from '@chakra-ui/react';
import React, { useCallback } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { Error } from '../components/Error';
import { DataDragonService } from '../services/dataDragon/DataDragonService';
import { ToxicDataService } from '../services/toxicData/ToxicDataService';
import { MatchHistoryChampion } from '../types/domain/Match';
import {
    ChampionImages,
    getMatchWithImages,
} from '../utils/championImageHelpers';

export async function loader(data: { params: any }) {
    return data.params.matchId;
}

const MatchPlayerCard = React.memo(
    ({
        player,
    }: {
        player: {
            name: string;
            champion: { name: string; images: ChampionImages };
        };
    }) => {
        const navigate = useNavigate();

        const championNav = useCallback(() => {
            navigate('/championOverview/' + player.champion.name);
        }, [navigate, player.champion.name]);

        const playerNav = useCallback(() => {
            navigate('/playerOverview/' + player.name.toLowerCase());
        }, [navigate, player.name]);

        return (
            <Flex
                flex={1}
                align={'center'}
                flexDirection={'column'}
                paddingRight={4}
                minWidth={160}
                maxWidth={180}
            >
                <Button
                    variant='ghost'
                    onClick={championNav}
                    flex={1}
                    padding={1}
                >
                    <Image src={player.champion.images.portrait} />
                </Button>
                <Button
                    variant='ghost'
                    onClick={playerNav}
                    alignSelf={'stretch'}
                >
                    <Text
                        style={{ fontStyle: 'italic', fontWeight: 'bold' }}
                        onClick={playerNav}
                    >
                        {player.name.toUpperCase()}
                    </Text>
                </Button>
            </Flex>
        );
    }
);

const BannedChampion = React.memo(
    ({
        champion,
    }: {
        champion: { images: ChampionImages } & MatchHistoryChampion;
    }) => {
        const navigate = useNavigate();

        const championNav = useCallback(() => {
            navigate('/championOverview/' + champion.name);
        }, [navigate, champion.name]);

        return (
            <Flex width={12} height={12} justify={'center'} marginRight={2}>
                <Button
                    variant='ghost'
                    onClick={championNav}
                    padding={1}
                    flex={1}
                >
                    <Image
                        src={champion.images.square}
                        objectFit={'cover'}
                        onClick={championNav}
                    />
                </Button>
            </Flex>
        );
    }
);

export const MatchScreen = React.memo(function MatchHistory() {
    const matchId = useLoaderData() as string;

    const matchHistoryResponse = ToxicDataService.useMatchHistory();
    const matchHistory = matchHistoryResponse.data ?? [];

    const championIdMapResponse = DataDragonService.useChampionIdMap();
    const championIdMap = championIdMapResponse.data ?? {};

    const rawMatch = matchHistory.find((match) => match.id === matchId);

    if (rawMatch === undefined) {
        return <Error error={'Game not found!'} />;
    }

    const match = getMatchWithImages(rawMatch, championIdMap);

    const team1Cards = match.team1.players.map((player) => {
        return <MatchPlayerCard player={player} />;
    });

    const team1Bans = match.team1.bans.map((champion) => {
        return <BannedChampion champion={champion} />;
    });

    const team2Cards = match.team2.players.map((player) => {
        return <MatchPlayerCard player={player} />;
    });

    const team2Bans = match.team2.bans.map((champion) => {
        return <BannedChampion champion={champion} />;
    });

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <h1>{`Game ${match.id}`}</h1>
            <Flex direction={'column'}>
                <h1
                    style={{
                        fontStyle: 'italic',
                        fontWeight: 'bold',
                        fontSize: 24,
                    }}
                >
                    {`TEAM 1: ${
                        match.winner === 'Team 1' ? ' VICTORY' : ' DEFEAT'
                    }`}
                </h1>
                <Flex
                    direction={'row'}
                    flex={1}
                    marginBottom={8}
                    flexWrap={'wrap'}
                >
                    {team1Cards}
                    <Flex
                        direction={'column'}
                        flex={1}
                        justifyContent={'flex-start'}
                    >
                        <h1
                            style={{
                                fontStyle: 'italic',
                                fontWeight: 'bold',
                                fontSize: 20,
                            }}
                        >
                            BANS
                        </h1>
                        <Flex
                            direction={'row'}
                            flexWrap={'wrap'}
                            marginBottom={2}
                        >
                            {team1Bans.slice(0, 3)}
                        </Flex>
                        <Flex direction={'row'} flexWrap={'wrap'}>
                            {team1Bans.slice(3, 5)}
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
            <Flex direction={'column'}>
                <h1
                    style={{
                        fontStyle: 'italic',
                        fontWeight: 'bold',
                        fontSize: 24,
                    }}
                >{`TEAM 2: ${
                    match.winner === 'Team 2' ? ' VICTORY' : ' DEFEAT'
                }`}</h1>
                <Flex
                    direction={'row'}
                    flex={1}
                    marginBottom={8}
                    flexWrap={'wrap'}
                >
                    {team2Cards}
                    <Flex
                        direction={'column'}
                        flex={1}
                        justifyContent={'flex-start'}
                    >
                        <h1
                            style={{
                                fontStyle: 'italic',
                                fontWeight: 'bold',
                                fontSize: 20,
                            }}
                        >
                            BANS
                        </h1>
                        <Flex
                            direction={'row'}
                            flexWrap={'wrap'}
                            marginBottom={2}
                        >
                            {team2Bans.slice(0, 3)}
                        </Flex>
                        <Flex direction={'row'} flexWrap={'wrap'}>
                            {team2Bans.slice(3, 5)}
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
        </div>
    );
});

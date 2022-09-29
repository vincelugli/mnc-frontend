import React, { useEffect, useState } from 'react';
import { useChampions, usePlayers } from '../hooks/selectorWrapperHooks';
import { getMmrColor } from '../utils/mmrColorHelpers';

import CSS from 'csstype';
import { PlayerCard } from './slideshow/PlayerCard';
import { useSelector } from 'react-redux';
import { gameInfoSelector } from '../redux/gameInfo/gameInfoSelectors';
import { getChampionImage } from '../utils/championImageHelpers';

const styles = {
    header: {
        fontStyle: 'italic',
        fontWeight: 'bold',
        fontSize: 64,
        color: 'white',
        marginBottom: 32,
        textAlign: 'center',
    } as any,
    content: {
        padding: '32px',
        height: '720px',
        maxWidth: '1024px',
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
    } as any,
};

const containerBase: CSS.Properties = {
    position: 'absolute',
    top: '64px',
    bottom: '0px',
    left: '0px',
    right: '0px',
    transition:
        '0.5s' /* 0.5 second transition effect to slide in the sidenav */,
};

const visibleContainer: CSS.Properties = {
    ...containerBase,
    opacity: 1.0,
};

const hiddenContainer: CSS.Properties = {
    ...containerBase,
    opacity: 0,
};

enum StatsRowValueType {
    mmr,
    percentage,
    number,
}

const StatsRow = (props: {
    name?: string;
    value?: number;
    valueType?: StatsRowValueType;
    imageUri?: string;
}) => {
    return (
        <div
            style={{
                flex: 1,
                flexDirection: 'row',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                alignSelf: 'stretch',
                paddingLeft: 128,
                paddingRight: 128,
            }}
        >
            {props.imageUri ? (
                <img src={props.imageUri} style={{ width: 64, height: 64 }} />
            ) : null}
            <h1
                style={{
                    fontSize: 48,
                    fontWeight: 'bold',
                    color: 'white',
                }}
            >
                {props.name ? props.name.toUpperCase() : ''}
            </h1>
            <h1
                style={{
                    fontSize: 60,
                    fontWeight: 'bold',
                    color:
                        props.valueType === StatsRowValueType.mmr
                            ? getMmrColor(props.value ?? 0)
                            : 'white',
                    textShadow:
                        props.valueType === StatsRowValueType.mmr
                            ? '2px 2px 7px black'
                            : undefined,
                }}
            >
                {Math.round(props.value ?? 0)}
                {props.valueType === StatsRowValueType.percentage ? '%' : ''}
            </h1>
        </div>
    );
};

const mmrScreenCount = 4;
const championScreenCount = 4;

export const Slideshow = React.memo(function Slideshow() {
    const players = usePlayers();
    const champions = useChampions();
    const [slideNo, setSlideNo] = useState(0);
    const championIdMap = useSelector(gameInfoSelector.getChampionMap);

    // sort the players by MMR
    const sortedPlayers = players
        ? players
              .filter((value) => (value.wins ?? 0) + (value.losses ?? 0) > 10)
              .sort((a, b) => (b.mmr ?? 0) - (a.mmr ?? 0))
        : [];

    // sort the champions by win rate
    const sortedChampions = champions
        ? champions
              .filter((value) => value.totalGames > 10)
              .sort((a, b) => b.winPercentage - a.winPercentage)
        : [];

    // take the top 16 players and convert them to player cards
    const playerSlides = sortedPlayers.slice(0, 16).map((value, index) => {
        return (
            <div
                key={index}
                style={
                    slideNo === mmrScreenCount + index
                        ? visibleContainer
                        : hiddenContainer
                }
            >
                <PlayerCard player={value} />
            </div>
        );
    });

    useEffect(() => {
        document.title = 'Hydra';
    }, []);

    useEffect(() => {
        setTimeout(() => {
            if (
                slideNo <
                mmrScreenCount - 1 + playerSlides.length + championScreenCount
            ) {
                setSlideNo(slideNo + 1);
            } else {
                setSlideNo(0);
            }
        }, 7000);
    }, [slideNo, playerSlides]);

    if (sortedPlayers.length === 0) {
        return null;
    }

    return (
        <div
            style={{
                display: 'flex',
                minHeight: '100vh',
                backgroundColor: 'magenta',
                justifyContent: 'flex-start',
                alignItems: 'center',
                padding: 64,
            }}
        >
            <div style={slideNo === 0 ? visibleContainer : hiddenContainer}>
                <div style={styles.content}>
                    <h1 style={styles.header}>LATEST MMR STANDINGS</h1>
                    <StatsRow
                        name={sortedPlayers[0].name}
                        value={sortedPlayers[0].mmr}
                        valueType={StatsRowValueType.mmr}
                    />
                    <StatsRow
                        name={sortedPlayers[1].name}
                        value={sortedPlayers[1].mmr}
                        valueType={StatsRowValueType.mmr}
                    />
                    <StatsRow
                        name={sortedPlayers[2].name}
                        value={sortedPlayers[2].mmr}
                        valueType={StatsRowValueType.mmr}
                    />
                    <StatsRow
                        name={sortedPlayers[3].name}
                        value={sortedPlayers[3].mmr}
                        valueType={StatsRowValueType.mmr}
                    />
                </div>
            </div>
            <div style={slideNo === 1 ? visibleContainer : hiddenContainer}>
                <div style={styles.content}>
                    <h1 style={styles.header}>{'LATEST MMR STANDINGS'}</h1>
                    <StatsRow
                        name={sortedPlayers[4].name}
                        value={sortedPlayers[4].mmr}
                        valueType={StatsRowValueType.mmr}
                    />
                    <StatsRow
                        name={sortedPlayers[5].name}
                        value={sortedPlayers[5].mmr}
                        valueType={StatsRowValueType.mmr}
                    />
                    <StatsRow
                        name={sortedPlayers[6].name}
                        value={sortedPlayers[6].mmr}
                        valueType={StatsRowValueType.mmr}
                    />
                    <StatsRow
                        name={sortedPlayers[7].name}
                        value={sortedPlayers[7].mmr}
                        valueType={StatsRowValueType.mmr}
                    />
                </div>
            </div>
            <div style={slideNo === 2 ? visibleContainer : hiddenContainer}>
                <div style={styles.content}>
                    <h1 style={styles.header}>{'LATEST MMR STANDINGS'}</h1>
                    <StatsRow
                        name={sortedPlayers[8].name}
                        value={sortedPlayers[8].mmr}
                        valueType={StatsRowValueType.mmr}
                    />
                    <StatsRow
                        name={sortedPlayers[9].name}
                        value={sortedPlayers[9].mmr}
                        valueType={StatsRowValueType.mmr}
                    />
                    <StatsRow
                        name={sortedPlayers[10].name}
                        value={sortedPlayers[10].mmr}
                        valueType={StatsRowValueType.mmr}
                    />
                    <StatsRow
                        name={sortedPlayers[11].name}
                        value={sortedPlayers[11].mmr}
                        valueType={StatsRowValueType.mmr}
                    />
                </div>
            </div>
            <div style={slideNo === 3 ? visibleContainer : hiddenContainer}>
                <div style={styles.content}>
                    <h1 style={styles.header}>{'LATEST MMR STANDINGS'}</h1>
                    <StatsRow
                        name={sortedPlayers[12].name}
                        value={sortedPlayers[12].mmr}
                        valueType={StatsRowValueType.mmr}
                    />
                    <StatsRow
                        name={sortedPlayers[13].name}
                        value={sortedPlayers[13].mmr}
                        valueType={StatsRowValueType.mmr}
                    />
                    <StatsRow
                        name={sortedPlayers[14].name}
                        value={sortedPlayers[14].mmr}
                        valueType={StatsRowValueType.mmr}
                    />
                    <StatsRow
                        name={sortedPlayers[15].name}
                        value={sortedPlayers[15].mmr}
                        valueType={StatsRowValueType.mmr}
                    />
                </div>
            </div>
            {playerSlides}
            <div
                style={
                    slideNo === mmrScreenCount + playerSlides.length
                        ? visibleContainer
                        : hiddenContainer
                }
            >
                <div style={styles.content}>
                    <h1 style={styles.header}>{'CHAMPION WIN RATES'}</h1>
                    <StatsRow
                        imageUri={getChampionImage(
                            championIdMap[sortedChampions[0].name]
                        )}
                        name={sortedChampions[0].name}
                        value={sortedChampions[0].winPercentage}
                        valueType={StatsRowValueType.percentage}
                    />
                    <StatsRow
                        imageUri={getChampionImage(
                            championIdMap[sortedChampions[1].name]
                        )}
                        name={sortedChampions[1].name}
                        value={sortedChampions[1].winPercentage}
                        valueType={StatsRowValueType.percentage}
                    />
                    <StatsRow
                        imageUri={getChampionImage(
                            championIdMap[sortedChampions[2].name]
                        )}
                        name={sortedChampions[2].name}
                        value={sortedChampions[2].winPercentage}
                        valueType={StatsRowValueType.percentage}
                    />
                    <StatsRow
                        imageUri={getChampionImage(
                            championIdMap[sortedChampions[3].name]
                        )}
                        name={sortedChampions[3].name}
                        value={sortedChampions[3].winPercentage}
                        valueType={StatsRowValueType.percentage}
                    />
                </div>
            </div>
            <div
                style={
                    slideNo === mmrScreenCount + playerSlides.length + 1
                        ? visibleContainer
                        : hiddenContainer
                }
            >
                <div style={styles.content}>
                    <h1 style={styles.header}>{'CHAMPION WIN RATES'}</h1>
                    <StatsRow
                        imageUri={getChampionImage(
                            championIdMap[sortedChampions[4].name]
                        )}
                        name={sortedChampions[4].name}
                        value={sortedChampions[4].winPercentage}
                        valueType={StatsRowValueType.percentage}
                    />
                    <StatsRow
                        imageUri={getChampionImage(
                            championIdMap[sortedChampions[5].name]
                        )}
                        name={sortedChampions[5].name}
                        value={sortedChampions[5].winPercentage}
                        valueType={StatsRowValueType.percentage}
                    />
                    <StatsRow
                        imageUri={getChampionImage(
                            championIdMap[sortedChampions[6].name]
                        )}
                        name={sortedChampions[6].name}
                        value={sortedChampions[6].winPercentage}
                        valueType={StatsRowValueType.percentage}
                    />
                    <StatsRow
                        imageUri={getChampionImage(
                            championIdMap[sortedChampions[7].name]
                        )}
                        name={sortedChampions[7].name}
                        value={sortedChampions[7].winPercentage}
                        valueType={StatsRowValueType.percentage}
                    />
                </div>
            </div>
            <div
                style={
                    slideNo === mmrScreenCount + playerSlides.length + 2
                        ? visibleContainer
                        : hiddenContainer
                }
            >
                <div style={styles.content}>
                    <h1 style={styles.header}>{'CHAMPION WIN RATES'}</h1>
                    <StatsRow
                        imageUri={getChampionImage(
                            championIdMap[sortedChampions[8].name]
                        )}
                        name={sortedChampions[8].name}
                        value={sortedChampions[8].winPercentage}
                        valueType={StatsRowValueType.percentage}
                    />
                    <StatsRow
                        imageUri={getChampionImage(
                            championIdMap[sortedChampions[9].name]
                        )}
                        name={sortedChampions[9].name}
                        value={sortedChampions[9].winPercentage}
                        valueType={StatsRowValueType.percentage}
                    />
                    <StatsRow
                        imageUri={getChampionImage(
                            championIdMap[sortedChampions[10].name]
                        )}
                        name={sortedChampions[10].name}
                        value={sortedChampions[10].winPercentage}
                        valueType={StatsRowValueType.percentage}
                    />
                    <StatsRow
                        imageUri={getChampionImage(
                            championIdMap[sortedChampions[11].name]
                        )}
                        name={sortedChampions[11].name}
                        value={sortedChampions[11].winPercentage}
                        valueType={StatsRowValueType.percentage}
                    />
                </div>
            </div>
            <div
                style={
                    slideNo === mmrScreenCount + playerSlides.length + 3
                        ? visibleContainer
                        : hiddenContainer
                }
            >
                <div style={styles.content}>
                    <h1 style={styles.header}>{'CHAMPION WIN RATES'}</h1>
                    <StatsRow
                        imageUri={getChampionImage(
                            championIdMap[sortedChampions[12].name]
                        )}
                        name={sortedChampions[12].name}
                        value={sortedChampions[12].winPercentage}
                        valueType={StatsRowValueType.percentage}
                    />
                    <StatsRow
                        imageUri={getChampionImage(
                            championIdMap[sortedChampions[13].name]
                        )}
                        name={sortedChampions[13].name}
                        value={sortedChampions[13].winPercentage}
                        valueType={StatsRowValueType.percentage}
                    />
                    <StatsRow
                        imageUri={getChampionImage(
                            championIdMap[sortedChampions[14].name]
                        )}
                        name={sortedChampions[14].name}
                        value={sortedChampions[14].winPercentage}
                        valueType={StatsRowValueType.percentage}
                    />
                    <StatsRow
                        imageUri={getChampionImage(
                            championIdMap[sortedChampions[15].name]
                        )}
                        name={sortedChampions[15].name}
                        value={sortedChampions[15].winPercentage}
                        valueType={StatsRowValueType.percentage}
                    />
                </div>
            </div>
        </div>
    );
});

import { Button } from '@chakra-ui/react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { ReactSketchCanvas, ReactSketchCanvasRef } from 'react-sketch-canvas';
import { usePlayers } from '../hooks/selectorWrapperHooks';
import { getMmrColor } from '../utils/mmrColorHelpers';

import CSS from 'csstype';
import { AnyARecord } from 'dns';
import { Player } from '../types/domain/Player';
import { SummonerCollage } from '../components/SummonerCollage';

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

const StatsRow = (props: {
    name?: string;
    value?: number;
    applyMmrColor?: boolean;
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
                    color: props.applyMmrColor
                        ? getMmrColor(props.value ?? 0)
                        : 'white',
                    textShadow: props.applyMmrColor
                        ? '2px 2px 7px black'
                        : undefined,
                }}
            >
                {Math.round(props.value ?? 0)}
            </h1>
        </div>
    );
};

const screenCount = 4;

const PlayerCard = (props: { player: Player }) => {
    return (
        <div style={styles.content}>
            <h1 style={{ ...styles.header, textAlign: 'start' }}>
                {props.player.name.toUpperCase()}
            </h1>
            <div style={{ flex: 1, flexDirection: 'row', display: 'flex' }}>
                <div style={{ width: 500 }}>
                    <SummonerCollage player={props.player} />
                </div>
                <div
                    style={{
                        flex: 1,
                        flexDirection: 'column',
                        display: 'flex',
                        justifyContent: 'flex-start',
                        paddingLeft: 32,
                    }}
                >
                    <h1
                        style={{
                            fontSize: 60,
                            fontWeight: 'bold',
                            color: getMmrColor(props.player.mmr ?? 0),
                            textShadow: '2px 2px 7px black',
                            textAlign: 'start',
                        }}
                    >
                        {Math.round(props.player.mmr ?? 0)}
                    </h1>
                </div>
            </div>
        </div>
    );
};

export const Slideshow = React.memo(function Slideshow() {
    const players = usePlayers();
    const [slideNo, setSlideNo] = useState(4);

    // sort the players by MMR
    const sortedPlayers = players
        ? players
              .filter((value) => (value.wins ?? 0) + (value.losses ?? 0) > 10)
              .sort((a, b) => (b.mmr ?? 0) - (a.mmr ?? 0))
        : [];

    // take the top 16 players and convert them to player cards
    const playerSlides = sortedPlayers.slice(0, 16).map((value, index) => {
        return (
            <div
                key={index}
                style={
                    slideNo === screenCount + index
                        ? visibleContainer
                        : hiddenContainer
                }
            >
                <PlayerCard player={value} />
            </div>
        );
    });

    useEffect(() => {
        document.title = 'Chimera';
    }, []);

    useEffect(() => {
        setTimeout(() => {
            if (slideNo < screenCount - 1 + playerSlides.length) {
                setSlideNo(slideNo + 1);
            } else {
                setSlideNo(0);
            }
        }, 5000);
    }, [slideNo, playerSlides]);

    if (sortedPlayers.length === 0) {
        return null;
    }

    return (
        <div
            style={{
                display: 'flex',
                minHeight: '100vh',
                backgroundColor: 'blue',
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
                        applyMmrColor={true}
                    />
                    <StatsRow
                        name={sortedPlayers[1].name}
                        value={sortedPlayers[1].mmr}
                        applyMmrColor={true}
                    />
                    <StatsRow
                        name={sortedPlayers[2].name}
                        value={sortedPlayers[2].mmr}
                        applyMmrColor={true}
                    />
                    <StatsRow
                        name={sortedPlayers[3].name}
                        value={sortedPlayers[3].mmr}
                        applyMmrColor={true}
                    />
                </div>
            </div>
            <div style={slideNo === 1 ? visibleContainer : hiddenContainer}>
                <div style={styles.content}>
                    <h1 style={styles.header}>{'LATEST MMR STANDINGS'}</h1>
                    <StatsRow
                        name={sortedPlayers[4].name}
                        value={sortedPlayers[4].mmr}
                        applyMmrColor={true}
                    />
                    <StatsRow
                        name={sortedPlayers[5].name}
                        value={sortedPlayers[5].mmr}
                        applyMmrColor={true}
                    />
                    <StatsRow
                        name={sortedPlayers[6].name}
                        value={sortedPlayers[6].mmr}
                        applyMmrColor={true}
                    />
                    <StatsRow
                        name={sortedPlayers[7].name}
                        value={sortedPlayers[7].mmr}
                        applyMmrColor={true}
                    />
                </div>
            </div>
            <div style={slideNo === 2 ? visibleContainer : hiddenContainer}>
                <div style={styles.content}>
                    <h1 style={styles.header}>{'LATEST MMR STANDINGS'}</h1>
                    <StatsRow
                        name={sortedPlayers[8].name}
                        value={sortedPlayers[8].mmr}
                        applyMmrColor={true}
                    />
                    <StatsRow
                        name={sortedPlayers[9].name}
                        value={sortedPlayers[9].mmr}
                        applyMmrColor={true}
                    />
                    <StatsRow
                        name={sortedPlayers[10].name}
                        value={sortedPlayers[10].mmr}
                        applyMmrColor={true}
                    />
                    <StatsRow
                        name={sortedPlayers[11].name}
                        value={sortedPlayers[11].mmr}
                        applyMmrColor={true}
                    />
                </div>
            </div>
            <div style={slideNo === 3 ? visibleContainer : hiddenContainer}>
                <div style={styles.content}>
                    <h1 style={styles.header}>{'LATEST MMR STANDINGS'}</h1>
                    <StatsRow
                        name={sortedPlayers[12].name}
                        value={sortedPlayers[12].mmr}
                        applyMmrColor={true}
                    />
                    <StatsRow
                        name={sortedPlayers[13].name}
                        value={sortedPlayers[13].mmr}
                        applyMmrColor={true}
                    />
                    <StatsRow
                        name={sortedPlayers[14].name}
                        value={sortedPlayers[14].mmr}
                        applyMmrColor={true}
                    />
                    <StatsRow
                        name={sortedPlayers[15].name}
                        value={sortedPlayers[15].mmr}
                        applyMmrColor={true}
                    />
                </div>
            </div>
            {playerSlides}
        </div>
    );
});

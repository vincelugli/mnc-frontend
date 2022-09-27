import { useDispatch } from 'react-redux';
import { useServiceCalls } from '../hooks/useServiceCalls';
import { TOP_NAV_BAR_HEIGHT } from '../navigation/Root';
import { StatsAction } from '../redux/stats/statsActions';

const backgroundVideo =
    'https://screensavers.riotgames.com/v2/latest/content/original/AnimatedArt/animated-freljord.webm';

export default function Home() {
    //useServiceCalls();
    const dispatch = useDispatch();
    dispatch(
        StatsAction.hydratePlayerStatsActionComplete([
            {
                name: 'doomgeek',
                champions: {
                    Jinx: {
                        losses: 5,
                        wins: 5,
                        name: 'Jinx',
                        totalGames: 10,
                        winPercentage: 50,
                    },
                    Taric: {
                        losses: 1,
                        wins: 9,
                        name: 'Taric',
                        totalGames: 10,
                        winPercentage: 90,
                    },
                    Leona: {
                        losses: 3,
                        wins: 6,
                        name: 'Leona',
                        totalGames: 9,
                        winPercentage: 50,
                    },
                },
                losses: 5,
                wins: 10,
                mmr: 1400,
            },
            {
                name: 'Cory',
                champions: {
                    Ivern: {
                        losses: 5,
                        wins: 5,
                        name: 'Ivern',
                        totalGames: 10,
                        winPercentage: 50,
                    },
                    Morgana: {
                        losses: 1,
                        wins: 9,
                        name: 'Morgana',
                        totalGames: 10,
                        winPercentage: 90,
                    },
                    Thresh: {
                        losses: 3,
                        wins: 6,
                        name: 'Thresh',
                        totalGames: 9,
                        winPercentage: 50,
                    },
                },
                losses: 5,
                wins: 10,
                mmr: 1400,
            },
        ])
    );

    return (
        <div
            style={{
                display: 'flex',
                minHeight: '100vh',
                backgroundColor: '#282c34',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <div
                style={{
                    position: 'absolute',
                    right: 0,
                    left: 0,
                    bottom: 0,
                    top: TOP_NAV_BAR_HEIGHT,
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        width: '100%',
                        height: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <video
                        autoPlay={true}
                        loop={true}
                        muted={true}
                        playsInline={true}
                        preload='none'
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                        }}
                    >
                        <source type='video/webm' src={backgroundVideo} />
                        {/* <source type="video/MP4" src="https://lolstatic-a.akamaihd.net/frontpage/apps/prod/rg-league-display-2017/en_US/cb24025fade09e3f965776440dffcc65024d3266/assets/img/content/splash/videos/animated-dragontrainer-tristana.mp4"> */}
                    </video>
                </div>
            </div>
            <div
                style={{
                    position: 'absolute',
                    right: 0,
                    left: 0,
                    bottom: 0,
                    top: TOP_NAV_BAR_HEIGHT,
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        width: '100%',
                        height: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    }}
                >
                    <h1
                        style={{
                            color: 'white',
                            fontSize: 48,
                            marginRight: 64,
                            marginLeft: 64,
                        }}
                    >
                        {' '}
                        Welcome to Monday Night Customs Hub{' '}
                    </h1>
                </div>
            </div>
        </div>
    );
}

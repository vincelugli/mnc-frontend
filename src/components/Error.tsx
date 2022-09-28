import React from 'react';
import { TOP_NAV_BAR_HEIGHT } from '../navigation/Root';

export const Error = React.memo(function Error({ error }: { error: string }) {
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
                    <img
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                        }}
                        src='https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Amumu_7.jpg'
                    />
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
                        {error}
                    </h1>
                </div>
            </div>
        </div>
    );
});

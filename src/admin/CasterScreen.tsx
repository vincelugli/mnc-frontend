import { Button } from '@chakra-ui/react';
import React, { useCallback, useRef, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { ReactSketchCanvas, ReactSketchCanvasRef } from 'react-sketch-canvas';

export async function loader(data: { params: any }) {
    return data.params.videoId;
}

enum CasterColor {
    Red = 'red',
    Blue = 'cyan',
    Green = 'lime',
}

export const CasterScreen = React.memo(function CasterScreen() {
    const videoId = useLoaderData() as string;
    const canvasRef = useRef<ReactSketchCanvasRef>(null);
    const [drawColor, setDrawColor] = useState(CasterColor.Red);

    const onClear = useCallback(() => {
        if (canvasRef.current !== null) {
            canvasRef.current.clearCanvas();
        }
    }, [canvasRef]);

    const onBlue = () => {
        setDrawColor(CasterColor.Blue);
    };
    const onRed = () => {
        setDrawColor(CasterColor.Red);
    };
    const onGreen = () => {
        setDrawColor(CasterColor.Green);
    };

    return (
        <div
            style={{
                display: 'flex',
                minHeight: '100vh',
                backgroundColor: '#282c34',
            }}
        >
            <div style={{ flex: 1, zIndex: 10, height: 50, marginTop: 0 }}>
                <Button onClick={onBlue} style={{}}>
                    🟦
                </Button>
                <Button onClick={onRed} style={{}}>
                    🟥
                </Button>
                <Button onClick={onGreen} style={{}}>
                    🟩
                </Button>
                <Button onClick={onClear} style={{}}>
                    CLEAR
                </Button>
            </div>
            <div style={{ flex: 1 }}>
                <div
                    style={{
                        position: 'absolute',
                        right: 0,
                        left: 0,
                        bottom: 0,
                        top: 0,
                    }}
                >
                    <iframe
                        height='100%'
                        width='100%'
                        id='ytplayer'
                        src={`https://www.youtube.com/embed/${videoId}?rel=0`}
                    />
                </div>
                <div
                    style={{
                        position: 'absolute',
                        right: 0,
                        left: 0,
                        bottom: 45,
                        top: 0,
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            width: '100%',
                            height: '100%',
                            justifyContent: 'center',
                            alignItems: 'center',
                            //backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        }}
                    >
                        <ReactSketchCanvas
                            ref={canvasRef}
                            style={{ flex: 1, alignSelf: 'stretch' }}
                            canvasColor={'rgb(0,0,0,0)'}
                            strokeWidth={4}
                            strokeColor={drawColor}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
});

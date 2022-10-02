import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import { CreatableSelect } from 'chakra-react-select';
import { useState } from 'react';
import { ToxicDataService } from '../services/toxicData/ToxicDataService';
import { Player } from '../types/domain/Player';
import './Matchmaker.css';
import MatchTable from './MatchTable';

export const Matchmaker = () => {
    const [customPlayers, setCustomPlayers] = useState<Player[]>([]);
    const [selectedPlayers, setSelectedPlayers] = useState<readonly Player[]>(
        []
    );
    const [inputValue, setInputValue] = useState('');
    const [blueTeam, setBlueTeam] = useState<readonly Player[]>([]);
    const [redTeam, setRedTeam] = useState<readonly Player[]>([]);

    const playersResponse = ToxicDataService.usePlayers();
    const players = playersResponse.data ?? [];

    const handleInputChange = (value: string) => {
        setInputValue(value);
    };

    const handleOnChange = (values: readonly Player[]) => {
        setSelectedPlayers(values);
    };

    const handleCreate = (inputValue: string) => {
        if (inputValue !== '') {
            const newPlayer = { name: inputValue, mmr: 1500 };
            setCustomPlayers([...customPlayers, newPlayer]);
            setSelectedPlayers([...selectedPlayers, newPlayer]);
        }
    };

    const addMatch = () => {
        if (selectedPlayers.length === 10) {
            const playerPool: Player[] = [...selectedPlayers].sort(
                (p1, p2) => (p1.mmr ?? 0) - (p2.mmr ?? 0)
            );

            const team1 = playerPool.splice(0, 1);
            const anchor1 = playerPool.pop();
            if (anchor1) {
                team1.push(anchor1);
            }
            const team2 = playerPool.splice(0, 1);
            const anchor2 = playerPool.pop();
            if (anchor2) {
                team2.push(anchor2);
            }

            randomizePlayers(playerPool);
            team1.push(...playerPool.splice(0, 3));
            team2.push(...playerPool.splice(0, 3));

            if (Math.random() < 0.5) {
                setBlueTeam(team1);
                setRedTeam(team2);
            } else {
                setBlueTeam(team2);
                setRedTeam(team1);
            }
        }
    };

    const randomizePlayers = (players: Player[]) => {
        for (let i = players.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [players[i], players[j]] = [players[j], players[i]];
        }
    };

    return (
        <>
            <Flex direction='column' justify='center' align='flex-start'>
                <Heading color='gray.500'>Matchmaker</Heading>
                <Flex
                    direction='column'
                    justify='center'
                    align='stretch'
                    alignSelf='stretch'
                    paddingTop='6'
                    paddingBottom='6'
                >
                    <Flex
                        direction='row'
                        justify='center'
                        align='center'
                        alignSelf='stretch'
                    >
                        <Box style={{ flex: 1 }}>
                            <CreatableSelect
                                isMulti
                                isClearable
                                options={players.concat(customPlayers)}
                                isOptionDisabled={() =>
                                    selectedPlayers.length >= 10
                                }
                                inputValue={inputValue}
                                value={selectedPlayers}
                                getOptionLabel={(player) => player.name}
                                getOptionValue={(player) => player.name}
                                onChange={handleOnChange}
                                onInputChange={handleInputChange}
                                onCreateOption={handleCreate}
                                getNewOptionData={(inputValue) => ({
                                    name: inputValue,
                                    mmr: 1500,
                                })}
                                placeholder='Add players...'
                                size='lg'
                            />
                        </Box>
                        <Box style={{ flex: 1 }}></Box>
                    </Flex>
                    <Flex
                        direction='column'
                        justify='center'
                        align='flex-start'
                        padding='3'
                    >
                        <Text color='gray.600'>
                            Players selected: {selectedPlayers.length}/10
                        </Text>
                        <Button
                            onClick={addMatch}
                            disabled={selectedPlayers.length !== 10}
                            style={{
                                marginTop: 3,
                                marginBottom: 3,
                            }}
                        >
                            Matchmake!
                        </Button>
                    </Flex>
                </Flex>
                {blueTeam.length === 5 && redTeam.length === 5 && (
                    <Flex
                        direction='row'
                        alignSelf='stretch'
                        align='flex-start'
                        paddingTop='3'
                        paddingBottom='3'
                    >
                        <Box style={{ flex: 2 }}>
                            <MatchTable
                                blueTeam={blueTeam}
                                redTeam={redTeam}
                                clipboardButton={true}
                            ></MatchTable>
                        </Box>
                        <Flex alignSelf='stretch' flex='1'></Flex>
                    </Flex>
                )}
            </Flex>
        </>
    );
};

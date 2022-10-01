import { Button, Flex } from '@chakra-ui/react';
import { CreatableSelect } from 'chakra-react-select';
import { ToxicDataService } from '../services/toxicData/ToxicDataService';
import { Player } from '../types/domain/Player';
import './Matchmaker.css';
import { useState } from 'react';
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
            <Flex direction={'column'}>
                <h1>Matchmaker</h1>
                <span>Players selected: {selectedPlayers.length}/10</span>
                <CreatableSelect
                    isMulti
                    isClearable
                    options={players.concat(customPlayers)}
                    isOptionDisabled={() => selectedPlayers.length >= 10}
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
                />

                <Button
                    onClick={addMatch}
                    disabled={selectedPlayers.length !== 10}
                >
                    Matchmake!
                </Button>
                {blueTeam.length === 5 && (
                    <MatchTable
                        blueTeam={blueTeam}
                        redTeam={redTeam}
                    ></MatchTable>
                )}
            </Flex>
        </>
    );
};

import { useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import { ToxicDataService } from '../services/toxicData/ToxicDataService';
import { Player } from '../types/domain/Player';
import './Matchmaker.css';

function getPlayerMmrText(player: Player): string {
    const totalGames = (player.wins ?? 0) + (player.losses ?? 0);
    return totalGames >= 10
        ? `(${Math.round(player.mmr ?? 0).toString()})`
        : ``;
}

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

    const getTeamMmr = (players: readonly Player[]) => {
        return Math.round(
            players.reduce((total, player) => {
                return total + (player.mmr ?? 0);
            }, 0) / 5
        );
    };

    const randomizePlayers = (players: Player[]) => {
        for (let i = players.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [players[i], players[j]] = [players[j], players[i]];
        }
    };

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <h1>Matchmaker</h1>
            <div>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                    }}
                >
                    <div
                        style={{
                            width: 500,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            marginBottom: 8,
                        }}
                    >
                        <span>
                            Players selected: {selectedPlayers.length}/10
                        </span>
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
                        />
                    </div>
                    <button
                        style={{
                            flex: 1,
                            padding: 4,
                            borderWidth: 1,
                            borderColor: 'black',
                            borderRadius: 4,
                            marginBottom: 16,
                        }}
                        onClick={addMatch}
                        disabled={selectedPlayers.length !== 10}
                    >
                        Matchmake!
                    </button>
                </div>
                <div
                    style={{
                        flexDirection: 'row',
                        display: 'flex',
                        flex: 1,
                        justifyContent: 'space-between',
                    }}
                >
                    <ul>
                        Blue Team: {getTeamMmr(blueTeam)}
                        {blueTeam.map((player) => {
                            return (
                                <li>
                                    <>
                                        {`${player.name} ${getPlayerMmrText(
                                            player
                                        )}`}
                                    </>
                                </li>
                            );
                        })}
                    </ul>
                    <ul>
                        Red Team: {getTeamMmr(redTeam)}
                        {redTeam.map((player) => {
                            return (
                                <li>
                                    {`${player.name} ${getPlayerMmrText(
                                        player
                                    )}`}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
};

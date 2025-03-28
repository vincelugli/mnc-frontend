import {
    Button,
    Flex,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    useToast,
} from '@chakra-ui/react';
import { Player } from '../types/domain/Player';

function getPlayerMmrText(player: Player): string {
    const totalGames = (player.wins ?? 0) + (player.losses ?? 0);
    return totalGames >= 10
        ? `(${Math.round(player.mmr ?? 0).toString()})`
        : `(unrated)`;
}

const getTeamMmr = (team: readonly Player[]) => {
    return Math.round(
        team.reduce(
            (teamMmr, player) =>
                player.mmr ? teamMmr + player.mmr : teamMmr + 1500,
            0
        ) / 5
    );
};

export const MatchTable = ({
    blueTeam,
    redTeam,
    clipboardButton = false,
}: {
    blueTeam: readonly Player[];
    redTeam: readonly Player[];
    clipboardButton?: boolean;
}) => {
    const toast = useToast();
    const writeTeamToString = (team: readonly Player[]) => {
        return team.map((player) => player.name).join('\n');
    };

    const copyMatchToClipboard = () => {
        const text = `Blue Team:\n${writeTeamToString(
            blueTeam
        )}\n\nRedTeam:\n${writeTeamToString(redTeam)}`;
        navigator.clipboard.writeText(text);
    };

    return (
        <Flex direction='column' align='flex-start' alignSelf='stretch'>
            <Flex
                direction='column'
                alignSelf='stretch'
                align='stretch'
                flex='1'
            >
                <TableContainer
                    border='1px solid'
                    borderColor='gray.100'
                    borderRadius='md'
                    background={'white'}
                    color='gray.600'
                >
                    <Table variant='simple'>
                        <Thead>
                            <Tr>
                                <Th color='blue.500'>
                                    Blue Team ({getTeamMmr(blueTeam)})
                                </Th>
                                <Th color='red.600' textAlign='right'>
                                    Red Team ({getTeamMmr(redTeam)})
                                </Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr>
                                <Td>
                                    {blueTeam[0].name}{' '}
                                    {getPlayerMmrText(blueTeam[0])}
                                </Td>
                                <Td textAlign='right'>
                                    {redTeam[0].name}{' '}
                                    {getPlayerMmrText(redTeam[0])}
                                </Td>
                            </Tr>
                            <Tr>
                                <Td>
                                    {blueTeam[1].name}{' '}
                                    {getPlayerMmrText(blueTeam[1])}
                                </Td>
                                <Td textAlign='right'>
                                    {redTeam[1].name}{' '}
                                    {getPlayerMmrText(redTeam[1])}
                                </Td>
                            </Tr>
                            <Tr>
                                <Td>
                                    {blueTeam[2].name}{' '}
                                    {getPlayerMmrText(blueTeam[2])}
                                </Td>
                                <Td textAlign='right'>
                                    {redTeam[2].name}{' '}
                                    {getPlayerMmrText(redTeam[2])}
                                </Td>
                            </Tr>
                            <Tr>
                                <Td>
                                    {blueTeam[3].name}{' '}
                                    {getPlayerMmrText(blueTeam[3])}
                                </Td>
                                <Td textAlign='right'>
                                    {redTeam[3].name}{' '}
                                    {getPlayerMmrText(redTeam[3])}
                                </Td>
                            </Tr>
                            <Tr>
                                <Td>
                                    {blueTeam[4].name}{' '}
                                    {getPlayerMmrText(blueTeam[4])}
                                </Td>
                                <Td textAlign='right'>
                                    {redTeam[4].name}{' '}
                                    {getPlayerMmrText(redTeam[4])}
                                </Td>
                            </Tr>
                        </Tbody>
                    </Table>
                </TableContainer>
            </Flex>
            {clipboardButton && (
                <Button
                    style={{ margin: 10 }}
                    onClick={() => {
                        copyMatchToClipboard();
                        toast({
                            title: 'Match copied to clipboard',
                            status: 'success',
                            duration: 3000,
                            isClosable: false,
                            variant: 'solid',
                        });
                    }}
                >
                    Copy to clipboard
                </Button>
            )}
        </Flex>
    );
};

export default MatchTable;

import { Player } from '../types/domain/Player';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
} from '@chakra-ui/react';

const rightAlign = 'right';
function getPlayerMmrText(player: Player): string {
    const totalGames = (player.wins ?? 0) + (player.losses ?? 0);
    return totalGames >= 10
        ? `(${Math.round(player.mmr ?? 0).toString()})`
        : ``;
}

export const MatchTable = ({
    blueTeam,
    redTeam,
}: {
    blueTeam: readonly Player[];
    redTeam: readonly Player[];
}) => {
    return (
        <TableContainer>
            <Table variant='simple' colorScheme='teal'>
                {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
                <Thead>
                    <Tr>
                        <Th>Blue Team</Th>
                        <Th textAlign={rightAlign}>Red Team</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    <Tr>
                        <Td>{`${blueTeam[0].name} ${getPlayerMmrText(
                            blueTeam[0]
                        )}`}</Td>
                        <Td textAlign={rightAlign}>{`${
                            redTeam[0].name
                        } ${getPlayerMmrText(redTeam[0])}`}</Td>
                    </Tr>
                    <Tr>
                        <Td>{`${blueTeam[1].name} ${getPlayerMmrText(
                            blueTeam[1]
                        )}`}</Td>
                        <Td textAlign={rightAlign}>{`${
                            redTeam[1].name
                        } ${getPlayerMmrText(redTeam[1])}`}</Td>
                    </Tr>
                    <Tr>
                        <Td>{`${blueTeam[2].name} ${getPlayerMmrText(
                            blueTeam[2]
                        )}`}</Td>
                        <Td textAlign={rightAlign}>{`${
                            redTeam[2].name
                        } ${getPlayerMmrText(redTeam[2])}`}</Td>
                    </Tr>
                    <Tr>
                        <Td>{`${blueTeam[3].name} ${getPlayerMmrText(
                            blueTeam[3]
                        )}`}</Td>
                        <Td textAlign={rightAlign}>{`${
                            redTeam[3].name
                        } ${getPlayerMmrText(redTeam[3])}`}</Td>
                    </Tr>
                    <Tr>
                        <Td>{`${blueTeam[4].name} ${getPlayerMmrText(
                            blueTeam[4]
                        )}`}</Td>
                        <Td textAlign={rightAlign}>{`${
                            redTeam[4].name
                        } ${getPlayerMmrText(redTeam[4])}`}</Td>
                    </Tr>
                </Tbody>
            </Table>
        </TableContainer>
    );
};

export default MatchTable;

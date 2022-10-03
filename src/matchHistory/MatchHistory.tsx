import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SortableTable } from '../components/SortableTable';
import { DataDragonService } from '../services/dataDragon/DataDragonService';
import { ToxicDataService } from '../services/toxicData/ToxicDataService';
import { getMatchWithImages } from '../utils/championImageHelpers';
import { matchHistoryColumns } from './matchHistoryColumnHelper';

export const MatchHistory = React.memo(function MatchHistory() {
    const navigate = useNavigate();

    const matchHistoryResponse = ToxicDataService.useMatchHistory();
    const matchHistory = matchHistoryResponse.data ?? [];

    const championIdMapResponse = DataDragonService.useChampionIdMap();
    const championIdMap = championIdMapResponse.data ?? {};

    const processedMatchHistory = matchHistory.map((match) => {
        return getMatchWithImages(match, championIdMap);
    });

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <h1>Match History</h1>
            <SortableTable
                columns={matchHistoryColumns}
                data={processedMatchHistory}
                getRowProps={(row: any) => {
                    return {
                        onClick: () => {
                            navigate('/matchHistory/' + row.original.id);
                            window.scrollTo(0, 0);
                        },
                    };
                }}
            />
        </div>
    );
});

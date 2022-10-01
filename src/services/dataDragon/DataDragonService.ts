import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Champions } from '../../types/service/dataDragon/DataDragonChampions';
import { mapChampions } from './dataMapper';

const championDataEndpoint =
    'https://ddragon.leagueoflegends.com/cdn/12.17.1/data/en_US/champion.json';

const fetchChampions = () =>
    axios
        .get<Champions>(championDataEndpoint, {
            headers: {
                Accept: 'application/json',
            },
        })
        .then((res) => res.data);

export const DataDragonService = {
    useChampionIdMap: () => {
        const { data, isLoading, isError } = useQuery<
            Champions,
            Error,
            { [key: string]: string }
        >(['dataDragonChampions'], fetchChampions, {
            select: (data) => {
                return mapChampions(data);
            },
            staleTime: 20000,
        });

        return { data, isLoading, isError };
    },
};

import axios from "axios";
import { MmrData } from "../types/service/MmrData";

const placementEndpoint = "https://toxic-api-production.gggrunt16.workers.dev/mmr";
const mmrEndpoint = "https://toxic-api-production.gggrunt16.workers.dev/mmr";
const statsEndpoint = "https://toxic-api-production.gggrunt16.workers.dev/stats"

export const fetchPlayers = () => axios.get<MmrData>("/placement", {
  headers: {
    Accept: "application/json",
  },
}).then((res) => res.data);

export const fetchStats = () =>axios.get<MmrData>(statsEndpoint, {
  headers: {
    Accept: "application/json",
  },
}).then((res) => res.data);

export const fetchMMR = () =>axios.get<MmrData>(mmrEndpoint, {
  headers: {
    Accept: "application/json",
  },
}).then((res) => res.data);

import axios from "axios";
import { MmrData } from "../types/service/MmrData";

// https://toxic-api-production.gggrunt16.workers.dev/mmr
// https://toxic-api-production.gggrunt16.workers.dev/placement
// https://toxic-api-production.gggrunt16.workers.dev/stats

const mmrEndpoint = "https://toxic-api-production.gggrunt16.workers.dev/mmr";

export const fetchPlayers = () => axios.get<MmrData>("/placement", {
  headers: {
    Accept: "application/json",
  },
}).then((res) => res.data);

export const fetchStats = () =>axios.get<MmrData>("/stats", {
  headers: {
    Accept: "application/json",
  },
}).then((res) => res.data);

export const fetchMMR = () =>axios.get<MmrData>(mmrEndpoint, {
  headers: {
    Accept: "application/json",
  },
}).then((res) => res.data);

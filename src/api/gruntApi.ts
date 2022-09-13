import axios from "axios";
import { MmrData } from "../mmr-data";

export const fetchPlayers = () =>
  axios
    .get<MmrData>("/placement", {
      headers: {
        Accept: "application/json",
      },
    })
    .then((res) => res.data);

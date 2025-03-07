import axios from "axios";
import * as constants from "../constants";

const api = axios.create({
  baseURL: "https://gateway.isolarcloud.eu/openapi", // Cambia con l'URL della tua API
  headers: {
    "Content-Type": "application/json",
    "x-access-key": constants.API_ACCESS_KEY
  },
});

export default api;
import axios, { AxiosError } from "axios";

import { BASE_URL } from "./config";

export const client = axios.create({
  baseURL: BASE_URL,
});

export const getHealthcheck = async () => {
  return await client
    .get("/")
    .then((response) => response.data)
    .then((response) => response["message"]);
};

export const getSnaps = async () => {
  return await client.get("/snaps").then((response) => response.data);
};

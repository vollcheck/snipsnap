import axios, { AxiosError } from "axios";

import { BASE_URL } from "./config";

// -- Client defintion
const client = axios.create({
  baseURL: BASE_URL,
});

// -- Snap endpoints
export const getHealthcheck = async () => {
  return await client
    .get("/")
    .then((response) => response.data)
    .then((response) => response["message"]);
};

export const listSnaps = async () => {
  return await client.get("/snaps").then((response) => response.data);
};

export const getSnap = async (snapId) => {
  return await client.get("/snap/" + snapId).then((response) => response.data);
};

export const upsertSnap = async (data) => {
  // TODO: requires auth!
  // for create you need to be authenticated
  // for update you need to be authorized
  return await client.post("/snap/", data).then((response) => response.data);
};

export const deleteSnap = async (snapId) => {
  // TODO: requires authorization
  return await client
    .delete("/snap/" + snapId)
    .then((response) => response.data);
};

// -- User endpoints
export const listUsers = async () => {
  return await client.get("/users").then((response) => response.data);
};

export const getUser = async (username) => {
  return await client
    .get("/user/" + username)
    .then((response) => response.data);
};

export const editUser = async (username, data) => {
  // for update you need to be authorized
  return await client
    .post("/user/" + username, data)
    .then((response) => response.data);
};

export const deleteUser = async (username) => {
  // for update you need to be authorized
  return await client
    .delete("/user/" + username)
    .then((response) => response.data);
};

// -- Auth endpoints
export const register = async (data) => {
  return await client.post("/register", data).then((response) => response.data);
};

export const login = async (data) => {
  return await client.post("/login", data).then((response) => response.data);
};

export const me = async (data) => {
  return await client.get("/me", data).then((response) => response.data);
};

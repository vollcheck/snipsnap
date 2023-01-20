import { BASE_BACKEND_URL } from "./config";
import axios from "axios";
import { cloneElement } from "react";

// -- Client defintion
const client = axios.create({
  baseURL: BASE_BACKEND_URL,
  headers: { "Content-Type": "application/json" },
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

export const getUserSnaps = async (username) => {
  return await client
    .get(`/user/${username}/snaps`)
    .then((response) => response.data);
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
  console.log(username);
  return await client
    .get(`/user/${username}`)
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

export const register = async (data) => {
  return await client.post("/register", data).then((response) => response.data);
};

export const login = async (data) => {
  return await client.post("/login", data).then((response) => response.data);
};

export const getMe = async (token) => {
  // Alter defaults after instance has been created
  client.defaults.headers.common["Authorization"] = `Token ${token}`;
  const me = await client
    .get("/me")
    .then((response) => response.data.body.user);

  // const mySnaps = await client
  //   .get(`/user/${username}/snaps`)
  //   .then((response) => response.data);
  // // that's hack as well :^)
  delete client.defaults.headers.common.Authorization;
  return me;
};

// export const isAuthenticated = async (token) => {
//   // Alter defaults after instance has been created
//   client.defaults.headers.common["Authorization"] = `Token ${token}`;
//   return await client
//     .options("/me")
//     .then((response) => response.data.body.token)
//     .catch((_) => false);
// };

export const test_cors = async (data) => {
  return await client
    .post("/login", data)
    .then((response) => response.data)
    .catch((error) => console.log(error));
};

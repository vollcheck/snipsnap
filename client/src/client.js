import { BASE_BACKEND_URL } from "./config";
import axios from "axios";

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

export const upsertSnap = async (token, userId, name, content, languageId) => {
  console.log(token);
  client.defaults.headers.common["Authorization"] = `Token ${token}`;
  const result = await client
    .post("/snap/", {
      user_id: userId,
      name: name,
      content: content,
      language_id: languageId,
    })
    .then((response) => response.data);
  delete client.defaults.headers.common.Authorization;
  return result;
};

export const deleteSnap = async (token, snapId) => {
  client.defaults.headers.common["Authorization"] = `Token ${token}`;
  const result = await client
    .delete("/snap/" + snapId)
    .then((response) => response.data);
  delete client.defaults.headers.common.Authorization;
  return result;
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
  // client.defaults.headers.common["Authorization"] = `Token ${token}`;
  const response = await client
    .post("/register", data)
    .then((response) => response.data);
  // delete client.defaults.headers.common.Authorization;
  return response;
};

export const login = async (data) => {
  return await client.post("/login", data).then((response) => response.data);
};

export const getMe = async () => {
  const token = localStorage.getItem("snipsnap-token");
  client.defaults.headers.common["Authorization"] = `Token ${token}`;
  const me = await client
    .get("/me")
    .then((response) => response.data.body.user);
  delete client.defaults.headers.common.Authorization;
  return { ...me, token };
};

export const test_cors = async (data) => {
  return await client
    .post("/login", data)
    .then((response) => response.data)
    .catch((error) => console.log(error));
};

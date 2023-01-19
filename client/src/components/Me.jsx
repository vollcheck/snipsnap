import {
  Card,
  Container,
  Content,
  Heading,
  Image,
  Media,
} from "react-bulma-components";
import { Form, useFetcher, useLoaderData } from "react-router-dom";
import { capitalize, timeConverter } from "../utils";
import { getMe, getUserSnaps } from "../client";

import { Box } from "react-bulma-components";
import { Link } from "react-router-dom";
import UserProfile from "./UserProfile";
import useToken from "./useToken";

export async function loader() {
  const token = localStorage.getItem("snipsnap-token");

  const me = await getMe(token);

  const myUsername = me["user/username"];

  const mySnaps = await getUserSnaps(myUsername);

  return me;
}

export default function Me() {
  const me = useLoaderData();
  const myUsername = me["user/username"];
  console.log(myUsername);

  // return <UserProfile username={me.username} />;
}

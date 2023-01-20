import {
  Card,
  Columns,
  Container,
  Content,
  Heading,
  Image,
  Media,
} from "react-bulma-components";
import { getUser, getUserSnaps } from "../client";

import { Link } from "react-router-dom";
import SnapList from "./SnapList";
import UserCard from "./UserCard";
import { useLoaderData } from "react-router-dom";

export async function loader({ params }) {
  const username = params.username;
  const user = await getUser(username);

  if (!user) {
    throw new Response("", {
      status: 404,
      statusText: "Not found",
    });
  }
  const userSnaps = await getUserSnaps(user["user/username"]);
  return { user, userSnaps };
}

export default function UserProfile() {
  const { user, userSnaps } = useLoaderData();

  return (
    <>
      <Container>
        <UserCard user={user} />
        <SnapList snaps={userSnaps} />
      </Container>
    </>
  );
}

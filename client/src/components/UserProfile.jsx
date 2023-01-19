import {
  Card,
  Columns,
  Container,
  Content,
  Heading,
  Image,
  Media,
} from "react-bulma-components";

import { Link } from "react-router-dom";
import { getUser } from "../client";
import { useLoaderData } from "react-router-dom";

export async function loader({ username }) {
  const user = getUser(username);
  if (!user) {
    throw new Response("", {
      status: 404,
      statusText: "Not found",
    });
  }
  return user;
}

export default function User() {
  const user = useLoaderData();
  const user_avatar = user["user/avatar"]
    ? user["user/avatar"]
    : "hide-the-pain-harold.jpg";
  const userLink = `/user/${user["user/username"]}`;

  return (
    <>
      <Container>
        <Columns>{user["user/username"]}</Columns>
      </Container>

      <Card style={{ width: 300, marginBottom: "20px", margin: "auto" }}>
        <Card.Image size="4by4" src={user["user/avatar"]} />
        <Card.Content>
          <Media>
            <Media.Item>
              <Heading size={4}>
                <Link to={userLink}>{user["user/username"]}</Link>
              </Heading>
              <Heading subtitle size={6}>
                {user["user/email"]}
              </Heading>
            </Media.Item>
          </Media>
          <Content>{user["user/bio"]}</Content>
        </Card.Content>
      </Card>
    </>
  );
}

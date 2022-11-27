import {
  Card,
  Container,
  Content,
  Heading,
  Image,
  Media,
} from "react-bulma-components";
import { capitalize, timeConverter } from "../utils";

import { Box } from "react-bulma-components";
import { Link } from "react-router-dom";

const user = {
  "user/id": 1,
  "user/username": "vollcheck",
  "user/password": "admin",
  "user/email": "vollcheck@snipsnap.com",
  "user/avatar": "https://avatars.githubusercontent.com/u/42350899?v=4",
  "user/bio": "clojure enjoyer",
};

const UserCard = ({ user, index }) => {
  const user_avatar = user["user/avatar"]
    ? user["user/avatar"]
    : "hide-the-pain-harold.jpg";

  return (
    <Card style={{ width: 300, marginBottom: "20px", margin: "auto" }}>
      <Card.Image size="4by4" src={user_avatar} />
      <Card.Content>
        <Media>
          <Media.Item>
            <Heading size={4}>{user["user/username"]}</Heading>
            <Heading subtitle size={6}>
              {user["user/email"]}
            </Heading>
          </Media.Item>
        </Media>
        <Content>{user["user/bio"]}</Content>
      </Card.Content>
    </Card>
  );
};

export default UserCard;

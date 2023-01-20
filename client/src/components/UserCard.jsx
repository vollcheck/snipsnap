import { Card, Content, Heading, Media } from "react-bulma-components";

import { Link } from "react-router-dom";
import { getUserAvatar } from "../utils";

const UserCard = ({ user }) => {
  const userAvatar = getUserAvatar(user);
  const userLink = `/user/${user["user/username"]}`;

  return (
    <Card style={{ width: 300, marginBottom: "20px", margin: "auto" }}>
      <Card.Image size="4by4" src={userAvatar} />
      <Card.Content>
        <Heading size={4}>
          <Link to={userLink}>{user["user/username"]}</Link>
        </Heading>
        <Heading subtitle size={6}>
          {user["user/email"]}
        </Heading>
        <Content>{user["user/bio"]}</Content>
      </Card.Content>
    </Card>
  );
};

export default UserCard;

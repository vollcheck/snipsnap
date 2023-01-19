import { Card, Content, Heading, Media } from "react-bulma-components";

import { Link } from "react-router-dom";

const UserCard = ({ user }) => {
  const user_avatar = user["user/avatar"]
    ? user["user/avatar"]
    : "hide-the-pain-harold.jpg";

  const userLink = `/user/${user["user/username"]}`;

  return (
    <Card style={{ width: 300, marginBottom: "20px", margin: "auto" }}>
      <Card.Image size="4by4" src={user_avatar} />
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
  );
};

export default UserCard;

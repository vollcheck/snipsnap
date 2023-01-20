import { Box, Container } from "react-bulma-components";

import { Link } from "react-router-dom";

const SnapCard = ({ snap, index }) => {
  const snap_index = `snapCard_${index}`;
  const username = snap["user/username"];

  return (
    <Container id={snap_index}>
      <Box style={{ margin: "1rem" }}>
        <p className="subtitle is-4">
          <a href={`/user/${username}`}>{username}</a>
        </p>

        <Link
          to={`snap/${snap["snap/id"]}`}
          style={{ display: "block" }}
          className="title is-1"
        >
          {snap["snap/name"]}
        </Link>
      </Box>
    </Container>
  );
};

export default SnapCard;

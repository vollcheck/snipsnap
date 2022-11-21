import { Card, Container } from "react-bulma-components";
import { capitalize, timeConverter } from "../utils";

import { Box } from "react-bulma-components";
import { Link } from "react-router-dom";

const SnapCard = ({ snap, index }) => {
  let last_date;
  if (snap["snap/update_date"]) {
    last_date = `Updated ${timeConverter(parseInt(snap["snap/update_date"]))}`;
  } else {
    last_date = `Created ${timeConverter(parseInt(snap["snap/create_date"]))}`;
  }

  const snap_index = `snapCard_${index}`;
  const snap_lang = snap["language/name"]
    ? `Written in ${capitalize(snap["language/name"])}`
    : "-";
  const snap_detail = `snap/${snap["snap/id"]}`;

  return (
    <Container id={snap_index}>
      <Box>
        <Link to={snap_detail} style={{ display: "block" }} relative="route">
          <p className="title is-1">{snap["snap/name"]}</p>
          <p className="subtitle is-3">
            <a href="/">{snap["user/username"]}</a>
          </p>
          <Card.Footer>
            <Card.Footer.Item>
              <span>{snap_lang}</span>
            </Card.Footer.Item>
            <Card.Footer.Item>
              <span>{last_date}</span>
            </Card.Footer.Item>
          </Card.Footer>
        </Link>
      </Box>
    </Container>
  );
};

export default SnapCard;

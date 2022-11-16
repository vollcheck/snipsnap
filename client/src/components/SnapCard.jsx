import { capitalize, timeConverter } from "../utils";

import { Card } from "react-bulma-components";
import { Link } from "react-router-dom";

const SnapCard = ({ snap }) => {
  let last_date;
  if (snap["snap/update_date"]) {
    last_date = `Updated ${timeConverter(parseInt(snap["snap/update_date"]))}`;
  } else {
    last_date = `Created ${timeConverter(parseInt(snap["snap/create_date"]))}`;
  }

  const snap_detail = `snap/${snap["snap/id"]}`;

  return (
    <Card>
      <Card.Content>
        <Link to={snap_detail} relative="route">
          <p className="title">{snap["snap/name"]}</p>
        </Link>
        <p className="subtitle">
          <a href="/">{snap["user/username"]}</a>
        </p>
      </Card.Content>
      <Card.Footer>
        <Card.Footer.Item>
          {/* <span>Written in {capitalize(snap["language/name"])}</span> */}
          <span>Written in {snap["language/name"]}</span>
        </Card.Footer.Item>
        <Card.Footer.Item>
          <span>{last_date}</span>
        </Card.Footer.Item>
      </Card.Footer>
    </Card>
  );
};

export default SnapCard;

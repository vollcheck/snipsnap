import { Box, Button, Card, Container, Content } from "react-bulma-components";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { capitalize, timeConverter } from "../utils";

import { deleteSnap } from "../client";
import { getSnap } from "../client";
import { getToken } from "../utils";

export async function loader({ params }) {
  const snap = getSnap(params.snapId);
  if (!snap) {
    throw new Response("", {
      status: 404,
      statusText: "Not found",
    });
  }
  return snap;
}

export default function SnapDetail() {
  const snap = useLoaderData();
  const navigate = useNavigate();

  const _deleteSnap = async () => {
    const token = getToken();
    const result = deleteSnap(token, snap["snap/id"]);
    console.log(result);
    navigate("/");
  };

  // Do not tell anybody that this is repeated code
  let last_date;
  if (snap["snap/update_date"]) {
    last_date = `Updated ${timeConverter(parseInt(snap["snap/update_date"]))}`;
  } else {
    last_date = `Created ${timeConverter(parseInt(snap["snap/create_date"]))}`;
  }

  const snap_lang = snap["language/name"]
    ? `Written in ${capitalize(snap["language/name"])}`
    : "-";

  const author = snap["user/username"];

  return (
    <Container>
      <Box>
        {/* TODO: edit */}
        <p className="title is-1">{snap["snap/name"]}</p>
        <Link className="subtitle is-3" to={`/user/${author}`}>
          {author}
        </Link>
        <Content>
          <pre>
            <code className={`language-${snap["language/name"]}`}>
              {snap["snap/content"]}
            </code>
          </pre>
        </Content>
        <Card.Footer>
          <Card.Footer.Item>
            <span>{snap_lang}</span>
          </Card.Footer.Item>
          <Card.Footer.Item>
            <span>{last_date}</span>
          </Card.Footer.Item>
        </Card.Footer>
        <Button color="danger" type="submit" onClick={_deleteSnap}>
          Delete
        </Button>
      </Box>
    </Container>
  );
}

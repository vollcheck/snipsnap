import { Box, Card, Container, Content } from "react-bulma-components";
import { Form, Link, useFetcher, useLoaderData } from "react-router-dom";
import { capitalize, timeConverter } from "../utils";
import { getSnap, login, test_cors, upsertSnap } from "../client";

import SnapCard from "../components/SnapCard";

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

export async function action({ request, params }) {
  let formData = await request.formData();
  return upsertSnap(params.snapId, {
    favorite: formData.get("favorite") === "true",
  });
}

export default function Snap() {
  const snap = useLoaderData();
  console.log(snap);

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

  return (
    <Container>
      <Box>
        {/* TODO: edit */}
        {/* TODO: delete */}
        <p className="title is-1">{snap["snap/name"]}</p>
        <p className="subtitle is-3">
          <a href="/">{snap["user/username"]}</a>
        </p>
        <Content>
          <pre>{snap["snap/content"]}</pre>
        </Content>
        <Card.Footer>
          <Card.Footer.Item>
            {/* <span>Written in {capitalize(snap["language/name"])}</span> */}
            <span>{snap_lang}</span>
          </Card.Footer.Item>
          <Card.Footer.Item>
            <span>{last_date}</span>
          </Card.Footer.Item>
        </Card.Footer>
      </Box>
    </Container>
  );
}

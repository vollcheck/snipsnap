import { Box, Button, Form } from "react-bulma-components";
import {
  Form as RForm,
  redirect,
  useLoaderData,
  useNavigate,
} from "react-router-dom";

import { getToken } from "../utils";
import { updateSnap } from "../client";

export async function action({ request, params }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  const token = getToken();
  await updateSnap(token, params.snapId, updates);
  return redirect(`/snap/${params.snapId}`);
}

export default function SnapEdit() {
  const snap = useLoaderData();

  return (
    <Box style={{ margin: "5rem" }}>
      <RForm method="post" id="snap-form">
        <Form.Field>
          <Form.Label>Name</Form.Label>
          <Form.Control>
            <Form.Input
              color="info"
              placeholder="Name"
              aria-label="Snap name"
              type="text"
              name="name"
              defaultValue={snap["snap/name"]}
            />
          </Form.Control>
        </Form.Field>

        <Form.Field>
          <Form.Label>Content</Form.Label>
          <Form.Control>
            <Form.Textarea
              style={{ fontFamily: "monospace" }}
              color="info"
              name="content"
              defaultValue={snap["snap/content"]}
            />
          </Form.Control>
        </Form.Field>

        <Form.Field>
          <Form.Label>Language</Form.Label>
          <Form.Control>
            <Form.Input
              name="language"
              placeholder="Clojure"
              defaultValue={snap["language/name"]}
              color="info"
            />
          </Form.Control>
        </Form.Field>

        {/* <p>
          <button type="submit">Save</button>
          <button
            type="button"
            onClick={() => {
              navigate(-1);
            }}
          >
            Cancel
          </button>
        </p> */}

        <Form.Field kind="group">
          <Form.Control>
            <Button color="link" type="submit">
              Submit
            </Button>
          </Form.Control>
        </Form.Field>
      </RForm>
    </Box>
  );
}

import { Box, Button, Form } from "react-bulma-components";
import { getMe, upsertSnap } from "../client";
import { useEffect, useState } from "react";

import { getToken } from "../utils";
import { useNavigate } from "react-router-dom";

export default function SnapCreate() {
  // TODO: prefetch the languages
  const [name, setName] = useState();
  const [content, setContent] = useState();
  // eslint-disable-next-line
  const [languageId, setLanguageId] = useState();
  const [error, setError] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const me = await getMe();
    const createdSnap = await upsertSnap(
      me["token"],
      me["user/id"],
      name,
      content,
      1
    );

    if (!createdSnap) {
      setError("Error while creating new snap");
    } else {
      navigate(`/snap/${createdSnap["snap/id"]}`);
    }
  };

  return (
    <Box style={{ margin: "5rem" }}>
      <form onSubmit={handleSubmit}>
        <Form.Field>
          <Form.Label>Name</Form.Label>
          <Form.Control>
            <Form.Input
              color="info"
              onChange={(e) => {
                return setName(e.target.value);
              }}
            />
          </Form.Control>
        </Form.Field>

        <Form.Field>
          <Form.Label>Content</Form.Label>
          <Form.Control>
            <Form.Textarea
              style={{ fontFamily: "monospace" }}
              color="info"
              onChange={(e) => {
                return setContent(e.target.value);
              }}
            />
          </Form.Control>
        </Form.Field>

        <Form.Field>
          <Form.Label>Language</Form.Label>
          <Form.Control>
            <Form.Input
              color="info"
              onChange={(e) => {
                return setLanguageId(e.target.value);
              }}
            />
          </Form.Control>
        </Form.Field>

        {error ? <Form.Help color="danger">{error}</Form.Help> : <></>}

        <Form.Field kind="group">
          <Form.Control>
            <Button color="link" type="submit">
              Submit
            </Button>
          </Form.Control>
        </Form.Field>
      </form>
    </Box>
  );
}

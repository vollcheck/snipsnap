import { Box, Button, Container, Form, Icon } from "react-bulma-components";
import { Form as RouterForm, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import React from "react";
import { login } from "../client";
import { toast } from "react-toastify";
import useToken from "./useToken";

export async function action({ request, params }) {
  console.log(await request.formData());
  return 0;
}

export default function Login() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState(null);
  const { token, setToken } = useToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      console.log("i'm already authenticated!");
      // toast("You are already logged!");
      navigate("/");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await login({
      username,
      password,
    });

    if (response.status === 404) {
      setError(response.body.error);
    } else if (response.status === 200) {
      const receivedToken = response.body.token;
      console.log("I have a token: " + receivedToken);
      setToken(receivedToken);
      // toast("You are already logged!");
      navigate(-1); // navigate to the previous page
    }
  };

  return (
    <Box style={{ margin: "auto" }}>
      <form onSubmit={handleSubmit}>
        <Form.Field>
          <Form.Label>Username</Form.Label>
          <Form.Control>
            <Form.Input
              color="success"
              onChange={(e) => {
                return setUsername(e.target.value);
              }}
            />
          </Form.Control>
        </Form.Field>

        <Form.Field>
          <Form.Label>Password</Form.Label>
          <Form.Control>
            <Form.Input
              color="danger"
              type="password"
              onChange={(e) => {
                return setPassword(e.target.value);
              }}
            />
          </Form.Control>
          {error ? <Form.Help color="danger">{error}</Form.Help> : <></>}
        </Form.Field>

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

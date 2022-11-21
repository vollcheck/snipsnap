import { Box, Button, Container, Form, Icon } from "react-bulma-components";

import { Form as RouterForm } from "react-router-dom";
import { login } from "../client";
import { useState } from "react";

export async function action({ request, params }) {
  console.log(await request.formData());
  return 0;
}

const setToken = (token) => {
  localStorage.setItem("token", token);
  return 0;
};

const getToken = () => {
  const token = localStorage.getItem("token");
  return token;
};

export default function Login() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const [error, setError] = useState(null);

  // const { token, setToken } = useToken();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await login({
      username,
      password,
    });

    if (response.status === 404) {
      setError(response.body.error);
    } else if (response.status === 200) {
      const token = response.body.token;
      console.log(token);
      setToken(token);
    }
    console.log(response);
    // setToken(token);
  };

  return (
    <Box>
      {/* <RouterForm method="post" action="/login"> */}
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
            <Icon align="left" size="small">
              <i className="fas fa-user" />
            </Icon>
            <Icon align="right" size="small">
              <i className="fas fa-check" />
            </Icon>
          </Form.Control>
          {/* <Form.Help color="success">This username is available</Form.Help> */}
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
            <Icon align="left" size="small">
              <i className="fas fa-lock" />
            </Icon>
            <Icon align="right" size="small">
              <i className="fas fa-exclamation-triangle" />
            </Icon>
          </Form.Control>
          {error ? <Form.Help color="danger">{error}</Form.Help> : <br />}
        </Form.Field>

        <Form.Field kind="group">
          <Form.Control>
            <Button color="link" type="submit">
              Submit
            </Button>
          </Form.Control>
        </Form.Field>
      </form>
      {/* </RouterForm> */}
    </Box>
  );
}

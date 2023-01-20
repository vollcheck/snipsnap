import { getMe } from "../client";
import { getToken } from "../utils";
import { useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export async function loader() {
  const token = getToken();
  const me = await getMe(token);
  const myUsername = me["user/username"];

  return myUsername;
}

export default function Me() {
  const myUsername = useLoaderData();
  const navigate = useNavigate();

  useEffect(() => {
    navigate(`/user/${myUsername}`);
  }, []);
}

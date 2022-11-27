import { Columns } from "react-bulma-components";
import UserCard from "./UserCard";
import { listUsers } from "../client";
import { useLoaderData } from "react-router-dom";

export async function loader({ request }) {
  // const url = new URL(request.url);
  // const q = url.searchParams.get("q");
  // const snaps = await listSnaps(q);
  // return { snaps, q };
  const users = await listUsers();
  return { users };
}

const UserList = () => {
  const { users } = useLoaderData();
  console.log(users);
  return (
    <Columns>
      {users.length ? (
        users.map((user, index) => (
          <Columns.Column>
            <UserCard user={user} index={index} />
          </Columns.Column>
        ))
      ) : (
        <p>
          <i>No users!</i>
        </p>
      )}
    </Columns>
  );
};

export default UserList;

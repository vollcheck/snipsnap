import { Columns } from "react-bulma-components";
import UserCard from "./UserCard";
import { listUsers } from "../client";
import { useLoaderData } from "react-router-dom";

export async function loader({ request }) {
  const users = await listUsers();

  // DEBUG
  console.log(users);

  return { users };
}

const UserList = () => {
  const { users } = useLoaderData();
  return (
    <Columns>
      {users.length ? (
        users.map((user, index) => (
          <Columns.Column key={index}>
            <UserCard user={user} />
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

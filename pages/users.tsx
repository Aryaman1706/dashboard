import type { NextPage, GetServerSideProps } from "next";
import type { TUser } from "../components/Users/types";
import type { TDataItem } from "../types/usersPage.types";
import UsersTable from "../components/Users/UsersTable";

type Props = {
  users: TUser[];
};

const Users: NextPage<Props> = ({ users }) => {
  return (
    <>
      {users.length > 0 ? <UsersTable users={users} /> : <p>No Users Found</p>}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await response.json();

    const users: TUser[] = data.map((obj: TDataItem) => ({
      id: obj.id,
      name: obj.name,
      email: obj.email,
    }));

    return { props: { users } };
  } catch (error) {
    return { props: { users: [] } };
  }
};

export default Users;

import type { NextComponentType, NextPageContext } from "next";
import type { TUser } from "./types";
import Row from "./UsersTableRow";

export type Props = {
  users: TUser[];
};

const UsersTable: NextComponentType<NextPageContext, {}, Props> = ({
  users,
}) => {
  return (
    <div>
      {users.map((user) => (
        <Row key={user.email} user={user} />
      ))}
    </div>
  );
};

export default UsersTable;

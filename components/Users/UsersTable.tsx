import type { NextComponentType, NextPageContext } from "next";
import type { TUser } from "./types";
import useFetch, { Status } from "../../hooks/useFetch";
import Row from "./UsersTableRow";
import useSearch from "../../hooks/useSearch";
import UserSearch from "./UserSearch";
import User from "./User";

export type Props = {
  users: TUser[];
};

const filter = (obj: TUser, keyword: string) => {
  const email = obj.email.trim().toLowerCase();
  const name = obj.name.trim().toLowerCase();
  const search = keyword.trim().toLowerCase();

  if (email.includes(search) || name.includes(search)) {
    return true;
  }

  return false;
};

const UsersTable: NextComponentType<NextPageContext, {}, Props> = ({
  users,
}) => {
  const [changeHandler, state] = useSearch<TUser[]>(users, filter);
  const [get, reset, selectUser, error, status] = useFetch();

  const clickHandler = (id: number) => {
    get(`https://jsonplaceholder.typicode.com/users/${id}`);
  };

  const conditionalRender = () => {
    if (status === Status.idle) {
      return (
        <>
          <Row
            bold={true}
            user={{ id: "User ID", name: "User Name", email: "User Email" }}
          />
          {state.map((user) => (
            <Row key={user.email} user={user} clickHandler={clickHandler} />
          ))}
        </>
      );
    }

    if (status === Status.loading) {
      return <p>Loading...</p>;
    }

    if (status === Status.success) {
      return <User user={selectUser} />;
    }

    if (status === Status.failed) {
      return <p>Unable to fetch user</p>;
    }
  };

  return (
    <div>
      <UserSearch changeHandler={changeHandler} clearHandler={reset} />
      <br /> <br />
      {conditionalRender()}
    </div>
  );
};

export default UsersTable;

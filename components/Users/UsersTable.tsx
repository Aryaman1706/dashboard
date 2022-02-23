import type { NextComponentType, NextPageContext } from "next";
import type { TUser } from "./types";
import useFetch, { Status } from "../../hooks/useFetch";
import Row from "./UsersTableRow";
import useSearch from "../../hooks/useSearch";
import UserSearch from "./UserSearch";
import User from "./User";
import { useBlockUserCore } from "../../hooks/useBlockUser";

export type Props = {
  users: TUser[];
  removeUser?: boolean;
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
  removeUser,
}) => {
  const [changeHandler, state, setState] = useSearch<TUser[]>(users, filter);
  const [get, reset, selectUser, _, status] = useFetch();
  const [block, unblock] = useBlockUserCore(5 * 60 * 1000);

  const clickHandler = (id: number) => {
    get(`https://jsonplaceholder.typicode.com/users/${id}`);
  };

  const conditionalRender = () => {
    if (status === Status.idle) {
      return (
        <>
          <Row
            header={true}
            user={{
              // @ts-expect-error
              id: "User ID",
              name: "User Name",
              email: "User Email",
              // @ts-expect-error
              topUser: "Top User",
              // @ts-expect-error
              blocked: "Blocked",
            }}
          />
          {state.map((user) => (
            <Row
              key={user.email}
              user={user}
              clickHandler={clickHandler}
              removeUser={removeUser}
              setUsers={setState}
              block={block}
              unblock={unblock}
            />
          ))}
        </>
      );
    }

    if (status === Status.loading) {
      return <p>Loading...</p>;
    }

    if (status === Status.success && selectUser) {
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

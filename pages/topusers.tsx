import type { NextPage } from "next";
import type { TUser } from "../components/Users/types";
import type { TDataItem } from "../types/usersPage.types";
import { useCallback, useEffect, useState } from "react";
import useFetch, { Status } from "../hooks/useFetch";
import UsersTable from "../components/Users/UsersTable";
import { Prefix } from "../constants/prefix";

const TopUsers: NextPage = () => {
  const [users, setUsers] = useState<TUser[]>([]);

  const successCb = useCallback((data: TDataItem[]) => {
    const result: TUser[] = [];

    data.forEach((obj) => {
      const isTopUser = !!window.localStorage.getItem(
        `${Prefix.TOP_USER}_${obj.id}`
      );

      if (isTopUser) {
        result.push({
          id: obj.id,
          name: obj.name,
          email: obj.email,
          topUser: isTopUser,
          blocked: !!window.localStorage.getItem(
            `${Prefix.BLOCKED_USER}_${obj.id}`
          ),
        });
      }
    });

    setUsers(result);
  }, []);

  const [get, _, __, error, status] = useFetch(successCb);

  useEffect(() => {
    get(`https://jsonplaceholder.typicode.com/users`);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const conditionalRender = () => {
    if (status === Status.loading || status === Status.idle) {
      return <p>Loading...</p>;
    }

    if (status === Status.success) {
      return (
        <>
          {users.length > 0 ? (
            <UsersTable users={users} removeUser={true} />
          ) : (
            <p>No Top Users</p>
          )}
        </>
      );
    }

    if (status === Status.failed) {
      return <p>{error}</p>;
    }
  };

  return <>{conditionalRender()}</>;
};

export default TopUsers;

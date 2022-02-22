import type { NextComponentType, NextPageContext } from "next";
import type { TUser } from "./types";
import { ChangeEventHandler, Dispatch, SetStateAction, useState } from "react";
import styles from "../../styles/UsersTableRow.module.css";

export type Props = {
  user: TUser;
  clickHandler?: (id: number) => void;
  header?: boolean;
  removeUser?: boolean;
  setUsers?: Dispatch<SetStateAction<TUser[]>>;
};

const UsersTable: NextComponentType<NextPageContext, {}, Props> = ({
  user,
  clickHandler,
  header,
  removeUser,
  setUsers,
}) => {
  const { id, name, email, topUser } = user;
  const [top, setTop] = useState<boolean>(topUser);

  const cellClassname = header
    ? `${styles.users_table_row_cell} ${styles.bold}`
    : styles.users_table_row_cell;

  const checkedHandler: ChangeEventHandler<HTMLInputElement> = (_) => {
    if (top) {
      window.localStorage.removeItem(`top_user_${id}`);

      removeUser &&
        setUsers &&
        setUsers((prev) => {
          const newUsers = prev.filter((user) => user.id !== id);
          console.log("SetUsers", newUsers);
          return newUsers;
        });
    } else {
      window.localStorage.setItem(`top_user_${id}`, "true");
    }

    setTop((prev) => !prev);
  };

  return (
    <div className={styles.users_table_row}>
      <div className={cellClassname}>{id}</div>
      <div
        className={`${cellClassname} ${styles.pointer}`}
        onClick={() => {
          clickHandler && clickHandler(Number(id));
        }}
      >
        {name}
      </div>
      <div
        className={`${cellClassname} ${styles.pointer}`}
        onClick={() => {
          clickHandler && clickHandler(Number(id));
        }}
      >
        {email}
      </div>
      {header ? (
        <div className={cellClassname}>{topUser}</div>
      ) : (
        <div className={cellClassname}>
          <input
            type="checkbox"
            checked={top}
            onChange={(e) => checkedHandler(e)}
          />
        </div>
      )}
    </div>
  );
};

export default UsersTable;

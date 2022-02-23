import type { NextComponentType, NextPageContext } from "next";
import type { TUser } from "./types";
import { Dispatch, SetStateAction } from "react";
import styles from "../../styles/UsersTableRow.module.css";
import useTopUser from "../../hooks/useTopUser";
import { useBlockUser } from "../../hooks/useBlockUser";

export type Props = {
  user: TUser;
  clickHandler?: (id: number) => void;
  header?: boolean;
  removeUser?: boolean;
  setUsers?: Dispatch<SetStateAction<TUser[]>>;
  block: (id: number, blockedCb?: () => void, unblockedCb?: () => void) => void;
  unblock: (id: number, forced?: boolean, cb?: () => void) => void;
};

const UsersTable: NextComponentType<NextPageContext, {}, Props> = ({
  user,
  clickHandler,
  header,
  removeUser,
  setUsers,
  block,
  unblock,
}) => {
  const { id, name, email, topUser, blocked } = user;
  const [top, topCheckHandler] = useTopUser(topUser, id, removeUser, setUsers);
  const [blockedUser, blockCheckHandler] = useBlockUser(
    blocked,
    id,
    block,
    unblock
  );

  const cellClassname = header
    ? `${styles.users_table_row_cell} ${styles.bold}`
    : styles.users_table_row_cell;

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
        <>
          <div className={cellClassname}>{topUser}</div>
          <div className={cellClassname}>{blocked}</div>
        </>
      ) : (
        <>
          <div className={cellClassname}>
            <input
              type="checkbox"
              checked={top}
              onChange={(e) => topCheckHandler(e)}
            />
          </div>
          <div className={cellClassname}>
            <input
              type="checkbox"
              checked={blockedUser}
              onChange={(e) => blockCheckHandler(e)}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default UsersTable;

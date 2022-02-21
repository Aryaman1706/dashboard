import type { NextComponentType, NextPageContext } from "next";
import type { TUser } from "./types";
import styles from "../../styles/UsersTableRow.module.css";

export type Props = {
  user: TUser;
  clickHandler?: (id: number) => void;
  bold?: boolean;
};

const UsersTable: NextComponentType<NextPageContext, {}, Props> = ({
  user,
  clickHandler,
  bold,
}) => {
  const { id, name, email } = user;
  const cellClassname = bold
    ? `${styles.users_table_row_cell} ${styles.bold}`
    : styles.users_table_row_cell;

  return (
    <div
      className={styles.users_table_row}
      onClick={() => {
        clickHandler && clickHandler(Number(id));
      }}
    >
      <div className={cellClassname}>{id}</div>
      <div className={cellClassname}>{name}</div>
      <div className={cellClassname}>{email}</div>
    </div>
  );
};

export default UsersTable;

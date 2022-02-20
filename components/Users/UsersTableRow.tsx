import type { NextComponentType, NextPageContext } from "next";
import type { TUser } from "./types";
import styles from "../../styles/UsersTableRow.module.css";

export type Props = {
  user: TUser;
};

const UsersTable: NextComponentType<NextPageContext, {}, Props> = ({
  user,
}) => {
  const { id, name, email } = user;

  return (
    <div className={styles.users_table_row}>
      <div className={styles.users_table_row_cell}>{id}</div>
      <div className={styles.users_table_row_cell}>{name}</div>
      <div className={styles.users_table_row_cell}>{email}</div>
    </div>
  );
};

export default UsersTable;

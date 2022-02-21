import type { NextComponentType, NextPageContext } from "next";
import type { ChangeEventHandler } from "react";
import styles from "../../styles/UserSearch.module.css";

type Props = {
  changeHandler: ChangeEventHandler<HTMLInputElement>;
  clearHandler: () => void;
};

const UserSearch: NextComponentType<NextPageContext, {}, Props> = ({
  changeHandler,
  clearHandler,
}) => {
  return (
    <div className={styles.search_container}>
      <h4 className={styles.search_text}>Search Users</h4>
      <input
        type="text"
        className={styles.search_input}
        onChange={(e) => changeHandler(e)}
      />
      <button className={styles.clear_btn} onClick={() => clearHandler()}>
        Clear
      </button>
    </div>
  );
};

export default UserSearch;

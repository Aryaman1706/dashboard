import type { NextComponentType } from "next";
import styles from "../../styles/Navbar.module.css";
import NavBtn from "./NavBtn";

const Navbar: NextComponentType = () => {
  return (
    <>
      <div className={styles.navbar_container}>
        <div className={styles.nav_btns_container}>
          <NavBtn text="Users" route="/users" />
          <NavBtn text="News" route="/news" />
          <NavBtn text="Top Users" route="/topusers" />
        </div>
        <div>
          <p>ham</p>
        </div>
      </div>
    </>
  );
};

export default Navbar;

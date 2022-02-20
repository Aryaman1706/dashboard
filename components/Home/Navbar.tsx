import type { NextComponentType } from "next";
import styles from "../../styles/Navbar.module.css";
import NavBtn from "./NavBtn";

const Navbar: NextComponentType = () => {
  return (
    <>
      <div className={styles.navbar_container}>
        <div className={styles.nav_btns_container}>
          <NavBtn text="Home" />
          <NavBtn text="Users" />
          <NavBtn text="News" />
        </div>
        <div className={styles.drawer_btn_container}>
          <p>ham</p>
        </div>
      </div>
    </>
  );
};

export default Navbar;

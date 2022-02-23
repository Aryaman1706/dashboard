import type { NextComponentType, NextPageContext } from "next";
import NavBtn from "./NavBtn";
import styles from "../../styles/Navbar.module.css";
import navbtnStyles from "../../styles/NavBtn.module.css";

type TProps = {
  toggleDrawer: () => void;
};

const Navbar: NextComponentType<NextPageContext, {}, TProps> = ({
  toggleDrawer,
}) => {
  return (
    <>
      <div className={styles.navbar_container}>
        <div className={styles.nav_btns_container}>
          <NavBtn text="Users" route="/users" />
          <NavBtn text="News" route="/news" />
          <NavBtn text="Top Users" route="/topusers" />
        </div>
        <div>
          <button
            className={navbtnStyles.nav_btn}
            onClick={() => toggleDrawer()}
          >
            Open
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;

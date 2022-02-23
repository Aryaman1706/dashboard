import type { NextComponentType, NextPageContext } from "next";
import styles from "../../styles/Drawer.module.css";
import navbtnStyles from "../../styles/NavBtn.module.css";

type TProps = {
  toggleDrawer: () => void;
};

const Drawer: NextComponentType<NextPageContext, {}, TProps> = ({
  toggleDrawer,
}) => {
  return (
    <div className={styles.drawer}>
      <div className={styles.close_btn_container}>
        <button className={navbtnStyles.nav_btn} onClick={() => toggleDrawer()}>
          Close
        </button>
      </div>
      <div className={styles.nav_btn_container}>
        <button className={navbtnStyles.nav_btn}> Home </button>
        <button className={navbtnStyles.nav_btn}>News</button>
        <button className={navbtnStyles.nav_btn}>LogOut</button>
      </div>
    </div>
  );
};

export default Drawer;

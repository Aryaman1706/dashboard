import type { NextComponentType, NextPageContext } from "next";
import styles from "../../styles/NavBtn.module.css";

type Props = {
  text: string;
};

const NavBtn: NextComponentType<NextPageContext, {}, Props> = ({ text }) => {
  return (
    <>
      <button className={styles.nav_btn}>{text}</button>
    </>
  );
};

export default NavBtn;

import type { NextComponentType } from "next";
import { useState } from "react";
import Navbar from "../Home/Navbar";
import Drawer from "../Home/Drawer";
import styles from "../../styles/Navbar.module.css";

const NavbarLayout: NextComponentType = ({ children }) => {
  const [showDrawer, setShowDrawer] = useState<boolean>(false);
  const clickHandler = () => {
    setShowDrawer((prev) => !prev);
  };

  const restClass = showDrawer
    ? `${styles.rest} ${styles.rest_shrink}`
    : styles.rest;

  return (
    <>
      <Navbar toggleDrawer={clickHandler} />
      {showDrawer && <Drawer toggleDrawer={clickHandler} />}
      <div className={restClass}>{children}</div>
    </>
  );
};

export default NavbarLayout;

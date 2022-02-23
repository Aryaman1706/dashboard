import type { NextComponentType, NextPageContext } from "next";
import { useRouter } from "next/router";
import { MouseEventHandler } from "react";
import styles from "../../styles/NavBtn.module.css";

type Props = {
  text: string;
  route: string;
};

const NavBtn: NextComponentType<NextPageContext, {}, Props> = ({
  text,
  route,
}) => {
  const router = useRouter();
  const currentRoute = router.pathname.trim();

  let cssClass: string = styles.nav_btn;
  if (route === "/") {
    cssClass =
      currentRoute === "/"
        ? cssClass.concat(` ${styles.nav_btn_active}`)
        : cssClass;
  } else {
    cssClass = currentRoute.includes(route)
      ? cssClass.concat(` ${styles.nav_btn_active}`)
      : cssClass;
  }

  const clickHandler: MouseEventHandler<HTMLButtonElement> = () => {
    router.push(route);
  };

  return (
    <>
      <button className={cssClass} onClick={clickHandler}>
        {text}
      </button>
    </>
  );
};

export default NavBtn;

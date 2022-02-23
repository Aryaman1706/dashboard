import type { NextComponentType } from "next";
import Navbar from "../Home/Navbar";

const NavbarLayout: NextComponentType = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default NavbarLayout;

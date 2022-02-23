import type { AppProps } from "next/app";
import NavbarLayout from "../components/Layout/NavbarLayout";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NavbarLayout>
      <Component {...pageProps} />
    </NavbarLayout>
  );
}

export default MyApp;

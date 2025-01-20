import { Reset } from "styled-reset";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Reset />
      <Component {...pageProps} />
    </>
  );
}

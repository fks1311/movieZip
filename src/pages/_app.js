import Layout from "@/components/Layout";
import GlobalStyle from "@/styles/GlobalStyle";
import theme from "@/styles/theme";
import Head from "next/head";
import { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";

export default function App({ Component, pageProps }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    isClient && (
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Layout>
          <Head>
            <title>MOVIE ZIP</title>
          </Head>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    )
  );
}

import Layout from "@/components/Layout";
import GlobalStyle from "@/styles/GlobalStyle";
import theme from "@/styles/theme";
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
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    )
  );
}

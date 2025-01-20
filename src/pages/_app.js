import Layout from "@/components/Layout";
import theme from "@/styles/theme";
import { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { Reset } from "styled-reset";

export default function App({ Component, pageProps }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    isClient && (
      <ThemeProvider theme={theme}>
        <Reset />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    )
  );
}

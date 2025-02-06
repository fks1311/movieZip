import Layout from "@/components/Layout";
import GlobalStyle from "@/styles/GlobalStyle";
import theme from "@/styles/theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Head from "next/head";
import { useEffect, useState } from "react";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";

export default function App({ Component, pageProps }) {
  const [isClient, setIsClient] = useState(false);
  const queryClient = new QueryClient();

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    isClient && (
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <GlobalStyle />
            <Layout>
              <Head>
                <title>MOVIE ZIP</title>
              </Head>
              <Component {...pageProps} />
            </Layout>
          </ThemeProvider>
        </QueryClientProvider>
      </RecoilRoot>
    )
  );
}

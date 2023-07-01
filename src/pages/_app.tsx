import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import Layout from "@/common/layout";

export default function App({ Component, pageProps }: AppProps) {
  const { layoutData } = pageProps || {};

  return (
    <>
      <Layout layoutData={layoutData}>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

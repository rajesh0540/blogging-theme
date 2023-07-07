import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import Layout from "@/common/layout";

export default function App({ Component, pageProps }: AppProps) {
  const { layoutData } = pageProps || {};

  // @ts-ignore
  const showLayout = Component.layout ?? true;

  return (
    <>
      {showLayout ? (
        <Layout layoutData={layoutData}>
          <Component {...pageProps} />
        </Layout>
      ) : (
        <Component {...pageProps} />
      )}
    </>
  );
}

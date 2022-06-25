import "@/styles/global.css";
import type { AppProps } from "next/app";

export default function MyApp({ Component, pageProps }: AppProps) {
  console.log("hit");
  return <Component {...pageProps} />;
}

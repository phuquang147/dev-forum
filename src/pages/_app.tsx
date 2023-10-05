import { ThemeProvider } from "@material-tailwind/react";
import type { AppProps } from "next/app";
import "~/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

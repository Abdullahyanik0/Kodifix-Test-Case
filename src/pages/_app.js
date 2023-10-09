import { Hydrate, QueryClientProvider } from "react-query";
import queryClient from "service/query-client";
import "styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Component {...pageProps} />
      </Hydrate>
    </QueryClientProvider>
  );
}

import { QueryClient } from "react-query";

const reactQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,

      staleTime: 0,

      cacheTime: 0,

      retry: false,

      keepPreviousData: true,
    },
  },
});

export default reactQueryClient;

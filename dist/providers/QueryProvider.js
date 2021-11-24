import React from "../../_snowpack/pkg/react.js";
import {QueryClient, QueryClientProvider} from "../../_snowpack/pkg/react-query.js";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 3600,
      refetchOnWindowFocus: false,
      retryOnMount: false
    }
  }
});
function QueryProvider({children}) {
  return /* @__PURE__ */ React.createElement(QueryClientProvider, {
    client: queryClient
  }, children);
}
export default QueryProvider;

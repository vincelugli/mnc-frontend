import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Matchmaker from "./matchmaker/Matchmaker";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Matchmaker />
    </QueryClientProvider>
  );
}

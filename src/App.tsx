import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Matchmaker from "./matchmaker/Matchmaker";
import { createBrowserRouter, RouterProvider} from 'react-router-dom';

import { Container } from './components/counter';
import Root from "./components/Root";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    errorElement: <div>Hello world!</div>,
    children: [
      {
        path: "/matchmaker",
        element: <Matchmaker/>,
      },
      {
        path: "/playerOverview",
        element: <Container/>,
      }
    ]
  },
]);

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

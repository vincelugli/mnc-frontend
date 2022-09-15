import { createBrowserRouter} from 'react-router-dom';

import { PlayerOverview } from "../playerOverview/PlayerOverview";
import Home from '../home/Home';
import Matchmaker from '../matchmaker/Matchmaker';
import Root from "./Root";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    errorElement: <div>Hello world!</div>,
    children: [
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/matchmaker",
        element: <Matchmaker/>,
      },
      {
        path: "/playerOverview",
        element: <PlayerOverview/>,
      }
    ]
  },
]);
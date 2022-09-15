import { Outlet } from "react-router-dom";

export default function Root() {
    return (
      <>
        <div id="sidebar">
          <h1>Monday Night Customs Hub</h1>
          <nav>
            <ul>
              <li>
                <a href={`playerOverview`}>Player Overiew</a>
              </li>
              <li>
                <a href={`matchmaker`}>Matchmaker</a>
              </li>
            </ul>
          </nav>
        </div>
        <div id="detail">
            <Outlet />
        </div>
      </>
    );
  }
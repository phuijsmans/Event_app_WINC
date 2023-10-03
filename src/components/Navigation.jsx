import React from "react";
import { Link } from "react-router-dom";

export const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Show all events</Link>
        </li>
        {/* <li>
          <Link to="/event/1">Event</Link>
        </li> */}
      </ul>
    </nav>
  );
};

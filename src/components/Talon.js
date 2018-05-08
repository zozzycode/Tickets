import React from "react";
import { Link } from "react-router-dom";
import * as routes from "../routes/urls";

function Talon(props) {
  const talon = props.talon;
  return (
    <li className="collection-item">
      <Link to={routes.SINGLE + talon.id}>{talon.number}: </Link>
      {talon.solution}, {talon.solved ? "Solved" : "Not solved"}
    </li>
  );
}

export default Talon;

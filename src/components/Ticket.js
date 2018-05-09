import React from "react";
import { Link } from "react-router-dom";
import * as routes from "../routes/urls";

function Ticket(props) {
  const ticket = props.ticket;
  return (
    <li className="collection-item">
      <Link to={routes.SINGLE + ticket.id}>{ticket.number}: </Link>
      {ticket.solution}, {ticket.solved ? "Solved" : "Not solved"}
    </li>
  );
}

export default Ticket;

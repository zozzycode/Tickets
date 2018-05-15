import React from "react";
import { Link } from "react-router-dom";
import * as routes from "../routes/urls";

function Ticket(props) {
  const { ticket } = props;
  return (
    <div>
      <div className="grid-container">
        <div className="grid-item">
          <Link to={routes.SINGLE + ticket.id}>{ticket.number}</Link>
        </div>
        <div className="grid-item">{ticket.solution}</div>
        <div className="grid-item">{ticket.solved ? "Solved" : "UnSolved"}</div>
        <div className="grid-item">
          {ticket.manual ? "Manual" : "Generated"}
        </div>
      </div>
      <div className="divider" />
    </div>
  );
}

export default Ticket;

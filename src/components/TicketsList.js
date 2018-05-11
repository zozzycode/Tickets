import React from "react";
import Ticket from "./Ticket";
import { Link } from "react-router-dom";
import * as routes from "../routes/urls";

function TicketsList(props) {
  return (
    <div>
      <Link className="btn marg" to={routes.ADD_NEW}>
        Generate new ticket
      </Link>
      <a
        className="btn marg"
        href="http://tram.mashke.org/tickets/?p=20"
        target="_blank"
        rel="noopener noreferrer nofollow"
      >
        Tickets History
      </a>
      <div className="row">
        <ul className="collection">
          {props.tickets
            .sort(function(x, y) {
              return y.id - x.id;
            })
            .map((ticket, index) => (
              <Ticket
                key={ticket.id}
                ticket={ticket}
                {...props}
                index={index}
              />
            ))}
        </ul>
      </div>
    </div>
  );
}

export default TicketsList;

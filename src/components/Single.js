import React, { Component } from "react";
import Ticket from "./Ticket";
// import Comments from './Comments';

class Single extends Component {
  render() {
    const { match, tickets } = this.props;
    const id = Number(match.params.id);
    const ticket = tickets.find(ticket => ticket.id === id);
    const index = this.props.tickets.findIndex(ticket => ticket.id === id);
    if (this.props.loading === true) {
      return <div className="loader">...loading</div>;
    } else if (ticket) {
      return (
        <ul className="collection">
          <Ticket ticket={ticket} {...this.props} index={index} />
        </ul>
      );
    } else {
      return <h2> ...no post found</h2>;
    }
  }
}

export default Single;

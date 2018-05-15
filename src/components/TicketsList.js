import React, { Component } from "react";
import Ticket from "./Ticket";
import { Link } from "react-router-dom";
import * as routes from "../routes/urls";

class TicketsList extends Component {
  constructor() {
    super();
    this.state = {
      filterSolved: true,
      filterUnSolved: true,
      filterManual: true,
      filterGenerated: true,
      filterAll: true,
      sortedTickets: []
    };

    this.renderTicketsList = this.renderTicketsList.bind(this);
    this.formOnChange = this.formOnChange.bind(this);
    this.bitWiseCondition = this.bitWiseCondition.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.tickets === prevState.tickets) {
      return null;
    }
    const sortedTickets = nextProps.tickets.sort(function(x, y) {
      return y.id - x.id;
    });
    return {
      sortedTickets: sortedTickets
    };
  }

  /* componentDidUpdate() {
    this.bitWiseCondition();
  } */

  bitWiseCondition() {
    const {
      filterSolved,
      filterUnSolved,
      filterManual,
      filterGenerated
    } = this.state;

    const FLAG_A = filterSolved === true ? 0x1 : 0;
    const FLAG_B = filterUnSolved === true ? 0x2 : 0;
    const FLAG_C = filterManual === true ? 0x4 : 0;
    const FLAG_D = filterGenerated === true ? 0x8 : 0;
    const mask = FLAG_A | FLAG_B | FLAG_C | FLAG_D;

    /* this.renderTicketsList(mask); */
    return mask;
  }

  formOnChange(evtName, evtChecked) {
    const {
      filterSolved,
      filterUnSolved,
      filterManual,
      filterGenerated
    } = this.state;

    switch (evtName) {
      case "filterSolved":
        this.setState({
          filterSolved: evtChecked ? true : false
        });
        if (evtChecked && filterUnSolved && filterManual && filterGenerated) {
          this.setState({
            filterAll: true
          });
        } else {
          this.setState({
            filterAll: false
          });
        }
        break;

      case "filterUnSolved":
        this.setState({
          filterUnSolved: evtChecked ? true : false
        });
        if (filterSolved && evtChecked && filterManual && filterGenerated) {
          this.setState({
            filterAll: true
          });
        } else {
          this.setState({
            filterAll: false
          });
        }
        break;

      case "filterManual":
        this.setState({
          filterManual: evtChecked ? true : false
        });
        if (filterSolved && filterUnSolved && evtChecked && filterGenerated) {
          this.setState({
            filterAll: true
          });
        } else {
          this.setState({
            filterAll: false
          });
        }
        break;

      case "filterGenerated":
        this.setState({
          filterGenerated: evtChecked ? true : false
        });
        if (filterSolved && filterUnSolved && filterManual && evtChecked) {
          this.setState({
            filterAll: true
          });
        } else {
          this.setState({
            filterAll: false
          });
        }
        break;

      case "filterAll":
        this.setState({
          filterSolved: evtChecked ? true : false,
          filterUnSolved: evtChecked ? true : false,
          filterManual: evtChecked ? true : false,
          filterGenerated: evtChecked ? true : false,
          filterAll: evtChecked ? true : false
        });
        break;

      default:
        break;
    }
  }

  renderTicketsList() {
    const mask = this.bitWiseCondition();
    const { sortedTickets } = this.state;
    if (this.props.loading === true) {
      return <div className="loader">...loading</div>;
    } else {
      switch (mask) {
        case 0: // 0000
          console.log("sw mask", mask);
          return <div className="no-tickets">There are no tickets</div>;

        case 1: // 0001
          console.log("sw mask", mask);
          return sortedTickets.map((ticket, index) => {
            if (ticket.solved) {
              return (
                <Ticket
                  key={ticket.id}
                  ticket={ticket}
                  {...this.props}
                  index={index}
                />
              );
            }
            return "";
          });
        case 2: // 0010
          console.log("sw mask", mask);
          return sortedTickets.map((ticket, index) => {
            if (!ticket.solved) {
              return (
                <Ticket
                  key={ticket.id}
                  ticket={ticket}
                  {...this.props}
                  index={index}
                />
              );
            }
            return "";
          });
        case 4: // 0100
          console.log("sw mask", mask);
          return sortedTickets.map((ticket, index) => {
            if (ticket.manual) {
              return (
                <Ticket
                  key={ticket.id}
                  ticket={ticket}
                  {...this.props}
                  index={index}
                />
              );
            }
            return "";
          });
        case 5: // 0101
          console.log("sw mask", mask);
          return sortedTickets.map((ticket, index) => {
            if (ticket.solved && ticket.manual) {
              return (
                <Ticket
                  key={ticket.id}
                  ticket={ticket}
                  {...this.props}
                  index={index}
                />
              );
            }
            return "";
          });
        case 6: // 0110
          console.log("sw mask", mask);
          return sortedTickets.map((ticket, index) => {
            if (!ticket.solved && ticket.manual) {
              return (
                <Ticket
                  key={ticket.id}
                  ticket={ticket}
                  {...this.props}
                  index={index}
                />
              );
            }
            return "";
          });
        case 7: // 0111
          console.log("sw mask", mask);
          return sortedTickets.map((ticket, index) => {
            if (
              (!ticket.solved && ticket.manual) ||
              (ticket.solved && ticket.manual)
            ) {
              return (
                <Ticket
                  key={ticket.id}
                  ticket={ticket}
                  {...this.props}
                  index={index}
                />
              );
            }
            return "";
          });
        case 8: // 1000
          console.log("sw mask", mask);
          return sortedTickets.map((ticket, index) => {
            if (!ticket.manual) {
              return (
                <Ticket
                  key={ticket.id}
                  ticket={ticket}
                  {...this.props}
                  index={index}
                />
              );
            }
            return "";
          });
        case 9: // 1001
          console.log("sw mask", mask);
          return sortedTickets.map((ticket, index) => {
            if (ticket.solved && !ticket.manual) {
              return (
                <Ticket
                  key={ticket.id}
                  ticket={ticket}
                  {...this.props}
                  index={index}
                />
              );
            }
            return "";
          });
        case 10: // 1010
          console.log("sw mask", mask);
          return sortedTickets.map((ticket, index) => {
            if (!ticket.solved && !ticket.manual) {
              return (
                <Ticket
                  key={ticket.id}
                  ticket={ticket}
                  {...this.props}
                  index={index}
                />
              );
            }
            return "";
          });
        case 11: // 1011
          console.log("sw mask", mask);
          return sortedTickets.map((ticket, index) => {
            if (
              (ticket.solved && !ticket.manual) ||
              (!ticket.solved && !ticket.manual)
            ) {
              return (
                <Ticket
                  key={ticket.id}
                  ticket={ticket}
                  {...this.props}
                  index={index}
                />
              );
            }
            return "";
          });
        case 13: // 1101
          console.log("sw mask", mask);
          return sortedTickets.map((ticket, index) => {
            if (
              (ticket.solved && ticket.manual) ||
              (ticket.solved && !ticket.manual)
            ) {
              return (
                <Ticket
                  key={ticket.id}
                  ticket={ticket}
                  {...this.props}
                  index={index}
                />
              );
            }
            return "";
          });
        case 14: // 1110
          console.log("sw mask", mask);
          return sortedTickets.map((ticket, index) => {
            if (
              (!ticket.solved && ticket.manual) ||
              (!ticket.solved && !ticket.manual)
            ) {
              return (
                <Ticket
                  key={ticket.id}
                  ticket={ticket}
                  {...this.props}
                  index={index}
                />
              );
            }
            return "";
          });
        case 3: // 0011
        case 12: // 1100
        case 15: // 1111
          return sortedTickets.map((ticket, index) => {
            return (
              <Ticket
                key={ticket.id}
                ticket={ticket}
                {...this.props}
                index={index}
              />
            );
          });
        default:
          console.log("default", mask);
          return;
      }
    }
  }

  render() {
    return (
      <div>
        <div>
          <Link className="btn marg" to={routes.ADD_NEW}>
            New ticket
          </Link>
          <a
            className="btn marg"
            href="http://tram.mashke.org/tickets/?p=20"
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            History
          </a>
        </div>
        <br />
        <div
          className="filterForm"
          onChange={event => {
            this.formOnChange(event.target.name, event.target.checked);
          }}
        >
          <label className="marg">
            <input
              type="checkbox"
              name="filterSolved"
              checked={this.state.filterSolved}
              onChange={() => {}}
            />
            <span>Solved</span>
          </label>

          <label className="marg">
            <input
              type="checkbox"
              name="filterUnSolved"
              checked={this.state.filterUnSolved}
              onChange={() => {}}
            />
            <span>UnSolved</span>
          </label>

          <label className="marg">
            <input
              type="checkbox"
              name="filterManual"
              checked={this.state.filterManual}
              onChange={() => {}}
            />
            <span>Manual</span>
          </label>

          <label className="marg">
            <input
              type="checkbox"
              name="filterGenerated"
              checked={this.state.filterGenerated}
              onChange={() => {}}
            />
            <span>Generated</span>
          </label>

          <label className="marg">
            <input
              type="checkbox"
              name="filterAll"
              checked={this.state.filterAll}
              onChange={() => {}}
            />
            <span>All</span>
          </label>
        </div>
        <ul className="collection">{this.renderTicketsList()}</ul>
      </div>
    );
  }
}

export default TicketsList;

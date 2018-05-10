import React, { Component } from "react";
import { Route } from "react-router-dom";
import RandomForm from "./RandomForm";
import TicketsList from "./TicketsList";
import Single from "./Single";
import * as routes from "../routes/urls";

class Main extends Component {
  state = { loading: true };

  componentDidMount() {
    this.props.startLoadingTickets().then(() => {
      this.setState({ loading: false });
    });
    // this.props.startLoadingComments();
  }

  render() {
    return (
      <div className="container">
        <h1>100Tickets</h1>
        <Route
          exact
          path={routes.HOME}
          render={() => <TicketsList {...this.props} />}
        />
        <Route
          path={routes.ADD_NEW}
          render={() => <RandomForm {...this.props} />}
        />
        <Route
          path={routes.SINGLE + ":id"}
          render={params => (
            <Single loading={this.state.loading} {...this.props} {...params} />
          )}
        />
      </div>
    );
  }
}

export default Main;

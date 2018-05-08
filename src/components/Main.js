import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import RandomForm from "./RandomForm";
import TalonsList from "./TalonsList";
import Single from "./Single";
import * as routes from "../routes/urls";

class Main extends Component {
  state = { loading: true };

  componentDidMount() {
    this.props.startLoadingTalons().then(() => {
      this.setState({ loading: false });
    });
    // this.props.startLoadingComments();
  }

  render() {
    return (
      <div className="container">
        <h1>100Talons</h1>
        <Route
          exact
          path={routes.HOME}
          render={() => <TalonsList {...this.props} />}
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

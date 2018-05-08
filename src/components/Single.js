import React, { Component } from "react";
import Talon from "./Talon";
// import Comments from './Comments';

class Single extends Component {
  render() {
    const { match, talons } = this.props;
    const id = Number(match.params.id);
    const talon = talons.find(talon => talon.id === id);
    const index = this.props.talons.findIndex(talon => talon.id === id);
    if (this.props.loading === true) {
      return <div className="loader">...loading</div>;
    } else if (talon) {
      return (
        <ul className="collection">
          <Talon talon={talon} {...this.props} index={index} />
        </ul>
      );
    } else {
      return <h2> ...no post found</h2>;
    }
  }
}

export default Single;

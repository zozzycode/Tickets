import React from "react";
import Talon from "./Talon";
import { Link } from "react-router-dom";
import * as routes from "../routes/urls";

function TalonsList(props) {
  return (
    <div>
      <Link className="waves-effect waves-light btn-large" to={routes.ADD_NEW}>
        Generate new Talon
      </Link>
      <div className="row">
        <ul className="collection">
          {props.talons
            .sort(function(x, y) {
              return y.id - x.id;
            })
            .map((talon, index) => (
              <Talon key={talon.id} talon={talon} {...props} index={index} />
            ))}
        </ul>
      </div>
    </div>
  );
}

export default TalonsList;

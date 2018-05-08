import React, { Component } from "react";
// import talonchik from "../img/talonchik.jpg";
import * as routes from "../routes/urls";

class RandomForm extends Component {
  constructor() {
    super();
    this.state = {
      randShow: this.getRandomNumber(),
      solution: "",
      calcResult: "",
      show: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const number = event.target.elements.number.value;
    const solution = event.target.elements.solution.value;
    const solved = event.target.elements.solved.checked;
    const talon = {
      id: Number(new Date()),
      number: number,
      solution: solution,
      solved: solved
    };
    if (number && solution) {
      this.props.startAddingTalon(talon);
      // this.props.addTalon(talon);
      this.props.history.push(routes.HOME);
      console.log("number", number);
      console.log("solution", solution);
      console.log("solved", solved);
    }
  }

  getRandomNumber() {
    const min = 1;
    const max = 1000000;
    const rand = Math.floor(Math.random() * (max - min) + min).toFixed(0);

    // addZeros to the string < 6
    function addZeros(n, needLength) {
      needLength = needLength || 6;
      n = String(n);
      while (n.length < needLength) {
        n = "0" + n;
      }
      return n;
    }

    return addZeros(rand);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="number">Random Number </label>
            <input
              type="number"
              placeholder="Enter Your Number"
              name="number"
              value={this.state.randShow}
              onChange={event =>
                this.setState({ randShow: event.target.value })
              }
            />
            <label htmlFor="solution">Solution </label>
            <input
              type="text"
              placeholder="Enter Your Solution"
              name="solution"
              value={this.state.solution}
              onChange={event => {
                this.setState({
                  solution: event.target.value,
                  calcResult: event.target.value
                });
              }}
            />
            <label>
              <input type="checkbox" name="solved" />
              <span>Solved</span>
            </label>
            {this.state.show && (
              <div>
                <label htmlFor="calcresult">Result </label>
                <input
                  type="text"
                  placeholder="Calc Result"
                  name="calcresult"
                  value={this.state.calcResult}
                  disabled
                />
              </div>
            )}
          </div>
          <br />
          <div>
            <button className="waves-effect waves-light btn-large">Save</button>
          </div>
        </form>
      </div>
    );
  }
}

export default RandomForm;

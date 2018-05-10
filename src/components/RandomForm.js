import React, { Component } from "react";
// import ticketbg from "../img/ticketbg.jpg";
import * as routes from "../routes/urls";
import { Parser } from "expr-eval";

class RandomForm extends Component {
  constructor() {
    super();
    this.state = {
      randShow: this.getRandomNumber(),
      solution: "",
      calcResult: "",
      calcResultTmp: "",
      solved: false,
      saveAsNotSolved: false,
      error: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCalculate = this.handleCalculate.bind(this);
  }

  handleCalculate() {
    const { calcResultTmp, randShow, error } = this.state;

    if (calcResultTmp !== "") {
      const calcResultClear = calcResultTmp.replace(/[^-()\d/*+^%]/g, "");
      console.log("calcResultClear", calcResultClear);

      const calcResultClearSplit = calcResultClear.split("");
      const splitFirst = calcResultClearSplit[0];
      const splitLast = calcResultClearSplit[calcResultClearSplit.length - 1];
      console.log("splitFirst", splitFirst);
      console.log("splitLast", splitLast);

      if (/[+*/^%]/.test(splitFirst) || /[-+*/^%]/.test(splitLast)) {
        this.setState({
          error:
            "First or Last symbol is incorrect. Please enter correct math expressions."
        });
      } else {
        const calcResultClearNumbers = calcResultTmp.replace(/[^\d]/g, "");
        console.log("calcResultClearNumbers", calcResultClearNumbers);

        if (calcResultClear.length !== 0) {
          const parser = new Parser();
          const expr = parser.parse(calcResultClear);
          const calculatedResult = expr.evaluate();
          console.log("calculatedResult", calculatedResult);
          this.setState({
            calcResult: calculatedResult,
            solution: calcResultClear,
            solved:
              calculatedResult === 100 && randShow === calcResultClearNumbers
                ? true
                : false,
            error:
              randShow !== calcResultClearNumbers
                ? "Random numbers and numbers in the solution field, don't match"
                : error
          });
        } else {
          this.setState({
            error:
              "Calculating string is empty. Please use only numbers and math operators."
          });
          console.log(
            "Calculating string is empty. Please use only numbers and math operators."
          );
          console.log("===================");
        }
      }
    } else {
      this.setState({
        error: "Solution field is empty. Please enter your solution."
      });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const number = event.target.elements.number.value;
    const solution = event.target.elements.solution.value;
    const solved = event.target.elements.solved.checked;
    const ticket = {
      id: Number(new Date()),
      number: number,
      solution: solution,
      solved: solved
    };
    if (number && solution) {
      this.props.startAddingTicket(ticket);
      // this.props.addTicket(ticket);
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
                this.setState({
                  randShow: event.target.value,
                  solved: false,
                  error: ""
                })
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
                  calcResultTmp: event.target.value,
                  solved: false,
                  error: ""
                });
              }}
            />
            <div className="blue-text text-darken-2">{this.state.error}</div>
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
            <div className="chb-margin-right">
              <label>
                <input
                  type="checkbox"
                  name="solved"
                  checked={this.state.solved}
                />
                <span>Solved</span>
              </label>
            </div>
            <div className="chb-margin-right">
              <label>
                <input
                  type="checkbox"
                  name="saveasnotsolved"
                  checked={this.state.saveAsNotSolved}
                  onChange={() => {
                    this.setState({
                      saveAsNotSolved: !this.state.saveAsNotSolved,
                      solved: false
                    });
                  }}
                />
                <span>Save As Not Solved</span>
              </label>
            </div>
          </div>
          <br />
          <div>
            {!this.state.solved &&
              !this.state.saveAsNotSolved && (
                <button
                  type="button"
                  className="waves-effect waves-light btn-large"
                  onClick={this.handleCalculate}
                >
                  Calculate
                </button>
              )}
            {(this.state.solved || this.state.saveAsNotSolved) && (
              <button className="waves-effect waves-light btn-large">
                Save
              </button>
            )}
          </div>
        </form>
      </div>
    );
  }
}

export default RandomForm;

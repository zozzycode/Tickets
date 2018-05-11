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
      manual: false,
      error: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCalculate = this.handleCalculate.bind(this);
    this.getRandomNumberRestart = this.getRandomNumberRestart.bind(this);
    this.sanitizeSolution = this.sanitizeSolution.bind(this);
  }

  sanitizeSolution(solStr) {
    const sanitizeSteps = solStr
      .replace(/^[+*/^%]/, "")

      .replace(/\+{2,}/g, "+")
      .replace(/-{2,}/g, "-")
      .replace(/\*{2,}/g, "*")
      .replace(/\/{2,}/g, "/")
      .replace(/\^{2,}/g, "^")
      .replace(/%{2,}/g, "%")

      .replace(/\+-{1,}/g, "+")
      .replace(/\+\*{1,}/g, "+")
      .replace(/\+\/{1,}/g, "+")
      .replace(/\+\^{1,}/g, "+")
      .replace(/\+%{1,}/g, "+")

      .replace(/-\+{1,}/g, "-")
      .replace(/-\*{1,}/g, "-")
      .replace(/-\/{1,}/g, "-")
      .replace(/-\^{1,}/g, "-")
      .replace(/-%{1,}/g, "-")

      .replace(/\*\+{1,}/g, "*")
      .replace(/\*-{1,}/g, "*")
      .replace(/\*\/{1,}/g, "*")
      .replace(/\*\^{1,}/g, "*")
      .replace(/\*%{1,}/g, "*")

      .replace(/\/\+{1,}/g, "/")
      .replace(/\/-{1,}/g, "/")
      .replace(/\/\*{1,}/g, "/")
      .replace(/\/\^{1,}/g, "/")
      .replace(/\/%{1,}/g, "/")

      .replace(/\^\+{1,}/g, "^")
      .replace(/\^-{1,}/g, "^")
      .replace(/\^\*{1,}/g, "^")
      .replace(/\^\/{1,}/g, "^")
      .replace(/\^%{1,}/g, "^")

      .replace(/%\+{1,}/g, "%")
      .replace(/%-{1,}/g, "%")
      .replace(/%\*{1,}/g, "%")
      .replace(/%\/{1,}/g, "%")
      .replace(/%\^{1,}/g, "%")

      .replace(/[^-()\d/*+^%]/g, "");
    const sanitizedSolution = sanitizeSteps;
    return sanitizedSolution;
  }

  handleCalculate() {
    const { calcResultTmp, randShow, error } = this.state;

    if (calcResultTmp !== "") {
      const calcResultClearNumbers = calcResultTmp.replace(/[^\d]/g, "");
      let calcResultTmpLastLess = "";

      if (/[-+*/^%]$/.test(calcResultTmp)) {
        calcResultTmpLastLess = calcResultTmp.replace(/[-+*/^%]$/, "");
      } else {
        calcResultTmpLastLess = calcResultTmp;
      }

      if (calcResultTmpLastLess.length !== 0) {
        const parser = new Parser();
        const expr = parser.parse(calcResultTmpLastLess);
        const calculatedResult = expr.evaluate();
        this.setState({
          calcResult: calculatedResult,
          solution: calcResultTmpLastLess,
          solved:
            calculatedResult === 100 &&
            randShow === calcResultClearNumbers &&
            randShow.length === 6
              ? true
              : false,
          error:
            randShow !== calcResultClearNumbers
              ? "Random number and numbers in the solution field, don't match"
              : randShow.length < 6
                ? "Random number must consist 6 numbers"
                : error
        });
      } else {
        this.setState({
          error:
            "Calculating string is empty. Please use only numbers and math operators."
        });
        this.setState({
          error:
            "Calculating string is empty. Please use only numbers and math operators."
        });
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
    const solution =
      event.target.elements.solution.value !== ""
        ? event.target.elements.solution.value
        : event.target.elements.number.value;
    const solved = event.target.elements.solved.checked;
    const ticket = {
      id: Number(new Date()),
      number: number,
      solution: solution,
      solved: solved,
      manual: this.state.manual
    };
    if (number && solution) {
      this.props.startAddingTicket(ticket);
      // this.props.addTicket(ticket);
      this.props.history.push(routes.HOME);
    }
  }

  getRandomNumberRestart() {
    this.setState({
      randShow: this.getRandomNumber(),
      solution: "",
      calcResult: "",
      calcResultTmp: "",
      solved: false,
      saveAsNotSolved: false,
      manual: false,
      error: ""
    });
  }

  getRandomNumber(onlyZeros) {
    const min = 1;
    const max = 1000000;
    const rand =
      onlyZeros === undefined
        ? Math.floor(Math.random() * (max - min) + min).toFixed(0)
        : onlyZeros;

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
            <button
              type="button"
              className="btn marg"
              onClick={this.handleCalculate}
            >
              Calc
            </button>
            <button
              className="btn marg"
              disabled={
                this.state.solved === true ||
                this.state.saveAsNotSolved === true
                  ? false
                  : true
              }
            >
              Save
            </button>
            <button
              type="button"
              className="btn marg generate"
              onClick={this.getRandomNumberRestart}
            >
              New
            </button>
          </div>
          <br />
          <div>
            <div className="row">
              <div className="col s7">
                <label htmlFor="number">Random Number </label>
                <input
                  type="text"
                  placeholder="Enter Your Number"
                  name="number"
                  value={this.state.randShow}
                  onChange={event => {
                    const sanitizedRand = event.target.value.replace(
                      /[^\d]/g,
                      ""
                    );
                    this.setState({
                      randShow:
                        sanitizedRand.length < 6
                          ? sanitizedRand
                          : sanitizedRand.substr(0, 6),
                      solved: false,
                      manual: true,
                      error: ""
                    });
                  }}
                  onBlur={event => {
                    this.setState({
                      randShow:
                        event.target.value.length < 6
                          ? this.getRandomNumber(event.target.value)
                          : event.target.value
                    });
                  }}
                />
              </div>
              <div className="col s3 padd-top">
                <label>
                  <input
                    type="checkbox"
                    name="manual"
                    checked={this.state.manual}
                    disabled
                  />
                  <span>Manual</span>
                </label>
              </div>
            </div>
            <div className="row">
              <div className="col s7">
                <label htmlFor="solution">Solution </label>
                <input
                  type="text"
                  placeholder="Enter Your Solution"
                  name="solution"
                  value={this.state.solution}
                  onChange={event => {
                    this.setState({
                      solution: this.sanitizeSolution(event.target.value),
                      calcResultTmp: this.sanitizeSolution(event.target.value),
                      solved: false,
                      error: ""
                    });
                  }}
                />
              </div>
              <div className="col s3 padd-top">
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
                  <span>Save</span>
                </label>
              </div>
            </div>
            <div className="blue-text text-darken-2">{this.state.error}</div>
            <div className="row">
              <div className="col s7">
                <label htmlFor="calcresult">Result </label>
                <input
                  type="text"
                  placeholder="Calc Result"
                  name="calcresult"
                  value={this.state.calcResult}
                  disabled
                />
              </div>
              <div className="col s3 padd-top">
                <label>
                  <input
                    type="checkbox"
                    name="solved"
                    checked={this.state.solved}
                    disabled
                  />
                  <span>Solved</span>
                </label>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default RandomForm;

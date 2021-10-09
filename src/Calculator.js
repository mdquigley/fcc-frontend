import "./App.scss";
import "./Calculator.scss";
import React from "react";

const btns = [
  { id: "decimal", val: "." },
  { id: "zero", val: 0 },
  { id: "three", val: 3 },
  { id: "two", val: 2 },
  { id: "one", val: 1 },
  { id: "six", val: 6 },
  { id: "five", val: 5 },
  { id: "four", val: 4 },
  { id: "nine", val: 9 },
  { id: "eight", val: 8 },
  { id: "seven", val: 7 },
];

const oprs = [
  { id: "clear", val: "AC" },
  { id: "add", val: "+" },
  { id: "subtract", val: "-" },
  { id: "multiply", val: "*" },
  { id: "divide", val: "/" },
  { id: "equals", val: "=" },
];

class Button extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div
        id={this.props.id}
        className="button"
        onClick={this.props.updateInput}
        val={this.props.val}
      >
        {this.props.val}
      </div>
    );
  }
}

class NumPad extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const numPad = btns.map((num) => {
      return (
        <Button
          id={num.id}
          val={num.val}
          updateInput={this.props.updateInput}
        />
      );
    });

    return <div id="numpad">{numPad.reverse()}</div>;
  }
}

class OprPad extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const oprPad = oprs.map((opr) => {
      return (
        <Button
          id={opr.id}
          val={opr.val}
          updateInput={this.props.updateInput}
        />
      );
    });

    return <div id="oprpad">{oprPad}</div>;
  }
}

class Display extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div
        id="calc-display"
        dangerouslySetInnerHTML={{ __html: this.props.value }}
      ></div>
    );
  }
}

class BtnPad extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div id="btnpad">
        <NumPad updateInput={this.props.updateInput} />
        <OprPad updateInput={this.props.updateInput} />
      </div>
    );
  }
}

const Footer = () => {
  return (
    <div id="footer">
      <p>FCC JavaScript Calculator by Mike Quigley</p>
    </div>
  );
};

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentVal: "0",
      prevVal: "0",
      operation: "",
      sign: "1",
    };

    this.updateInput = this.updateInput.bind(this);
    this.calculate = this.calculate.bind(this);
  }

  calculate() {
    let answer;
    switch (this.state.operation) {
      case "+":
        answer =
          parseFloat(this.state.prevVal) +
          parseFloat(this.state.currentVal) * parseFloat(this.state.sign);
        break;
      case "-":
        answer =
          parseFloat(this.state.prevVal) -
          parseFloat(this.state.currentVal) * parseFloat(this.state.sign);
        break;
      case "*":
        answer =
          parseFloat(this.state.prevVal) *
          (parseFloat(this.state.currentVal) * parseFloat(this.state.sign));
        break;
      case "/":
        answer =
          parseFloat(this.state.prevVal) /
          (parseFloat(this.state.currentVal) * parseFloat(this.state.sign));
        break;
    }
    return answer;
  }

  updateInput(e) {
    switch (e.target.innerHTML) {
      case "+":
      case "-":
      case "*":
      case "/":
        if (this.state.currentVal === "") {
          console.log("2nd operation");
          if (this.state.sign === -1) {
            this.setState({
              sign: 1,
            });
          }
          if (e.target.innerHTML === "-") {
            console.log(`2nd op is -`);
            this.setState({
              sign: -1,
            });
            break;
          }
          this.setState({
            operation: e.target.innerHTML,
          });
          break;
        }
        this.setState({
          currentVal: "",
          prevVal:
            this.state.prevVal === "0"
              ? this.state.currentVal
              : this.calculate(),
          operation: e.target.innerHTML,
          sign: 1,
        });
        break;
      case "=":
        console.log(`run equals`);
        this.setState({
          currentVal: this.calculate(),
          prevVal: "0",
          operation: "",
          sign: 1,
        });
        break;
      case "AC":
        this.setState({
          currentVal: "0",
          prevVal: "0",
          operation: "",
          sign: 1,
        });
        break;
      case ".":
        if (this.state.currentVal.includes(".")) {
          break;
        }
      default:
        if (this.state.currentVal === "0") {
          this.setState({
            currentVal: e.target.innerHTML,
          });
        } else {
          this.setState({
            currentVal: this.state.currentVal + e.target.innerHTML,
          });
        }
    }
  }

  render() {
    return (
      <div className="App">
        <h1 className="title">JavaScript Calculator</h1>
        <div id="calculator">
          <Display value={this.state.currentVal} />
          <BtnPad updateInput={this.updateInput} />
          <Footer />
        </div>
        <div class="project-info">
          <p>
            This calculator uses immediate execution logic. Click the buttons to
            use it!
          </p>
        </div>
      </div>
    );
  }
}

export default Calculator;

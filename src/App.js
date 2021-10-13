import "./App.scss";
import React from "react";
import { Route, Switch, Link } from "react-router-dom";
import Calculator from "./Calculator";
import DrumMachine from "./DrumMachine";
import MarkdownPreviewer from "./MarkdownPreviewer";
import QuoteGenerator from "./QuoteGenerator";
import PomodoroTimer from "./PomodoroTimer";
import Home from "./Home";
import $ from "jquery";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <div>
          <nav>
            <ul id="navigation">
              <li>
                <Link to="/" style={{ textDecoration: "none" }}>
                  {$(window).width() <= 375
                    ? "FCC"
                    : "FCC: Front End Developer Projects"}
                </Link>
              </li>
              <li>
                <Link to="/calculator" style={{ textDecoration: "none" }}>
                  {$(window).width() <= 375 ? "Calc" : "Calculator"}
                </Link>
              </li>
              <li>
                <Link to="/drummachine" style={{ textDecoration: "none" }}>
                  {$(window).width() <= 375 ? "Drum" : "Drum Machine"}
                </Link>
              </li>
              <li>
                <Link
                  to="/markdownpreviewer"
                  style={{ textDecoration: "none" }}
                >
                  {$(window).width() <= 375 ? "md Prev" : "Markdown Previewer"}
                </Link>
              </li>
              <li>
                <Link to="/quotegenerator" style={{ textDecoration: "none" }}>
                  {$(window).width() <= 375 ? "Quotes" : "Quote Generator"}
                </Link>
              </li>
              <li>
                <Link to="/pomodorotimer" style={{ textDecoration: "none" }}>
                  {$(window).width() <= 375 ? "Timer" : "Pomodoro Timer"}
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/calculator">
            <Calculator />
          </Route>
          <Route exact path="/drummachine">
            <DrumMachine />
          </Route>
          <Route exact path="/markdownpreviewer">
            <MarkdownPreviewer />
          </Route>
          <Route exact path="/quotegenerator">
            <QuoteGenerator />
          </Route>
          <Route exact path="/pomodorotimer">
            <PomodoroTimer />
          </Route>
        </Switch>
      </div>
    );
  }
}

export default App;

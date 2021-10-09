import "./App.scss";
import React from "react";
import { Route, Switch, Link } from "react-router-dom";
import Calculator from "./Calculator";
import DrumMachine from "./DrumMachine";
import MarkdownPreviewer from "./MarkdownPreviewer";
import QuoteGenerator from "./QuoteGenerator";
import Home from "./Home";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <div>
          <nav>
            <ul id="navigation">
              <li>
                <Link to="/" style={{ textDecoration: "none" }}>
                  FCC: Front End Developer Projects
                </Link>
              </li>
              <li>
                <Link to="/calculator" style={{ textDecoration: "none" }}>
                  Calculator
                </Link>
              </li>
              <li>
                <Link to="/drummachine" style={{ textDecoration: "none" }}>
                  Drum Machine
                </Link>
              </li>
              <li>
                <Link
                  to="/markdownpreviewer"
                  style={{ textDecoration: "none" }}
                >
                  Markdown Previewer
                </Link>
              </li>
              <li>
                <Link to="/quotegenerator" style={{ textDecoration: "none" }}>
                  Quote Generator
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
        </Switch>
      </div>
    );
  }
}

export default App;

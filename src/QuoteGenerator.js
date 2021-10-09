import "./App.scss";
import "./QuoteGenerator.scss";
import React from "react";
import $ from "jquery";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitterSquare } from "@fortawesome/free-brands-svg-icons";

class QuoteBox extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="quote-box">
        <div id="text-box">
          <div id="text">{this.props.quote}</div>
          <div id="author">- {this.props.author}</div>
        </div>
        <div id="button-box">
          <a
            id="tweet-quote"
            href={`https://twitter.com/intent/tweet?text="'${encodeURIComponent(
              this.props.quote + '" - ' + this.props.author
            )}`}
            target="_top"
          >
            <FontAwesomeIcon icon={faTwitterSquare} />
          </a>
          <button id="new-quote" onClick={this.props.getQuote}>
            New Quote
          </button>
        </div>
      </div>
    );
  }
}

class QuoteGenerator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      quote: "",
      author: "",
      lastUsedIndex: 0,
    };

    this.getQuote = this.getQuote.bind(this);
    this.changeColor = this.changeColor.bind(this);
  }

  componentDidMount() {
    this.getQuote();
  }

  getQuote() {
    $.get(
      "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json",
      (data) => {
        // convert response to JSON
        let quotes = JSON.parse(data)["quotes"];

        // get random index within response
        let index = Math.floor(Math.random() * quotes.length);

        // extract quote text
        let quote = quotes[index].quote;

        // extract author
        let author = quotes[index].author;

        this.setState({
          quote: quote,
          author: author,
        });
      }
    );

    // update color of html elements
    this.changeColor();
  }

  changeColor() {
    // color palette
    const colors = [
      "#b0e0e6",
      "#afeeee",
      "#ace5ee",
      "#a7d8de",
      "#96ded1",
      "#b2e2e1",
    ];

    // random index of within bounds of colors
    let index = Math.floor(Math.random() * colors.length);

    // compare to last used to avoid repeats
    if (index === this.state.lastUsedIndex) {
      index = Math.floor(Math.random() * colors.length);
    } else {
      this.setState({
        lastUsedIndex: index,
      });
    }

    // update css variable
    document.body.style.setProperty("--color", colors[index]);
  }

  render() {
    return (
      <div className="App">
        <h1 className="title">Random Quote Generator</h1>
        <QuoteBox
          getQuote={this.getQuote}
          quote={this.state.quote}
          author={this.state.author}
        />
      </div>
    );
  }
}

export default QuoteGenerator;

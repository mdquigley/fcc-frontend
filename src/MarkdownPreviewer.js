import "./App.scss";
import "./MarkdownPreviewer.scss";
import React from "react";
import marked from "marked";
import hljs from "highlight.js";

marked.setOptions({
  breaks: true,
});

const initialText = `# Hello!

## This is a Markdown Previewer.

You can type markdown-style text into the **editor** and see what it will look like in the **preview**.

- You can emphasis text using:
  - *italics* (one *)  
  - **bold** (two *s)

You can insert [a link](https://freecodecamp.com)

Or add a block quote
> "I'm learning about Markdown right now" - Person McPerson

You can share \`inline code\`

Or a big chunk of block code, and it will give you syntax highlighting!
\`\`\`js
const example = "This is a string!"
const printString = () => {
  cosole.log(example);
}
\`\`\`

And you can easily include images:

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg) `;

class Editor extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="editor-box" class="child">
        <h1>Editor</h1>
        <hr />
        <textarea
          id="editor"
          rows="20"
          cols="60"
          value={this.props.input}
          onChange={this.props.onChange}
        >
          {" "}
        </textarea>
      </div>
    );
  }
}

class Preview extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const output = marked(this.props.input);
    return (
      <div id="preview-box" class="child">
        <h1>Preview</h1>
        <hr />
        <div
          id="preview"
          dangerouslySetInnerHTML={{
            __html: marked(this.props.input),
          }}
        ></div>
      </div>
    );
  }
}

class MarkdownPreviewer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      input: initialText,
    };

    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(event) {
    this.setState({
      input: event.target.value,
    });
  }

  componentDidMount() {
    hljs.highlightAll();
  }

  componentDidUpdate() {
    hljs.highlightAll();
  }

  render() {
    return (
      <div className="App">
        <h1 className="title">Markdown Previewer</h1>
        <div className="wrapper">
          <Editor input={this.state.input} onChange={this.handleInput} />
          <Preview input={this.state.input} />
        </div>
      </div>
    );
  }
}

export default MarkdownPreviewer;

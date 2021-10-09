import "./App.scss";
import "./DrumMachine.scss";
import React from "react";

const soundBank = [
  {
    keyCode: 81,
    keyTrigger: "Q",
    id: "Heater-1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
  },
  {
    keyCode: 87,
    keyTrigger: "W",
    id: "Heater-2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
  },
  {
    keyCode: 69,
    keyTrigger: "E",
    id: "Heater-3",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
  },
  {
    keyCode: 65,
    keyTrigger: "A",
    id: "Heater-4",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
  },
  {
    keyCode: 83,
    keyTrigger: "S",
    id: "Clap",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
  },
  {
    keyCode: 68,
    keyTrigger: "D",
    id: "Open-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
  },
  {
    keyCode: 90,
    keyTrigger: "Z",
    id: "Kick-n'-Hat",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
  },
  {
    keyCode: 88,
    keyTrigger: "X",
    id: "Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
  },
  {
    keyCode: 67,
    keyTrigger: "C",
    id: "Closed-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
  },
];

class DrumPad extends React.Component {
  constructor(props) {
    super(props);
    this.playSound = this.playSound.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.toggleActive = this.toggleActive.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress);
    document.addEventListener("keyup", this.handleKeyUp);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress);
    document.removeEventListener("keyup", this.handleKeyUp);
  }

  playSound() {
    const sound = document.getElementById(this.props.value);
    sound.currentTime = 0;
    sound.play();
    this.props.updateDisplay(this.props.id.toUpperCase());
  }

  toggleActive() {
    const pad = document.getElementById(this.props.id);
    pad.classList.toggle("activePad");
  }

  handleKeyPress(e) {
    if (e.keyCode === this.props.keyCode) {
      this.playSound();
      this.toggleActive();
    }
  }

  handleKeyUp(e) {
    if (e.keyCode === this.props.keyCode) {
      this.props.updateDisplay("");
      this.toggleActive();
    }
  }

  handleMouseDown() {
    this.playSound();
    this.toggleActive();
  }

  handleMouseUp() {
    this.toggleActive();
    this.props.updateDisplay("");
  }

  render() {
    return (
      <div
        className="drum-pad"
        id={this.props.id}
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
      >
        <audio id={this.props.value} className="clip" src={this.props.url} />
        {this.props.value}
      </div>
    );
  }
}

class PadBank extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const drumpads = soundBank.map((entry) => {
      return (
        <DrumPad
          id={entry.id}
          value={entry.keyTrigger}
          url={entry.url}
          keyCode={entry.keyCode}
          updateDisplay={this.props.updateDisplay}
        />
      );
    });
    return <div id="padbank">{drumpads}</div>;
  }
}

class Display extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <div id="display">{this.props.value}</div>;
  }
}

const Footer = () => {
  return (
    <div id="footer">
      <p>FCC Drum Machine by Mike Quigley</p>
    </div>
  );
};

class DrumMachine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: "",
    };

    this.displayClipName = this.displayClipName.bind(this);
  }

  displayClipName(name) {
    this.setState({
      display: name,
    });
  }

  render() {
    return (
      <div className="App">
        <h1 className="title">Drum Machine</h1>
        <div id="drum-machine">
          <Display value={this.state.display} />
          <PadBank updateDisplay={this.displayClipName} />
          <Footer />
        </div>
        <div class="project-info">
          <p>
            Click the buttons or press the corresponding keys on your keyboard
            to play the drum machine.
          </p>
        </div>
      </div>
    );
  }
}

export default DrumMachine;

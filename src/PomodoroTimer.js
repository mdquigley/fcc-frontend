import "./App.scss";
import "./PomodoroTimer.scss";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRetweet,
  faPlay,
  faPause,
  faCaretUp,
  faCaretDown,
} from "@fortawesome/free-solid-svg-icons";

const btnStyle = {
  border: "none",
  padding: "none",
  margin: "none",
  backgroundColor: "transparent",
  fontSize: "1.5em",
  cursor: "pointer",
};

class Timer extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div id="timer">
        <div id="timerdisplay">
          <h3 id="timer-label">{this.props.currentType}</h3>
          <h3 id="time-left">{this.props.timeLeft}</h3>
        </div>
        <div id="timercontrols">
          <div
            id="start_stop"
            className="timerbutton"
            onClick={this.props.startstop}
          >
            {this.props.running ? (
              <FontAwesomeIcon icon={faPause} />
            ) : (
              <FontAwesomeIcon icon={faPlay} />
            )}
          </div>
          <div id="reset" className="timerbutton" onClick={this.props.reset}>
            <FontAwesomeIcon icon={faRetweet} />
          </div>
        </div>
      </div>
    );
  }
}

class Control extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div id={this.props.id + "-label"}>
        <h3>{this.props.name}</h3>
        <div className="control">
          <div
            icon={faCaretDown}
            id={this.props.id + "-decrement"}
            className="timerbutton"
            onClick={this.props.updateLength}
          >
            <p>-</p>
          </div>

          <span
            id={this.props.id + "-length"}
            style={{ fontSize: "2em" }}
            className="length"
          >
            {" " + this.props.length + " "}
          </span>

          <div
            icon={faCaretUp}
            className="timerbutton"
            id={this.props.id + "-increment"}
            onClick={this.props.updateLength}
          >
            <p>+</p>
          </div>
        </div>
      </div>
    );
  }
}

const Footer = () => {
  return (
    <div id="footer">
      <p>FCC Pomodoro Timer by Mike Quigley</p>
    </div>
  );
};

class PomodoroTimer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breaklength: 5,
      sessionlength: 25,
      currentType: "Session",
      timeLeft: 25 * 60,
      running: false,
    };

    this.reset = this.reset.bind(this);
    this.formatTime = this.formatTime.bind(this);
    this.startstop = this.startstop.bind(this);
    this.updateLength = this.updateLength.bind(this);

    this.audioRef = React.createRef();
    let interval;
  }

  reset() {
    this.audioRef.current.pause();
    this.audioRef.current.currentTime = 0;
    if (this.state.running) {
      this.startstop();
    }
    this.setState({
      breaklength: 5,
      sessionlength: 25,
      currentType: "Session",
      timeLeft: 25 * 60,
      running: false,
    });
  }

  formatTime(time) {
    let minutes = parseInt(time / 60);
    let seconds = parseInt(time % 60);
    return (
      (minutes < 10 ? "0" + minutes : minutes) +
      ":" +
      (seconds < 10 ? "0" + seconds : seconds)
    );
  }

  startstop() {
    if (!this.state.running) {
      this.interval = setInterval((updateTimer) => {
        if (this.state.timeLeft > 0) {
          this.setState({
            timeLeft: this.state.timeLeft - 1,
          });
        } else {
          this.audioRef.current.play();
          this.setState({
            currentType:
              this.state.currentType === "Session" ? "Break" : "Session",
            timeLeft:
              this.state.currentType === "Session"
                ? this.state.breaklength * 60
                : this.state.sessionlength * 60,
          });
        }
      }, 1000);
      this.setState({
        running: true,
      });
    } else {
      clearInterval(this.interval);
      this.setState({
        running: false,
      });
    }
  }

  updateLength(e) {
    if (this.state.running === false) {
      switch (e.target.id) {
        case "session-decrement":
          if (this.state.sessionlength > 1) {
            if (this.state.currentType === "Session") {
              this.setState({
                sessionlength: this.state.sessionlength - 1,
                timeLeft: (this.state.sessionlength - 1) * 60,
              });
            } else {
              this.setState({
                sessionlength: this.state.sessionlength - 1,
              });
            }
          }
          break;
        case "session-increment":
          if (this.state.sessionlength < 60) {
            if (this.state.currentType === "Session") {
              this.setState({
                sessionlength: this.state.sessionlength + 1,
                timeLeft: (this.state.sessionlength + 1) * 60,
              });
            } else {
              this.setState({
                sessionlength: this.state.sessionlength + 1,
              });
            }
          }
          break;
        case "break-decrement":
          if (this.state.breaklength > 1) {
            if (!this.state.currentType === "Session") {
              this.setState({
                breaklength: this.state.breaklength - 1,
                timeLeft: (this.state.breaklength - 1) * 60,
              });
            } else {
              this.setState({
                breaklength: this.state.breaklength - 1,
              });
            }
          }
          break;
        case "break-increment":
          if (this.state.breaklength < 60) {
            if (!this.state.currentType === "Session") {
              this.setState({
                breaklength: this.state.breaklength + 1,
                timeLeft: (this.state.breaklength + 1) * 60,
              });
            } else {
              this.setState({
                breaklength: this.state.breaklength + 1,
              });
            }
          }
          break;
        default:
          break;
      }
    } else {
      return;
    }
  }

  render() {
    return (
      <div className="App">
        <h1 className="title">Pomodoro Timer</h1>
        <div id="clock">
          <div id="controls">
            <div id="lengths">
              <Control
                length={this.state.breaklength}
                name="Break Length"
                id="break"
                updateLength={this.updateLength}
              />
              <Control
                length={this.state.sessionlength}
                name="Session Length"
                id="session"
                updateLength={this.updateLength}
              />
            </div>

            <Timer
              currentType={this.state.currentType}
              timeLeft={this.formatTime(this.state.timeLeft)}
              reset={this.reset}
              startstop={this.startstop}
              running={this.state.running}
            />
          </div>
          <audio
            ref={this.audioRef}
            src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
            id="beep"
          ></audio>
          <Footer />
        </div>
      </div>
    );
  }
}

export default PomodoroTimer;

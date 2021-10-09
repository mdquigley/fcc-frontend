import "./App.scss";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitterSquare,
  faGithubSquare,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelopeSquare } from "@fortawesome/free-solid-svg-icons";

class Home extends React.Component {
  render() {
    return (
      <div className="home-info">
        <p>
          This are a series of projects built using React.js and Sass, as part
          of the Front End Development Libraries curriculum from{" "}
          <a
            href="https://www.freecodecamp.org/learn/front-end-development-libraries/"
            target="top"
          >
            FreeCodeCamp
          </a>
        </p>
        <p>Designed by Mike Quigley</p>
        <p>
          <a href="https://twitter.com/quig_m" target="top">
            <FontAwesomeIcon icon={faTwitterSquare} size="2x" />
          </a>
          <a href="https://github.com/mdquigley" target="top">
            <FontAwesomeIcon icon={faGithubSquare} size="2x" />
          </a>
          <a href="mailto:quig.info@gmail.com" target="top">
            <FontAwesomeIcon icon={faEnvelopeSquare} size="2x" />
          </a>
        </p>
      </div>
    );
  }
}

export default Home;

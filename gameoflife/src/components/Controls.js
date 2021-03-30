import React, { Component } from "react";
import "../Styles/Controls.css";

export default class Controls extends Component {
  render() {
    return (
      <div className="controls-container">
        <button className="buttons" onClick={this.props.runProgram}>
          Next
        </button>
        <button className="buttons" onClick={this.props.gridReset}>
          Clear
        </button>
        <button className="buttons" onClick={this.props.playContinuous}>
          Start
        </button>
        <button className="buttons" onClick={this.props.pause}>
          Pause
        </button>
        <button className="buttons" onClick={this.props.faster}>
          Faster
        </button>
        <button className="buttons" onClick={this.props.slower}>
          Slower
        </button>
        <button className="buttons" onClick={this.props.seededGrid}>
          Seeded Grid
        </button>
        <button className="buttons" onClick={this.props.unSeedGrid}>
          Unseeded Grid
        </button>
      </div>
    );
  }
}

import React, { Component } from "react";
import ToggleButton from "./ToggleButton";

class VictoryMessage extends Component {

  handleReload() {
    window.location.reload();
  }

  handleClose() {
    window.close();
  }

  render() {
    let styleVisible = {
      opacity: "0"
    };
    if (this.props.isOpen) {
      styleVisible = {
        opacity: "1",
        pointerEvents: "auto"
      };
    }
    const victoryText = (this.props.isPlayerWin) ? "You win!" : "You loose!";
    return (
      <div style={styleVisible} className="modalDialog">
        <div>
          <p>{victoryText}</p>
          <ToggleButton activity={this.handleReload} text="Play Again" />
          <ToggleButton activity={this.handleClose} text="Exit Game" />
        </div>
      </div>
    );
  }
}

export default VictoryMessage;

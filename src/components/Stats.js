import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Stats extends Component {
  static propTypes = {
    player: PropTypes.object
  };
  static defaultProps = {
    player: {}
  };
  render() {
    let statsString =
      "Health: " +
      this.props.player.health +
      " Attack: " +
      this.props.player.attack +
      " Weapon: " +
      this.props.player.weapon +
      " XP: " +
      this.props.player.xp +
      " Level: " +
      this.props.player.level;

    return (
      <div className="stats">
        {statsString}
      </div>
    );
  }
}

import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Line extends Component {
  static propTypes = {
    type: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    staff: PropTypes.array,
    player: PropTypes.string,
    id: PropTypes.string,
    dark: PropTypes.bool
  };
  static defaultProps = {
    type: "WALL",
    staff: [],
    player: "",
    id: "0_0",
    dark: false
  };

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  render() {
    let classes = "element";
    let title = "";
    let toShow = this.props.dark;
    
    switch (this.props.type) {
      case "SPACE": {
        classes += toShow ? " space" : "";
        break;
      }

      case "PLAYER": {
        classes += " player blink_me";
        title = this.props.player;
        break;
      }

      default: {
        classes += toShow ? " wall" : "";
        break;
      }
    }
    if (Number.isInteger(this.props.type)) {
      this.props.staff.forEach(staff => {
        if (staff.id === this.props.type) {
          classes += toShow ? " " + staff.kind : "";
          title = toShow ? this.capitalizeFirstLetter(staff.kind) + ": " : "";
          switch (staff.kind) {
            case "medicine":
              title += toShow ? "health +60" : "";
              break;

            case "weapon":
              title += toShow ? "attack +10" : "";
              break;

            case "enemy":
              if (staff.boss) {
                classes = toShow ? "element boss" : "element";
                title = toShow ? "BOSS!!! " : "";
              }
              title += toShow
                ? "health: " + staff.health + ", attack: " + staff.attack
                : "";
              break;

            default:
              title += " ";
          }
        }
      });
    }
    return (
      <div
        className={classes}
        title={title}
        key={this.props.id}
        id={this.props.id}
      />
    );
  }
}

import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Line extends Component {
  static propTypes = {
    line: PropTypes.array,
    number: PropTypes.number,
    player: PropTypes.string,
    position: PropTypes.object,
    staff: PropTypes.array,
    dark: PropTypes.bool
  };
  static defaultProps = {
    line: [],
    number: 0,
    player: "",
    position: {},
    staff: [],
    dark: false
  };

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  render() {
    var elementList = this.props.line.map((element, index) => {
      let classes = "element";
      let title = "";
      let toShow = !this.props.dark;
      if (!toShow) {
        if (
          this.props.number < this.props.position.x + 3 &&
          this.props.number > this.props.position.x - 3 &&
          index < this.props.position.y + 3 &&
          index > this.props.position.y - 3
        ) {
          toShow = true;
        }
      }
      switch (element) {
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
      if (Number.isInteger(element)) {
        this.props.staff.forEach(staff => {
          if (staff.id === element) {
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
          id={this.props.number + "_" + index}
          key={this.props.number + "_" + index}
          className={classes}
          title={title}
        />
      );
    });
    return (
      <div>
        {elementList}
      </div>
    );
  }
}

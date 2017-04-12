import React, { Component } from 'react';

export default class Line extends Component {
  static propTypes = {
    line: React.PropTypes.array,
    number: React.PropTypes.number,
    player: React.PropTypes.string,
    boss: React.PropTypes.string
  }
  static defaultProps = {
    line: [],
    number: 0,
    player: "",
    boss: ""
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  render() {
    var elementList = this.props.line.map((element, index) => {
      let classes = "element";
      let title = "";
      switch (element) {
        case "SPACE": {
          classes += " space";
          break;
        }
        case "PLAYER": {
          classes += " player blink_me";
          title = this.props.player;
          break;
        }
        case "BOSS": {
          classes += " boss";
          title = this.props.boss;
        }
        default: {
          classes += " wall";
          break;
        }
      }
      if (Number.isInteger(element)) {
        this.props.staff.forEach(staff => {
          if (staff.id === element) {
            classes += " "+staff.kind;
            title = this.capitalizeFirstLetter(staff.kind)+": ";
            switch (staff.kind) {
              case "medicine":
                title += "health +40";
                break;
              case "weapon":
                title += "attack +10";
                break;
              default:
                title += " ";
            }
          }
        });
      }

      return <div id={this.props.number+'_'+index}
                  key={this.props.number+'_'+index}
                  className={classes}
                  title={title}>
            </div>
    });
    return (
      <div>
        {elementList}
      </div>
    );
  }
}

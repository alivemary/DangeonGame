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
          classes += " player";
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
        classes += " health";
        title = "Medicine: health + 40"
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

import React, { Component } from 'react';

export default class Line extends Component {
  static propTypes = {
    player: React.PropTypes.object,
    boss: React.PropTypes.object,
    line: React.PropTypes.array,
    number: React.PropTypes.number
  }
  static defaultProps = {
    player: {x: 0, y: 0},
    boss: {x: 0, y: 0},
    line: [],
    number: 0
  }
  render() {

    var elementList = this.props.line.map((element, index) => {
      let classes = "element";
      switch (element) {
        case "SPACE": {
          classes += " space";
          break;
        }
        default: {
          classes += " wall";
          break;
        }
      }
      if (Number.isInteger(element)) {
        console.log(element);
        classes += " health";
      }
      if (index === this.props.player.y && this.props.number === this.props.player.x) {
        return <div id={this.props.number+'_'+index}
                    key={this.props.number+'_'+index}
                    className={classes + " player"}>
              </div>
      }
      if (index === this.props.boss.y && this.props.number === this.props.boss.x) {
        return <div id={this.props.number+'_'+index}
                    key={this.props.number+'_'+index}
                    className={classes + " boss"}>
              </div>
      }
      return <div id={this.props.number+'_'+index}
                  key={this.props.number+'_'+index}
                  className={classes}>
            </div>
    });
    return (
      <div>
        {elementList}
      </div>
    );
  }
}

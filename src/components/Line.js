import React, { Component } from 'react';

export default class Line extends Component {
  static propTypes = {
    line: React.PropTypes.array,
    number: React.PropTypes.number
  }
  static defaultProps = {
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
        case "PLAYER": {
          classes += " player";
        }
        case "BOSS": {
          classes += " boss";
        }
        default: {
          classes += " wall";
          break;
        }
      }
      if (Number.isInteger(element)) {
        classes += " health";
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

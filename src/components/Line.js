import React, { Component } from 'react';

export default class Line extends Component {

  render() {

    var elementList = this.props.line.map((element, index) => {
      let style;
      switch (element) {
        case "SPACE": {
          style = {
            backgroundColor: 'white'
          };
          break;
        }
        case "PLAYER": {
          style = {
            backgroundColor: 'red'
          };
          break;
        }
        default: {
          style = {
            backgroundColor: 'black'
          };
          break;
        }
}
      return <div style={style}  id={this.props.number+'_'+index}  key={this.props.number+'_'+index} className='element'></div>
    });
    return (
      <div>
        {elementList}
      </div>
    );
  }
}

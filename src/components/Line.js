import React, { Component } from 'react';

export default class Line extends Component {
  static propTypes = {
    line: React.PropTypes.array,
    player: React.PropTypes.object,
    number: React.PropTypes.number
  }
  static defaultProps = {
    line: [],
    player: {x: 0, y: 0},
    number: 0
  }
  render() {

    var elementList = this.props.line.map((element, index) => {
      let style;
      let playerStyle = {
        backgroundColor: 'red'
      }
      switch (element) {
        case "SPACE": {
          style = {
            backgroundColor: 'white'
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
      if (index === this.props.player.y && this.props.number === this.props.player.x) {
        return <div style={playerStyle}
                    id={this.props.number+'_'+index}
                    key={this.props.number+'_'+index}
                    className='element'>
              </div>
      }
      return <div style={style}
                  id={this.props.number+'_'+index}
                  key={this.props.number+'_'+index}
                  className='element'>
            </div>
    });
    return (
      <div>
        {elementList}
      </div>
    );
  }
}

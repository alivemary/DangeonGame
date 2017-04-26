import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ToggleButton extends Component {

static propTypes = {
    activity: PropTypes.func
  }
  static defaultProps = {
    activity: () => { return }
  }

handleClick () {
    this.props.activity();
}

    render() {
        return (
            <div className="toggle-button">
                <button onClick={this.handleClick.bind(this)}>{this.props.text}</button>
            </div>
        );
    }
}


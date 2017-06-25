import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Line extends Component {
  static propTypes = {
    number: PropTypes.number,
    player: PropTypes.string,
    position: PropTypes.object,
    staff: PropTypes.array,
    dark: PropTypes.bool
  };
  static defaultProps = {
    number: 0,
    player: "",
    position: {},
    staff: [],
    dark: false
  };
  render() {
    return <div />;
  }
}

import React from 'react';

export default class Player extends React.Component {
	constructor (props) {
		super (props);
		this.state = {
				health: 100,
				weapon: "stick",
        attack: 7,
        level: 0,
        nextlevel: 60,
        dungeon: 0
		}
	}
  render(){
    return(
      <div></div>
    );
  }
}

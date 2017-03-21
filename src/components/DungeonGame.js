import React from 'react';
import Line from './Line.js';
import { connect } from 'react-redux';
import * as actions from './redux/actions.js'

@connect((store) => {
	return {
		gameWidth: store.gameWidth,
		gameHeight: store.gameHeight,
		dungeon: store.dungeon
	}
})

export default class DungeonGame extends React.Component {
	constructor (props) {
		super (props);
		this.state = {
				rooms: []
		}
	}
	putRoom(x, y, length){
		this.props.dispatch(actions.addRoomToDungeon({x, y, length}));
	}
	initDungeon(w, h){
		let rooms = [];
		for (let i=0; i<w; i++) {
			let line = [];
			for (let j=0; j<h; j++) {
				line.push(0);
			}
			this.props.dispatch(actions.addLineToDungeon(line));
		}
		this.putRoom(Math.floor(w/2), Math.floor(h/2), 3);
		rooms.push({x: Math.floor(w/2), y: Math.floor(h/2)});
		for (let j=0; j<6; j++){
			let x = Math.floor(Math.random()*(w-8))+3;
			let y = Math.floor(Math.random()*(h-8))+3;
			this.putRoom(x, y, 2);
			rooms.push({x: x, y: y});
		}
		return {rooms: rooms};
	}
	initGame(){
		let dungeon = this.initDungeon(Math.floor(this.props.gameWidth/20), Math.floor(this.props.gameHeight/20));
		this.setState({
				rooms: dungeon.rooms
		});
	}

	componentDidMount(){
		this.initGame();
	}
	render () {
		console.log(this.props);
		console.log(actions);
		let style = {
      		width: this.props.gameWidth,
					height: this.props.gameHeight
				};
		let dungeonList = this.props.dungeon.map((line, index) => {
      return <div key={"line"+index} className='line'><Line number={index} line={line}/></div>
		});
		return (
			<div className="dungeon-game">
				<h3>Kill the boss in dungeon 4</h3>
				<div className="game" style={style}>
				{dungeonList}
				</div>
			</div>
        )
	}
}

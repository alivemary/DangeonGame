import React from 'react';
import Line from './Line.js';
import { connect } from 'react-redux';
import * as actions from './redux/actions.js'

@connect((store) => {
	return {
		gameWidth: store.gameWidth,
		gameHeight: store.gameHeight
	}
})

export default class DungeonGame extends React.Component {
	constructor (props) {
		super (props);
		this.state = {
				dungeon: [],
				rooms: []
		}
	}
	putRoom(dungeon, x, y, length){
		for (let i=x-length; i<x+length; i++){
			for (let j=y-length; j<y+length; j++){
				dungeon[i][j]=1;
			}
		}
		return dungeon;
	}
	initDungeon(w, h){
		let dungeon = [];
		let rooms = [];
		for (let i=0; i<w; i++) {
			let line = [];
			for (let j=0; j<h; j++) {
				line.push(0);
			}
			dungeon.push(line);
		}
		dungeon = this.putRoom(dungeon, Math.floor(w/2), Math.floor(h/2), 3);
		rooms.push({x: Math.floor(w/2), y: Math.floor(h/2)});
		for (let j=0; j<6; j++){
			let x = Math.floor(Math.random()*(w-8))+3;
			let y = Math.floor(Math.random()*(h-8))+3;
			dungeon = this.putRoom(dungeon, x, y, 2);
			rooms.push({x: x, y: y});
		}
		return {dungeon: dungeon, rooms: rooms};
	}
	initGame(){
		let dungeon = this.initDungeon(Math.floor(this.props.gameWidth/20), Math.floor(this.props.gameHeight/20));
		this.setState({
				dungeon: dungeon.dungeon,
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
		let dungeonList = this.state.dungeon.map((line, index) => {
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

import React from 'react';
import Line from './Line.js';
import { connect } from 'react-redux';
import * as actions from './redux/actions.js'

@connect((store) => {
	return {
		gameWidth: store.gameWidth,
		gameHeight: store.gameHeight,
		dungeon: store.dungeon,
		rooms: store.rooms,
		player: store.player,
		boss: store.boss,
		staff: store.staff
	}
})

export default class DungeonGame extends React.Component {

	putRoom(position, length){
		this.props.dispatch(actions.addRoomToDungeon(position, length));
	}

	addCorridors(room1, room2){
		this.props.dispatch(actions.addCorridorsToDungeon({room1, room2}));
	}

	putPlayer(position) {
		if (this.props.boss.position.x === position.x && this.props.boss.position.y === position.y) {
			if (this.props.boss.health>0 && this.props.player.health>0) {
				this.props.dispatch(actions.attackEnemy());
			}
			return;
		}
		if (this.props.dungeon[position.x][position.y] !== 'WALL') {
			this.props.dispatch(actions.putPlayer(position));
		}
	}

	putBoss(position) {
		this.props.dispatch(actions.putBoss(position));
	}

	putStaff(position) {
		this.props.dispatch(actions.putStaff("medicine", position));
	}

	initDungeon(w, h){
		for (let i=0; i<w; i++) {
			let line = [];
			for (let j=0; j<h; j++) {
				line.push("WALL");
			}
			this.props.dispatch(actions.addLineToDungeon(line));
		}
		//put the first room in the center
		let previousRoom = {x: Math.floor(w/2), y: Math.floor(h/2)}
		this.putRoom(previousRoom, 3);

		let numberOfRooms = Math.floor(this.props.gameWidth/100);

		let playerPosition = {x: Math.floor(w/2), y: Math.floor(h/2)};
		let bossPosition = {x: Math.floor(w/2), y: Math.floor(h/2)};

		//put other rooms randomly
		for (let j=0; j<numberOfRooms; j++){
			let x = Math.floor(Math.random()*(w-8))+3;
			let y = Math.floor(Math.random()*(h-8))+3;
			let nextRoom = {x: x, y: y};
			//define player position on the left
			if (x < playerPosition.x) {
				playerPosition = nextRoom;
			}
			//define boss position on the right
			if (x > bossPosition.x) {
				bossPosition = nextRoom;
			}
 			this.putRoom(nextRoom, 2);
			this.addCorridors(previousRoom, nextRoom);
			previousRoom = nextRoom;
			this.putStaff(nextRoom);
			console.log(nextRoom);
		}
		this.props.dispatch(actions.putPlayer(playerPosition));
		this.putBoss(bossPosition);

	}

	handleKeyDown(event) {
		let position = this.props.player.position;
		switch (event.key) {
			case "ArrowLeft":
				this.putPlayer({x: position.x-1, y: position.y});
				break;
			case "ArrowRight":
				this.putPlayer({x: position.x+1, y: position.y});
				break;
			case "ArrowUp":
				this.putPlayer({x: position.x, y: position.y-1});
				break;
			case "ArrowDown":
				this.putPlayer({x: position.x, y: position.y+1});
				break;
		}
	}

	componentDidMount(){
		this.initDungeon(Math.floor(this.props.gameWidth/20), Math.floor(this.props.gameHeight/20));
		document.addEventListener("keydown", this.handleKeyDown.bind(this));
	}

	componentWillUnmount() {
		document.removeEventListener("keydown", this.handleKeyDown.bind(this));
	}

	render () {
		let staff = this.props.staff[0];
		console.log(this.props.dungeon);
		//console.log(this.props.dungeon[this.props.staff[0].position.x][this.props.staff[0].position.y]);
		let style = {
      		width: this.props.gameWidth,
					height: this.props.gameHeight
				};
		let dungeonList = this.props.dungeon.map((line, index) => {
      return <div key={"line"+index} className='line'>
							<Line player={this.props.player.position}
										boss={this.props.boss.position}
										number={index}
										line={line}/>
						 </div>
		});
		return (
			<div className="dungeon-game">
				<h3>Kill the boss in dungeon</h3>
				<div>Health: {this.props.player.health} Weapon: {this.props.player.weapon} Attack: {this.props.player.attack} Level: {this.props.player.level}</div>
				<div className="game" style={style}>
				{dungeonList}
				</div>
			</div>
        )
	}
}

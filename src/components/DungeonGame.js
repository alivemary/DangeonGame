import React from 'react';
import Line from './Line.js';
import { connect } from 'react-redux';
import * as actions from './redux/actions.js'

const DUNGEON_WIDTH = 40;
const DUNGEON_HEIGHT = 25;
const NUMBER_OF_ROOMS = 3;

export class DungeonGame extends React.Component {

	initEmptyDungeon() {
  	let dungeon = [];
  	for (let i=0; i<DUNGEON_WIDTH; i++) {
  		let line = [];
  		for (let j=0; j<DUNGEON_HEIGHT; j++) {
  			line.push("WALL");
  		}
  		dungeon.push(line);
  	}
  	return dungeon;
  }

	putRoom(position, length){
		this.props.dispatch(actions.addRoomToDungeon(position, length));
	}

	addCorridors(room1, room2){
		this.props.dispatch(actions.addCorridorsToDungeon({room1, room2}));
	}

	putPlayer(position) {
		if (this.props.boss.position.x === position.x && this.props.boss.position.y === position.y) {
			if (this.props.boss.health <= 0) {
				alert("You won!");
			}
			if (this.props.player.health <= 0) {
				alert("You loose!");
			}
			if (this.props.boss.health>0 && this.props.player.health>0) {
				this.props.dispatch(actions.attackEnemy());
			}
			return;
		}
		this.props.staff.forEach(item => {
			if (item.position.x === position.x && item.position.y === position.y) {
				if (item.kind === "medicine") {
					this.props.dispatch(actions.changeHealth(position));
				}
			}
		});
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

	initDungeon(){

		this.props.dispatch(actions.addDungeon(this.initEmptyDungeon()));
		let previousRoom = {x: Math.floor(DUNGEON_WIDTH/2), y: Math.floor(DUNGEON_HEIGHT/2)}
		let playerPosition = previousRoom;
		let bossPosition = previousRoom;
		//put the first room in the center
		this.putRoom(previousRoom, 3);
		//put other rooms randomly
		for (let j=0; j<NUMBER_OF_ROOMS; j++){
			let x = Math.floor(Math.random()*(DUNGEON_WIDTH-6))+3;
			let y = Math.floor(Math.random()*(DUNGEON_HEIGHT-6))+3;
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
			this.putStaff(nextRoom);
			previousRoom = nextRoom;

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
		this.initDungeon();
		document.addEventListener("keydown", this.handleKeyDown.bind(this));
	}

	componentWillUnmount() {
		document.removeEventListener("keydown", this.handleKeyDown.bind(this));
	}

	render () {
		let style = {
      		width: DUNGEON_WIDTH*20,
					height: DUNGEON_HEIGHT*20
				};

		let statsString = "Health: " + this.props.player.health
											+" Weapon: "+this.props.player.weapon
											+" Attack: "+this.props.player.attack
											+" Level: "+this.props.player.level;

		let dungeonList = this.props.dungeon.map((line, index) => {
      return <div key={"line"+index} className='line'>
							<Line number={index}
										line={line}
										player={"Health: " + this.props.player.health + ", Attack: " + this.props.player.attack}
										boss={"Health: " + this.props.boss.health + ", Attack: " + this.props.boss.attack}
									/>
						 </div>
		});
		return (
			<div className="dungeon-game">
				<h3>Kill the boss in dungeon</h3>
				<div>{statsString}</div>
				<div className="game" style={style}>
					{dungeonList}
				</div>
			</div>
        )
	}
}

export default connect((store) => {
 return {
	 dungeon: store.dungeon,
	 rooms: store.rooms,
	 player: store.player,
	 boss: store.boss,
	 staff: store.staff
 }
})(DungeonGame);

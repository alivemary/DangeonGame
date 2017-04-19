import React from 'react';
import Line from './Line.js';
import { connect } from 'react-redux';
import * as actions from './redux/actions.js'

const DUNGEON_WIDTH = 60;
const DUNGEON_HEIGHT = 25;
const NUMBER_OF_ROOMS = 15;
const weaponTypes = ["stick", "dagger", "blade", "short sword", "long sword", "great sword", "holy sword", "rappier"];

export class DungeonGame extends React.Component {

	initEmptyDungeon() {
		let dungeon = [];
		for (let i = 0; i < DUNGEON_WIDTH; i++) {
			let line = [];
			for (let j = 0; j < DUNGEON_HEIGHT; j++) {
				line.push("WALL");
			}
			dungeon.push(line);
		}
		return dungeon;
	}

	addCorridors(room1, room2) {
		this.props.dispatch(actions.addCorridorsToDungeon({ room1, room2 }));
	}

	checkLevel(player) {
		if (player.xp >= player.nextlevel) {
			this.props.dispatch(actions.addLevel());
		}
	}

	checkVictory(enemyHealth, playerHealth, isBoss) {
		if (enemyHealth <= 0 || playerHealth <= 0) {
			if (isBoss) {
				this.showVictory();
			}
			return true;
		}
		return false;
	}

	showVictory() {
		let winText = (this.props.player.health <= 0) ? "You loose!" : "You win!";
		alert(winText);
	}

	calculateBonus(weapon) {
		for (let i=0; i<weaponTypes.length; i++) {
			if (weapon === weaponTypes[i]) {
				return (i+1)*10;
			}
		}
		return 0;
	}

	movePlayer(position) {
		if (this.props.dungeon[position.x][position.y] !== 'WALL') {
			this.props.dispatch(actions.putPlayer(position));
		}
	}

	putPlayer(position) {
		for (let i=0; i<this.props.staff.length; i++) {
			let item = this.props.staff[i];
			console.log(item);
			if (item.position.x === position.x && item.position.y === position.y) {
				if (item.kind === "medicine") {
					this.props.dispatch(actions.changeHealth(position));
					
				}
				if (item.kind === "weapon") {
					let nextWeapon = weaponTypes[weaponTypes.indexOf(this.props.player.weapon)+1];
					this.props.dispatch(actions.changeWeapon(position, nextWeapon));
					
				}
				if (item.kind === "enemy") {
					this.props.dispatch(actions.attackEnemy(i+1, 
										this.calculateBonus(this.props.player.weapon),
										item.attack));
					this.checkLevel(this.props.player);
					if (!this.checkVictory(item.health, this.props.player.health, item.boss)) {
						return;
					}
					else {
						this.props.dispatch(actions.removeEnemy(position));
					}
				}
			}
		}
		this.movePlayer(position);
	}

	attackBoss(position) {
		if (this.props.boss.position.x === position.x && this.props.boss.position.y === position.y) {
			if (this.props.boss.health > 0 && this.props.player.health > 0) {
				this.props.dispatch(actions.attackBoss(this.calculateBonus(this.props.player.weapon)));
				this.checkLevel(this.props.player);
				if (this.checkVictory(this.props.boss.health, this.props.player.health)) {
					let winText = (this.props.player.health <= 0) ? "You loose!" : "You win!";
					alert(winText);
				}
			}
			return;
		}
		
		
	}

	putStaff(position) {
		let staffTypes = ["medicine", "weapon", "enemy"];
		let staffKind = staffTypes[Math.floor(Math.random() * staffTypes.length)];
		let currentStaff = {id: 0, kind: staffKind, position: position};
		if (staffKind === "enemy") {
			currentStaff = {id: 0, kind: staffKind, position: position, health: 60, attack: 5, boss: false};
		}
		this.props.dispatch(actions.putStaff(currentStaff));
	}

	initDungeon() {

		this.props.dispatch(actions.addDungeon(this.initEmptyDungeon()));
		let previousRoom = { x: Math.floor(DUNGEON_WIDTH / 2), y: Math.floor(DUNGEON_HEIGHT / 2) }
		let playerPosition = previousRoom;
		let bossPosition = previousRoom;
		let id = 0;

		//put the first room in the center
		this.props.dispatch(actions.addRoomToDungeon(previousRoom, 3));

		//put other rooms randomly
		for (let j = 0; j < NUMBER_OF_ROOMS; j++) {
			let x = Math.floor(Math.random() * (DUNGEON_WIDTH - 6)) + 3;
			let y = Math.floor(Math.random() * (DUNGEON_HEIGHT - 6)) + 3;
			let nextRoom = { x: x, y: y };
			//define player position on the left
			if (x < playerPosition.x) {
				playerPosition = nextRoom;
			}
			//define boss position on the right
			if (x > bossPosition.x) {
				bossPosition = nextRoom;
				id = j+1;
			}
			this.props.dispatch(actions.addRoomToDungeon(nextRoom, 2));
			this.addCorridors(previousRoom, nextRoom);
			this.putStaff(nextRoom);
			previousRoom = nextRoom;

		}
		
		this.props.dispatch(actions.putBoss(id, bossPosition));
		this.props.dispatch(actions.putPlayer(playerPosition));
		

	}

	handleKeyDown(event) {
		let position = this.props.player.position;
		switch (event.key) {
			case "ArrowLeft":
				this.putPlayer({ x: position.x - 1, y: position.y });
				break;
			case "ArrowRight":
				this.putPlayer({ x: position.x + 1, y: position.y });
				break;
			case "ArrowUp":
				this.putPlayer({ x: position.x, y: position.y - 1 });
				break;
			case "ArrowDown":
				this.putPlayer({ x: position.x, y: position.y + 1 });
				break;
		}
	}

	componentDidMount() {
		this.initDungeon();
		document.addEventListener("keydown", this.handleKeyDown.bind(this));
	}

	componentWillUnmount() {
		document.removeEventListener("keydown", this.handleKeyDown.bind(this));
	}

	render() {
		let style = {
			width: DUNGEON_WIDTH * 20,
			height: DUNGEON_HEIGHT * 20
		};

		let statsString = "Health: " + this.props.player.health
			+ " Attack: " + this.props.player.attack
			+ " Weapon: " + this.props.player.weapon
			+ " XP: " + this.props.player.xp
			+ " Level: " + this.props.player.level;

		let dungeonList = this.props.dungeon.map((line, index) => {
			return <div key={"line" + index} className='line'>
				<Line number={index}
					line={line}
					player={"Health: " + this.props.player.health + ", Attack: " + this.props.player.attack}
					boss={"Health: " + this.props.boss.health + ", Attack: " + this.props.boss.attack}
					staff={this.props.staff}
				/>
			</div>
		});
		return (
			<div className="dungeon-game">
				<h3>Kill the boss in the dungeon</h3>
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
		current_enemy: store.current_enemy,
		staff: store.staff
	}
})(DungeonGame);

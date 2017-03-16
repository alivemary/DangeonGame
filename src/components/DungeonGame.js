import React from 'react';
import Line from './Line.js'

export default class DungeonGame extends React.Component {
	constructor (props) {
		super (props);
		this.state = {
				width: 400,
				height: 300,
				dungeon: []
		}
	}
	putRoom(dungeon, x, y){
		let border = [];
		for (let i=x-3; i<x+3; i++){
			for (let j=y-3; j<y+3; j++){
				dungeon[i][j]=1;
				//if it is a border
				if (i===x-3 || i===x+2 || j===y-3 || j===y+2){
					dungeon[i][j]=0;
					//if it is not a corner
					if (!(i===x-3 && j===y-3) && (!(i===x-3 && j===y+2)) && (!(i===x+2 && j===y-3)) && (!(i===x+2 && j===y+2))){
						border.push({i, j});
					}
				}
			}
		}
		//choose random wall and put the door here
		let doorCoord = Math.floor(Math.random()*border.length);
		dungeon[border[doorCoord].i][border[doorCoord].j] = 1;
		return dungeon;
	}
	initDungeon(w, h){
		let dungeon = [];
		for (let i=0; i<w; i++) {
			let line = [];
			for (let j=0; j<h; j++) {
				line.push(0);
			}
			dungeon.push(line);
		}
		dungeon = this.putRoom(dungeon, Math.floor(w/2), Math.floor(h/2));
		console.log(dungeon.length);
		return dungeon;
	}
	initGame(){
		let width = (window.screen.availWidth>600) ? window.screen.availWidth-200 : 400;
		let height = (window.screen.availHeight>600) ? window.screen.availHeight-300 : 300;
		console.log('w: '+width+' h: '+height);
		let dungeon = this.initDungeon(Math.floor(width/20), Math.floor(height/20));
		this.setState({
				width: width,
				height: height,
				dungeon: dungeon
		});
	}
	componentDidMount(){
		this.initGame();
	}
	render () {
		let style = {
      		width: this.state.width,
					height: this.state.height,
					backgroundColor: 'grey',
					margin: 'auto',
					marginBottom: 20
    	};
		let dungeonList = this.state.dungeon.map((line, index) => {
      return <div key={"line"+index} className='line'><Line number={index} line={line}/></div>
		});
		return (
			<div>
				<h3>Kill the boss in dungeon 4</h3>
				<div className="game" style={style}>
				{dungeonList}
				</div>
			</div>
        )
	}
}

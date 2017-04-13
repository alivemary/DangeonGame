import React from 'react';
import DungeonGame from './DungeonGame';

class App extends React.Component {
    render() {
        return (
            <div>
                <div className="app-header">
                  <h2>Roguelike Dungeon Crawler Game</h2> 
                </div> 
                <DungeonGame />
            </div>
        )
    }
}

export default App;
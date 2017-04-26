import React from 'react';
import DungeonGame from './DungeonGame';

class App extends React.Component {
    render() {
        return (
            <div>
                <div className="app-header">
                    <h2>Roguelike Dungeon Crawler Game</h2>
                    <a href="https://github.com/alivemary/dungeon-game" target="blank">Code on GitHub</a>
                </div>
                <DungeonGame />
            </div>
        )
    }
}

export default App;
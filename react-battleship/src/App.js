import React from 'react';
import './App.css';
import Field from './Field';

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      gameOn: false,
      ships: [[[,], [,], [,], [,]],
      [[,], [,], [,]], [[,], [,], [,]],
      [[,], [,]], [[,], [,]], [[,], [,]],
      [[,]], [[,]], [[,]], [[,]]],
      shipsPlayerOne: [],
      shots: [],
      playerOne: null,
      countShips: 0,
      horizontShip: true,
      isProtectView: null,
      shipsComp: [],
      shotsComp: [],
      playerTurn: true
    }
  }
  onShot(i, j) {
    if (this.state.playerOne && this.state.playerTurn) {
      let newShot = [i, j];
      let newShots = this.state.shots.concat([newShot]);
      if (this.state.shots.some(s => s[0] === newShot[0] && s[1] === newShot[1]))
        alert('выстрел не защитан');
      else {
        let hit = false;
        for (let i = 0; i < this.state.shipsComp.length; i++) {
          if (this.state.shipsComp[i].some(s => s[0] === newShot[0] && s[1] === newShot[1])) {
            hit = true;
            if (this.state.shipsComp[i].
              every(s => newShots.some(sh => sh[0] === s[0] && sh[1] === s[1]))) {
              let newShots2 = this.state.shots;
              for (let j = 0; j < this.state.shipsComp[i].length; j++) {
                let item = this.state.shipsComp[i][j];
                let newShot1 = [item[0] + 1, item[1]];
                let newShot2 = [item[0] - 1, item[1]];
                let newShot3 = [item[0], item[1] + 1];
                let newShot4 = [item[0], item[1] - 1];
                let newShot5 = [item[0] + 1, item[1] + 1];
                let newShot6 = [item[0] - 1, item[1] - 1];
                let newShot7 = [item[0] + 1, item[1] - 1];
                let newShot8 = [item[0] - 1, item[1] + 1];
                newShots2 = newShots2.concat([newShot], [newShot1], [newShot2], [newShot3], [newShot4], [newShot5], [newShot6], [newShot7], [newShot8]);
              }
              this.setState({ shots: newShots2 });
            }
            else {
              this.setState({ shots: newShots });
            }
          }
        }
        if (!hit) {
          this.setState({ shots: newShots, playerTurn: false });
          setTimeout(() => this.shotComp(), 1000);
        }
      }
    }
    else if (!this.state.playerOne)
      alert('Игрок не может стрелять');
  }
  onLose() {
    if (this.state.playerOne) {
      this.state.playerTurn ? alert('Победа!') : alert('Вы проиграли!');
      this.setState({ playerOne: false })
    }
  }
  onMoveShip(r, c) {
    if (this.state.countShips <= 9) {
      let newShip = this.state.ships[this.state.countShips].slice();
      let newShipsPlayerOne = this.state.shipsPlayerOne.slice();
      for (let i = 0; i < newShip.length; i++) {
        if (i === 0) {
          newShip[i][0] = r;
          newShip[i][1] = c;
        }
        else {
          if (this.state.horizontShip) {
            newShip[i][0] = newShip[i - 1][0];
            newShip[i][1] = newShip[i - 1][1] + 1;
          }
          else {
            newShip[i][0] = newShip[i - 1][0] + 1;
            newShip[i][1] = newShip[i - 1][1];
          }
        }
      }
      newShipsPlayerOne.splice(this.state.countShips, 1, newShip);
      this.setState({ shipsPlayerOne: newShipsPlayerOne });
    }
  }
  installShip() {
    this.setState({ countShips: ++this.state.countShips, horizontShip: true });
  }
  turnShip() {
    let newShip = this.state.shipsPlayerOne[this.state.countShips].slice();
    if (newShip.length > 1) {
      if (this.state.horizontShip) {
        for (let i = 1; i < newShip.length; i++) {
          newShip[i][0] = newShip[0][0] + i;
          newShip[i][1] = newShip[0][1];
        }
      }
      else {
        for (let i = 1; i < newShip.length; i++) {
          newShip[i][0] = newShip[0][0];
          newShip[i][1] = newShip[0][1] + i;
        }
      }
      let newShipsPlayerOne = this.state.shipsPlayerOne.slice();
      newShipsPlayerOne.splice(this.state.countShips, 1, newShip);
      this.setState({ shipsPlayerOne: newShipsPlayerOne, horizontShip: !this.state.horizontShip });
    }
  }

  arrangeShipsRandom(props) {
    let newShipsRandom = this.state.ships.map(s => s.map(p => p.slice()));
    let newArrayShips = [];
    for (let i = 0; i < newShipsRandom.length; i++) {
      let direction = Math.random();
      for (let j = 0; j < newShipsRandom[i].length; j++) {
        if (j === 0) {
          newShipsRandom[i][j] =
            [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
        }
        else {
          if (direction < 0.5) {
            newShipsRandom[i][j][0] = newShipsRandom[i][j - 1][0] + 1;
            newShipsRandom[i][j][1] = newShipsRandom[i][j - 1][1];
          }
          else {
            newShipsRandom[i][j][0] = newShipsRandom[i][j - 1][0];
            newShipsRandom[i][j][1] = newShipsRandom[i][j - 1][1] + 1;
          }
        }
      }
      let fellOut = newShipsRandom[i].some(i => i[0] < 0 || i[0] >= 10 || i[1] < 0 || i[1] >= 10);
      let proximity = false;
      newArrayShips.forEach(item => {
        item.forEach(item2 => {
          if (newShipsRandom[i].some
            (j => (j[0] >= item2[0] - 1 && j[0] <= item2[0] + 1) &&
              (j[1] >= item2[1] - 1 && j[1] <= item2[1] + 1))) {
            proximity = true;
          }
        })
      })
      if (fellOut || proximity) --i;
      else newArrayShips = newArrayShips.concat([newShipsRandom[i]]);
    }
    if (props) {
      this.setState({ shipsPlayerOne: newArrayShips, playerOne: true });
    }
    else {
      this.setState({ shipsComp: newArrayShips });
    }
  }
  start() {
    if (this.state.playerOne) {
      this.arrangeShipsRandom(false);
      this.setState({ gameOn: true, playerOne: true });
    }
  }

  shotComp() {
    let newShot = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
    let proximity = false;
    this.state.shotsComp.forEach(shots => {
      if (newShot[0] === shots[0] && newShot[1] === shots[1]) {
        proximity = true;
      }
    });
    if (proximity) {
      this.shotComp();
    }
    else {
      let newShots = this.state.shotsComp.concat([newShot]);
      let hit = false;
      for (let i = 0; i < this.state.shipsPlayerOne.length; i++) {
        if (this.state.shipsPlayerOne[i].some(s => s[0] === newShot[0] && s[1] === newShot[1])) {
          hit = true;
          if (this.state.shipsPlayerOne[i].
            every(s => newShots.some(sh => sh[0] === s[0] && sh[1] === s[1]))) {
            let newShots2 = this.state.shotsComp;
            for (let j = 0; j < this.state.shipsPlayerOne[i].length; j++) {
              let item = this.state.shipsPlayerOne[i][j];
              let newShot1 = [item[0] + 1, item[1]];
              let newShot2 = [item[0] - 1, item[1]];
              let newShot3 = [item[0], item[1] + 1];
              let newShot4 = [item[0], item[1] - 1];
              let newShot5 = [item[0] + 1, item[1] + 1];
              let newShot6 = [item[0] - 1, item[1] - 1];
              let newShot7 = [item[0] + 1, item[1] - 1];
              let newShot8 = [item[0] - 1, item[1] + 1];
              newShots2 = newShots2.concat([newShot], [newShot1], [newShot2], [newShot3], [newShot4], [newShot5], [newShot6], [newShot7], [newShot8]);
            }
            this.setState({ shotsComp: newShots2 });
            setTimeout(() => this.shotComp(), 800);
          }
          else {
            this.setState({ shotsComp: newShots });
            setTimeout(() => this.shotComp(), 800);
          }
        }
      }
      if (!hit) {
        this.setState({ shotsComp: newShots, playerTurn: true });
      }
    }
  }

  onSave() {
    let method = true;
    let key = 'saveBattleShipGame';
    let data = JSON.stringify({
      shipsPlayerOne: this.state.shipsPlayerOne,
      shots: this.state.shots,
      playerOne: this.state.playerOne,
      shipsComp: this.state.shipsComp,
      shotsComp: this.state.shotsComp
    });
    this.props.onSave(method, key, data);
  }

  onContinue() {
    let method = false;
    let key = 'saveBattleShipGame';
    this.props.onSave(method, key)
    let saveGame = JSON.parse(this.props.onSave(method, key));
    this.setState({
      shipsPlayerOne: saveGame.shipsPlayerOne,
      shots: saveGame.shots,
      playerOne: saveGame.playerOne,
      shipsComp: saveGame.shipsComp,
      shotsComp: saveGame.shotsComp,
      gameOn: true
    });
  }

  render() {
    return (<div>
      <div className="battleship_fields">
        <div className = "battleship_fields__field">
          <h3>Поле игрока</h3>
          <Field
            gameOn={this.state.gameOn}
            onShot={this.onShot.bind(this)}
            shots={this.state.shotsComp}
            ships={this.state.shipsPlayerOne}
            onLose={this.onLose.bind(this)}
            onMoveShip={this.onMoveShip.bind(this)}
            installShip={this.installShip.bind(this)}
            turnShip={this.turnShip.bind(this)}
            isProtectView={this.state.isProtectView}
          />
        </div>
        <div className = "battleship_fields__field">
          <h3>Поле Компютера</h3>
          <Field
            gameOn={this.state.gameOn}
            onShot={this.onShot.bind(this)}
            shots={this.state.shots}
            ships={this.state.shipsComp}
            onLose={this.onLose.bind(this)}
            onMoveShip={this.onMoveShip.bind(this)}
            installShip={this.installShip.bind(this)}
            turnShip={this.turnShip.bind(this)}
            isProtectView={true}
          />
        </div></div>
        <div className="button">
          {this.state.gameOn ? <div><h1 className="display-4 font-italic">Игра!!!</h1>
            <button type="button" className="btn btn-outline-success" onClick={this.onSave.bind(this)}>Save</button> </div> :
            <div><div><button id = "largeButton" type="button" className="btn btn-outline-success" onClick={() => this.arrangeShipsRandom.bind(this)(true)}>
              Расставить корабли автоматически</button></div>
              <br></br>
              <div><button type="button" className="btn btn-outline-danger" onClick={this.start.bind(this)}>
                Старт</button></div><br></br>
              <button type="button" className="btn btn-outline-success" onClick={this.onContinue.bind(this)}>Continue</button></div>}
        </div>
      </div>
    );
  }
}

export default App;

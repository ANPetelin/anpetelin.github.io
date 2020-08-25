import React from 'react';
import style from './Tetris.module.css';


function GetClassDetail(ri, ci, detail) {
  let newDetail = detail.filter(f => f.x + 3 === ri && f.y - 2 === ci);
  if (newDetail.length)
    return style.nextDetail;
  else
    return '';
}

function GetClassFloor(ri, ci, detail, blockage) {
  let newDetail = detail.filter(f => f.x === ri && f.y === ci);
  let newBlockage = blockage.filter(b => b.x === ri && b.y === ci);
  if (newDetail.length)
    return style.detail;
  else if (newBlockage.length)
    return style.blockage;
  else
    return '';
}

function ReturnBlockage(item, i) {
  if (item.x > i) {
    return { x: item.x, y: item.y };
  }
  else if (item.x < i) {
    return { x: item.x + 1, y: item.y };
  }
  else
    return {}
}

function Table(props) {
  let array = new Array(props.row).fill(new Array(props.cell).fill(''));
  let table = <div>
    <table><tbody>
      {array.map((row, rowIndex) =>
        <tr key={rowIndex}>
          {row.map((cell, cellIndex) =>
            <td key={cellIndex} className={GetClassFloor(rowIndex, cellIndex, props.detail, props.blockage)} onClick={() => props.fallDown()}>
              {cell}
            </td>)}
        </tr>)}
    </tbody></table>
  </div>;
  return (<div>
    {table}
  </div>
  );
}

function Detail(props) {
  let array = new Array(4).fill(new Array(5).fill(''));
  let table = <div>
    <table><tbody>
      {array.map((row, rowIndex) =>
        <tr key={rowIndex}>
          {row.map((cell, cellIndex) =>
            <td key={cellIndex} className={GetClassDetail(rowIndex, cellIndex, props.nextDetail)}>
            </td>)}
        </tr>)}
    </tbody></table>
  </div>;
  return (<div>
    {table}
  </div>
  );
}

function Turn(detail, indexDetail, iturn) {
  let newDetail = detail.map(i => Object.assign({}, i));
  switch (indexDetail) {
    case 0:
      if (iturn % 2 === 0) {
        newDetail[0].x = newDetail[1].x - 1;
        newDetail[0].y = newDetail[1].y;
        newDetail[2].x = newDetail[1].x + 1;
        newDetail[2].y = newDetail[1].y;
        newDetail[3].x = newDetail[1].x + 2;
        newDetail[3].y = newDetail[1].y;
      }
      else {
        newDetail[0].x = newDetail[1].x;
        newDetail[0].y = newDetail[1].y - 1;
        newDetail[2].x = newDetail[1].x;
        newDetail[2].y = newDetail[1].y + 1;
        newDetail[3].x = newDetail[1].x;
        newDetail[3].y = newDetail[1].y + 2;
      }
      break;
    case 1:
      break;
    case 2:
      if (iturn % 4 === 0) {
        newDetail[0].x = newDetail[1].x - 1;
        newDetail[0].y = newDetail[1].y;
        newDetail[2].x = newDetail[1].x;
        newDetail[2].y = newDetail[1].y + 1;
        newDetail[3].x = newDetail[1].x;
        newDetail[3].y = newDetail[1].y + 2;
      }
      else if (iturn % 4 === 1) {
        newDetail[0].x = newDetail[1].x;
        newDetail[0].y = newDetail[1].y - 1;
        newDetail[2].x = newDetail[1].x - 1;
        newDetail[2].y = newDetail[1].y;
        newDetail[3].x = newDetail[1].x - 2;
        newDetail[3].y = newDetail[1].y;
      }
      else if (iturn % 4 === 2) {
        newDetail[0].x = newDetail[1].x + 1;
        newDetail[0].y = newDetail[1].y;
        newDetail[2].x = newDetail[1].x;
        newDetail[2].y = newDetail[1].y - 1;
        newDetail[3].x = newDetail[1].x;
        newDetail[3].y = newDetail[1].y - 2;
      }
      else if (iturn % 4 === 3) {
        newDetail[0].x = newDetail[1].x;
        newDetail[0].y = newDetail[1].y + 1;
        newDetail[2].x = newDetail[1].x + 1;
        newDetail[2].y = newDetail[1].y;
        newDetail[3].x = newDetail[1].x + 2;
        newDetail[3].y = newDetail[1].y;
      }
      break;
    case 3:
      if (iturn % 4 === 0) {
        newDetail[0].x = newDetail[1].x - 1;
        newDetail[0].y = newDetail[1].y;
        newDetail[2].x = newDetail[1].x;
        newDetail[2].y = newDetail[1].y - 1;
        newDetail[3].x = newDetail[1].x;
        newDetail[3].y = newDetail[1].y - 2;
      }
      else if (iturn % 4 === 1) {
        newDetail[0].x = newDetail[1].x;
        newDetail[0].y = newDetail[1].y + 1;
        newDetail[2].x = newDetail[1].x - 1;
        newDetail[2].y = newDetail[1].y;
        newDetail[3].x = newDetail[1].x - 2;
        newDetail[3].y = newDetail[1].y;
      }
      else if (iturn % 4 === 2) {
        newDetail[0].x = newDetail[1].x + 1;
        newDetail[0].y = newDetail[1].y;
        newDetail[2].x = newDetail[1].x;
        newDetail[2].y = newDetail[1].y + 1;
        newDetail[3].x = newDetail[1].x;
        newDetail[3].y = newDetail[1].y + 2;
      }
      else if (iturn % 4 === 3) {
        newDetail[0].x = newDetail[1].x;
        newDetail[0].y = newDetail[1].y - 1;
        newDetail[2].x = newDetail[1].x + 1;
        newDetail[2].y = newDetail[1].y;
        newDetail[3].x = newDetail[1].x + 2;
        newDetail[3].y = newDetail[1].y;
      }
      break;
    case 4:
      if (iturn % 2 === 0) {
        newDetail[0].x = newDetail[1].x;
        newDetail[0].y = newDetail[1].y - 1;
        newDetail[2].x = newDetail[1].x - 1;
        newDetail[2].y = newDetail[1].y;
        newDetail[3].x = newDetail[1].x - 1;
        newDetail[3].y = newDetail[1].y + 1;
      }
      else {
        newDetail[0].x = newDetail[1].x - 1;
        newDetail[0].y = newDetail[1].y;
        newDetail[2].x = newDetail[1].x;
        newDetail[2].y = newDetail[1].y + 1;
        newDetail[3].x = newDetail[1].x + 1;
        newDetail[3].y = newDetail[1].y + 1;
      }
      break;
    case 5:
      if (iturn % 2 === 0) {
        newDetail[0].x = newDetail[1].x;
        newDetail[0].y = newDetail[1].y - 1;
        newDetail[2].x = newDetail[1].x + 1;
        newDetail[2].y = newDetail[1].y;
        newDetail[3].x = newDetail[1].x + 1;
        newDetail[3].y = newDetail[1].y + 1;
      }
      else {
        newDetail[0].x = newDetail[1].x - 1;
        newDetail[0].y = newDetail[1].y;
        newDetail[2].x = newDetail[1].x;
        newDetail[2].y = newDetail[1].y - 1;
        newDetail[3].x = newDetail[1].x + 1;
        newDetail[3].y = newDetail[1].y - 1;
      }
      break;
    case 6:
      if (iturn % 4 === 0) {
        newDetail[0].x = newDetail[1].x + 1;
        newDetail[0].y = newDetail[1].y;
        newDetail[2].x = newDetail[1].x - 1;
        newDetail[2].y = newDetail[1].y;
        newDetail[3].x = newDetail[1].x;
        newDetail[3].y = newDetail[1].y - 1;
      }
      else if (iturn % 4 === 1) {
        newDetail[0].x = newDetail[1].x;
        newDetail[0].y = newDetail[1].y + 1;
        newDetail[2].x = newDetail[1].x;
        newDetail[2].y = newDetail[1].y - 1;
        newDetail[3].x = newDetail[1].x + 1;
        newDetail[3].y = newDetail[1].y;
      }
      else if (iturn % 4 === 2) {
        newDetail[0].x = newDetail[1].x - 1;
        newDetail[0].y = newDetail[1].y;
        newDetail[2].x = newDetail[1].x + 1;
        newDetail[2].y = newDetail[1].y;
        newDetail[3].x = newDetail[1].x;
        newDetail[3].y = newDetail[1].y + 1;
      }
      else if (iturn % 4 === 3) {
        newDetail[0].x = newDetail[1].x;
        newDetail[0].y = newDetail[1].y - 1;
        newDetail[2].x = newDetail[1].x;
        newDetail[2].y = newDetail[1].y + 1;
        newDetail[3].x = newDetail[1].x - 1;
        newDetail[3].y = newDetail[1].y;
      }
      break;
    default:
      break;
  }
  return newDetail;
}

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      gameOn: false, row: 15, cell: 10, count: 0, details: [[{ x: -1, y: 3 }, { x: -1, y: 4 }, { x: -1, y: 5 }, { x: -1, y: 6 }],
      [{ x: -2, y: 4 }, { x: -2, y: 5 }, { x: -1, y: 4 }, { x: -1, y: 5 }],
      [{ x: -3, y: 5 }, { x: -3, y: 4 }, { x: -2, y: 4 }, { x: -1, y: 4 }],
      [{ x: -3, y: 4 }, { x: -3, y: 5 }, { x: -2, y: 5 }, { x: -1, y: 5 }],
      [{ x: -3, y: 4 }, { x: -2, y: 4 }, { x: -2, y: 5 }, { x: -1, y: 5 }],
      [{ x: -3, y: 5 }, { x: -2, y: 5 }, { x: -2, y: 4 }, { x: -1, y: 4 }],
      [{ x: -1, y: 3 }, { x: -1, y: 4 }, { x: -1, y: 5 }, { x: -2, y: 4 }]],
      indexDetail: 0,
      indexNextDetail: 0,
      detail: [],
      nextDetail: [],
      blockage: [],
      turn: 0,
      timerId: null,
      pause: false,
      saveOn: false
    };
  }
  onStart() {
    if (this.state.saveOn) {
      this.setState({ gameOn: true });
    }
    else {
      let newIndexDetail = Math.floor(Math.random() * this.state.details.length);
      let newIndexNextDetail = Math.floor(Math.random() * this.state.details.length);
      this.setState({
        gameOn: true,
        detail: this.state.details[newIndexDetail].slice(),
        nextDetail: this.state.details[newIndexNextDetail].slice(),
        indexDetail: newIndexDetail,
        indexNextDetail: newIndexNextDetail,
        saveOn: true
      });
    }
    let timerId = setInterval(this.moveDown.bind(this), 500);
    this.setState({ timerId: timerId })
  }
  moveDown() {
    let newDetail = this.state.detail.map(item => { return { x: item.x + 1, y: item.y } });
    if ((newDetail.some(d =>
      d.x === this.state.row)) || (this.state.blockage.some(block =>
        newDetail.some(d => d.x === block.x && d.y === block.y)))) {
      let newBlockage = this.state.blockage.concat(this.state.detail);
      this.setState({ blockage: newBlockage })
      if (this.state.blockage.some(block => block.x < 0)) {
        clearInterval(this.state.timerId);
        alert('Game over');
        this.setState({ timerId: null, gameOn: false })
      }
      this.getNewDetail.bind(this)();
    }
    else
      this.setState({ detail: newDetail });
  }
  fallDown() {
    if ((this.state.gameOn) && (!this.state.pause) && (this.state.detail.every(d => d.x < this.state.row - 2 || this.state.blockage.some(b => d.x < b.x - 2)))) {
      let newDetail = this.state.detail.map(item => { return { x: item.x + 1, y: item.y } });
      if ((newDetail.some(d =>
        d.x === this.state.row)) || (this.state.blockage.some(block =>
          newDetail.some(d => d.x === block.x && d.y === block.y)))) { }
      else {
        this.setState({ detail: newDetail });
      }
    }
  }
  moveLR(k) {
    if (!this.state.pause) {
      let newDetail = this.state.detail.map(item => { return { x: item.x, y: item.y + k } });
      if (!newDetail.some(d => this.state.blockage.some(block => block.x === d.x && block.y === d.y)) &&
        (newDetail.every(d => d.y >= 0 && d.y < this.state.cell))) {
        this.setState({ detail: newDetail });
      }
    }
  }
  uTurn() {
    if (!this.state.pause) {
      let newDetail = Turn(this.state.detail, this.state.indexDetail, this.state.turn);
      let machBlock = newDetail.some(d => this.state.blockage.some(block => block.x === d.x && block.y === d.y));
      let exitFloor1 = newDetail.every(d => d.y >= 0 && d.y < this.state.cell);
      let exitFloor2 = newDetail.every(d => d.x < this.state.row)
      if (!machBlock && exitFloor1 && exitFloor2) {
        this.setState({ detail: newDetail, turn: this.state.turn + 1 });
      }
    }
  }
  getNewDetail() {
    let newBlockage = this.state.blockage.slice();
    let newCount = this.state.count;
    let k = 1;
    for (let i = this.state.row; i > 0; i--) {
      let newB = newBlockage.filter(item => item.x === i);
      if (newB.length === this.state.cell) {
        newCount += k;
        k += 0.5;
        let newBA = newBlockage.map(item => {
          return ReturnBlockage(item, i);
        });
        newBlockage = newBA;
        i++;
      }
    }
    this.setState({ blockage: newBlockage, count: newCount });

    let newIndexNextDetail = Math.floor(Math.random() * this.state.details.length);
    this.setState({ detail: this.state.nextDetail, turn: 0, indexDetail: this.state.indexNextDetail });
    let newDetail = this.state.details[newIndexNextDetail].slice();
    this.setState({ nextDetail: newDetail, indexNextDetail: newIndexNextDetail })
  }
  pause() {
    if (!this.state.pause) {
      clearInterval(this.state.timerId);
      this.setState({ timerId: null, pause: true })
    }
    else {
      let timerId = setInterval(this.moveDown.bind(this), 500);
      this.setState({ timerId: timerId, pause: false });
    }
  }
  onSave() {
    let method = true;
    let key = 'saveTetrisGame';
    let data = JSON.stringify({
      count: this.state.count,
      blockage: this.state.blockage,
      indexDetail: this.state.indexDetail,
      indexNextDetail: this.state.indexNextDetail,
      detail: this.state.detail,
      nextDetail: this.state.nextDetail
    });
    this.props.onSave(method, key, data);
  }

  onContinue() {
    let method = false;
    let key = 'saveTetrisGame';
    this.props.onSave(method, key)
    let saveGame = JSON.parse(this.props.onSave(method, key));
    this.setState({
      count: saveGame.count,
      blockage: saveGame.blockage,
      indexDetail: saveGame.indexDetail,
      indexNextDetail: saveGame.indexNextDetail,
      detail: saveGame.detail,
      nextDetail: saveGame.nextDetail,
      timerId: null,
      pause: false,
      saveOn: true
    });
  }
  onKeybord(key) {
    switch (key) {
      case 'ArrowUp':
        this.uTurn.bind(this)();
        return;
      case 'ArrowLeft':
        this.moveLR.bind(this)(-1);
        break;
      case 'ArrowRight':
        this.moveLR.bind(this)(1);
        break;
      case 'ArrowDown':
        this.fallDown.bind(this)();
        break;
      case ' ':
        this.pause.bind(this)();
        break;
      default:
        break;
    }
  }
  render() {
    return (
      <div className={style.gameTatrisFlied} tabIndex="0" onKeyDown={e => this.onKeybord.bind(this)(e.key)}>
        <div className={style.gameField}>
          <div className={style.nextDetails}>
            <Detail nextDetail={this.state.nextDetail} />
          </div>
          <div className={style.count}>{this.state.count}</div>
        </div>
        <div className={style.field}>
          <Table row={this.state.row}
            cell={this.state.cell}
            count={this.state.count}
            detail={this.state.detail}
            blockage={this.state.blockage}
            fallDown={() => this.onKeybord.bind(this)('ArrowDown')} />
          <div className={style.button}>
            {this.state.gameOn ? <div>
              <table><tbody>
                <tr>
                  <td><button type="button" className="btn btn-outline-success" onClick=
                    {() => this.onKeybord.bind(this)('ArrowLeft')}>Влево</button></td>
                  <td><button type="button" className="btn btn-outline-primary" onClick=
                    {() => this.onKeybord.bind(this)('ArrowUp')}>Поворот</button></td>
                  <td><button type="button" className="btn btn-outline-success" onClick=
                    {() => this.onKeybord.bind(this)('ArrowRight')}>Вправо</button></td>
                </tr>
                <tr>
                  <td></td>
                  <td><button type="button" className="btn btn-outline-danger" onClick=
                    {() => this.onKeybord.bind(this)(' ')}>Pause</button></td>
                  <td></td>
                </tr>
              </tbody></table>
            </div> :
              <div>
                <button type="button" className="btn btn-outline-success" onClick=
                  {this.onStart.bind(this)}>
                  Start</button>
              </div>}
            <br />
            <table><tbody><tr>
              <td><button type="button" className="btn btn-outline-success" onClick=
                {this.onSave.bind(this)}>
                Save</button></td>
              <td></td>
              <td></td>
              <td>{this.state.saveOn ? <div></div> :
                <button type="button" className="btn btn-outline-success" onClick=
                  {this.onContinue.bind(this)}>
                  Сontinue</button>}
              </td>
            </tr></tbody></table>
            <p className="alert alert-primary" role="alert">←↑→↓ Управление клавиатурой <br></br>
            Space Пауза<br></br>
            </p>
          </div>
        </div>
      </div>
    );
  }
}
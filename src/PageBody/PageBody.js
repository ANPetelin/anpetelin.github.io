import React from 'react';
import {
  HashRouter as 
  Switch,
  Route
} from "react-router-dom";
import Battleship from '../../react-battleship/src/App';
import Tetris from '../../react-tetris/Tetris';
import Race from '../../react-race/Race';
import './PageBody.css';

export default function PageBody(props) {
  return (
    <main role="main" className={`page-body ${props.sideBarCollapsed ? 'page-body-sidebar-collapsed' : ''}`}>
      <Switch>
        <Route path="/battleship">
          <Battleship onSave={props.onSave}/>
        </Route>
        <Route path="/tetris">
          <Tetris onSave={props.onSave}/>
        </Route>
        <Route path="/race">
          <Race onSave={props.onSave}
                sideBarItemClass={props.sideBarItemClass}/>
        </Route>
        <Route exact path="/">
          <div className = "startPage">
          <h1>Меня зовут Андрей Петелин! Я начинающий Frontend разработчик. Здесь можно увидеть некоторые мои работы.</h1>
          </div>
        </Route>
      </Switch>
    </main>
  );
}
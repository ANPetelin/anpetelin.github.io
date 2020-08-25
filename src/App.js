import React, { useState } from 'react';
import { HashRouter as Router } from "react-router-dom";
import Header from './Header/Header';
import PageBody from './PageBody/PageBody';
import './App.css';

const routeGroups = [
  {
    links: [ { to: '', caption: 'About' } ]
  },
  {
    caption: 'Игры',
    links: [
      { to: 'battleship', caption: 'Battleship' },
      { to: 'tetris', caption: 'Tetris' },
      { to: 'race', caption: 'Race' },
      { to: 'simon-game', caption: 'Simon Game', external: true }
    ]
  },
  {
    caption: 'Учебные проекты',
    links: [
      { to: 'pagenewclient', caption: 'Client registration form', external: true },
      { to: 'foodacat', caption: 'Site foods from cats', external: true },
    ]
  }
];

const isMobile = window.innerWidth < 768;
export default function App(props) {
  const [sideBarCollapsed, setSideBarCollapsed] = useState(isMobile);
  const sideBarItemClass = sideBarCollapsed ? 'sidebar-collapse-item' : '';

  return (
    <Router>
      <nav className="navbar navbar-light sticky-top bg-light flex-md-nowrap p-0">
        <a className={`navbar-brand col-sm-3 col-md-2 mr-0 sidebar-navbar-brand ${sideBarItemClass}`} style={{textAlign:"center"}} href="https://github.com/ANPetelin" aria-label="Homepage" data-ga-click="(Logged out) Header, go to homepage, icon:logo-wordmark">
          <svg height="32" className="octicon octicon-mark-github text-white" viewBox="0 0 16 16" version="1.1" width="32" aria-hidden="true"><path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path></svg>
        </a>
        <div className="navbar navbar-top">
          <button className="navbar-toggler" onClick={() => { setSideBarCollapsed(!sideBarCollapsed) }} type="button" data-toggle="collapse" data-target="#navbarsExample02" aria-controls="navbarsExample02" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
      </nav>
      <div className="container-fluid">
        <div className="row">
          <Header routeGroups={routeGroups} sideBarCollapsed={sideBarCollapsed} isMobile={isMobile} setSideBarCollapsed={setSideBarCollapsed} />
          <PageBody onSave={props.onSave} sideBarCollapsed={sideBarCollapsed} sideBarItemClass={sideBarItemClass}/> 
        </div>
      </div>
    </Router>
  );
}

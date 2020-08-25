import React from 'react';
import {
  HashRouter as Router,
  Link
} from "react-router-dom";
import './Header.css';

export default function Header(props) {
  const renderGroupLinkCaption = caption => (
    <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
      <span>{caption}</span>
    </h6>
  );

  const renderLink = (link, key) => (
    <li key={key} className="nav-item" onClick={() => {props.setSideBarCollapsed(props.isMobile)}}>
      {!!link.external 
        ? <a className="nav-link" href={link.to} target="_blank">{link.caption}</a>
        : <Link className="nav-link" to={'/' + link.to}>{link.caption}</Link>}
    </li>
  );

  const renderLinks = links => {
    return (
      <ul className="nav flex-column">
        {links.map((link, key) => renderLink(link, key))}
      </ul>
    );
  }

  return (
    <Router>
      <nav className={`col-md-2 d-md-block bg-light sidebar ${props.sideBarCollapsed ? 'sidebar-collapse-item' : ''}`}>
        <div className="sidebar-sticky">
          {props.routeGroups.length && props.routeGroups.map((routeGroup, index) => (
            <React.Fragment key={index}>
              {routeGroup.caption && renderGroupLinkCaption(routeGroup.caption)}
              {renderLinks(routeGroup.links)}
            </React.Fragment>
            ))}
        </div>
      </nav>
    </Router>
  );
}

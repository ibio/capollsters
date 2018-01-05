import React from 'react';
import ReactDOM from 'react-dom';
import Config from 'helper/config';
import Style from 'style/component/header.scss';

export default function Header(props) {
  //<a className="btn-round" href="#/incompleted">Completed</a>
  return (
    <nav className="navbar navbar-fixed-top header">
      <div className="container-fluid">
        <div className="row header-main">
          <div className="col-md-2 col-xs-12 nav-brand">
            <a className="nav-logo" href='#/'>
              CA Pollsters
            </a>
          </div>
          <div className="col-md-6 col-xs-12 nav-progress">
            {props.children}
          </div>
          <div className="col-md-4 col-xs-12 nav-info">

          </div>
        </div>
      </div>
    </nav>
  );
}

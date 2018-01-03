import React from 'react';
import ReactDOM from 'react-dom';
import Config from 'helper/config';
import ProgressBar from 'view/component/progressbar';
import Style from 'style/component/header.scss';

export default function Header(props) {
  return (
    <nav className="navbar navbar-fixed-top header">
      <div className="container-fluid">
        <div className="row header-main">
          <div className="col-md-2 col-xs-12 nav-brand">
            <a className="nav-logo" href='#/main'>
              CA Pollsters
            </a>
          </div>
          <div className="col-md-6 col-xs-12 nav-progress">
            <ProgressBar questions={[1,2,3,4,5,6]} length={400} currentIndex={1} />
          </div>
          <div className="col-md-4 col-xs-12 nav-info">
            <a className="btn-round" href="">Button 1</a>
            <a href="" target="_self" >Button 2</a>
          </div>
        </div>
        {props.useHeadMenu &&
          <div className="row header-menu">
            <div className="col-md-3"></div>
            <div className="col-md-9">

            </div>
          </div>
        }
      </div>
    </nav>
  );
}

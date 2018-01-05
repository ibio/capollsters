import React from 'react';
import ReactDOM from 'react-dom';
import Config from 'helper/config';
import Header from 'view/component/header';
import Style from 'style/incompletedpage.scss';

export default class Completed extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div>
        <Header />
        <div className="container incompletedpage">
          <div className="row">
            <div className="col-md-12">
              <div className="jumbotron">
                <h1>Completed Surveys</h1>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <ul className="list-group">
                <li className="list-group-item">Cras justo odio</li>
                <li className="list-group-item">Dapibus ac facilisis in</li>
                <li className="list-group-item">Morbi leo risus</li>
                <li className="list-group-item">Porta ac consectetur ac</li>
                <li className="list-group-item">Vestibulum at eros</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

import React from 'react';
import ReactDOM from 'react-dom';
import Config from 'helper/config';
import Header from 'view/component/header';
import SurveyModel from 'model/survey';
import Style from 'style/incompletedpage.scss';

export default class Completed extends React.Component{
  constructor(props){
    super(props);
    this._model = new SurveyModel();
    this._model.subscribe(() => {
			this.setState({
				surveyList: this._model.surveyList
			});
		});
    this.state = {
			surveyList : []
		};
  }

  componentDidMount(){
    this._model.fetchAllSurveys();
  }

  render(){
    const listView = this.state.surveyList.map((value, index) => {
      return (
        <li key={index} className="list-group-item">
          <a href={`#/${this.props.role}/completed/poll:${value.id}`}>{value.title}</a>
        </li>
      );
    }, this);
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
              <ul className="list-group">{listView}</ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

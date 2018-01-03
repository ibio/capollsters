import React from 'react';
import ReactDOM from 'react-dom';
import PageModel from 'model/page';
import Config from 'helper/config';
import Header from 'view/component/header';

export default class Incompleted extends React.Component{
	constructor(props){
    super(props);
    this._model = new PageModel();
    this._model.subscribe(function(){
			this.setState({title : this._model.title, content : this._model.content});
		}, this);
		this.state = {
			title : null,
			content : null
		};
	}

	componentDidMount(){
		// console.log(this.props.navs[0]);
		// this._model.fetch(this.props.navs[0]);
	}

	render(){
		//
		return(
			<div>

		    <div className="container-fluid">
		      <div className="row">
						<div className="jumbotron">
						  <h1>Hello, world!</h1>
						  <p>...</p>
						  <p><a className="btn btn-primary btn-lg" href="#" role="button">Learn more</a></p>
						</div>



		      </div>
		    </div>
		  </div>
		);
	}

}

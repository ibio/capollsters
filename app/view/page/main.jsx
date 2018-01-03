import React from 'react';
import ReactDOM from 'react-dom';
import PageModel from 'model/page';
import Config from 'helper/config';
import Header from 'view/component/header';

export default class Main extends React.Component{
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
		        <ul>
		        	<li>Completed</li>
		        	<li>Saved</li>
		        	<hr />
		        	<li>Create New</li>
		        </ul>


		      </div>
		    </div>
		  </div>
		);
	}

}

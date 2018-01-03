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
		        	<li><a className='btn btn-primary' href='#/completed' role='button'>Completed</a></li>
		        	<li><a className='btn btn-primary' href='#/incompleted' role='button'>Saved</a></li>
		        	<hr />
		        	<li><a className='btn btn-primary' href='#/main' role='button'>Create New</a></li>
		        </ul>
		      </div>
		    </div>
		  </div>
		);
	}

}

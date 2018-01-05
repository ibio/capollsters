import React from 'react';
import ReactDOM from 'react-dom';
import Config from 'helper/config';
import Header from 'view/component/header';
import Style from 'style/homepage.scss';

export default class Home extends React.Component{
	constructor(props){
    super(props);
	}

	componentDidMount(){
		// console.log(this.props.navs[0]);
		// this._model.fetch(this.props.navs[0]);
	}

	render(){
		//
		return(
			<div>
				<Header></Header>
		    <div className="container homepage">
		      <div className="row">
						<div className="col-md-12">
							<div className="list-group">
								<a className="list-group-item" href="#/completed" >Completed</a>
								<a className="list-group-item" href="#/incompleted" >Saved</a>
								<a className="list-group-item" href="#/createpoll" >Create New</a>
							</div>
						</div>
		      </div>
		    </div>
		  </div>
		);
	}

}

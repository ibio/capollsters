import React from 'react';
import ReactDOM from 'react-dom';
import Config from 'helper/config';
import Header from 'view/component/header';
import Style from 'style/homepage.scss';

export default function TeacherHome(props){
	//
	return(
		<div>
			<Header></Header>
	    <div className="container homepage">
	      <div className="row">
					<div className="col-md-12">
						<div className="list-group">
							<a className="list-group-item" href="#/teacher/completed" >Completed</a>
							<a className="list-group-item" href="#/teacher/createpoll" >Create New</a>
						</div>
					</div>
	      </div>
	    </div>
	  </div>
	);
}

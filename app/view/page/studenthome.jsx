import React from 'react';
import ReactDOM from 'react-dom';
import Config from 'helper/config';
import Header from 'view/component/header';
import Style from 'style/studenthomepage.scss';

export default function(props){
	//
	return(
		<div>
			<Header></Header>
	    <div className="container studenthomepage">
	      <div className="row">
					<div className="col-md-6">
						<a className="menu-box pull-right" href="#/student/poll">
							<strong>Poll</strong>
							<img src="res/icon_assessment.png" />
						</a>
					</div>
					<div className="col-md-6">
						<a className="menu-box" href="#/student/completed">
							<strong>Completed</strong>
							<img src="res/icon_assessment.png" />
						</a>
					</div>
				</div>

	    </div>
	  </div>
	);
}

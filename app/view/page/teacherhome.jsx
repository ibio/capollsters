import React from 'react';
import ReactDOM from 'react-dom';
import Config from 'helper/config';
import Header from 'view/component/header';
import Style from 'style/teacherhomepage.scss';

export default function TeacherHome(props){
	//
	return(
		<div>
			<Header></Header>
	    <div className="container teacherhomepage">
	      <div className="row">
					<div className="col-md-6">
						<a className="menu-box pull-right" href="#/teacher/completed">
							<strong>Completed</strong>
							<img src="res/icon_assessment.png" />
						</a>
					</div>
					<div className="col-md-6">
						<a className="menu-box" href="#/teacher/createpoll">
							<strong>Create New</strong>
							<img src="res/icon_assessment.png" />
						</a>
					</div>
	      </div>

				<div className="message-box">
					<div className="messagebox-text">
						<h4>Hey, you're back!</h4>
						<section className="messagebox-text-section">Let's get started the poll.</section>
					</div>
				</div>

				<div className="ca-robot">
					<img src="res/victor.png" alt="Victor" />
				</div>
	    </div>
	  </div>
	);
}

import React from 'react';
import ReactDOM from 'react-dom';
import Config from 'helper/config';
import Style from 'style/p404.scss';

export default function P404(props) {
	//
	return(
		<div className="container p404">
			<div className="row">
				<div className="col-sm-12 text-center">
					<h1>404</h1>
					<h5>PAGE NOT FOUND</h5>
					<h3>OH MY GOSH! YOU FOUND IT!!!</h3>
					<p>Looks like the page you're trying to visit doesn't exist. <br />Please check the URL and try your luck again.</p>
				</div>
			</div>

			<div className="row p404-operate">
				<div className="col-sm-12 text-center">
					<a className="btn-round" href="#/" role="button">Take Me Home</a>
				</div>
			</div>
	  </div>
	);
}

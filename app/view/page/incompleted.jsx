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
				<Header />
		    <div className="container">
					<div className="row">
						<div className="col-md-12">
							<div className="jumbotron">
								<h1>Hello, world!</h1>
								<p>...</p>
								<p><a className="btn btn-primary btn-lg" href="#" role="button">Learn more</a></p>
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

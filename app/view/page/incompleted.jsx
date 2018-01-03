import React from 'react';
import ReactDOM from 'react-dom';
import PageModel from 'model/page';
import Config from 'helper/config';
import Header from 'view/component/header';
import MultipleChoice from 'view/component/multiplechoice';
import Style from 'style/incompletedpage.scss';

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
		return(
			<div>
				<Header />
		    <div className="container incompletedpage">
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
							<MultipleChoice question={"Question"} answers={['hello', 'world']} />
							<MultipleChoice question={"What is your favorite color"} answers={['blue', 'green', 'yellow', 'red']} />
						</div>
		      </div>

		    </div>
		  </div>
		);
	}

}

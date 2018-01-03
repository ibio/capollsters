import React from 'react';
import ReactDOM from 'react-dom';
import {TweenLite, Power2} from 'gsap';
import ScrollToPlugin from 'gsap/ScrollToPlugin';
import PageModel from 'model/page';
import Config from 'helper/config';
import Header from 'view/component/header';
import MultipleChoice from 'view/component/multiplechoice';
import ProgressBar from 'view/component/progressbar';
import Style from 'style/incompletedpage.scss';

const HEADER_H = 80;
const SCROLL_EASE_INTERVAL = .25;

export default class Incompleted extends React.Component{
	constructor(props){
    super(props);
		this.panelList = [];
    this._model = new PageModel();
    this._model.subscribe(function(){
			this.setState({title : this._model.title, content : this._model.content});
		}, this);
		this.state = {
			progressIndex : -1,
		};
	}

	componentDidMount(){
		// console.log(this.props.navs[0]);
		// this._model.fetch(this.props.navs[0]);
		window.addEventListener('scroll', e => {this.handleWindowScroll(e);});
	}

	handleWindowScroll(index){
		// const y = window.scrollY;
		// console.log(index);
	}

	handleProgressClickCallback(index){
		const panel = this.panelList[index];
		if(panel){
			const rect = panel.getBoundingClientRect();
			const y = rect.top + window.scrollY - HEADER_H;
			// window.scrollTo(0, y);
			TweenLite.to(window, SCROLL_EASE_INTERVAL, {scrollTo:y, ease: Power2.easeOut, callback:()=>{this.setState({progressIndex:index});}});
		}
	}

	render(){
		return(
			<div>
				<Header>
					<ProgressBar questions={[1,2,3,4,5,6]} length={400} currentIndex={this.state.progressIndex} handleCallback={index => {this.handleProgressClickCallback(index)}} />
				</Header>
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
							<MultipleChoice question={"Question"} answers={['hello', 'world']} ref={ref => {this.panelList.push(ref);}} />
							<MultipleChoice question={"What is your favorite color"} answers={['blue', 'green', 'yellow', 'red']} ref={ref => {this.panelList.push(ref);}} />
						</div>
		      </div>

		    </div>
		  </div>
		);
	}

}
